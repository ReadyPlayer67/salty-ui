import { ExtractPropTypes, PropType } from 'vue'

export type IButtonType = 'primary' | 'secondary' | 'text'
export type IButtonSize = 'large' | 'medium' | 'small'

export const buttonProps = {
  type: {
    //约束type类型为字符串，并且约束内容
    type: String as PropType<IButtonType>,
    default: 'secondary'
  },
  size: {
    type: String as PropType<IButtonSize>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
} as const //将buttonProps设置为常量，不允许修改

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
