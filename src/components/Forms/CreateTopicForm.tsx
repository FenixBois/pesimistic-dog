import { Button, Stack, TextInput, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { useForm } from '@mantine/form';

interface CreateTopicFormProps {
    subjectId: string;
}

interface CreateTopicFormValues {
    title: string;
    description: string;
    contentIds: string[];
}

export function CreateTopicForm({ subjectId }: CreateTopicFormProps) {
    const utils = trpc.useContext();
    const form = useForm<CreateTopicFormValues>({
        initialValues: {
            title: '',
            description: '',
            contentIds: [],
        },
    });

    const createTopicMutation = trpc.topic.create.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });
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
