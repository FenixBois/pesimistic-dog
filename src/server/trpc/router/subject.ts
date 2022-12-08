import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";
import { DegreeOfStudy, Role } from "@prisma/client";
import {
  id,
  DegreeOfStudySchema,
  description,
  LanguageOfStudySchema,
  numberOfCredits,
  studyProgrammeId,
  teacherId,
  title
} from "../../../types/subject";

export const subjectRouter = router({
  create: protectedProcedure(Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS, Role.TEACHER)
    .input(z.object({
      title,
      teacherId,
      description,
      studyProgrammeId,
      numberOfCredits,
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
  get: publicProcedure
    .input(z.object({ id }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.subject.findUnique({ where: { id: input.id } });
    }),
  edit: protectedProcedure(Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS, Role.TEACHER)
    .input(z.object({
      id,
      title: title.optional(),
      description: description.optional(),
      teacherId: teacherId.optional(),
      studyProgrammeId: studyProgrammeId.optional(),
      numberOfCredits: numberOfCredits.optional(),
      degreeOfStudy: DegreeOfStudySchema.optional(),
      language: LanguageOfStudySchema.optional()
    }))
    .mutation(async ({ctx, input}) => {
      const where = {id: input.id};
      const data = {...input, id: undefined};
      return ctx.prisma.subject.update({where, data});
    }),
  // TODO check rights
  delete: protectedProcedure()
    .input(z.object({id}))
    .mutation(async ({ctx, input}) =>{
      const where = {id: input.id};
      return ctx.prisma.subject.delete({where})
    })
});
