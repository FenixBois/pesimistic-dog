import { z } from "zod";

import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const subjectRouter = router({
  create: protectedProcedure()
    .input(z.object({
      // TODO add length limits
      title: z.string(),
      teacherId: z.string().cuid(),
      description: z.string(),
      studyProgrammeId: z.string().cuid()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.subject.create({ data: input });
      }catch (e){
        if(e instanceof PrismaClientKnownRequestError && e.code === "P2003"){
          // TODO this should work if used on mysql?
          // otherwise we would have to run separate queries to find out
          // whether teacher and study programme exists
            const field = e.meta!.field_name;
            const message = `${field} not found`;
            throw new TRPCError({code: "BAD_REQUEST", message})
        }
        throw e;
      }
    })
});
