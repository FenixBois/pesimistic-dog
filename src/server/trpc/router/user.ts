import { publicProcedure, router } from '../trpc';
import { z } from "zod";
import {id} from "../../../types/user";

export const userRouter = router({
    getAll: publicProcedure
      .query(async ({ ctx }) => {
        return ctx.prisma.user.findMany();
    }),
    getAllTeachers: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.user.findMany({ where: { role: 'TEACHER' } });
    }),
    get: publicProcedure
      .input(z.object({id}))
      .query(async ({ctx, input}) => {
          const where = input;
          return ctx.prisma.user.findFirst({where})
      })
});
