import { Button, Stack, TextInput, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { useForm } from '@mantine/form';

interface CreateContentFormProps {
    submit: () => void;
}

interface CreateContentFormValues {
    title: string;
    link: string;
}

export function CreateContentForm({ submit }: CreateContentFormProps) {
    const utils = trpc.useContext();
    const form = useForm<CreateContentFormValues>({
        initialValues: {
            title: '',
            link: '',
        },
    });

    const createContentMutation = trpc.content.create.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            submit();
            await utils.content.invalidate();
        },
    });

    function createContent() {
        createContentMutation.mutate({
            title: form.values.title,
            link: form.values.link,
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
                        label='Link'
                        placeholder='Link'
                        {...form.getInputProps('link')}
                    />
                </Stack>
            </form>
            <Button onClick={createContent} mt='lg'>
                CreateContent
            </Button>
        </div>
    );
}
