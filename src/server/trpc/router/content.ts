import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { Role } from '@prisma/client';
import {
    createContentInput,
    editContentInput,
    id,
} from '../../../types/content';

export const contentRouter = router({
    create: protectedProcedure(
        Role.TEACHER,
        Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS
    )
        .input(createContentInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.content.create({ data: input });
        }),
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.content.findMany();
    }),
    get: publicProcedure
        .input(z.object({ id }))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.content.findUnique({ where: { id: input.id } });
        }),
    // TODO check rights
    delete: protectedProcedure(Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
        .input(z.object({ id }))
        .mutation(async ({ ctx, input }) => {
            const where = { id: input.id };
            // TODO handle not found
            return ctx.prisma.content.delete({ where });
        }),
    edit: protectedProcedure(Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
        .input(editContentInput)
        .mutation(async ({ ctx, input }) => {
            const where = { id: input.id };
            const data = { title: input.title, link: input.link };
            return ctx.prisma.content.update({ where, data });
        }),
});
