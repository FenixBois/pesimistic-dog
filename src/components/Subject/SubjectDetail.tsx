import { Button, Group, Stack, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { ContentCard } from '../Content';
import { TopicCard } from './Topic';
import { FormModal } from '../utils/FormModal';
import { useState } from 'react';
import { EditSubjectForm } from './Forms/EditSubjectForm';

interface SubjectDetailProps {
    id: string;
}

export function SubjectDetail({ id }: SubjectDetailProps) {
    const { isLoading, isError, data, error } = trpc.subject.get.useQuery({
        id,
    });
    const [editModalOpen, setEditModalOpen] = useState(false);

    function handleSubmit() {
        setEditModalOpen(false);
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError || data === null) return <p>{error?.message}</p>;

    return (
        <Stack>
            <Title>{data.title}</Title>
            <Group>
                <Button variant='light' onClick={() => setEditModalOpen(true)}>
                    Edit subject details
                </Button>
                <FormModal
                    title='Edit subject details'
                    state={editModalOpen}
                    setState={setEditModalOpen}
                >
                    <EditSubjectForm subject={data} submit={handleSubmit} />
                </FormModal>
                <Button variant='light'>Edit contents</Button>
                <Button variant='light' color='red'>
                    Delete subject
                </Button>
            </Group>
            <Stack align='flex-start'>
                {data.contents.map(({ content }) => (
                    <ContentCard
                        key={content.id}
                        title={content.title}
                        link={content.link}
                    />
                ))}
            </Stack>
            <Stack align='flex-start'>
                <Button variant='light'>Add topic</Button>
                {data.topics.map(({ id, title, description, contents }) => (
                    <TopicCard
                        key={id}
                        title={title}
                        description={description}
                        contents={contents.map(({ content }) => content)}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
