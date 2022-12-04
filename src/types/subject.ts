import { DegreeOfStudy, LanguageOfStudy } from "@prisma/client";
import { z } from "zod";



export const DegreeOfStudySchema = z.nativeEnum(DegreeOfStudy)
export const LanguageOfStudySchema = z.nativeEnum(LanguageOfStudy);
export const title = z.string().max(50);
export const description = z.string();
export const teacherId = z.string().cuid();
export const studyProgrammeId = z.string().cuid();
export const numberOfCredits = z.number().int().min(1);
export const id = z.string().cuid()