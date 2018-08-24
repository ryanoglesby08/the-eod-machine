import React from 'react'

import { Link } from 'react-router-dom'

const Teams = ({ match }) => (
  <div>
    Teams page <Link to={`${match.url}/new`}>Create a team</Link>
  </div>
)

export default Teams
