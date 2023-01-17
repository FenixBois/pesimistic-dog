import { Button, Stack, TextInput, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { useForm, zodResolver } from '@mantine/form';
import {
    createContentInput,
    CreateContentInputType,
} from '../../types/content';

interface CreateContentFormProps {
    submit: (content) => void;
}

interface CreateContentFormValues {
    title: string;
    link: string;
}

export function CreateContentForm({ submit }: CreateContentFormProps) {
    const utils = trpc.useContext();
    const form = useForm<CreateContentFormValues>({
        validate: zodResolver(createContentInput),
        validateInputOnBlur: true,
    });

    const createContentMutation = trpc.content.create.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async (content) => {
            submit(content);
            await utils.content.invalidate();
        },
    });

    function createContent(data: CreateContentInputType) {
        createContentMutation.mutate(data);
    }

    return (
        <div>
            <form onSubmit={form.onSubmit(createContent)}>
                <Stack>
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
                <Button type='submit' mt='lg'>
                    CreateContent
                </Button>
            </form>
        </div>
    );
}
