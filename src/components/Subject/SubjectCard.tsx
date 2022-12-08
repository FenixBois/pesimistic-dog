import { Paper, Text, Title } from "@mantine/core";

interface SubjectCardProps {
    name: string;
    teacher: string;
}

export function SubjectCard({ name, teacher }: SubjectCardProps) {
    return (
        <Paper shadow="sm" radius="md" p="lg">
            <Title order={4}>{name}</Title>
            <Text>Teacher: {teacher}</Text>
        </Paper>
    );
}