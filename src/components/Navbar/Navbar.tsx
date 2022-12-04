import { Group, Title } from '@mantine/core';
import Link from 'next/link';

export function Navbar() {
    return (
        <Group mb={30}>
            <Link href='/' passHref>
                <Title order={4}>Study programmes</Title>
            </Link>
            <Link href='/subjects' passHref>
                <Title order={4}>Subjects</Title>
            </Link>
            <Link href='/contents' passHref>
                <Title order={4}>Study programmes</Title>
            </Link>
        </Group>
    );
}
