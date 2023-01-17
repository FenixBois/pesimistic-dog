import { z } from "zod";

export const id = z.string().cuid()
export const name = z.string() // TODO max length