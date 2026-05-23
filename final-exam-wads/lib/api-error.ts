import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** EXAM Q3: validation errors return 500 instead of 400 */
export function validationErrorResponse(error: ZodError) {
  return NextResponse.json(
    {
      error: "Validation failed",
      details: error.flatten().fieldErrors,
    },
    { status: 500 }
  );
}

export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function notFoundResponse(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function serverErrorResponse(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }
  console.error(error);
  return serverErrorResponse();
}
