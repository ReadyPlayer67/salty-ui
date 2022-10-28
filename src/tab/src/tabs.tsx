import { defineComponent, provide, ref, toRefs } from 'vue'
import { ITabData, TabProps, tabProps } from './tabs-type'
import { CloseIcon } from '../../icon'
import Tab from './tab'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  name: 'STab',
  props: tabProps,
  emits: ['update:modelValue'],
  setup(props: TabProps, { slots }) {
    const { modelValue, editable } = toRefs(props)
    const tabsData = ref<ITabData[]>([])
    provide('TABS_DATA', tabsData)
    //激活id
    const activeTab = ref(modelValue.value)
    provide('ACTIVE_TAB', activeTab)
    const changeTab = (tabId: string) => {
      activeTab.value = tabId
    }
    const closeTab = (tabId: string, e: MouseEvent) => {
      e.stopPropagation()
      const delIndex = tabsData.value.findIndex(tab => tab.id === tabId)
      //如果删除项是当前激活的tab
      if (activeTab.value === tabId) {
        //如果删除项是最后一个tab，激活前一个tab
        if (delIndex === tabsData.value.length - 1) {
          activeTab.value = tabsData.value[delIndex - 1].id
        } else {
          //否则激活后一个tab
          activeTab.value = tabsData.value[delIndex + 1].id
        }
      }
      tabsData.value.splice(delIndex, 1)
    }
    const addTab = () => {
      const id = uuidv4()
      tabsData.value.push({
        id,
        type: 'random',
        title: 'New Tab',
        content: 'New Tab Content'
      })
      activeTab.value = id
    }
    return () => {
      return (
        <div class="s-tabs">
          {/*导航页签*/}
          <ul class="s-tabs__nav">
            {tabsData.value.map(tab => (
              <li
                class={tab.id === activeTab.value ? 'active' : ''}
                onClick={() => changeTab(tab.id)}
              >
                {tab.title}
                {/*关闭页签按钮*/}
                {editable.value && tabsData.value.length > 1 && (
                  <CloseIcon
                    size="12"
                    color="grey"
                    onClick={(e: any) => closeTab(tab.id, e)}
                    style="margin-left: 8px;"
                  />
                )}
              </li>
            ))}
            {/*添加标签按钮*/}
            {editable.value && (
              <li>
                <svg
                  onClick={addTab}
                  viewBox="0 0 1024 1024"
                  width="14"
                  height="14"
                >
                  <path d="M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"></path>
                </svg>
              </li>
            )}
          </ul>
          {/*内容区*/}
          {slots.default?.()}
          {/*新增tab内容显示区*/}
          {tabsData.value
            .filter(tab => tab.type === 'random')
            .map(tab => (
              <Tab type="random" id={tab.id} title={tab.title}>
                {tab.content}
              </Tab>
            ))}
        </div>
      )
    }
  }
})
