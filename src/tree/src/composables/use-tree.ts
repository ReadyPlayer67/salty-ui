import {ref, Ref, unref} from "vue";
import {ITreeNode} from "../tree-type";
import {generateInnerTree} from "../utils";
import {useCore} from "../components/use-core";
import {TreeUtils} from "../components/use-tree-types";
import {useToggle} from "../components/use-toggle";
import {useCheck} from "../components/use-check";
import {useOperate} from "../components/use-operate";

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[]): TreeUtils {
  const innerData = ref(generateInnerTree(unref(node)))
  const core = useCore(innerData)
  const plugins = [useToggle, useCheck, useOperate]
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return {...acc, ...plugin(innerData, core)}
  }, {})

  return {
    innerData,
    ...core,
    ...pluginMethods
  } as TreeUtils
}
