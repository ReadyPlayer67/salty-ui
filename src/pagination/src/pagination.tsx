import {computed, defineComponent, toRefs} from "vue";
import {PaginationProps, paginationProps} from "./pagination-type";
import usePage from "./composables/use-page";

//获取中间部分应当显示的页码数组的工具方法
function getCenterPage(totalPage: number, pageIndex: number, pagerCount: number) {
  //利用totalPage构造长度为totalPage，下标从0开始的数组：[0,1,2,3,4,5,6,7]
  const totalPageArr = Array.from(Array(totalPage).keys())
  if (totalPage <= pagerCount) {
    // totalPageArr: [0,1,2,3,4]
    // 总页码较小时，全部显示出来
    // [2,3,4]
    return totalPageArr.slice(2, totalPage)
  } else {
    // 总页码较大时，只显示部分页码
    const middle = Math.ceil(pagerCount / 2)
    // totalPageArr: [0,1,2,3,4,5,6,7,8]
    if (pageIndex <= middle) {
      // pageIndex=3
      // [2,3,4,5,6]
      // 左边全显示
      return totalPageArr.slice(2, pagerCount)
    } else if (pageIndex >= totalPage - middle + 1) {
      // pageIndex=6
      // [4,5,6,7,8]
      // 右边全显示
      return totalPageArr.slice(totalPage - pagerCount + 2, totalPage)
    } else {
      // pageIndex=4
      // [2,3,4,5,6]
      // 中间显示
      return totalPageArr.slice(pageIndex - middle + 2, pageIndex + middle - 1)
    }
  }
}

export default defineComponent({
  name: 'SPagination',
  props: paginationProps,
  setup(props: PaginationProps) {
    //1.首页和尾页是常驻的，如果只有1页，则不显示
    //2.页码按钮有一个最大数量pagerCount=7，最多只显示7个页码按钮
    //3.如果总页数totalPage大于pagerCount，则会出现显示不下的情况，这时显示不下的部分用...表示，并且点击...可以快速往前，往后跳转N页
    //4....中间显示的页码按钮数量在0~pagerCount-2之间
    // 5. 只有2页的情况下，中间页码按钮数量为0
    // 6. 大于等于pagerCount的情况下，中间按钮数量等于pagerCount-2
    // 7. 当中间页码左边的页数大于2时，应该出现左边的 ...
    // 8. 当中间页码右边的页数小于totalPage-3时，应该出现右边的 ...
    const {total, pageSize, pagerCount} = toRefs(props)
    const {pageIndex, setPageIndex, jumpPage, prevPage, nextPage} = usePage()
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const centerPages = computed(() => getCenterPage(totalPage.value, pageIndex.value, pagerCount.value))
    return () => {
      return (
        <div class="s-pagination">
          <button onClick={prevPage}>上一页</button>
          {/*Pager部分*/}
          <ul class="s-pager">
            <li class={{current: pageIndex.value === 1}} onClick={() => setPageIndex(1)}>1</li>
            {/*总页码totalPage大于按钮数量pagerCount且当前页码左边的页数大于Math.ceil(pagerCount.value / 2)才显示...*/}
            {
              totalPage.value > pagerCount.value &&
              pageIndex.value > Math.ceil(pagerCount.value / 2) &&
              (<li class="more left" onClick={() => jumpPage(-5)}>...</li>)
            }
            {
              centerPages.value.map(page => (
                <li  class={{current: pageIndex.value === page}} onClick={() => setPageIndex(page)}>{page}</li>
              ))
            }
            {
              totalPage.value > pagerCount.value &&
              pageIndex.value < totalPage.value - Math.floor(pagerCount.value / 2) &&
              (<li class="more right" onClick={() => jumpPage(5)}>...</li>)
            }
            {totalPage.value > 1 &&
              <li  class={{current: pageIndex.value === totalPage.value}} onClick={() => setPageIndex(totalPage.value)}>{totalPage.value}</li>}
          </ul>
          <button onClick={nextPage}>下一页</button>
        </div>
      )
    }
  }
})
