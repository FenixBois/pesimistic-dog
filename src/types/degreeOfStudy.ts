import {z} from 'zod';
import {DegreeOfStudy, Subject} from '.prisma/client';

export const DegreeOfStudySchema = z.nativeEnum(DegreeOfStudy)

