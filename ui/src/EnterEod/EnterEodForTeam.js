import React from 'react'

import WithTeam from './WithTeam'
import EnterEod from './EnterEod'

const EnterEodForTeam = () => <WithTeam>{team => <EnterEod />}</WithTeam>

export default EnterEodForTeam
