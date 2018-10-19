import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import HtmlMessage from './HtmlMessage/HtmlMessage'

const renderHtmlMessage = ({ currentEod }) =>
  renderToStaticMarkup(<HtmlMessage entries={currentEod} />)

export default renderHtmlMessage
