import {
    ActionIcon,
    Affix,
    Avatar,
    Button,
    Flex,
    Group,
    Text,
    useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { IconSun, IconMoonStars } from '@tabler/icons';

export function Navbar() {
    const { data: session } = useSession();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

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
                <Flex gap={20} align={'center'}>
                    <Avatar
                        radius='xl'
                        src={session.user.image}
                        alt={`${session.user.name} profile image`}
                        color={'violet'}
                    />
                    <Flex direction={'column'}>
                        <Text size={'md'} weight={'bold'}>
                            {session.user.name}
                        </Text>
                        <Text size={'xs'} weight={'bold'} color={'violet'}>
                            {session.user.role}
                        </Text>
                    </Flex>

                    <Button onClick={() => signOut()}>Log out</Button>
                </Flex>
            ) : (
                <Button onClick={() => signIn('google')}>Log in</Button>
            )}
            <Affix position={{ bottom: 20, right: 20 }}>
                <ActionIcon
                    variant='outline'
                    color={'violet'}
                    onClick={() => toggleColorScheme()}
                    title='Toggle color scheme'
                    size={40}
                >
                    {dark ? <IconSun size={20} /> : <IconMoonStars size={20} />}
                </ActionIcon>
            </Affix>
        </Flex>
    );
}
