import { ExtractPropTypes } from 'vue'

export const tabProps = {
  modelValue: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  }
} as const

export type TabProps = ExtractPropTypes<typeof tabProps>

export interface ITabData {
  id: string
  title: string
  type?: 'random'
  content?: string
}
