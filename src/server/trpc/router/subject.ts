import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { convertKnownPrismaError } from '../../common/utils';
import { Role } from '@prisma/client';
import {
    DegreeOfStudySchema,
    description,
    id,
    LanguageOfStudySchema,
    numberOfCredits,
    studyProgrammeId,
    teacherId,
    title,
} from '../../../types/subject';
import {id as contentId} from "../../../types/content";

export const subjectRouter = router({
    create: protectedProcedure(
        Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS,
        Role.TEACHER
    )
        .input(
            z.object({
                title,
                teacherId,
                description,
                studyProgrammeId,
                numberOfCredits,
                degreeOfStudy: DegreeOfStudySchema,
                language: LanguageOfStudySchema,
            })
        )
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
        .input(
            z.object({
                id,
                title: title.optional(),
                description: description.optional(),
                teacherId: teacherId.optional(),
                studyProgrammeId: studyProgrammeId.optional(),
                numberOfCredits: numberOfCredits.optional(),
                degreeOfStudy: DegreeOfStudySchema.optional(),
                language: LanguageOfStudySchema.optional(),
            })
        )
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
        .input(z.object({ id, contentId}))
      .mutation(async ({ ctx, input }) => {
          // TODO not found
            return ctx.prisma.contentInSubject.delete({
                where: {
                    contentId_subjectId: {
                        contentId: input.contentId,
                        subjectId: input.id,
                    }
                }
            });
        }
    ),

    // TODO check rights
    delete: protectedProcedure()
        .input(z.object({ id }))
        .mutation(async ({ ctx, input }) => {
            const where = { id: input.id };
            // TODO not found
            return ctx.prisma.subject.delete({ where });
        }),
});
