import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { PaginationProps, paginationProps } from './pagination-type'
import SPager from './components/pager'

export default defineComponent({
  name: 'SPagination',
  props: paginationProps,
  emits: ['update:modelValue'],
  setup(props: PaginationProps, { emit }) {
    //1.首页和尾页是常驻的，如果只有1页，则不显示
    //2.页码按钮有一个最大数量pagerCount=7，最多只显示7个页码按钮
    //3.如果总页数totalPage大于pagerCount，则会出现显示不下的情况，这时显示不下的部分用...表示，并且点击...可以快速往前，往后跳转N页
    //4....中间显示的页码按钮数量在0~pagerCount-2之间
    // 5. 只有2页的情况下，中间页码按钮数量为0
    // 6. 大于等于pagerCount的情况下，中间按钮数量等于pagerCount-2
    // 7. 当中间页码左边的页数大于2时，应该出现左边的 ...
    // 8. 当中间页码右边的页数小于totalPage-3时，应该出现右边的 ...
    const pager = ref()
    const disablePrev = computed(() =>
      pager.value ? pager.value.pageIndex < 2 : true
    )
    const disableNext = computed(() =>
      pager.value ? pager.value.pageIndex > pager.value.totalPage - 1 : true
    )
    onMounted(() => {
      watch(
        () => props.modelValue,
        newVal => {
          pager.value.pageIndex = newVal
        }
      )
      watch(
        () => pager.value.pageIndex,
        newVal => {
          emit('update:modelValue', newVal)
        }
      )
    })
    return () => {
      return (
        <div class="s-pagination">
          <button
            class="pr-1"
            disabled={disablePrev.value}
            onClick={() => pager.value.prevPage()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </button>
          {/*Pager部分*/}
          <SPager ref={pager} {...props} />
          <button
            class="pl-1"
            disabled={disableNext.value}
            onClick={() => pager.value.nextPage()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </button>
        </div>
      )
    }
  }
})
