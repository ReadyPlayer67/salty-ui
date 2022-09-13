import {ref, Ref, SetupContext, unref} from "vue";
import {ITreeNode} from "../tree-type";
import {generateInnerTree} from "../utils";
import {useCore} from "./use-core";
import {TreeUtils} from "./use-tree-types";
import {useToggle} from "./use-toggle";
import {useCheck} from "./use-check";
import {useOperate} from "./use-operate";
import {useLazyLoad} from "./use-lazy-load";

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[], context: SetupContext): TreeUtils {
  const innerData = ref(generateInnerTree(unref(node)))
  const core = useCore(innerData)
  const plugins = [useToggle, useCheck, useOperate]
  const lazyLoad = useLazyLoad(innerData, core, context)
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return {...acc, ...plugin(innerData, core, context, lazyLoad)}
  }, {})

  return {
    innerData,
    ...core,
    ...pluginMethods
  } as TreeUtils
}
