const {
  getUrlParams1,
  getUrlParams2
} = require('../getUrlParams')

test('getUrlParams1 is OK', () => {
  expect(getUrlParams1('https://123.com', 'a')).toBe(null)
  expect(getUrlParams1('https://123.com?a=1&b=2', 'a')).toBe('1')
  expect(getUrlParams1('https://123.com?a=1&b=2', 'c')).toBe(null)
})

test('getUrlParams2 is OK', () => {
  expect(getUrlParams2('https://123.com', 'a')).toBe(null)
  expect(getUrlParams2('https://123.com?a=1&b=2', 'a')).toBe('1')
})
