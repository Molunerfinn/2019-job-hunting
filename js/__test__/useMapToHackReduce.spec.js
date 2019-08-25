const useMapToHackReduce = require('../useMapToHackReduce')

test('useMapToHackReduce is OK', () => {
  expect(useMapToHackReduce([1, 2, 3, 4, 5], (pre, cur) => pre + cur)).toBe(15)
})

test('useMapToHackReduce with initialValue is OK', () => {
  expect(useMapToHackReduce([1, 2, 3, 4, 5], (pre, cur) => pre + cur, 10)).toBe(25)
})
