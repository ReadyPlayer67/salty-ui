import {defineComponent, inject, Ref, ref} from "vue";
import {ITabData} from "./tabs-type";

export default defineComponent({
  name: 'STab',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup(props, {slots}) {
    //获取当前激活项
    const activeTab = inject('ACTIVE_TAB') as Ref<string>
    //获取tabsData，并将自身数据加入其中
    const tabsData = inject('TABS_DATA') as Ref<ITabData[]>
    tabsData.value.push({
      id:props.id,
      title:props.title
    })
    return () => (
      <>
        {props.id === activeTab.value && (
          <div class="s-tab">
            {slots.default?.()}
          </div>
        )}
      </>
    )
  }
})
