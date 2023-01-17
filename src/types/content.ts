import { z } from 'zod';

export const id = z.string().cuid();
export const title = z.string().max(50).min(1);
export const link = z.string().max(255).min(1);

export const createContentInput = z.object({ title, link });
export type CreateContentInputType = z.infer<typeof createContentInput>;
