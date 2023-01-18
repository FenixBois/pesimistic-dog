import {
    ActionIcon,
    Card,
    Group,
    NavLink,
    Paper,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { FormModal } from 'components/utils';
import { EditContentForm } from '../Forms/EditContentForm';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

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
    const { data: session } = useSession();

    const canUserEdit =
        session?.user?.role === Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS ||
        session?.user?.role === Role.TEACHER;
    return (
        <Card withBorder px='lg' py='sm'>
            <Group position='apart'>
                <Stack spacing='xs'>
                    <Link href={link} target='_blank'>
                        {title}
                    </Link>
                </Stack>
                <Group>
                    {editable && canUserEdit ? (
                        <ActionIcon
                            variant='default'
                            onClick={() => setEditModalState(true)}
                        >
                            <AdjustmentsVerticalIcon width={18} />
                        </ActionIcon>
                    ) : null}
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
                    {removable && canUserEdit ? (
                        <ActionIcon
                            variant='subtle'
                            color='red'
                            onClick={remove}
                        >
                            <XMarkIcon />
                        </ActionIcon>
                    ) : null}
                </Group>
            </Group>
        </Card>
    );
}
