/**
 * a3[ab] -> aababab
 * @param {string} str
 * @return {string}
 */
function multiple (str) {
  if (str.length <= 1) {
    return str
  }
  const stack = []
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i])
    if (str[i] === ']') {
      let current = stack.pop()
      let string = ''
      while (true) {
        current = stack.pop()
        if (current === '[') {
          break
        } else {
          string = current + string
        }
      }
      const times = parseInt(stack.pop())
      const result = copyStr(times, string)
      stack.push(result)
    }
  }
  return stack.join('')
}

/**
 *
 * @param {number} times
 * @param {string} str
 * @return {string}
 */
function copyStr (times, str) {
  let result = ''
  while (times) {
    result += str
    times--
  }
  return result
}

module.export = multiple
