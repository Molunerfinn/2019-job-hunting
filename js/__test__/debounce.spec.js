const debounce = require('../debounce')

beforeEach(() => {
  jest.useFakeTimers()
})

test('debounce is OK', () => {
  const callback = jest.fn()
  const debounceFn = debounce(callback, 1000)
  debounceFn()
  debounceFn()
  debounceFn()

  jest.runAllTimers()

  expect(setTimeout).toHaveBeenCalledTimes(3)
  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(1) // 只会被触发一次
})

test('debounce with immediate flag is OK', () => {
  const callback = jest.fn()
  const debounceFn = debounce(callback, 1000, true)
  debounceFn()
  expect(callback).toBeCalled() // 立即触发
  debounceFn()
  debounceFn()

  jest.runAllTimers()

  expect(setTimeout).toHaveBeenCalledTimes(3)
  expect(callback).toHaveBeenCalledTimes(1) // 只会被触发一次
})
