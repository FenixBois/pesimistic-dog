import {z} from 'zod';
import {DegreeOfStudy} from '.prisma/client';

export const DegreeOfStudySchema = z.nativeEnum(DegreeOfStudy)

