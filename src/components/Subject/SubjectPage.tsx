import { Button, Group, Title } from '@mantine/core';
import { SubjectCard } from './SubjectCard';
import { trpc } from '../../utils/trpc';

export function SubjectPage() {
    const subjects = trpc.subject.getAll.useQuery().data;

    return (
        <>
            <Group spacing='xl'>
                <Title>Subjects</Title>
                <Button>Add a new subject</Button>
            </Group>
            {subjects?.map(
                ({ id, title, degreeOfStudy, numberOfCredits, language }) => (
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
        </>
    );
}
