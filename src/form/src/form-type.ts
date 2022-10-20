import {ExtractPropTypes, PropType} from "vue"

export type Layout = 'horizontal' | 'vertical'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  layout: {
    type: String as PropType<Layout>,
    default: 'vertical'
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>
