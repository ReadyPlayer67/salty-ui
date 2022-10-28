//获取中间部分应当显示的页码数组的工具方法
export function getCenterPage(
  totalPage: number,
  pageIndex: number,
  pagerCount: number
) {
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
