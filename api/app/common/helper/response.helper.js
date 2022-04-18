export function errorResponse({ error = null, message = "" }) {
  return {
    status: 400,
    data: null,
    error,
    message,
  };
}

export function notFoundResponse() {
  return {
    status: 404,
    data: null,
    message: "Not Found",
    error: null,
  };
}

export function successResponse({ data = null, message = "" }) {
  return {
    status: 200,
    data,
    message,
    error: null,
  };
}
