import { render } from '@testing-library/vue'
import Input from '../src/input'

describe('input test', () => {
  test('input init render', async () => {
    const { getByRole } = render(Input)
    getByRole('input')
  })
})
