import React, { Fragment } from 'react'

import { Label } from 'rebass/emotion'

import toHtmlId from './toHtmlId'

const LabeledField = ({ label, children, ...rest }) => {
  const fieldId = toHtmlId(label)

  return (
    <Fragment>
      <Label htmlFor={fieldId} {...rest}>
        {label}
      </Label>

      {children(fieldId)}
    </Fragment>
  )
}

export default LabeledField
