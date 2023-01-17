import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";
import { id, name } from "../../../types/school";

export const schoolRouter = router({
  edit: protectedProcedure()
    .input(z.object({ id, name }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.school.update({ where: { id: input.id }, data: { name: input.name } });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    }),
  get: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.school.findFirst();
    })
});
