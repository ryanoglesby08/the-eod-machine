import React from 'react'

import { render, fireEvent, within } from 'react-testing-library'

import { enterText, keyDown } from '../../__test-utils__/inputEvents'
import fillInTeamForm from '../__test-utils__/fillInTeamForm'

import TeamForm from './TeamForm'

const defaultProps = {
  onCancel: jest.fn(),
}
const doRender = (props = {}) => {
  const renderQueries = render(<TeamForm {...defaultProps} {...props} />)

  return { ...renderQueries, fillInTeamForm: fillInTeamForm(renderQueries) }
}

it('gives changes back on submit', () => {
  const onSubmit = jest.fn()
  const { fillInTeamForm } = doRender({ onSubmit })

  fillInTeamForm({
    Name: 'A team',
    'Mailing list': 'team@example.com, another@example.com',
    locations: [
      {
        Name: 'Maui',
        'Time zone': 'hawaii',
      },
      {
        Name: 'Cairo',
        'Time zone': 'egypt',
      },
    ],
  })

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'A team',
    mailingList: 'team@example.com, another@example.com',
    locations: [
      { name: 'Maui', timeZone: 'Hawaiian Standard Time' },
      { name: 'Cairo', timeZone: 'Egypt Standard Time' },
    ],
  })
})

it('uses supplied team values to start', () => {
  const onSubmit = jest.fn()
  const { getByText } = doRender({
    name: 'Starting name',
    mailingList: ['email1@example.com', 'email2@example.com'],
    locations: [
      { name: 'Starting city 1', timeZone: 'Hawaiian Standard Time' },
      { name: 'Starting city 2', timeZone: 'Egypt Standard Time' },
    ],
    onSubmit,
  })

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Starting name',
    mailingList: 'email1@example.com, email2@example.com',
    locations: [
      { name: 'Starting city 1', timeZone: 'Hawaiian Standard Time' },
      { name: 'Starting city 2', timeZone: 'Egypt Standard Time' },
    ],
  })
})

it('can have more than 2 locations', () => {
  const onSubmit = jest.fn()
  const { getByText, getByTestId } = doRender({
    locations: [
      { name: 'Starting city 1', timeZone: 'Hawaiian Standard Time' },
      { name: 'Starting city 2', timeZone: 'Egypt Standard Time' },
    ],
    onSubmit,
  })

  fireEvent.click(getByText('+ Add a location'))

  const location3 = within(getByTestId('location-2'))
  enterText(location3.getByLabelText('Name'), 'The added city')
  enterText(location3.getByLabelText('Time zone'), 'korea')
  keyDown(location3.getByLabelText('Time zone'), 'Enter')

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      locations: [
        { name: 'Starting city 1', timeZone: 'Hawaiian Standard Time' },
        { name: 'Starting city 2', timeZone: 'Egypt Standard Time' },
        { name: 'The added city', timeZone: 'Korea Standard Time' },
      ],
    })
  )

  const location1 = within(getByTestId('location-1'))
  fireEvent.click(location1.getByText('Remove'))

  fireEvent.click(getByText('Save'))

  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      locations: [
        { name: 'Starting city 1', timeZone: 'Hawaiian Standard Time' },
        { name: 'The added city', timeZone: 'Korea Standard Time' },
      ],
    })
  )
})
