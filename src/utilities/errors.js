/**
 * Custom exception for case when point type (the type of x axis) can't be
 * handled
 */
export function UnknownPointTypeException (message) {
  this.name = 'UnknownPointTypeException'
  this.message = message || 'Point type not understood'
  this.stack = (new Error()).stack
}

UnknownPointTypeException.prototype = Object.create(Error.prototype)
UnknownPointTypeException.prototype.constructor = UnknownPointTypeException

/**
 * Exception for hook
 */
export function HookNotUnderstoodException (message) {
  this.name = 'HookNotUnderstoodException'
  this.message = message || 'Requested hook not found'
  this.stack = (new Error()).stack
}

HookNotUnderstoodException.prototype = Object.create(Error.prototype)
HookNotUnderstoodException.prototype.constructor = HookNotUnderstoodException
