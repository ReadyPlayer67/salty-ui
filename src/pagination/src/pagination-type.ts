import {ExtractPropTypes} from "vue"

export const paginationProps = {
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  }
} as const

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
