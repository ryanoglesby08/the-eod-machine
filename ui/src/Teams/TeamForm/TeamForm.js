import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, ButtonOutline, Box, Flex, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'
import LocationForm from './LocationForm'

const EMPTY_LOCATION = { name: '', timeZone: '', eodTime: '' }

const locationsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'ADD_LOCATION': {
      return [...state, EMPTY_LOCATION]
    }
    case 'CHANGE_LOCATION_NAME': {
      const { index, name } = action.payload
      return [
        ...state.slice(0, index),
        { ...state[index], name },
        ...state.slice(index + 1),
      ]
    }
    case 'CHANGE_LOCATION_TIME_ZONE': {
      const { index, timeZone } = action.payload
      return [
        ...state.slice(0, index),
        { ...state[index], timeZone },
        ...state.slice(index + 1),
      ]
    }
    case 'CHANGE_LOCATION_EOD_TIME': {
      const { index, eodTime } = action.payload
      return [
        ...state.slice(0, index),
        { ...state[index], eodTime },
        ...state.slice(index + 1),
      ]
    }
    case 'REMOVE_LOCATION': {
      const { index } = action.payload
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
    default:
      return state
  }
}

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.payload }
    case 'CHANGE_MAILING_LIST':
      return { ...state, mailingList: action.payload }
    case 'ADD_LOCATION':
    case 'CHANGE_LOCATION_NAME':
    case 'CHANGE_LOCATION_TIME_ZONE':
    case 'CHANGE_LOCATION_EOD_TIME':
    case 'REMOVE_LOCATION':
      return { ...state, locations: locationsReducer(state.locations, action) }
    default:
      return state
  }
}

class TeamForm extends Component {
  state = reducer({
    name: this.props.name,
    mailingList: this.props.mailingList.join(', '),
    locations: this.props.locations,
  })

  dispatch = action => {
    this.setState(prevState => reducer(prevState, action))
  }

  changeLocationName = (name, index) => {
    this.dispatch({ type: 'CHANGE_LOCATION_NAME', payload: { index, name } })
  }

  changeLocationTimeZone = (timeZone, index) => {
    this.dispatch({
      type: 'CHANGE_LOCATION_TIME_ZONE',
      payload: { index, timeZone },
    })
  }

  changeLocationEodTime = (eodTime, index) => {
    this.dispatch({
      type: 'CHANGE_LOCATION_EOD_TIME',
      payload: { index, eodTime },
    })
  }

  addLocation = () => {
    this.dispatch({ type: 'ADD_LOCATION' })
  }

  removeLocation = index => {
    this.dispatch({ type: 'REMOVE_LOCATION', payload: { index } })
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
              onChange={e =>
                this.dispatch({
                  type: 'CHANGE_NAME',
                  payload: e.target.value,
                })
              }
            />
          )}
        </LabeledField>
        <LabeledField label="Mailing list">
          {id => (
            <Input
              id={id}
              value={mailingList}
              onChange={e =>
                this.dispatch({
                  type: 'CHANGE_MAILING_LIST',
                  payload: e.target.value,
                })
              }
            />
          )}
        </LabeledField>

        {locations.map(({ name, timeZone, eodTime }, index) => (
          <LocationForm
            key={index}
            index={index}
            name={name}
            onNameChange={this.changeLocationName}
            timeZone={timeZone}
            onTimeZoneChange={this.changeLocationTimeZone}
            eodTime={eodTime}
            onEodTimeChange={this.changeLocationEodTime}
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
      timeZone: PropTypes.string,
      eodTime: PropTypes.string,
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

export default TeamForm
