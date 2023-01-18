import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

import { type Context } from './context';
import { type Role } from '@prisma/client';

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
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
const isAuthed = (...roles: Role[]) =>
    t.middleware(({ ctx, next }) => {
        if (!ctx.session || !ctx.session.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        let foundRoles: Role[] = [];
        if (roles.length > 0) {
            const userRole = ctx.session.user.role;
            const rolesIntersection: Role[] = roles.filter(
                (r) => r === userRole
            );

            if (rolesIntersection.length === 0) {
                throw new TRPCError({ code: 'FORBIDDEN' });
            }

            foundRoles = rolesIntersection;
        }

        return next({
            ctx: {
                // infers the `session` as non-nullable
                session: {
                    ...ctx.session,
                    user: ctx.session.user,
                    roles: foundRoles,
                },
            },
        });
        return next({ ctx });
    });

/**
 * Protected procedure
 **/
export const protectedProcedure = (...roles: Role[]) =>
    t.procedure.use(isAuthed(...roles));
