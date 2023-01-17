import { type PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export function convertKnownPrismaError(e: PrismaClientKnownRequestError): never {
  if (e.code === "P2003")
    handleRelationshipNotFound(e);

  if (e.code === "P2025")
    handleNotFound(e);

  throw e;
}

export function handleNotFound(e: PrismaClientKnownRequestError): never {
  const message = e.cause as string;
  throw new TRPCError({code: "NOT_FOUND", message, cause: e})
}

export function handleRelationshipNotFound(e: PrismaClientKnownRequestError): never {

  // Error message for non-existing relationship e.g. teacher or studyProgramme
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const field = e.meta!.field_name;
  const message = `${field} not found`;
  throw new TRPCError({ code: "BAD_REQUEST", message, cause: e });
}