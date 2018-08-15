import apiClient from '../apiClient'
import GET_EOD from './getEodQuery'
import textMessage from './textMessage/textMessage'

const renderTextMessage = async () => {
  const {
    data: { eod },
  } = await apiClient.query({ query: GET_EOD })

  return textMessage(eod)
}

export default renderTextMessage
