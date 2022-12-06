import { Button, Group, Stack, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { ContentCard } from '../Content';
import { TopicCard } from './Topic';

interface SubjectDetailProps {
    id: string;
}

export function SubjectDetail({ id }: SubjectDetailProps) {
    const subject = trpc.subject.get.useQuery({ id }).data;

    return (
        <Stack>
            <Title>{subject?.title}</Title>
            <Group>
                <Button variant='light'>Edit subject details</Button>
                <Button variant='light'>Edit contents</Button>
                <Button variant='light' color='red'>
                    Delete subject
                </Button>
            </Group>
            <Stack align='flex-start'>
                {subject?.contents.map(({ content }) => (
                    <ContentCard
                        key={content.id}
                        title={content.title}
                        link={content.link}
                    />
                ))}
            </Stack>
            <Stack align='flex-start'>
                <Button variant='light'>Add topic</Button>
                {subject?.topics.map(({ id, title, description, contents }) => (
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
