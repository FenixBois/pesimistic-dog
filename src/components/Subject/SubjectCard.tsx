import { Paper, Text, Title } from '@mantine/core';
import Link from 'next/link';

interface SubjectCardProps {
    id: string;
    title: string;
    credits: number;
    degree: string;
    language: string;
}

export function SubjectCard({
    id,
    title,
    credits,
    degree,
    language,
}: SubjectCardProps) {
    return (
        <Link href={'/subject/' + id} passHref>
            <Paper shadow='sm' radius='md' p='lg'>
                <Title order={4}>{title}</Title>
                <Text>
                    Credits: {credits}, Degree: {degree}, Language: {language}
                </Text>
            </Paper>
        </Link>
    );
}
