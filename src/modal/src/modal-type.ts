import { ExtractPropTypes } from 'vue'

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  showClose: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '500px'
  },
  center: {
    type: Boolean,
    default: false
  },
  alignCenter: {
    type: Boolean,
    default: false
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>
