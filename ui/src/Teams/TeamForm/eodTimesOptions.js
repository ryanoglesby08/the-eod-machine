const minutes = ['00', '15', '30', '45']

let times = []
for (let hour = 0; hour < 24; hour++) {
  const ampm = hour >= 12 ? 'PM' : 'AM'

  let ampmHour = hour
  if (hour === 0) {
    ampmHour = 12
  } else if (hour > 12) {
    ampmHour = hour - 12
  }

  times = times.concat(minutes.map(minute => `${ampmHour}:${minute} ${ampm}`))
}

const eodTimesOptions = times.map(time => ({ value: time, label: time }))

export default eodTimesOptions
