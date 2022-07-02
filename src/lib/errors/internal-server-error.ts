import CustomError from "./custom-error";

export default class InternalServerError extends CustomError {
  name = "InternalServerError";
  statusCode = 500;

  constructor(
    public message = "Oops, something went wrong! Our engineers have been alerted and will fix this asap."
  ) {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, extensions: { code: "INTERNAL_SERVER_ERROR" } }];
  }
}
