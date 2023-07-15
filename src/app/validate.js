import { ErrorResponse } from "./error.js";

export const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ErrorResponse(400, result.error.message);
  } else {
    return result.value;
  }
};
