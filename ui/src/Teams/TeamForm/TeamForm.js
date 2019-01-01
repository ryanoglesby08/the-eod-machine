import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'

class TeamForm extends Component {
  state = {
    name: this.props.name,
    mailingList: this.props.mailingList.join(', '),
    locations: this.props.locations,
  }

  changeLocationName(name, index) {
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

        <fieldset data-testid="location-1">
          <legend>Location 1</legend>

          <LabeledField label="Name" id="location-1-name">
            {id => (
              <Input
                id={id}
                value={locations[0].name}
                onChange={e => this.changeLocationName(e.target.value, 0)}
              />
            )}
          </LabeledField>
        </fieldset>

        <fieldset data-testid="location-2">
          <legend>Location 2</legend>

          <LabeledField label="Name" id="location-2-name">
            {id => (
              <Input
                id={id}
                value={locations[1].name}
                onChange={e => this.changeLocationName(e.target.value, 1)}
              />
            )}
          </LabeledField>
        </fieldset>

        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
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
  locations: [{ name: '' }, { name: '' }],
}

export default TeamForm
