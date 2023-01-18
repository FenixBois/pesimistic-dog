import { Button, Stack, TextInput, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { useForm, zodResolver } from '@mantine/form';
import { createTopicInput } from '../../types/topic';

interface CreateTopicFormProps {
    subjectId: string;
    onSubmit?: () => void;
}

interface CreateTopicFormValues {
    title: string;
    description: string;
    contentIds: string[];
}

export function CreateTopicForm({ subjectId, onSubmit }: CreateTopicFormProps) {
    const form = useForm<CreateTopicFormValues>({
        initialValues: {
            title: '',
            description: '',
            contentIds: [],
        },
        validate: zodResolver(createTopicInput),
        validateInputOnBlur: true,
    });

    const createTopicMutation = trpc.topic.create.useMutation({
        onSuccess: async () => {
            onSubmit?.();
        },
    });

    function createTopic() {
        createTopicMutation.mutate({
            subjectId,
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
                        placeholder='Description'
                        {...form.getInputProps('description')}
                    />
                </Stack>
            </form>
            {/*TODO: Add contents*/}
            {/*<Stack mt='xl'>*/}
            {/*    <Title order={4}>Contents</Title>*/}
            {/*    <EditContentsForm*/}
            {/*        contents={contents}*/}
            {/*        removeContent={(id) => removeContent(id)}*/}
            {/*        handleSubmit={(id) => addContent(id)}*/}
            {/*    />*/}
            {/*</Stack>*/}
            <Button onClick={createTopic} mt='lg'>
                Create topic
            </Button>
        </div>
    );
}
