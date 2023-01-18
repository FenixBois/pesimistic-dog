import { DegreeOfStudy, LanguageOfStudy } from '@prisma/client';
import { z } from 'zod';
import { id as userId } from './user';

export const DegreeOfStudySchema = z.nativeEnum(DegreeOfStudy);
export const LanguageOfStudySchema = z.nativeEnum(LanguageOfStudy);
export const title = z.string().max(50).min(5);
export const description = z.string();
export const teacherId = userId;
export const studyProgrammeId = z.string().cuid();
export const numberOfCredits = z.number().int().min(1);
export const id = z.string().cuid();

export const createSubjectInput = z.object({
    title,
    teacherId,
    description,
    studyProgrammeId,
    numberOfCredits,
    degreeOfStudy: DegreeOfStudySchema,
    language: LanguageOfStudySchema,
});

export type CreateSubjectInputType = z.infer<typeof createSubjectInput>;

export const editSubjectInputData = z.object({
    title: title.optional(),
    description: description.optional(),
    teacherId: teacherId.optional(),
    studyProgrammeId: studyProgrammeId.optional(),
    numberOfCredits: numberOfCredits.optional(),
    degreeOfStudy: DegreeOfStudySchema.optional(),
    language: LanguageOfStudySchema.optional(),
});
export const editSubjectInput = editSubjectInputData.merge(z.object({ id }));

export type EditSubjectInputType = z.infer<typeof editSubjectInput>;
