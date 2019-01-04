import React from 'react'
import PropTypes from 'prop-types'

import Select from 'react-select'
import timeZonesData from 'timezones.json'

import { ButtonOutline, Flex, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'

const LocationForm = ({
  index,
  name,
  onNameChange,
  timeZone,
  onTimeZoneChange,
  onRemove,
}) => (
  <fieldset data-testid={`location-${index}`}>
    <legend>Location {index + 1}</legend>

    <LabeledField label="Name" id={`location-${index}-name`}>
      {id => (
        <Input
          id={id}
          value={name}
          onChange={e => onNameChange(e.target.value, index)}
        />
      )}
    </LabeledField>

    <LabeledField label="Time zone" id={`location-${index}-timezone`}>
      {id => (
        <Select
          inputId={id}
          options={timeZonesOptions}
          value={timeZonesOptions.find(option => option.value === timeZone)}
          onChange={option => onTimeZoneChange(option.value, index)}
        />
      )}
    </LabeledField>

    <Flex flexDirection="column" alignItems="flex-end">
      <ButtonOutline type="button" onClick={() => onRemove(index)}>
        Remove
      </ButtonOutline>
    </Flex>
  </fieldset>
)
LocationForm.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  timeZone: PropTypes.string.isRequired,
  onTimeZoneChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

const timeZonesOptions = timeZonesData.map(({ text, value }) => ({
  value,
  label: text,
}))

export default LocationForm
