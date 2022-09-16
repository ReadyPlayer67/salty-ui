import {computed, defineComponent, toRefs} from 'vue'
import usePage from "../composables/use-page";
import {getCenterPage} from "../utils";
import {PagerProps, pagerProps} from "./pager-type";

export default defineComponent({
  name: 'SPager',
  props: pagerProps,
  setup(props: PagerProps) {
    const {total, pageSize, pagerCount} = toRefs(props)
    const {pageIndex, setPageIndex, jumpPage, prevPage, nextPage} = usePage()
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const centerPages = computed(() => getCenterPage(totalPage.value, pageIndex.value, pagerCount.value))
    //暴露这个对象给上下文，这样在下面的render函数中就能通过this拿到这些变量
    //并且能够暴露给外部父组件使用（通过ref）
    return {
      totalPage,
      pageIndex,
      pagerCount,
      setPageIndex,
      jumpPage,
      prevPage,
      nextPage,
      centerPages
    }
  },
  render(){
    const {pageIndex,setPageIndex,totalPage,pagerCount,jumpPage,centerPages} = this
    return (
      <ul class="s-pager">
        <li class={{current: pageIndex === 1}} onClick={() => setPageIndex(1)}>1</li>
        {/*总页码totalPage大于按钮数量pagerCount且当前页码左边的页数大于Math.ceil(pagerCount / 2)才显示...*/}
        {
          totalPage > pagerCount &&
          pageIndex > Math.ceil(pagerCount / 2) &&
          (<li class="more left" onClick={() => jumpPage(-5)}>...</li>)
        }
        {
          centerPages.map(page => (
            <li class={{current: pageIndex === page}} onClick={() => setPageIndex(page)}>{page}</li>
          ))
        }
        {
          totalPage > pagerCount &&
          pageIndex < totalPage - Math.floor(pagerCount / 2) &&
          (<li class="more right" onClick={() => jumpPage(5)}>...</li>)
        }
        {totalPage > 1 &&
          <li class={{current: pageIndex === totalPage}}
              onClick={() => setPageIndex(totalPage)}>{totalPage}</li>}
      </ul>
    )
  }
})
