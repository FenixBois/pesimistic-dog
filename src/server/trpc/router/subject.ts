import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {  DegreeOfStudySchema } from "../../../types/degreeOfStudy";
import { LanguageOfStudySchema } from "../../../types/languageOfStudy";

export const subjectRouter = router({
  create: protectedProcedure()
    .input(z.object({
      // TODO add length limits
      title: z.string().max(50),
      teacherId: z.string().cuid(),
      description: z.string(),
      studyProgrammeId: z.string().cuid(),
      numberOfCredits: z.number().int().min(1),
      degreeOfStudy: DegreeOfStudySchema,
      language: LanguageOfStudySchema
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.subject.create({ data: input });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2003") {
          // Error message for non-existing teacher or studyProgramme
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const field = e.meta!.field_name;
          const message = `${field} not found`;
          throw new TRPCError({ code: "BAD_REQUEST", message , cause: e});
        }
        throw e;
      }
    })
});
