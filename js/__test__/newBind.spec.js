require('../newBind')

// 测试用例

// eslint-disable-next-line
global.value = 20

const foo = {
  value: 1
}

function bar (name, age) {
  return {
    value: this.value,
    name: name,
    age: age
  }
}

test('newBind without new is OK', () => {
  const bindFoo = bar.newBind(foo, 'Jack')
  const a = bindFoo(20)
  expect(a.name).toBe('Jack')
  expect(a.value).toBe(1)
  expect(a.age).toBe(20)
})

test('newBind without new && context is OK', () => {
  const bindFoo = bar.newBind()
  const a = bindFoo('Jack', 20)
  expect(a.name).toBe('Jack')
  expect(a.value).toBe(20)
  expect(a.age).toBe(20)
})

test('newBind with new is OK', () => {
  const BindFoo = bar.newBind(foo)
  const a = new BindFoo('Jack', 20)
  expect(a.name).toBe('Jack')
  expect(a.value).toBe(undefined)
  expect(a.age).toBe(20)
})
