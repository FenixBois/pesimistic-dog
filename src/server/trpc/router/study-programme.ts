import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";
import { Role } from "@prisma/client";
import { id, title } from "../../../types/study-programme";
import { id as schoolId } from "../../../types/school";

export const studyProgrammeRouter = router({
  create: protectedProcedure(Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({ title, schoolId }))
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.studyProgramme.create({ data: input });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.studyProgramme.findMany();
    }),
  get: publicProcedure
    .input(z.object({ id }))
    .query(async ({ ctx, input }) => {
      const where = input;
      return ctx.prisma.studyProgramme.findFirst({ where });
    }),
  delete: protectedProcedure()
    .input(z.object({ id }))
    .mutation(async ({ ctx, input }) => {
      const where = input;
      // TODO handle not found
      return ctx.prisma.studyProgramme.delete({ where });
    }),
  edit: protectedProcedure()
    .input(z.object({ id, title: title.optional(), schoolId: schoolId.optional() }))
    .mutation(async ({ ctx, input }) => {
      const where = { id: input.id };
      const data = { title: input.title, schoolId: input.schoolId };
      try {
        return await ctx.prisma.studyProgramme.update({ where, data });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    })
});
