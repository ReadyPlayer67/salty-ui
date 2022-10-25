import { render } from '@testing-library/vue'
import Modal from '../src/modal'

describe('modal test', () => {
  test('modal init render', async () => {
    const { getByRole } = render(Modal)
    getByRole('modal')
  })
})
