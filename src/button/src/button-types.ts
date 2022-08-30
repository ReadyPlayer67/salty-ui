import {ExtractPropTypes, PropType} from "vue";

export type IButtonType = 'primary' | 'secondary' | 'text'

export const buttonProps = {
  type:{
    //约束type类型为字符串，并且约束内容
    type: String as PropType<IButtonType>,
    default:'secondary'
  }
} as const //将buttonProps设置为常量，不允许修改

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
