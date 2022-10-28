import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { Rules } from 'async-validator'
import { FormItemContext } from './form-item-type'

export type Layout = 'horizontal' | 'vertical'
export type LabelSize = 'sm' | 'md' | 'lg'
export type LabelAlign = 'start' | 'center' | 'end'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  layout: {
    type: String as PropType<Layout>,
    default: 'vertical'
  },
  labelSize: {
    type: String as PropType<LabelSize>,
    default: 'md'
  },
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: 'start'
  },
  rules: {
    type: Object as PropType<Rules>
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>

export type FormContext = {
  model: any
  rules?: Rules
  addItem: (item: FormItemContext) => void
  removeItem: (item: FormItemContext) => void
}

//使用InjectionKey作为project-inject的key，可以实现inject对象的类型约束
export const formContextToken: InjectionKey<FormContext> =
  Symbol('formContextToken')
