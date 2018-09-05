import React from 'react'

import { render, fireEvent } from 'react-testing-library'

import enterText from '../../__test-utils__/enterText'

import TeamForm from './TeamForm'

const defaultProps = {
  onCancel: jest.fn(),
}
const doRender = (props = {}) =>
  render(<TeamForm {...defaultProps} {...props} />)

it('gives changes back on submit', () => {
  const onSubmit = jest.fn()
  const { getByLabelText, getByText } = doRender({ onSubmit })

  enterText(getByLabelText('Name'), 'A team')
  enterText(
    getByLabelText('Mailing list'),
    'team@example.com, another@example.com'
  )

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'A team',
    mailingList: 'team@example.com, another@example.com',
  })
})

it('uses supplied team values to start', () => {
  const onSubmit = jest.fn()
  const { getByText } = doRender({
    name: 'Starting name',
    mailingList: ['email1@example.com', 'email2@example.com'],
    onSubmit,
  })

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Starting name',
    mailingList: 'email1@example.com, email2@example.com',
  })
})
