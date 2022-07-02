import { ValidationError as ExpressValidationError } from "express-validator";

import CustomError from "./custom-error";

export default class ValidationError extends CustomError {
  name = "ValidationError";
  statusCode = 400;

  constructor(public errors: ExpressValidationError[]) {
    super("Validation error(s) present. See extensions for more details.");

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      extensions: {
        code: "VALIDATION_FAILED",
        message: err.msg,
        argumentName: err.param,
      },
    }));
  }
}
