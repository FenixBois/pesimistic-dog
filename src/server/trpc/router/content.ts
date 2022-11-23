import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const contentRouter = router({
  create: protectedProcedure()
    .input(z.object({
      title: z.string().max(50),
      link: z.string().max(255),
    }))
    .mutation(async ({ctx, input}) => {
      return ctx.prisma.content.create({data: input});
    })
});
