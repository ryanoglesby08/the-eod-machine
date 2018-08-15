import renderTextMessage from './renderTextMessage'

jest.mock('../apiClient', () => {
  return {
    query: () =>
      Promise.resolve({
        data: {
          eod: {
            entries: [
              { category: 'Category 1', content: 'some content' },
              { category: 'Category 1', content: 'more content' },
              { category: 'Category 2', content: 'even more content' },
            ],
          },
        },
      }),
  }
})

it('is an EOD message as plain text', async () => {
  const message = await renderTextMessage()

  expect(message).toMatchSnapshot()
})
