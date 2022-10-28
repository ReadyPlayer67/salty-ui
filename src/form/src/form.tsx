import { computed, defineComponent, provide } from 'vue'
import { formContextToken, FormProps, formProps } from './form-type'
import { FormItemContext } from './form-item-type'
import { Values } from 'async-validator'

export default defineComponent({
  name: 'SForm',
  props: formProps,
  emits: ['submit'],
  setup(props: FormProps, { slots, emit, expose }) {
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign
    }))
    //这里把form上的props用provide-inject传给formItem使用而不是用props
    //原因是formItem是用户自己写的slots，不确定是不是form的子组件，有可能中间间隔了很多div
    provide('LABEL_DATA', labelData)
    //提供一个Set用来存放待校验的formItems
    const formItems = new Set<FormItemContext>()
    const addItem = (item: FormItemContext) => formItems.add(item)
    const removeItem = (item: FormItemContext) => formItems.delete(item)
    //提供表单上下文给后代使用
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem
    })
    const submit = (event: Event) => {
      event.preventDefault()
      emit('submit')
    }
    const validate = (callback: (valid: boolean) => void) => {
      const tasks: Promise<Values>[] = []
      formItems.forEach(item => tasks.push(item.validate()))
      Promise.all(tasks)
        .then(() => {
          callback(true)
        })
        .catch(() => {
          callback(false)
        })
    }
    expose({
      validate
    })
    return () => {
      return (
        <form class="s-form" onSubmit={submit}>
          {slots.default?.()}
        </form>
      )
    }
  }
})
