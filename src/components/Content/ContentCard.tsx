import { Paper, Text, Title } from "@mantine/core";

interface ContentCardProps {
    name: string;
    link: string;
}

export function ContentCard({ name, link }: ContentCardProps) {
    return (
        <Paper shadow="sm" radius="md" p="lg">
            <Title order={4}>{name}</Title>
            <Text>{link}</Text>
        </Paper>
    );
}