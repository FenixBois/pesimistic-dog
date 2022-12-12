import type { Content } from '@prisma/client';
import { ContentCard } from '../Content';
import { Paper, Stack, Text, Title } from "@mantine/core";

interface TopicCardProps {
    title: string;
    description: string;
    contents: Content[];
}

export function TopicCard({ title, description, contents }: TopicCardProps) {
    return (
        <Paper shadow='md' radius='md' p='lg'>
            <Title order={4}>{title}</Title>
            <Text>{description}</Text>
          <Stack mt={20}>{contents?.map(({ id, title, link }) => (
            <ContentCard key={id} title={title} link={link} />
          ))}</Stack>
        </Paper>
    );
}
