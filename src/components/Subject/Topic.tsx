import type { Content } from '@prisma/client';
import { ContentCard } from '../Content';
import { Paper, Text, Title } from '@mantine/core';

interface TopicCardProps {
    title: string;
    description: string;
    contents: Content[];
}

export function TopicCard({ title, description, contents }: TopicCardProps) {
    return (
        <Paper shadow='md' radius='md' p='md'>
            <Title order={4}>{title}</Title>
            <Text>{description}</Text>
            {contents?.map(({ id, title, link }) => (
                <ContentCard key={id} title={title} link={link} />
            ))}
        </Paper>
    );
}
