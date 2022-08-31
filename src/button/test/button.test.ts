import {render} from "@testing-library/vue";
import Button from "../src/button";
import {expect, test} from "vitest";

test('default slot should be 按钮', () => {
  const {getByText} = render(Button)
  getByText('按钮')
})

//测试插槽
test('slot should work', () => {
  const {getByText} = render(Button, {
    slots: {
      default() {
        return 'confirm'
      }
    }
  })
  getByText('confirm')
})

//测试props
test('prop type should wor', () => {
  const {getByRole} = render(Button,)
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--secondary')).toBe(true)
})

test('default type should work', () => {
  const {getByRole} = render(Button,{
    props:{
      type:'primary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary')).toBe(true)
})
