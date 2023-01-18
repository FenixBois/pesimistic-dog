import { z } from 'zod';
import { id as subjectId } from './subject';

export const id = z.string().cuid();
export const title = z.string().max(50);
export const description = z.string().max(255);
export const orderNumber = z.number().int().optional();

export const editTopicData = z.object({
    title: title.optional(),
    description: description.optional(),
    orderNumber: orderNumber.optional(),
    subjectId: subjectId.optional(),
});
export const editTopicInput = z.object({ id }).merge(editTopicData);

export type EditTopicInputType = z.infer<typeof editTopicInput>;

export const createTopicInput = z.object({
    title,
    description,
    orderNumber,
    subjectId,
});
