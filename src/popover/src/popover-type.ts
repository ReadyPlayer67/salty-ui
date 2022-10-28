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
  },
  showArrow: {
    type: Boolean,
    default: false
  }
} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
