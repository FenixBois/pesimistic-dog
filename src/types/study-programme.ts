import { z } from 'zod';
import { id as schoolId } from './school';

export const id = z.string().cuid().min(1);
export const title = z.string().max(50).min(1);

export const studyProgrammeCreateInput = z.object({ title, schoolId });

export type StudyProgrammeCreateInputType = z.infer<
    typeof studyProgrammeCreateInput
>;
