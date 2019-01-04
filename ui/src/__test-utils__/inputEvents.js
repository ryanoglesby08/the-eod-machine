import { fireEvent } from 'react-testing-library'

export const enterText = (domNode, value) => {
  fireEvent.change(domNode, { target: { value } })
}

const keys = {
  Enter: {
    key: 'Enter',
    code: 13,
  },
}
export const keyDown = (domNode, key) => {
  if (!keys.hasOwnProperty(key)) {
    throw new Error(
      "I don't have a mapping for that key yet. Look it up here first. https://keycode.info/"
    )
  }

  fireEvent.keyDown(domNode, keys[key])
}
