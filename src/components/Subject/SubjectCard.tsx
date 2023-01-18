import { Paper, Text, Title } from '@mantine/core';
import Link from 'next/link';

interface SubjectCardProps {
    id: string;
    title: string;
    numberOfCredits: number;
    degree: string;
    language: string;
}

export function SubjectCard({
    id,
    title,
    numberOfCredits,
    degree,
    language,
}: SubjectCardProps) {
    return (
        <Link href={'/subject/' + id} passHref>
            <Paper withBorder shadow='sm' radius='md' p='lg'>
                <Title order={4}>{title}</Title>
                <Text>
                    Credits: {numberOfCredits}, Degree: {degree}, Language:{' '}
                    {language}
                </Text>
            </Paper>
        </Link>
    );
}
