import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";
import { Role } from "@prisma/client";

export const topicRouter = router({
  create: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({
      title: z.string().max(50),
      description: z.string().max(255),
      orderNumber: z.number().int(),
      subjectId: z.string().cuid()
    }))
    .mutation(async ({ctx, input}) => {
      try {
        return await ctx.prisma.topic.create({ data: input });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    })
});
