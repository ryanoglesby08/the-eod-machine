export const toShortDate = date =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
  })

export const toLongDate = date =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
