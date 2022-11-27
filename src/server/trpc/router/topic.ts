import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";
import type { PrismaClient} from "@prisma/client";
import { Prisma, Role } from "@prisma/client";

async function getMaxOrderNumber(prisma: PrismaClient, subjectId: string): Promise<number> {
  return ((await prisma.topic.aggregate({
    _max: { orderNumber: true },
    where: { subjectId: subjectId }
  }))._max?.orderNumber || 0);
}

export const topicRouter = router({
  create: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({
      title: z.string().max(50),
      description: z.string().max(255),
      orderNumber: z.number().int().optional(),
      subjectId: z.string().cuid()
    }))
    .mutation(async ({ ctx, input }) => {
      const orderNumber = input.orderNumber ?? (await getMaxOrderNumber(ctx.prisma, input.subjectId) + 1);
      const data = {
        ...input,
        orderNumber
      } satisfies Prisma.TopicUncheckedCreateInput;
      try {
        return await ctx.prisma.topic.create({ data });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          convertKnownPrismaError(e);
        }
        throw e;
      }
    })
});
