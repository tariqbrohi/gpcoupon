import CustomError from "./custom-error";

export default class NotFoundError extends CustomError {
  name = "NotFoundError";
  statusCode = 404;

  constructor(public message = "Not Found") {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, extensions: { code: "NOT_FOUND" } }];
  }
}
