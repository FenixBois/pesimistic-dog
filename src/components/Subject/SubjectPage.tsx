import { Button, Group, Title } from '@mantine/core';
import { SubjectCard } from './SubjectCard';

export function SubjectPage() {
    return (
        <>
            <Group spacing='xl'>
                <Title>Subjects</Title>
                <Button>Add a new subject</Button>
            </Group>
            <SubjectCard name='Subject name' teacher='Teacher name' />{' '}
        </>
    );
}
