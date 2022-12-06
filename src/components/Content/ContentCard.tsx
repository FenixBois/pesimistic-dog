import { Paper, Text, Title } from '@mantine/core';

interface ContentCardProps {
    title: string;
    link: string;
}

export function ContentCard({ title, link }: ContentCardProps) {
    return (
        <Paper>
            <Title order={4}>{title}</Title>
            <Text>{link}</Text>
        </Paper>
    );
}
