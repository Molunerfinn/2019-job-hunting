const promisify = require('../promisify')
function someCallBackFn (data, callback) {
  // dosomething
  if (data === 'err') { // 模拟出现错误的情况
    callback(new Error('123'), 'err')
  } else {
    callback(null, data)
  }
}

test('promisify is OK', async () => {
  const a = promisify(someCallBackFn)
  const result = await a('123')
  expect(result).toBe('123')
})

test('promisify reject is OK', async () => {
  const a = promisify(someCallBackFn)
  expect.assertions(1)
  try {
    await a('err')
  } catch (e) {
    expect(e).toEqual(new Error('123'))
  }
})
