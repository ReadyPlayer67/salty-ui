import {defineComponent, provide, ref} from "vue";
import {ITabData, TabProps, tabProps} from "./tabs-type";

export default defineComponent({
  name: 'STab',
  props: tabProps,
  emits: ['update:modelValue'],
  setup(props: TabProps, {slots}) {
    const tabsData = ref<ITabData[]>([])
    provide('TABS_DATA',tabsData)
    //激活id
    const activeTab = ref(props.modelValue)
    provide('ACTIVE_TAB',activeTab)
    const changeTab = (tabId: string) => {
      activeTab.value = tabId
    }
    return () => {
      return (
        <div class="s-tabs">
          {/*导航页签*/}
          <ul class="s-tabs__nav">
            {
              tabsData.value.map(tab => (
                <li class={tab.id === activeTab.value ? 'active' : ''} onClick={() => changeTab(tab.id)}>
                  {tab.title}
                </li>
              ))
            }
          </ul>
          {/*内容区*/}
          {slots.default?.()}
        </div>
      )
    }
  }
})
