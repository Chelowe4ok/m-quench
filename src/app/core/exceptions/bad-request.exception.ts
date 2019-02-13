export class BadRequestException extends Error {
  public data: any;
  constructor(message: string, data: any) {
    // Subclassing Error, Array and other builtin-classes require this code:
    super(message);
    this.data = data;
    Object.setPrototypeOf(this, BadRequestException.prototype);
    // Read more stackoverflow.com/questions/31626231/custom-error-class-in-typescript
  }
}
