//*from https://medium.com/@stheodorejohn/mastering-deep-cloning-in-javascript-handling-nested-objects-and-arrays-4de203463244#:~:text=You%20can%20now%20use%20the%20deepClone%20function%20to,%27John%27%2C%20age%3A%2030%20%7D%3Bconst%20clone%20%3D%20deepClone%20%28obj%29%3B
// โคลน opject มาเป็นอีกก้อนนึง
export function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  } else if (typeof obj === 'object' && obj !== null) {
    const clone = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key])
      }
    }
    return clone
  } else {
    return obj
  }
}
