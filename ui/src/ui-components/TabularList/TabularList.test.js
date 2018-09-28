import React from 'react'

import { render, fireEvent } from 'react-testing-library'

import TabularList from './TabularList'

it('is a bordered, unordered list that resembles a table', () => {
  const { container } = render(
    <TabularList>
      <div>first row</div>
      <div>second row</div>
    </TabularList>
  )

  expect(container).toMatchSnapshot()
})

it('can have rows that are clickable', () => {
  const onClickMock = jest.fn()

  const { getByText } = render(
    <TabularList clickableRows>
      <TabularList.ClickableRow onClick={onClickMock}>
        hello
      </TabularList.ClickableRow>
    </TabularList>
  )

  const button = getByText('hello')
  fireEvent.click(button)

  expect(onClickMock).toHaveBeenCalled()
  expect(button).toMatchSnapshot()
})
