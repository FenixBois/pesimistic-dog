import type { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'violet',
    globalStyles: (theme) => ({
        '*, *::before, *::after': {
            boxSizing: 'border-box',
        },

        a: {
            textDecoration: 'none',
            color: 'inherit',
        },
    }),
};
