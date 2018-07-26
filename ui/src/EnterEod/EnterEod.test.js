import React from 'react'

import { mount } from 'enzyme'

import EnterEod from './EnterEod'

it('shows the default categories', () => {
  const enterEod = mount(<EnterEod />)

  expect(enterEod).toIncludeText('Business as Usual')
  expect(enterEod).toIncludeText('Story Movements')
  expect(enterEod).toIncludeText('Open Questions')
  expect(enterEod).toIncludeText('Blockers')
  expect(enterEod).toIncludeText('Action Items')
  expect(enterEod).toIncludeText('Other')
})
