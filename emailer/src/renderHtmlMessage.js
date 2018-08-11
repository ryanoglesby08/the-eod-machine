import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { ApolloProvider, getDataFromTree } from 'react-apollo'

import apiClient from './apiClient'
import EodMessage from './EodMessage/EodMessage'

const message = (
  <ApolloProvider client={apiClient}>
    <EodMessage />
  </ApolloProvider>
)

const renderHtmlMessage = async () => {
  await getDataFromTree(message)

  return renderToStaticMarkup(message)
}

export default renderHtmlMessage
