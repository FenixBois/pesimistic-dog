import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Space_Grotesk } from "@next/font/google"

import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={spaceGrotesk.className}>
      <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider></div>
  );
};

export default trpc.withTRPC(MyApp);
