function parseValue(value) {
  return isNaN(value) ? decodeURIComponent(value) : Number(value)
}

function parseUrl(format = '', instance = '') {
  const [path, query] = instance.split('?')

  const formatSegments = format.split('/')
  const pathSegments = path.split('/')

  const pathParams = formatSegments.reduce((accum, segment, index) => {
    if (segment.startsWith(':')) {
      accum[segment.slice(1)] = parseValue(pathSegments[index])
    }
    return accum
  }, {})

  // I felt like it was not the point of this exercise
  // but in a real implementation I would use URLSearchParams
  // instead to handle all the edge cases I probably missed
  const queryParams = query
    .split('&')
    .map(pair => pair.split('='))
    .reduce((accum, [key, value]) => {
      if (!accum[key]) {
        accum[key] = parseValue(value)
      } else {
        const prevValue = Array.isArray(accum[key]) ? accum[key] : [accum[key]]
        accum[key] = [...prevValue, parseValue(value)]
      }
      return accum
    }, {})

  return {
    ...pathParams,
    ...queryParams,
  }
}

console.log(parseUrl('/:version/api/:collection/:id', '/6/api/listings/3?sort=desc&limit=10'))
console.log(parseUrl('/:collection/page/:page', '/job%20hunt/page/3?team=engineering&team=r%26d'))