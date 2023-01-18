import { Button, Stack, TextInput, Title } from '@mantine/core';
import type { Content } from '@prisma/client';
import { trpc } from '../../utils/trpc';
import { useForm, zodResolver } from '@mantine/form';
import { editTopicData, editTopicInput } from '../../types/topic';

interface EditTopicFormProps {
    subjectId: string;
    topicId: string;
    title: string;
    description: string;
    contents: Content[];

    edit?: () => void;
}

export function EditTopicForm({
    subjectId,
    topicId,
    title,
    description,
    edit,
}: EditTopicFormProps) {
    const form = useForm({
        initialValues: {
            title: title,
            description: description,
        },
        validate: zodResolver(editTopicData),
        validateInputOnBlur: true,
    });

    const editTopicMutation = trpc.topic.edit.useMutation({
        onSuccess: async () => {
            edit?.();
        },
    });

    return (
        <div>
            <form
                onSubmit={form.onSubmit((v) =>
                    editTopicMutation.mutate({ id: topicId, ...v })
                )}
            >
                <Stack>
                    <Title order={4}>Details</Title>
                    <TextInput
                        label='Title'
                        placeholder='Title'
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        label='Description'
                        placeholder='description'
                        {...form.getInputProps('description')}
                    />
                </Stack>
                <Button type='submit' mt='lg'>
                    Save details
                </Button>
            </form>
        </div>
    );
}
