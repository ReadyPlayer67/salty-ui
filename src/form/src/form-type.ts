import {ExtractPropTypes, PropType} from "vue"

export const formProps = {
  model:{
    type: Object,
    required: true
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>
