import {defineComponent, ref, withModifiers} from 'vue'

// export default () => <div>test</div>

// export default defineComponent({
//     render(){
//         return <div>test1</div>
//     }
// })

export default defineComponent({
  directives: {
    focus:{
      mounted(el){
        el.focus()
      }
    }
  },
  emits:['click'],
  setup(props, {slots,emit}) {
    const count = ref(0)
    const inc = () => {
      count.value++
      emit('click')
    }
    return () => {
      //v-if
      const span = true ? <span>A</span> : <span>B</span>
      return (
        //事件修饰符
        <div onClick={withModifiers(inc, ['self'])}>
          test: {count.value}
          <br/>
          <input v-show={false}/>
          {/*<input v-focus v-model={count.value}/>*/}
          <div>{span}</div>
          <ul>
            {[1, 2, 3].map(item => <li>{item}</li>)}
          </ul>
          {/*显示插槽内容*/}
          <div>{slots.default ? slots.default() : 'default content'}</div>
          {/*使用插槽*/}
          {/*<Test v-slot={{*/}
          {/*  title:() => <h3>title</h3>*/}
          {/*}}></Test>*/}
        </div>
      )
    }
  }
})
