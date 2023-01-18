import { Button, Stack, TextInput, Title } from '@mantine/core';
import type { Content } from '@prisma/client';
import { trpc } from '../../utils/trpc';
import { useForm, zodResolver } from '@mantine/form';
import { EditContentsForm } from './EditContentsForm';
import { editTopicInput } from '../../types/topic';

interface EditTopicFormProps {
    subjectId: string;
    topicId: string;
    title: string;
    description: string;
    contents: Content[];
}

export function EditTopicForm({
    subjectId,
    topicId,
    title,
    description,
}: EditTopicFormProps) {
    const utils = trpc.useContext();
    const form = useForm({
        initialValues: {
            title: title,
            description: description,
        },
        validate: zodResolver(editTopicInput),
        validateInputOnBlur: true,
    });

    const removeContentMutation = trpc.topic.removeContent.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });

    const editTopicMutation = trpc.topic.edit.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });

    function submitDetails() {
        editTopicMutation.mutate({
            id: topicId,
            title: form.values.title,
            description: form.values.description,
        });
    }

    return (
        <div>
            <form>
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
                <Button onClick={submitDetails} mt='lg'>
                    Save details
                </Button>
            </form>
        </div>
    );
}
