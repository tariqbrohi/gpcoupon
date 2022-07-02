import CustomError from "./custom-error";

export default class BadRequestError extends CustomError {
  name = "BadRequestError";
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, extensions: { code: "BAD_REQUEST" } }];
  }
}
