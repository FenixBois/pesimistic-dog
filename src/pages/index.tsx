import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>uuSubjectMan</title>
        <meta name="description" content="uuSubjectMan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-5">
        uuSubjectMan
      </main>
    </>
  );
};

export default Home;
