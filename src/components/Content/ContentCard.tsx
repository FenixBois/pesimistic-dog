import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface ContentCardProps {
    title: string;
    link: string;
    editable?: boolean;
    removable?: boolean;
    remove?: () => void;
}

export function ContentCard({
    title,
    link,
    editable,
    removable,
    remove,
}: ContentCardProps) {
    return (
        <Paper withBorder px='lg' py='sm' w={500}>
            <Group position='apart'>
                <Stack spacing='xs'>
                    <Text>{title}</Text>
                    <Text>{link}</Text>
                </Stack>
                <Group>
                    {editable && (
                        <ActionIcon variant='default'>
                            <AdjustmentsVerticalIcon width={18} />
                        </ActionIcon>
                    )}
                    {removable && (
                        <ActionIcon
                            variant='subtle'
                            color='red'
                            onClick={remove}
                        >
                            <XMarkIcon />
                        </ActionIcon>
                    )}
                </Group>
            </Group>
        </Paper>
    );
}
