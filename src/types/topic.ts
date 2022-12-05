import { z } from "zod";
export {id as subjectId} from './subject';

export const id = z.string().cuid()
export const title = z.string().max(50);
export const description = z.string().max(255);
export const orderNumber = z.number().int().optional();
