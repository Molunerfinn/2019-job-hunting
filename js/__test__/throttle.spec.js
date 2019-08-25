const throttle = require('../throttle')

const task = fn => new Promise((resolve, reject) => {
  let count = 0
  const id = setInterval(() => {
    count++
    fn()
    if (count === 10) {
      clearInterval(id)
      resolve()
    }
  }, 20)
})

test('throttle is OK', async () => {
  const callback = jest.fn()
  const throttleFn = throttle(callback, 50)

  await task(throttleFn) // 200ms内执行4次
  expect(callback).toBeCalledTimes(4)
})
