import { Button, Flex, Group, Title, Stack } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { ContentCard } from 'components/Content';
import { FormModal } from '../utils';
import { useState } from 'react';
import { CreateContentForm } from 'components/Forms';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

export function ContentPage() {
    const utils = trpc.useContext();
    const contents = trpc.content.getAll.useQuery().data;
    const deleteContentMutation = trpc.content.delete.useMutation({
        onSuccess: async () => {
            await utils.content.invalidate();
        },
    });

    const { data: session } = useSession();
    const role = session?.user?.role;
    const canCreateContent = role === Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS;
    const canEditContent =
        !!role &&
        (
            [Role.TEACHER, Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS] as Role[]
        ).includes(role);
    const canRemoveContent = canCreateContent;

    const [contentModalState, setContentModalState] = useState(false);

    function removeContent(id: string) {
        deleteContentMutation.mutate({ id: id });
    }

    return (
        <>
            <Group spacing='xl'>
                <Flex w={'100%'} justify={'space-between'} align={'center'}>
                    <Title>Contents</Title>
                    {canCreateContent ? (
                        <Button onClick={() => setContentModalState(true)}>
                            Add a content
                        </Button>
                    ) : null}
                </Flex>
                <FormModal
                    title='Create new content'
                    state={contentModalState}
                    setState={setContentModalState}
                >
                    <CreateContentForm
                        submit={() => setContentModalState(false)}
                    />
                </FormModal>
            </Group>
            <Stack pt={20}>
                {contents?.map(({ id, title, link }) => (
                    <ContentCard
                        key={id}
                        id={id}
                        title={title}
                        link={link}
                        edit={() => utils.content.invalidate()}
                        editable={canEditContent}
                        removable={canRemoveContent}
                        remove={() => removeContent(id)}
                    />
                ))}
            </Stack>
        </>
    );
}
