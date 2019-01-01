import React from 'react'

import { render, fireEvent, within } from 'react-testing-library'

import enterText from '../../__test-utils__/enterText'

import TeamForm from './TeamForm'

const defaultProps = {
  onCancel: jest.fn(),
}
const doRender = (props = {}) =>
  render(<TeamForm {...defaultProps} {...props} />)

it('gives changes back on submit', () => {
  const onSubmit = jest.fn()
  const { getByLabelText, getByText, debug } = doRender({ onSubmit })

  enterText(getByLabelText('Name'), 'A team')
  enterText(
    getByLabelText('Mailing list'),
    'team@example.com, another@example.com'
  )
  const location1 = within(getByText('Location 1'))
  enterText(location1.getByLabelText('Name'), 'The first city')
  const location2 = within(getByText('Location 2'))
  enterText(location2.getByLabelText('Name'), 'The second city')

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'A team',
    mailingList: 'team@example.com, another@example.com',
    locations: [{ name: 'The first city' }, { name: 'The second city' }],
  })
})

it('uses supplied team values to start', () => {
  const onSubmit = jest.fn()
  const { getByText } = doRender({
    name: 'Starting name',
    mailingList: ['email1@example.com', 'email2@example.com'],
    locations: [{ name: 'Starting city 1' }, { name: 'Starting city 2' }],
    onSubmit,
  })

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Starting name',
    mailingList: 'email1@example.com, email2@example.com',
    locations: [{ name: 'Starting city 1' }, { name: 'Starting city 2' }],
  })
})
