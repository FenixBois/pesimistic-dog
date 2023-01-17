import { Button, Group, Select } from '@mantine/core';
import type { Content } from '@prisma/client';
import { trpc } from '../../utils/trpc';
import { useForm } from '@mantine/form';

interface EditContentsFormProps {
    contents: Set<Content['id']>;
    handleSubmit: (id: string) => void;
}

export function EditContentsForm({
    contents,
    handleSubmit,
}: EditContentsFormProps) {
    const { data: databaseContents } = trpc.content.getAll.useQuery();

    const form = useForm({
        initialValues: {
            newContentId: '',
        },
    });

    return (
        <div>
            <form>
                <Group mb={20}>
                    <Select
                        searchable
                        data={
                            databaseContents
                                ?.filter((c) => !contents.has(c.id))
                                ?.map((content) => ({
                                    label: content.title,
                                    value: content.id,
                                })) || []
                        }
                        {...form.getInputProps('newContentId')}
                    />
                    <Button
                        onClick={() => handleSubmit(form.values.newContentId)}
                    >
                        Add
                    </Button>
                </Group>
            </form>
        </div>
    );
}
