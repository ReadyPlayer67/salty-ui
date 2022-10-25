import {defineComponent, toRefs} from "vue";
import {ModalProps, modalProps} from "./modal-type";
import BaseModal from "./base-modal";

export default defineComponent({
  name: 'SModal',
  props: modalProps,
  emits: ['update:modelValue'],
  setup(props: ModalProps, {slots, emit}) {
    const {modelValue, title} = toRefs(props)
    return () => {
      return (
        <BaseModal class="s-modal" onUpdate:modelValue={() => emit('update:modelValue')} modelValue={modelValue.value}>
          <div class="s-modal__container">
            {/*标题区 title*/}
            {slots.header ? slots.header() : <div class="s-modal__header">{title.value}</div>}
            {/*内容区 default*/}
            <div class="s-modal__body">{slots.default?.()}</div>
            {/*操作区 footer*/}
            <div class="s-modal__footer">{slots.footer?.()}</div>
          </div>
        </BaseModal>
      )
    }
  }
})
