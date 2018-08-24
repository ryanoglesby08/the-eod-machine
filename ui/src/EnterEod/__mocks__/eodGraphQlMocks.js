import { ADD_TO_EOD, GET_EOD } from '../EnterEod'

export const buildMockGetEod = entries => ({
  request: {
    query: GET_EOD,
  },
  result: {
    data: {
      eod: {
        entries,
      },
    },
  },
})

export const buildMockGetEmptyEod = () => ({
  request: {
    query: GET_EOD,
  },
  result: {
    data: {
      eod: {
        entries: [],
      },
    },
  },
})

export const buildMockAddToEod = entries => ({
  request: {
    query: ADD_TO_EOD,
    variables: {
      entries,
    },
  },
  result: {
    data: {
      addToEod: entries,
    },
  },
})
