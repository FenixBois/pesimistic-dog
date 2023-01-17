import { ActionIcon, Button, Card, Flex } from '@mantine/core';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { trpc } from '../../utils/trpc';

interface StudyProgrammeCardProps {
    children: ReactNode;
    id: string;
}
export const StudyProgrammeCard = ({
    children,
    id,
}: StudyProgrammeCardProps) => {
    const utils = trpc.useContext();
    const removeStudyProgrammeMutation = trpc.studyProgramme.delete.useMutation(
        {
            onSuccess: async () => {
                await utils.studyProgramme.getAll.invalidate();
            },
        }
    );

    return (
        <Link href={`/study-programmes/${id}`}>
            <Card withBorder shadow='sm'>
                <Flex justify={'space-between'} align={'center'}>
                    {children}
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
                </Flex>
            </Card>
        </Link>
    );
};
