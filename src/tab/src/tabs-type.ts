import {ExtractPropTypes} from "vue"

export const tabProps = {
  modelValue: {
    type: String,
    default: ''
  }
} as const

export type TabProps = ExtractPropTypes<typeof tabProps>

export interface ITabData {
  id: string,
  title: string
}
