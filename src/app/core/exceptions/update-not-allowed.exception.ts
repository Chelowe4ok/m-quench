export class UpdateNotAllowedException extends Error {
  constructor(message: string) {
    // Subclassing Error, Array and other builtin-classes require this code:
    super(message);
    Object.setPrototypeOf(this, UpdateNotAllowedException.prototype);
    // Read more stackoverflow.com/questions/31626231/custom-error-class-in-typescript
  }
}
