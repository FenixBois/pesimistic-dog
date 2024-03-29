import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { convertKnownPrismaError } from '../../common/utils';
import { Role } from '@prisma/client';
import {
    createSubjectInput,
    editSubjectInput,
    id,
} from '../../../types/subject';
import { id as contentId } from '../../../types/content';

export const subjectRouter = router({
    create: protectedProcedure(Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS)
        .input(createSubjectInput)
        .mutation(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.subject.create({ data: input });
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    convertKnownPrismaError(e);
                }
                throw e;
            }
        }),
    get: publicProcedure
        .input(
            z.object({
                id: z.string().cuid(),
            })
        )
        .query(async ({ ctx, input }) => {
            return ctx.prisma.subject.findUnique({
                where: { id: input.id },
                include: {
                    contents: {
                        include: { content: true },
                    },
                    topics: {
                        include: { contents: { include: { content: true } } },
                    },
                    teacher: true,
                },
            });
        }),
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.subject.findMany();
    }),
    edit: publicProcedure
        .input(editSubjectInput)
        .mutation(async ({ ctx, input }) => {
            const where = { id: input.id };
            const data = { ...input, id: undefined };
            return ctx.prisma.subject.update({ where, data });
        }),
    addContent: publicProcedure
        .input(z.object({ id, contentId }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.subject.update({
                where: { id: input.id },
                data: {
                    contents: {
                        create: [
                            {
                                content: {
                                    connect: { id: input.contentId },
                                },
                            },
                        ],
                    },
                },
            });
        }),
    removeContent: publicProcedure
        .input(z.object({ id, contentId }))
        .mutation(async ({ ctx, input }) => {
            // TODO not found
            return ctx.prisma.contentInSubject.delete({
                where: {
                    contentId_subjectId: {
                        contentId: input.contentId,
                        subjectId: input.id,
                    },
                },
            });
        }),

    // TODO check rights
    delete: protectedProcedure()
        .input(z.object({ id }))
        .mutation(async ({ ctx, input }) => {
            const where = { id: input.id };
            // TODO not found
            return ctx.prisma.subject.delete({ where });
        }),
    getAllForStudyProgramme: publicProcedure
        .input(z.object({ id }))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.subject.findMany({
                where: { studyProgrammeId: input.id },
            });
        }),
});
