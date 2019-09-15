class NewPromise {
  constructor (execFn) {
    this.status = 'PENDING'
    this.data = undefined
    this.onFulfilledList = []
    this.onRejectList = []
    execFn(this.resolveFN.bind(this), this.rejectFN.bind(this))
  }

  resolveFN (value) {
    try {
      this.data = value
      this.status = 'FULFILLED'
      for (const i in this.onFulfilledList) {
        this.onFulfilledList[i](value)
      }
    } catch (e) {
      this.reject(e)
    }
  }

  rejectFN (error) {
    this.status = 'REJECT'
    this.data = new Error(error)
    for (const i in this.onRejectList) {
      this.onRejectList[i](error)
    }
  }

  then (onResolve, onReject) {
    onResolve = typeof onResolve === 'function' ? onResolve : function (val) { return val }
    onReject = typeof onReject === 'function' ? onReject : function (err) { throw err }
    if (this.status === 'FULFILLED') {
      return new NewPromise((resolve, reject) => {
        try {
          const result = onResolve(this.data)
          if (result instanceof NewPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      })
    }
    if (this.status === 'REJECT') {
      return new NewPromise((resolve, reject) => {
        try {
          const result = onReject(this.data)
          if (result instanceof NewPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      })
    }
    if (this.status === 'PENDING') {
      return new NewPromise((resolve, reject) => {
        this.onFulfilledList.push(value => {
          try {
            const result = onResolve(value)
            if (result instanceof NewPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectList.push(err => {
          try {
            const result = onReject(err)
            if (result instanceof NewPromise) {
              result.then(resolve, reject)
            } else {
              reject(result)
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  }

  catch (onReject) {
    return this.then(null, onReject)
  }

  static resolve (obj) {
    if (obj === undefined) {
      return new NewPromise((resolve, reject) => {
        resolve()
      })
    } else if (obj instanceof NewPromise) {
      return obj.then(res => res)
    }
  }
}

module.exports = NewPromise
