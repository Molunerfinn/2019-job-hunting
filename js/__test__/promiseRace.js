require('../promiseRace')

const task1 = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 50)
})

const task2 = () => new Promise((resolve, reject) => {
  resolve(2)
})

const task3 = () => new Promise((resolve, reject) => {
  reject(new Error(3))
})

test('Promise.race is OK', async () => {
  const result = await Promise.race([task1(), task2()])
  expect(result).toBe(2)
})

test('Promise.race with error is OK', async () => {
  try {
    await Promise.race([task3(), task1()])
  } catch (e) {
    expect(e).toEqual(new Error(3))
  }
})
