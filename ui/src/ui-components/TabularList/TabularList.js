import React from 'react'

import styled from 'react-emotion'
import { Border } from 'rebass/emotion'

const lastItemInList = (list, index) => list.length === index + 1

const BareList = styled('ul')({
  padding: 0,
  margin: 0,
  listStyleType: 'none',
})

const TabularList = ({ rows }) => (
  <BareList>
    {rows.map((row, index) => (
      <Border
        is="li"
        py={3}
        px={2}
        borderBottom={lastItemInList(rows, index) ? undefined : 0}
        key={index}
      >
        {row}
      </Border>
    ))}
  </BareList>
)

export default TabularList
