import timeZonesData from 'timezones.json'

const timeZonesOptions = timeZonesData.map(({ text, value }) => ({
  value,
  label: text,
}))

export default timeZonesOptions
