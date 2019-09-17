require('../newApply')

test('newApply is OK', () => {
  const result1 = Math.max.newApply(null, [1, 2, 3])
  const result2 = Math.min.newApply(Math.min, [1, 2, 3])
  expect(result1).toBe(3)
  expect(result2).toBe(1)
})

test('args is not an array will throw error', () => {
  try {
    Math.max.newApply(null, 1, 2, 3)
  } catch (e) {
    expect(e).toEqual(new Error('CreateListFromArrayLike called on non-object'))
  }
})

test('empty args is OK', () => {
  const result1 = Math.floor.newApply(null)
  expect(result1).toEqual(NaN)
})
