import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, ButtonOutline, Box, Flex, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'

const EMPTY_LOCATION = { name: '' }

class TeamForm extends Component {
  state = {
    name: this.props.name,
    mailingList: this.props.mailingList.join(', '),
    locations: this.props.locations,
  }

  changeLocationName = (name, index) => {
    this.setState(prevState => {
      return {
        ...prevState,
        locations: [
          ...prevState.locations.slice(0, index),
          { name },
          ...prevState.locations.slice(index + 1),
        ],
      }
    })
  }

  addLocation = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        locations: prevState.locations.concat(EMPTY_LOCATION),
      }
    })
  }

  removeLocation = index => {
    this.setState(prevState => {
      return {
        ...prevState,
        locations: [
          ...prevState.locations.slice(0, index),
          ...prevState.locations.slice(index + 1),
        ],
      }
    })
  }

  render() {
    const { onSubmit, onCancel } = this.props
    const { name, mailingList, locations } = this.state

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(this.state)
        }}
      >
        <LabeledField label="Name">
          {id => (
            <Input
              id={id}
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          )}
        </LabeledField>
        <LabeledField label="Mailing list">
          {id => (
            <Input
              id={id}
              value={mailingList}
              onChange={e => this.setState({ mailingList: e.target.value })}
            />
          )}
        </LabeledField>

        {locations.map(({ name }, index) => (
          <LocationForm
            key={name + index}
            name={name}
            index={index}
            onNameChange={this.changeLocationName}
            onRemove={this.removeLocation}
          />
        ))}

        <Flex flexDirection="column" mb={2}>
          <Button
            border={'1px dashed'}
            bg="white"
            color="black"
            type="button"
            onClick={this.addLocation}
          >
            + Add a location
          </Button>
        </Flex>

        <Flex>
          <Box mr={1}>
            <Button type="submit">Save</Button>
          </Box>

          <ButtonOutline type="button" onClick={onCancel}>
            Cancel
          </ButtonOutline>
        </Flex>
      </form>
    )
  }
}
TeamForm.propTypes = {
  name: PropTypes.string.isRequired,
  mailingList: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
TeamForm.defaultProps = {
  name: '',
  mailingList: [],
  locations: [EMPTY_LOCATION, EMPTY_LOCATION],
}

const LocationForm = ({ name, index, onNameChange, onRemove }) => (
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

    <Flex flexDirection="column" alignItems="flex-end">
      <ButtonOutline type="button" onClick={() => onRemove(index)}>
        Remove
      </ButtonOutline>
    </Flex>
  </fieldset>
)
LocationForm.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default TeamForm
