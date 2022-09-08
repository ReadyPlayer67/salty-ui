import {defineComponent} from "vue";

// export default (props: { expanded: boolean }, {emit}: SetupContext) => (
//   <svg onClick={() => emit('onClick')} style={{
//     width: '25px',
//     height: '15px',
//     display: 'inline-block',
//     cursor: 'pointer',
//     transform: props.expanded ? 'rotate(90deg)' : ''
//   }} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
//   >
//     <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
//   </svg>
// )

export default defineComponent({
  props: {
    expanded: {
      type: Boolean,
      required: true
    },
  },
  emits:['click'],
  setup(props,{emit}) {
    return () => {
      return (
        <svg onClick={() => emit('click')} style={{
          width: '25px',
          height: '15px',
          display: 'inline-block',
          cursor: 'pointer',
          transform: props.expanded ? 'rotate(90deg)' : ''
        }} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
        </svg>
      )
    }
  }
})
