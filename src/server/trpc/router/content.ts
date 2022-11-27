import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { Role } from "@prisma/client";

export const contentRouter = router({
  create: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({
      title: z.string().max(50),
      link: z.string().max(255),
    }))
    .mutation(async ({ctx, input}) => {
      return ctx.prisma.content.create({data: input});
    })
});
