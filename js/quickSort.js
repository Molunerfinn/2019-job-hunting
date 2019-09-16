/**
 * 实现一个快排
 * @param {number[]} arr
 */
function quickSort (arr, left, right) {
  if (left === undefined) {
    left = 0
  }
  if (right === undefined) {
    right = arr.length - 1
  }

  if (left < right) {
    const index = getPartition(arr, left, right)
    quickSort(arr, left, index - 1)
    quickSort(arr, index + 1, right)
  }
  return arr
}

function getPartition (arr, left, right) {
  const pivot = left
  let index = pivot + 1
  for (let i = index; i <= right; i++) {
    if (arr[i] <= arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, pivot, index - 1)
  return index - 1
}

function swap (arr, left, right) {
  [arr[left], arr[right]] = [arr[right], arr[left]]
}

module.exports = quickSort
