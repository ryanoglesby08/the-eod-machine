import { fireEvent } from 'react-testing-library'

export default (component, value) =>
  fireEvent.change(component, { target: { value } })
