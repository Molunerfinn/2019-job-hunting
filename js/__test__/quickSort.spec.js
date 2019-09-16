const quickSort = require('../quickSort')

test('quickSort is OK', () => {
  const arr = [5, 7, 4, 3, 6, 2, 1]
  quickSort(arr)
  expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7])
})
