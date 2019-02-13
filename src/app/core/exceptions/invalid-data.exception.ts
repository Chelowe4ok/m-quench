export class InvalidDataException extends Error {
  constructor(message: string, public data: any) {
    // Subclassing Error, Array and other builtin-classes require this code:
    super(message);
    Object.setPrototypeOf(this, InvalidDataException.prototype);
    // Read more stackoverflow.com/questions/31626231/custom-error-class-in-typescript
  }
}
