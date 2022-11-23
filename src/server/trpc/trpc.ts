import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";
import { Role } from "../../types/roles";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  }
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = (...roles: Role[]) => t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const userRoles = ctx.session.user.roles;
  const rolesIntersection: Role[] = userRoles.filter(r => roles.includes(r));

  if (rolesIntersection.length === 0) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user, roles: rolesIntersection}
    }
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = () => t.procedure
  //= (...roles: Role[]) => t.procedure.use(isAuthed(...roles));
