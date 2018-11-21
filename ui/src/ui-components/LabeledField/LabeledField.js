import React from 'react'

import { Label } from 'rebass/emotion'

import toHtmlId from './toHtmlId'

const LabeledField = ({ label, children, ...rest }) => {
  const fieldId = toHtmlId(label)

  return (
    <>
      <Label htmlFor={fieldId} {...rest}>
        {label}
      </Label>

      {children(fieldId)}
    </>
  )
}

export default LabeledField
