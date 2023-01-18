import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { SubjectCard } from './SubjectCard';
import { trpc } from '../../utils/trpc';
import { FormModal } from '../utils';
import React, { useState } from 'react';
import { CreateSubjectForm } from '../Forms/CreateSubjectForm';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

export function SubjectPage() {
    const utils = trpc.useContext();
    const subjects = trpc.subject.getAll.useQuery().data;
    const [createSubjectModalState, setCreateSubjectModalState] =
        useState(false);
    const canCreateSubject =
        useSession().data?.user?.role === Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS;

    const onSubmit = async () => {
        await utils.subject.getAll.invalidate();
        setCreateSubjectModalState(false);
    };

    return (
        <>
            <Group spacing='xl'>
                <Flex w={'100%'} justify={'space-between'} align={'center'}>
                    <Title>Subjects</Title>
                    {canCreateSubject && (
                        <>
                            <FormModal
                                state={createSubjectModalState}
                                setState={setCreateSubjectModalState}
                                title={'Create subject'}
                            >
                                <CreateSubjectForm onSubmit={onSubmit} />
                            </FormModal>
                            <Button
                                onClick={() => setCreateSubjectModalState(true)}
                            >
                                Add a new subject
                            </Button>
                        </>
                    )}
                </Flex>
            </Group>
            <Stack pt={20}>
                {subjects?.map(
                    ({
                        id,
                        title,
                        degreeOfStudy,
                        numberOfCredits,
                        language,
                    }) => (
                        <SubjectCard
                            key={id}
                            id={id}
                            title={title}
                            degree={degreeOfStudy}
                            numberOfCredits={numberOfCredits}
                            language={language}
                        />
                    )
                )}
            </Stack>
        </>
    );
}
