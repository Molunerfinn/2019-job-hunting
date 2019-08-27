/**
 * 实现一个获取URL参数的方法
 */

/**
 * @param {string} url
 * @param {string} param
 */
function getUrlParams1 (url, param) {
  const urlSearch = url.split('?')[1]
  if (!urlSearch) {
    return null
  }
  const paramList = urlSearch.split('&')
  for (const i in paramList) {
    const [searchParam, value] = paramList[i].split('=')
    if (searchParam === param) {
      return value
    }
  }
  return null
}

/**
 * @param {string} url
 * @param {string} param
 */
function getUrlParams2 (url, param) {
  url = new URL(url)
  const params = new URLSearchParams(url.search)
  return params.get(param)
}

module.exports = {
  getUrlParams1,
  getUrlParams2
}
