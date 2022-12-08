import { router } from "../trpc";
import { authRouter } from "./auth";
import { schoolRouter } from "./school";
import { subjectRouter } from "./subject";
import { studyProgrammeRouter } from "./study-programme";
import { contentRouter } from "./content";
import { topicRouter } from "./topic";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  subject: subjectRouter,
  school: schoolRouter,
  studyProgramme: studyProgrammeRouter,
  content: contentRouter,
  topic: topicRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
