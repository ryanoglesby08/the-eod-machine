const pick = (object, wantedProperties) => {
  return Object.keys(object)
    .filter(property => wantedProperties.includes(property))
    .reduce((newObject, property) => {
      return Object.assign({}, newObject, { [property]: object[property] })
    }, {})
}

module.exports = pick
