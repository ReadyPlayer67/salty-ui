import {computed, defineComponent, toRefs} from "vue";
import {PaginationProps, paginationProps} from "./pagination-type";
import usePage from "./composables/use-page";

export default defineComponent({
  name: 'SPagination',
  props: paginationProps,
  setup(props: PaginationProps) {
    const {total, pageSize} = toRefs(props)
    const {pageIndex, setPageIndex, prevPage, nextPage} = usePage()
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    return () => {
      return (
        <div class="s-pagination">
          <button onClick={prevPage}>上一页</button>
          <button onClick={() => setPageIndex(1)}>1</button>
          ...{pageIndex.value}...
          <button onClick={() => setPageIndex(totalPage.value)}>{totalPage.value}</button>
          <button onClick={nextPage}>下一页</button>
        </div>
      )
    }
  }
})
