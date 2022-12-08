import { protectedProcedure, router } from "../trpc";
import { Role } from "@prisma/client";

export const userRouter = router({
  getAll: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
    .query(async ({ ctx }) => {
      return ctx.prisma.user.findMany();
    })
});