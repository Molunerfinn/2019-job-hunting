# 算法杂谈

记录一下自己刷LeetCode算法时一些简单的感悟和总结。

## 链表

常见思路：

1. 反转链表（头插法等）
2. 快慢指针
3. 双链表合并

而具体到题目的做法上，一般都会需要用到递归或者迭代来做。

并且通常我们会构建一个临时的头结点（比如T）。假如原始链表头为head，那么 `T.next = head` 。不管原始链表如何变化，最后结果只要返回 `T.next` 即可。这在对付原始头结点有可能更改的情况下会很好用，因为可以少考虑头结点的边界情况。

同时，由于经常要修改链表，需要牢记一个点： **只有修改了 `next` 指向的操作才会修改链表本身。**

考虑如下代码：

```js
const a = head // 某链表的头结点
while (a !== null) {
  a = head.next
}
```

上述代码链表本身并不会发生修改，发生变化的只有a。

```js
const a = head // 某链表的头结点
let pNext = a.next
while (a !== null) {
  a.next = pNext
  pNext = pNext.next
}
```

上述代码链表本身会发生改变。因为 `a.next = pNext` 这句话修改了 `next` 指针的指向。

下面给出一些我觉得比较经典的题目：

### 【反转链表】LeetCode 206

> 反转链表，分别用递归和迭代来实现

1.递归版

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head
  }
  // 1->2->3->4->null
  // 需要返回4->3->2->1->null
  // 假如当前head为2
  const p = head.next // p = 3
  const newHead = reverseList(p) // 返回最后一个结点
  p.next = head // 3->2
  head.next = null // 2->null 完成反转
  return newHead
}
```

2.迭代版（头插法）

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head
  }

  let tempHead = new ListNode(null) // 创建一个临时头结点
  tempHead.next = head

  let pCurrent = head
  let pNext = pCurrent.next
  // 考虑原链表 1->2->3->null
  // 反转后head的next为null -> 3->2->1->null
  head.next = null

  while (pNext !== null) {
    let tempNext = pNext.next // 保存下一个结点
    tempHead.next = pNext // 每次都将遍历到的往头部的next插入
    pNext.next = pCurrent // 修改next指向
    pCurrent = pNext
    pNext = tempNext
  }

  return tempHead.next // 不管原本链表怎么变，都是返回临时头结点的next
}
```

### 【快慢指针】LeetCode 142

> 求一个链表是否有环，如果有环，求环的入口

```js
/**
 * @param {ListNode} head
 * @return {ListNode || null}
 */
var detectCycle = function (head) {
  if (head === null || head.next = null) {
    return null
  }
  let pFast = head
  let pSlow = head
  // 快慢指针遍历
  while (pFast !== null && (pSlow !== null)) {
    pFast = pFast.next
    if (pFast === null) {
      return null
    } else {
      pFast = pFast.next
    }
    pSlow = pSlow.next
    if (pFast === pSlow) {
      break
    }
  }
  // 如果走到null说明是无环
  if (pFast === null || pSlow === null) {
    return null
  }
  // 到这步时pSlow和pFast相遇，说明有环
  // 此时让pSlow重回head，然后继续走(pFast变为走1步），直到相遇，相遇的点就是环入口
  pSlow = head
  while (pSlow !== pFast) {
    pSlow = pSlow.next
    pFast = pFast.next
  }
  return pFast
}
```

### 【双链表拼接】LeetCode 86

> 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。你应当保留两个分区中每个节点的初始相对位置。

比如：

```
输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
// 4大于x，2小于x，所以2要放在4这个节点之前。
// 同时要保留相对位置，原始链表中小于3的数字的相对位置应该是1、2、2，所以合成的时候也是1->2->2。
```

```js
var partition = function(head, x) {
  if (head === null || head.next === null) {
    return head
  }
  let pLeft = new ListNode(null)
  let pRight = new ListNode(null)
  let pLeftHead = pLeft
  let pRightHead = pRight
  let pCurrent = head
  // 分成左右两个链
  // 小于x的放在左链
  // 大于等于x的放在右链
  // 之后左右链拼接返回左链head即可
  while (pCurrent !== null) {
    if (pCurrent.val < x) {
      pLeft.next = new ListNode(pCurrent.val)
      pLeft = pLeft.next
    } else {
      pRight.next = new ListNode(pCurrent.val)
      pRight = pRight.next
    }
    pCurrent = pCurrent.next
  }
  pRight.next = null // 右链结尾应该是null
  pLeft.next = pRightHead
  return pLeftHead.next
}
```

## 树

常见思路：

