import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {  DegreeOfStudySchema } from "../../../types/degreeOfStudy";
import { LanguageOfStudySchema } from "../../../types/languageOfStudy";
import { convertKnownPrismaError } from "../../common/utils";

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
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    }),
  get: protectedProcedure()
    .input(z.object({
      id: z.string().cuid()
    }))
    .query(async ({ctx, input}) => {
      return ctx.prisma.subject.findUnique({where: {id: input.id}});
    })
});
