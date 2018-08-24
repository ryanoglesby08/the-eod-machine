import React, { Component } from 'react'

import { Button, Input } from 'rebass/emotion'

import LabeledField from '../ui-components/LabeledField/LabeledField'

class TeamForm extends Component {
  state = {
    name: undefined,
    mailingList: undefined,
  }

  getStateOrPropFallback(value) {
    return this.state[value] === undefined
      ? this.props[value]
      : this.state[value]
  }

  render() {
    const { onSubmit } = this.props

    const name = this.getStateOrPropFallback('name')
    const mailingList = this.getStateOrPropFallback('mailingList')

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
              value={name || ''}
              onChange={e => this.setState({ name: e.target.value })}
            />
          )}
        </LabeledField>
        <LabeledField label="Mailing list">
          {id => (
            <Input
              id={id}
              value={mailingList || ''}
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
