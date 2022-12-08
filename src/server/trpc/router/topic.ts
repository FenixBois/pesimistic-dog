import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { convertKnownPrismaError } from "../../common/utils";
import type { PrismaClient } from "@prisma/client";
import { Prisma, Role } from "@prisma/client";
import { id } from "../../../types/subject";
import { description, orderNumber, subjectId, title } from "../../../types/topic";

async function getMaxOrderNumber(prisma: PrismaClient, subjectId: string): Promise<number> {
  return ((await prisma.topic.aggregate({
    _max: { orderNumber: true },
    where: { subjectId: subjectId }
  }))._max?.orderNumber || 0);
}

export const topicRouter = router({
  create: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({ title, description, orderNumber, subjectId }))
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
    }),
  getForSubject: publicProcedure
    .input(z.object({ id: id }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.topic.findMany({ where: { subject: { id: input.id } } });
    }),
  // TODO check rights
  edit: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({
      id,
      title: title.optional(),
      description: description.optional(),
      orderNumber: orderNumber.optional(),
      subjectId: subjectId.optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const where = {id: input.id};
      const data = {...input, id: undefined};
      return ctx.prisma.topic.update({where, data})
    }),
  // TODO check rights
  delete: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .input(z.object({
      id: z.string().cuid()
    }))
    .mutation(async ({ ctx, input }) => {
      const where = { id: input.id };
      return ctx.prisma.topic.delete({ where });
    })
});
