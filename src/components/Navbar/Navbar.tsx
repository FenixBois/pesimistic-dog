import { Button, Flex, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export function Navbar() {
    const { data: session } = useSession();
    return (
        <Flex align={'center'} justify={'space-between'} py={50}>
            <Group align={'center'}>
                <Link href='/' passHref>
                    <Text color={'violet'} size={'xl'} weight={'bold'}>
                        Study programmes
                    </Text>
                </Link>
                <Link href='/subjects' passHref>
                    <Text color={'violet'} size={'xl'} weight={'bold'}>
                        Subjects
                    </Text>
                </Link>
                <Link href='/contents' passHref>
                    <Text color={'violet'} size={'xl'} weight={'bold'}>
                        Contents
                    </Text>
                </Link>
            </Group>

            {session?.user ? (
                <Button onClick={() => signOut()}>Log out</Button>
            ) : (
                <Button onClick={() => signIn('google')}>Log in</Button>
            )}
        </Flex>
    );
}
