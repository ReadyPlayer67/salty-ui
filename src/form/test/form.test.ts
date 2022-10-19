import { render } from '@testing-library/vue'
import Form from '../src/form'

describe('form test', () => {
  test('form init render', async () => {
    const { getByRole } = render(Form)
    getByRole('form')
  })
})
