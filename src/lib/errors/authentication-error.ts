import CustomError from "./custom-error";

export default class UnauthenticatedError extends CustomError {
  name = "UnauthenticatedError";
  statusCode = 401;

  constructor(public message = "You are not authenticated.") {
    super(message);

    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, extensions: { code: "UNAUTHENTICATED" } }];
  }
}
