import { publicProcedure, router } from '../trpc';

export const userRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.user.findMany();
    }),
    getAllTeachers: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.user.findMany({ where: { role: 'TEACHER' } });
    }),
});
