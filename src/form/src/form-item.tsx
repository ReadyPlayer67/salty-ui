import {computed, ComputedRef, defineComponent, inject} from "vue";
import {FormItemProps, formItemProps, LabelData} from "./form-item-type";

export default defineComponent({
  name: 'SFormItem',
  props: formItemProps,
  setup(props: FormItemProps, {slots}) {
    const labelData = inject('LABEL_DATA') as ComputedRef<LabelData>
    const itemClasses = computed(() => ({
      's-form__item': true,
      's-form__item--horizontal': labelData.value.layout === 'horizontal',
      's-form__item--vertical': labelData.value.layout === 'vertical'
    }))
    return () => {
      return (
        <div class={itemClasses.value}>
          {/*label*/}
          <span class="s-form__label">{props.label}</span>
          {/*control*/}
          <div>
            {slots.default?.()}
          </div>
        </div>
      )
    }
  }
})
