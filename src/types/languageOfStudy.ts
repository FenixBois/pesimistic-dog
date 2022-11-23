import {z} from 'zod';
import {LanguageOfStudy} from '.prisma/client';

export const LanguageOfStudySchema = z.nativeEnum(LanguageOfStudy);


