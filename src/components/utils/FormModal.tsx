import { Modal, Title } from '@mantine/core';
import type { ReactNode } from 'react';

interface SearchFormProps {
    state: boolean;
    setState: (opened: boolean) => void;
    title: string;
    children: ReactNode;
}

export function FormModal({
    state = false,
    setState,
    title,
    children,
}: SearchFormProps) {
    return (
        <Modal
            title={<Title order={2}>{title}</Title>}
            opened={state}
            onClose={() => setState(false)}
            size='lg'
            padding={30}
        >
            {children}
        </Modal>
    );
}
