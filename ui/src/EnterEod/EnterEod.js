import React from 'react'

import { Button, Label, Textarea } from 'rebass/emotion'

const categories = [
  'Business as Usual',
  'Story Movements',
  'Open Questions',
  'Blockers',
  'Action Items',
  'Other',
]

const toHtmlId = text => text.toLowerCase().replace(/ /g, '-')

const EnterEod = () => (
  <form>
    {categories.map(category => (
      <div key={category}>
        <Label htmlFor={toHtmlId(category)}>{category}</Label>
        <Textarea id={toHtmlId(category)} />
      </div>
    ))}

    <div>
      <Button type="submit">Submit</Button>
    </div>
  </form>
)

export default EnterEod
