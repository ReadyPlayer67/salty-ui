import { render } from '@testing-library/vue'
import Tab from '../src/tabs'

describe('tab test', () => {
  test('tab init render', async () => {
    const { getByRole } = render(Tab)
    getByRole('tab')
  })
})
