import { render } from '@testing-library/vue'
import Icon from '../src/icon'

describe('icon test', () => {
  test('icon init render', async () => {
    const { getByRole } = render(Icon)
    getByRole('icon')
  })
})
