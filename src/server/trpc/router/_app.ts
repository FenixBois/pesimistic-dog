import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { schoolRouter } from "./school";
import { subjectRouter } from "./subject";
import { studyProgrammeRouter } from "./study-programme";
import { contentRouter } from "./content";
import { topicRouter } from "./topic";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  subject: subjectRouter,
  school: schoolRouter,
  studyProgramme: studyProgrammeRouter,
  content: contentRouter,
  topic: topicRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
