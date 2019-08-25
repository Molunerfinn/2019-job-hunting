require('../promiseAll')

const a = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('a')
  }, 0)
})

const b = () => new Promise((resolve, reject) => {
  resolve('b')
})

const c = () => new Promise((resolve, reject) => {
  reject(new Error('c'))
})

test('Promise.all is OK', async () => {
  const result = await Promise.all([a(), b()])
  expect(result).toEqual(['a', 'b'])
})

test('Promise.all with reject is OK', async () => {
  try {
    await Promise.all([a(), c()])
  } catch (e) {
    expect(e).toEqual(new Error('c'))
  }
})
