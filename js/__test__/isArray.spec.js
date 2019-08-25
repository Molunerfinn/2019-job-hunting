const {
  isArray1,
  isArray2,
  isArray3
} = require('../isArray.js')

test('isArray1 is OK', () => {
  expect(isArray1([])).toBe(true)
})

test('isArray2 is OK', () => {
  expect(isArray2([])).toBe(true)
})

test('isArray3 is OK', () => {
  expect(isArray3([])).toBe(true)
})
