import {computed, ComputedRef, defineComponent, inject, provide, ref} from "vue";
import {FormItemProps, formItemProps, LabelData} from "./form-item-type";
import {formContextToken} from "./form-type";
import Validator from 'async-validator'

export default defineComponent({
  name: 'SFormItem',
  props: formItemProps,
  setup(props: FormItemProps, {slots}) {
    const labelData = inject('LABEL_DATA') as ComputedRef<LabelData>
    const itemClasses = computed(() => ({
      's-form__item': true,
      's-form__item--horizontal': labelData.value.layout === 'horizontal',
      's-form__item--vertical': labelData.value.layout === 'vertical'
    }))
    //必须是水平排列下面两个属性才生效
    const labelClasses = computed(() => ({
      's-form__label': true,
      's-form__label--vertical': labelData.value.layout === 'vertical',
      [`s-form__label--${labelData.value.labelAlign}`]: labelData.value.layout === 'horizontal',
      [`s-form__label--${labelData.value.labelSize}`]: labelData.value.layout === 'horizontal'
    }))
    //实现一个validate方法并提供给下级
    const formCtx = inject(formContextToken)
    const showMessage = ref(false)
    const errorMessage = ref('')
    const validate = () => {
      if (!formCtx) {
        console.warn('请在Form组件中使用FormItem')
        return Promise.reject('请在Form组件中使用FormItem')
      }
      if (!props.field) {
        console.warn('如果要校验当前项，请设置field字段')
        return Promise.reject('如果要校验当前项，请设置field字段')
      }
      //用户没有设置rules，不需要校验
      if (!formCtx.rules) {
        return Promise.resolve({result: true})
      }
      const itemRules = formCtx.rules[props.field] || undefined
      //如果根据field字段没有找到对应的rules，认为校验通过
      if (!itemRules) {
        return Promise.resolve({result: true})
      }
      //获取校验规则和数值
      const value = formCtx.model[props.field]
      //执行校验并返回结果
      //创建一个校验实例
      const validator = new Validator({[props.field]: itemRules})
      return validator.validate({[props.field]: value}, errors => {
        if(errors){
          showMessage.value = true
          errorMessage.value = errors[0].message || '校验错误'
        }else{
          showMessage.value = false
          errorMessage.value = ''
        }
      })
    }
    provide('FORM_ITEM_CTX',{
      validate
    })
    return () => {
      return (
        <div class={itemClasses.value}>
          {/*label*/}
          <span class={labelClasses.value}>{props.label}</span>
          {/*control*/}
          <div>
            {slots.default?.()}
          </div>
          {/*error messages*/}
          {showMessage.value && (
            <div class="error-message">{errorMessage.value}</div>
          )}
        </div>
      )
    }
  }
})
