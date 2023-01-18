import { ActionIcon, Button, Card, Flex } from '@mantine/core';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { trpc } from '../../utils/trpc';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

interface StudyProgrammeCardProps {
    children: ReactNode;
    id: string;
}
export const StudyProgrammeCard = ({
    children,
    id,
}: StudyProgrammeCardProps) => {
    const utils = trpc.useContext();
    const { data: session } = useSession();

    const removeStudyProgrammeMutation = trpc.studyProgramme.delete.useMutation(
        {
            onSuccess: async () => {
                await utils.studyProgramme.getAll.invalidate();
            },
        }
    );

    return (
        <Link href={`/study-programmes/${id}`}>
            <Card radius='md' withBorder shadow='sm'>
                <Flex justify={'space-between'} align={'center'}>
                    {children}
                    {session?.user?.role ===
                    Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS ? (
                        <ActionIcon
                            variant='subtle'
                            color='red'
                            onClick={(e) => {
                                e.preventDefault();
                                removeStudyProgrammeMutation.mutate({ id });
                            }}
                        >
                            <XMarkIcon />
                        </ActionIcon>
                    ) : null}
                </Flex>
            </Card>
        </Link>
    );
};
