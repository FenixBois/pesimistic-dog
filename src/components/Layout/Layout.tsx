import type { ReactNode } from 'react';
import { Navbar } from 'components/Navbar';
import { Container } from '@mantine/core';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <Container>
            <Navbar />
            <main>{children}</main>
        </Container>
    );
}
