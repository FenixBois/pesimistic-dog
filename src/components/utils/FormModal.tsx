import { Modal } from '@mantine/core';
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
            title={<h3>{title}</h3>}
            opened={state}
            onClose={() => setState(false)}
            size='lg'
            padding={50}
        >
            {children}
        </Modal>
    );
}
