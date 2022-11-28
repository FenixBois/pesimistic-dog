import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { MantineProvider } from "@mantine/core";
import { mantineTheme } from "../../mantine.config";

const MyApp: AppType<{ session: Session | null }> = ({
                                                         Component,
                                                         pageProps: { session, ...pageProps }
                                                     }) => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </MantineProvider>
    );
};

export default trpc.withTRPC(MyApp);
