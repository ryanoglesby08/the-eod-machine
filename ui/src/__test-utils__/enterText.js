import { fireEvent } from 'react-testing-library'

const enterText = (component, value) =>
  fireEvent.change(component, { target: { value } })

export default enterText
