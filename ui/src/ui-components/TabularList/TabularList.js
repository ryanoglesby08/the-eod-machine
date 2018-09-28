import React, { Children } from 'react'
import PropTypes from 'prop-types'

import styled from 'react-emotion'
import { Border } from 'rebass/emotion'

import ClickableRow from './ClickableRow'

const lastItemInList = (list, index) => list.length === index + 1

const BareList = styled('ul')({
  padding: 0,
  margin: 0,
  listStyleType: 'none',
})

const TabularList = ({ children }) => (
  <BareList>
    {Children.map(children, (row, index) => (
      <Border
        is="li"
        p={row.type.name === 'ClickableRow' ? 0 : 3}
        borderBottom={lastItemInList(children, index) ? undefined : 0}
        key={index}
      >
        {row}
      </Border>
    ))}
  </BareList>
)
TabularList.propTypes = {
  children: PropTypes.node.isRequired,
}

TabularList.ClickableRow = ClickableRow

export default TabularList
