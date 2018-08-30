import React from 'react'

import { render } from 'react-testing-library'

import TabularList from './TabularList'

it('is a bordered, unordered list that resembles a table', () => {
  const { container } = render(<TabularList rows={['a', 'b', 'c']} />)

  expect(container).toMatchSnapshot()
})
