import React from 'react'
import PropTypes from 'prop-types'

import Select from 'react-select'

import { Box, ButtonOutline, Flex, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'

import timeZonesOptions from './timezoneOptions'
import eodTimesOptions from './eodTimesOptions'

const LocationForm = ({
  index,
  name,
  onNameChange,
  timeZone,
  onTimeZoneChange,
  eodTime,
  onEodTimeChange,
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

    <Box mt={2}>
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
    </Box>

    <Box mt={2}>
      <LabeledField label="EOD time" id={`location-${index}-eodtime`}>
        {id => (
          <Select
            inputId={id}
            options={eodTimesOptions}
            value={eodTimesOptions.find(option => option.value === eodTime)}
            onChange={option => onEodTimeChange(option.value, index)}
          />
        )}
      </LabeledField>
    </Box>

    <Flex flexDirection="column" alignItems="flex-end" mt={2}>
      <ButtonOutline type="button" onClick={() => onRemove(index)}>
        🗑Remove
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
  eodTime: PropTypes.string.isRequired,
  onEodTimeChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default LocationForm
