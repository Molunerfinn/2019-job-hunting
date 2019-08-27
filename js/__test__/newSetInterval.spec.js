const {
  newSetInterval,
  newClearInterval
} = require('../newSetInterval')

jest.useFakeTimers()

test('newSetInterval is OK', () => {
  const jestFn = jest.fn()
  const fn = () => {
    jestFn()
  }
  const id = newSetInterval(fn, 50)
  jest.advanceTimersByTime(500)
  newClearInterval(id)
  expect(jestFn).toBeCalledTimes(10)
})
