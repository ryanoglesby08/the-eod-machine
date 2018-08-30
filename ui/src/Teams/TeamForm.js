import React, { Component } from 'react'

import { Button, Input } from 'rebass/emotion'

import LabeledField from '../ui-components/LabeledField/LabeledField'

// TODO need better tests for the mailing list logic

class TeamForm extends Component {
  state = {
    name: this.props.name || '',
    mailingList: this.props.mailingList ? this.props.mailingList.join(',') : '',
  }

  render() {
    const { onSubmit } = this.props
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
      </form>
    )
  }
}

export default TeamForm
