require('../newCall')

test('newCall is OK', () => {
  const result1 = Math.max.newCall(null, 1, 2, 3)
  const result2 = Math.min.newCall(Math.min, 1, 2, 3)
  expect(result1).toBe(3)
  expect(result2).toBe(1)
})
