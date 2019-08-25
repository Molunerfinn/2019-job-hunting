const flatten = require('../flatten')

test('flatten is OK', () => {
  expect(flatten([1, [1, [2, [3]]], 4], 2)).toEqual([1, 1, 2, [3], 4])
})
