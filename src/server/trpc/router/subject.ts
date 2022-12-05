import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DegreeOfStudySchema } from '../../../types/degreeOfStudy';
import { LanguageOfStudySchema } from '../../../types/languageOfStudy';
import { convertKnownPrismaError } from '../../common/utils';
import { Role } from '@prisma/client';

export const subjectRouter = router({
    create: protectedProcedure(
        Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS,
        Role.TEACHER
    )
        .input(
            z.object({
                // TODO add length limits
                title: z.string().max(50),
                teacherId: z.string().cuid(),
                description: z.string(),
                studyProgrammeId: z.string().cuid(),
                numberOfCredits: z.number().int().min(1),
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
            return ctx.prisma.subject.findUnique({ where: { id: input.id } });
        }),
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.subject.findMany();
    }),
});
