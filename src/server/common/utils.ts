import { type PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";

export function convertKnownPrismaError(e: PrismaClientKnownRequestError): never {
  if(e.code !== "P2003") throw e;

   // Error message for non-existing teacher or studyProgramme
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const field = e.meta!.field_name;
  const message = `${field} not found`;
  throw new TRPCError({ code: "BAD_REQUEST", message , cause: e});
}