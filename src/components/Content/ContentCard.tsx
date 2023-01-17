import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { FormModal } from 'components/utils';
import { EditContentForm } from '../Forms/EditContentForm';

interface ContentCardProps {
    id: string;
    title: string;
    link: string;
    editable?: boolean;
    removable?: boolean;
    remove?: () => void;
    edit?: () => void;
}

export function ContentCard({
    id,
    title,
    link,
    editable,
    removable,
    remove,
    edit,
}: ContentCardProps) {
    const [editModalState, setEditModalState] = useState(false);

    return (
        <Paper withBorder px='lg' py='sm' w={500}>
            <Group position='apart'>
                <Stack spacing='xs'>
                    <Text>{title}</Text>
                    <Text>{link}</Text>
                </Stack>
                <Group>
                    {editable && (
                        <ActionIcon
                            variant='default'
                            onClick={() => setEditModalState(true)}
                        >
                            <AdjustmentsVerticalIcon width={18} />
                        </ActionIcon>
                    )}
                    <FormModal
                        title='Edit content'
                        state={editModalState}
                        setState={setEditModalState}
                    >
                        <EditContentForm
                            id={id}
                            title={title}
                            link={link}
                            submit={() => {
                                setEditModalState(false);
                                edit?.();
                            }}
                        />
                    </FormModal>
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
