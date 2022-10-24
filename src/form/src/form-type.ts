import {ExtractPropTypes, PropType} from "vue"
import type {Rules} from 'async-validator'

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
