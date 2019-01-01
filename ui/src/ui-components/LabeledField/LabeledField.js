import React from 'react'
import PropTypes from 'prop-types'

import { Label } from 'rebass/emotion'

import toHtmlId from './toHtmlId'

const LabeledField = ({ label, id, children, ...rest }) => {
  const fieldId = id || toHtmlId(label)

  return (
    <>
      <Label htmlFor={fieldId} {...rest}>
        {label}
      </Label>

      {children(fieldId)}
    </>
  )
}
LabeledField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  children: PropTypes.func.isRequired,
}

export default LabeledField
