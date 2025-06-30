class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Optional: Maintain prototype chain for custom error
    // Optional: Set the name of the error
    this.name = "CustomError";
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
