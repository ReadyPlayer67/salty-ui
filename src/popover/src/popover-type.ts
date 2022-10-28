import { ExtractPropTypes, PropType } from 'vue'

export const popoverProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  host: {
    type: Object as PropType<HTMLElement>,
    default: () => null
  },
  title: {
    type: String,
    default: ''
  }
} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
