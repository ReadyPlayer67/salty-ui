import { reactive, computed } from 'vue'
import type { Ref } from 'vue'
import type { IInnerTreeNode } from '../tree-type'
import type {
  DragState,
  IUseDraggable,
  IDropType,
  IDragdrop,
  IUseCore
} from './use-tree-types'

const dropTypeMap = {
  dropPrev: 's-tree__node--drop-prev',
  dropNext: 's-tree__node--drop-next',
  dropInner: 's-tree__node--drop-inner'
}

export function useDragdrop(
  dragdrop: IDragdrop,
  data: Ref<IInnerTreeNode[]>,
  { getChildren, getParent }: IUseCore
): IUseDraggable {
  const dragState = reactive<DragState>({
    dropType: undefined,
    draggingNode: null,
    draggingTreeNode: null
  })

  const treeIdMapValue = computed<Record<string | number, IInnerTreeNode>>(
    () => {
      return data.value.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id!]: cur
        }),
        {}
      )
    }
  )

  const removeDraggingStyle = (target: HTMLElement | null) => {
    target?.classList.remove(...Object.values(dropTypeMap))
  }

  const checkIsParent = (
    childNodeId: number | string,
    parentNodeId: number | string
  ): boolean => {
    const realParentId = treeIdMapValue.value[childNodeId]?.parentId
    if (realParentId === parentNodeId) {
      return true
    } else if (realParentId !== undefined) {
      return checkIsParent(realParentId, parentNodeId)
    } else {
      return false
    }
  }

  const resetDragState = () => {
    dragState.dropType = undefined
    dragState.draggingNode = null
    dragState.draggingTreeNode = null
  }

  const onDragstart = (event: DragEvent, treeNode: IInnerTreeNode): void => {
    event.stopPropagation()
    dragState.draggingNode = event.target as HTMLElement | null
    dragState.draggingTreeNode = treeNode
    //将正在拖拽的节点id存入dataTransfer，未来需要在drop的时候取出来
    event.dataTransfer?.setData('dragNodeId', treeNode.id!)
  }

  const onDragover = (event: DragEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    if (!dragState.draggingNode) {
      return
    }

    if (dragdrop) {
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }

      if (!data) {
        return
      }
      let curDropType: IDropType = {}
      if (typeof dragdrop === 'object') {
        curDropType = dragdrop
      } else if (dragdrop) {
        curDropType = { dropInner: true }
      }
      const { dropPrev, dropNext, dropInner } = curDropType

      let innerDropType: DragState['dropType']

      const prevPercent = dropPrev
        ? dropInner
          ? 0.25
          : dropNext
            ? 0.45
            : 1
        : -1
      const nextPercent = dropNext
        ? dropInner
          ? 0.75
          : dropPrev
            ? 0.55
            : 0
        : 1
      const currentTarget = event.currentTarget as HTMLElement | null
      const targetPosition = currentTarget?.getBoundingClientRect()
      const distance = event.clientY - (targetPosition?.top || 0)

      if (distance < (targetPosition?.height || 0) * prevPercent) {
        innerDropType = 'dropPrev'
      } else if (distance > (targetPosition?.height || 0) * nextPercent) {
        innerDropType = 'dropNext'
      } else if (dropInner) {
        innerDropType = 'dropInner'
      } else {
        innerDropType = undefined
      }
      if (innerDropType) {
        const classList = currentTarget?.classList
        if (classList) {
          if (!classList.contains(dropTypeMap[innerDropType])) {
            removeDraggingStyle(currentTarget)
            classList.add(dropTypeMap[innerDropType])
          }
        }
      } else {
        removeDraggingStyle(currentTarget)
      }
      dragState.dropType = innerDropType
    }
  }

  const onDragleave = (event: DragEvent): void => {
    event.stopPropagation()
    if (!dragState.draggingNode) {
      return
    }
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
  }
  //drop事件，当拖拽节点drop到目标节点时，目标节点会触发该事件
  const onDrop = (event: DragEvent, dropNode: IInnerTreeNode): void => {
    event.preventDefault()
    event.stopPropagation()
    removeDraggingStyle(event.currentTarget as HTMLElement | null)
    if (!dragState.draggingNode || !dragdrop) return

    const dragNodeId = event.dataTransfer?.getData('dragNodeId')
    if (dragNodeId) {
      //判断释放节点是否是拖拽节点的子节点，如果是，则非法，直接return
      //释放节点如果就是拖拽节点，同样非法
      const isParent = checkIsParent(dropNode.id!, dragNodeId)
      if (dragNodeId === dropNode.id || isParent) {
        return
      }
      if (dragState.dropType) {
        handleDrop(dragNodeId, dropNode)
      }

      resetDragState()
    }
  }
  //释放之后的节点操作
  function handleDrop(dragNodeId: string, dropNode: IInnerTreeNode) {
    //获取正在拖拽的节点
    const dragNode = data.value.find(item => item.id === dragNodeId)
    if (dragNode) {
      //备份一个节点
      let cloneDragNode: IInnerTreeNode
      const childrenOfDragNode = getChildren(dragNode)
      const parentOfDragNode = getParent(dragNode)
      if (dragState.dropType === 'dropInner') {//拖拽到dropNode内部
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.id,
          level: dropNode.level + 1
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        //插入克隆节点
        data.value.splice(dropNodeIndex + 1, 0, cloneDragNode)
        //dropNode不再是叶子节点，设置为undefined（不影响懒加载功能）
        dropNode.isLeaf = undefined
        const dragNodeIndex = data.value.indexOf(dragNode)
        //删除旧的拖拽节点
        data.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'dropNext') {//拖拽到dropNode后面
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        const dropNodeChildrenLength = getChildren(dropNode, true).length
        //dropNode可能有子节点，我们需要插入到dropNode和他所有子节点后面的位置
        data.value.splice(
          dropNodeIndex + dropNodeChildrenLength + 1,
          0,
          cloneDragNode
        )
        const dragNodeIndex = data.value.indexOf(dragNode)
        //删除旧的拖拽节点
        data.value.splice(dragNodeIndex, 1)
      } else if (dragState.dropType === 'dropPrev') {//拖拽到dropNode前面
        cloneDragNode = {
          ...dragNode,
          parentId: dropNode.parentId,
          level: dropNode.level
        }
        const dropNodeIndex = data.value.indexOf(dropNode)
        //将克隆节点插入到dropNode原来的位置
        data.value.splice(dropNodeIndex, 0, cloneDragNode)
        const dragNodeIndex = data.value.indexOf(dragNode)
        //删除旧的拖拽节点
        data.value.splice(dragNodeIndex, 1)
      }
      //如果拖拽的是有子节点的节点，他所有的子节点也应当以dropInner的方式递归地被移动
      dragState.dropType = 'dropInner'
      childrenOfDragNode.forEach(child => handleDrop(child.id!, cloneDragNode))
      //如果拖拽节点的父节点不再有子节点，将该节点isLeaf设置为true
      if (parentOfDragNode) {
        if (getChildren(parentOfDragNode).length === 0) {
          parentOfDragNode.isLeaf = true
        }
      }
    }
  }

  const onDragend = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    resetDragState()
  }

  return {
    onDragstart,
    onDragover,
    onDragleave,
    onDrop,
    onDragend
  }
}
