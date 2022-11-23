import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";

export const studyProgrammeRouter = router({
  create: protectedProcedure()
    .input(z.object({
      title: z.string().max(50),
      schoolId: z.string().cuid()
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.studyProgramme.create({ data: input });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    })
});
