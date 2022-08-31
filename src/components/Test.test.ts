import {test,expect} from "vitest";
import {render} from "@testing-library/vue";
import Test from "./Test";

test('should ',() => {
  // expect(true).toBe(false)
  //渲染组件
  const {getByText} = render(Test)
  //断言输出结果，根据一段文本获取HTMLElement，并断言他是否存在
  getByText('test: 0')
})
