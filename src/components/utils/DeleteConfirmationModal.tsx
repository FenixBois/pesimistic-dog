import { Button, Group, Modal } from "@mantine/core";

interface DeleteConfirmationModalProps {
    title: string;
    deleteModalState: boolean;
    setDeleteModalState: (state: boolean) => void;
    confirmDelete: () => void;
}

export function DeleteConfirmationModal({title, deleteModalState, setDeleteModalState, confirmDelete} : DeleteConfirmationModalProps) {
    return (
        <Modal
            title={title}
            opened={deleteModalState}
            onClose={() => setDeleteModalState(false)}
        >
            <Group mt='xl'>
                <Button
                    variant='default'
                    onClick={() => setDeleteModalState(false)}
                >
                    Cancel
                </Button>
                <Button color='red' onClick={() => confirmDelete()}>
                    Delete
                </Button>
            </Group>
        </Modal>
    )
}