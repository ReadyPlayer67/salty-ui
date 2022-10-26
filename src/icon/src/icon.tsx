import {computed, defineComponent} from "vue";
import {IconProps, iconProps} from "./icon-type";

export default defineComponent({
  name: 'SIcon',
  props: iconProps,
  setup(props: IconProps, {attrs}) {
    const iconSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
    const imgIcon = <img src={props.name} style={{width: iconSize.value, verticalAlign: 'middle'}} {...attrs}/>
    const fontIcon = <span style={{fontSize: iconSize.value,color: props.color}} class={[props.prefix, `${props.prefix}-${props.name}`]}></span>
    const icon = /http|https/.test(props.name) ? imgIcon : fontIcon
    return () => icon
  }
})

