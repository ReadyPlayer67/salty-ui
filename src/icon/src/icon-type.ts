import {ExtractPropTypes, PropType} from "vue"

export const iconProps = {
  name: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: 'icon'
  },
  size: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  color: {
    type: String,
    default: 'inherit'
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
