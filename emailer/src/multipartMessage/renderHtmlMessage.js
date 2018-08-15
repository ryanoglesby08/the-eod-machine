import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { ApolloProvider, getDataFromTree } from 'react-apollo'

import apiClient from '../apiClient'
import HtmlMessage from './HtmlMessage/HtmlMessage'

const message = (
  <ApolloProvider client={apiClient}>
    <HtmlMessage />
  </ApolloProvider>
)

const renderHtmlMessage = async () => {
  await getDataFromTree(message)

  return renderToStaticMarkup(message)
}

export default renderHtmlMessage
