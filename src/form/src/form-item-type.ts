import {ExtractPropTypes} from "vue"
import {Layout} from "./form-type";

export const formItemProps = {
  label: {
    type: String
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type LabelData = {
  layout: Layout
}
