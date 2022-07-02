type ErrorResponse = {
  message: string;
  extensions: {
    argumentName?: string;
    code: string;
  };
};

export default abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): Array<ErrorResponse>;
}
