import { render } from '@testing-library/vue'
import Popover from '../src/popover'

describe('popover test', () => {
  test('popover init render', async () => {
    const { getByRole } = render(Popover)
    getByRole('popover')
  })
})
