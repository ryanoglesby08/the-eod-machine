import React from 'react'

import { render } from 'react-testing-library'

import LabeledField from './LabeledField'

it('connects a label to a form field', () => {
  const { getByLabelText } = render(
    <LabeledField label="Some label">{id => <input id={id} />}</LabeledField>
  )

  expect(getByLabelText('Some label')).toBeInTheDocument()
})

it('allows an id to override the default to prevent conflicts of fields with the same label', () => {
  const { getByLabelText } = render(
    <>
      <LabeledField label="Some label" id="different-id">
        {id => <input id={id} />}
      </LabeledField>
    </>
  )

  expect(getByLabelText('Some label')).toHaveAttribute('id', 'different-id')
})
