import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Input } from 'rebass/emotion'

import LabeledField from '../../ui-components/LabeledField/LabeledField'

class TeamForm extends Component {
  state = {
    name: this.props.name,
    mailingList: this.props.mailingList.join(', '),
  }

  render() {
    const { onSubmit, onCancel } = this.props
    const { name, mailingList } = this.state

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

        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    )
  }
}
TeamForm.propTypes = {
  name: PropTypes.string,
  mailingList: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
TeamForm.defaultProps = {
  name: '',
  mailingList: [],
}

export default TeamForm
