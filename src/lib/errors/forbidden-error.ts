import CustomError from "./custom-error";

export default class ForbiddenError extends CustomError {
  name = "ForbiddenError";
  statusCode = 403;

  constructor(public message = "You are not authorized.") {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, extensions: { code: "FORBIDDEN" } }];
  }
}
