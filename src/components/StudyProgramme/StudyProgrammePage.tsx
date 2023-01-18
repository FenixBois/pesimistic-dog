import { Button, Group, Title, Stack, Space, Flex } from '@mantine/core';
import React, { useState } from 'react';

import { FormModal } from '../utils';
import { CreateStudyProgrammeForm } from '../Forms/CreateStudyProgrammeForm';
import { trpc } from 'utils/trpc';
import { StudyProgrammeCard } from './StudyProgrammeCard';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

export function StudyProgrammePage() {
    const [opened, setOpened] = useState(false);
    const studyProgrammes = trpc.studyProgramme.getAll.useQuery().data;
    const { data: school } = trpc.school.get.useQuery();
    const { data: session } = useSession();

    return (
        <>
            <FormModal
                state={opened}
                setState={setOpened}
                title={'Add a study programme'}
            >
                {school?.id ? (
                    <CreateStudyProgrammeForm
                        submit={() => setOpened(false)}
                        schoolId={school.id}
                    />
                ) : null}
            </FormModal>
            <Flex justify={'space-between'} align={'center'}>
                <Title>Study programmes</Title>

                {session?.user?.role === Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS ? (
                    <Button onClick={() => setOpened(true)}>
                        Add a study programme
                    </Button>
                ) : null}
            </Flex>
            <Space h='lg' />
            <Stack>
                {studyProgrammes?.map((item) => (
                    <StudyProgrammeCard key={item.id} id={item.id}>
                        {item.title}
                    </StudyProgrammeCard>
                ))}
            </Stack>
        </>
    );
}
