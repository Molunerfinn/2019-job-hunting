# 算法杂谈

记录一下自己刷LeetCode算法时一些简单的感悟和总结。

## 链表

常见思路：

1. 反转链表（头插法等）
2. 快慢指针
3. 双链表合并

而具体到题目的做法上，一般都会需要用到递归或者迭代来做。
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

1. 递归版

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

2. 迭代版（头插法）

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
