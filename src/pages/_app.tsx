import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import { mantineTheme } from '../../mantine.config';
import { useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ ...mantineTheme, colorScheme }}
            >
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default trpc.withTRPC(MyApp);
