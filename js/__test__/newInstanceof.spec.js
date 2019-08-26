const newInstanceof = require('../newInstanceof')

const a = () => {}
const b = {}
const c = 1
const d = []

test('newInstanceof is OK', () => {
  expect(newInstanceof(a, Function)).toBe(true)
  expect(newInstanceof(b, Object)).toBe(true)
  expect(newInstanceof(c, Number)).toBe(false)
  expect(newInstanceof(d, Function)).toBe(false)
})
