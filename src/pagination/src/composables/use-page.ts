import { ref } from 'vue'

export default function usePage(defaultPageIndex = 1) {
  const pageIndex = ref(defaultPageIndex)
  const setPageIndex = (cur: number) => {
    pageIndex.value = cur
  }
  const jumpPage = (page: number) => {
    //TODO pageIndex有可能越界
    pageIndex.value += page
  }
  const prevPage = () => jumpPage(-1)

  const nextPage = () => jumpPage(1)
  return { pageIndex, setPageIndex, jumpPage, prevPage, nextPage }
}
