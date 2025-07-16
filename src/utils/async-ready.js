import TypeChecker from "@lihzsky/type-checker"

export default class AsyncReady {
  static ReadyStatus = {
    initialize: 'INITIALIZE',
    pending: 'PENDING',
    completed: 'COMPLETED'
  }

  static callReadyFunc(callback, ...args) {
    if (TypeChecker.isFunction(callback)) {
      return callback(...args)
    }
  
    return null
  }

  constructor(option) {
    this.status = AsyncReady.ReadyStatus.initialize
    this.callbacks = []
    this.params = undefined
    this.options = Object.assign({ only: false }, option)
  }

  updateParams(params) {
    this.params = params
  }

  ready(callback) {
    if (this.status === AsyncReady.ReadyStatus.completed) {
      AsyncReady.callReadyFunc(callback, this.params)
    } else {
      if (this.options.only) {
        this.callbacks = [callback]
      } else {
        this.callbacks.push(callback)
      }
    }
  }

  wait() {
    this.status = AsyncReady.ReadyStatus.pending
  }

  reset() {
    this.status = AsyncReady.ReadyStatus.initialize
  }

  complete() {
    this.status = AsyncReady.ReadyStatus.completed
    this.callbacks.forEach(callback => AsyncReady.callReadyFunc(callback, this.params))
    this.callbacks = []
  }
}
