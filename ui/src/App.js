import React, { Fragment } from 'react'

import styled from 'react-emotion'
import { Box, Text } from 'rebass/emotion'
import PropTypes from 'prop-types'

const PageCenter = ({ children }) => (
  <Box css={{ maxWidth: 992, margin: '0 auto' }}>{children}</Box>
)
PageCenter.propTypes = {
  children: PropTypes.node.isRequired,
}

const Wrapper = styled('header')({
  backgroundColor: '#000',
  padding: '20px 0',
})

const Header = () => (
  <Wrapper>
    <PageCenter>
      <Text color="white">✉️ 🌏 The Eod Machine</Text>
    </PageCenter>
  </Wrapper>
)

const Main = ({ children }) => (
  <main>
    <PageCenter>{children}</PageCenter>
  </main>
)
Main.propTypes = {
  children: PropTypes.node.isRequired,
}

const App = ({ children }) => (
  <Fragment>
    <Header />
    <Main>{children}</Main>
  </Fragment>
)
App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
