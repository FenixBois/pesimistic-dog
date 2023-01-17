import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { AppRouter } from 'server/trpc/router';

type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;

export type PostCreateInput = RouterInput['studyProgramme']['create'];