1. 前序遍历
2. 中序遍历（对应平衡二叉树相关的问题）
3. 栈或队列（对应层序遍历二叉树）
4. 广搜或深搜（BFS、DFS）


### 【前序遍历】LeetCode 144

> 分别用递归和迭代实现二叉树的中序遍历

1.递归版

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let result = []
  preorderTraversalCore(root, result)
  return result
}

function preorderTraversalCore (root, result) {
  if (root === null) {
    return []
  }
  result.push(root.val)
  preorderTraversalCore(root.left)
  preorderTraversalCore(root.right)
}
```

2.迭代版

> 迭代版一般会用栈来实现。

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  if (root === null) {
    return []
  }
  let stack = [root]
  let result = []
  while (stack.length !== 0) {
    let current = stack.pop()
    if (current !== null) {
      result.push(current.val) // 先访问根
      stack.push(current.right) // 之所以先推right再推left，是因为这样的话left会被先pop出来。
      stack.push(current.left)
    }
  }
}
```


### 【中序遍历】LeetCode 94

> 分别用递归和迭代实现二叉树的中序遍历

1.递归版

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let result = []
  inorderTraversalCore(root, result)
  return result
}

function inorderTraversalCore(root, result) {
  if (root === null) {
    return []
  }
  inorderTraversalCore(root.left, result)
  result.push(root.val)
  inorderTraversalCore(root.right, result)
}
```

2.迭代版

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  if (root === null) {
    return []
  }
  let stack = []
  let result = []
  while (stack.length !== 0 || root !== null) {
    while (root ！== null) {
      stack.push(root)
      root = root.left // 先访问左子树
    }
    root = stack.pop()
    result.push(root.val) // push的顺序是左、中、右
    root = root.right // 再访问右子树
  }
  return result
}
```

## 回溯或DFS

其实我也并不是非常理解二者的区别。有的文章说回溯是DFS的一种特例。此处暂且不谈。

通常在做那种需要列出所有方案的题目时，我们会考虑用回溯法来实现。回溯法有相对固定的写法：

1. 终止条件判断并返回结果
2. 循环递归
   1. 递归前push数据
   2. 递归后pop数据（用于还原）

通常我们会先写第2步，写完之后再考虑终止条件，此时再回头写第一步。

### LeetCode 90

> 给定一个数组，返回所有可能的子数组，包括空数组

```js
var subsetsWithDup = function(nums) {
  if (nums.length === 0) {
    return [[]]
  }
  let result = [[]] // 先将空数组存入
  // 排序是为了去重的时候方便判断
  nums = nums.sort((a, b) => a - b)
  for (let i = 1; i <= nums.length; i++) {
    // 深度从1 -> N
    subsetsWithDupCore(nums, result, [], i, 0)
  }
  return result
};

/**
 * @param {number[]} nums 
 * @param {number[]} result 
 * @param {number[]} path 
 * @param {number} depth 
 * @param {number} start 
 */
function subsetsWithDupCore(nums, result, path, depth, start) {
  // 通常在回溯的开头写终止条件
  // 此处我们可以定义一个递归深度depth来结束
  if (path.length === depth) {
    result.push(path.slice())
    return
  }
  // 利用start来标记起始点
  for (let i = start; i < nums.length; i++) {
    // 去重复
    if (i !== start && nums[i] === nums[i - 1]) {
      continue
    }
    path.push(nums[i])
    subsetsWithDupCore(nums, result, path, depth, i + 1)
    path.pop() // 还原，用于下一步，避免重复
  }
}
```

### LeetCode 40

> 给定一个数组和一个target，求和为target的组合（元素不能重复使用）

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  if (candidates.length === 0) {
    return []
  }
  let results = []
  let path = []
  candidates = candidates.sort((a, b) => a - b)
  combinationCore(candidates, target, 0, path, results)
  return results
};

function combinationCore (candidates, target, start, path, results) {
  // 终止条件
  if (target === 0) {
    return results.push(path.slice())
  }
  // 以start开始
  for (let i = start; i < candidates.length; i++) {
    // 由于排序过，所以如果当前candidates[i]大于target，后续的candidates也一定大于target，直接return
    if (candidates[i] > target) {
      return
    }
    // 1，1，2，3...，当有重复数字时，需要跳过
    // 比如这里的1。当i===0时，会和i===1时情况重复。所以i===1时需要跳过
    if (i !== start && candidates[i] === candidates[i - 1]) {
      continue
    }
    target = target - candidates[i]
    if (target >= 0) {
      path.push(candidates[i])
      combinationCore(candidates, target, i + 1, path, results)
      path.pop() // 还原
    }
    target += candidates[i] // 还原
  }
}
```
