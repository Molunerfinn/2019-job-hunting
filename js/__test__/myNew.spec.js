const myNew = require('../myNew')

function Person (name) {
  this.name = name
}

function Student (name) {
  this.name = name
  return {
    age: 12
  }
}

test('myNew is OK', () => {
  const a = myNew(Person, 'Jack')
  expect(a.name).toBe('Jack')
})

test('myNew is OK when constructor return object', () => {
  const a = myNew(Student, 'Jack')
  expect(a.age).toBe(12)
  expect(a.name).toBe(undefined)
})
