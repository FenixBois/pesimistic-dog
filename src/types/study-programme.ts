import { z } from "zod";

export const id = z.string().cuid()
export const title = z.string().max(50);