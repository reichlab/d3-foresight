/**
 * Custom exception for case when point type (the type of x axis) can't be
 * handled
 */
export function UnknownPointTypeException (message?: string): void {
  this.name = 'UnknownPointTypeException'
  this.message = message || 'Point type not understood'
  this.stack = (new Error()).stack
}

UnknownPointTypeException.prototype = Object.create(Error.prototype)
UnknownPointTypeException.prototype.constructor = UnknownPointTypeException
