import { Button, Stack, TextInput, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { useForm, zodResolver } from '@mantine/form';
import { editContentInput } from '../../types/content';

interface EditContentFormProps {
    id: string;
    submit: () => void;
    title: string;
    link: string;
}

interface EditContentFormValues {
    title: string;
    link: string;
}

export function EditContentForm({
    submit,
    id,
    title,
    link,
}: EditContentFormProps) {
    const utils = trpc.useContext();
    const form = useForm<EditContentFormValues>({
        initialValues: {
            title: title,
            link: link,
        },
        validate: zodResolver(editContentInput),
        validateInputOnBlur: true,
    });

    const editContentMutation = trpc.content.edit.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            submit();
            await utils.content.get.invalidate({ id });
        },
    });

    function editContent() {
        editContentMutation.mutate({
            id: id,
            title: form.values.title,
            link: form.values.link,
        });
    }

    return (
        <div>
            <form>
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
                <Button onClick={editContent} mt='lg'>
                    Submit
                </Button>
            </form>
        </div>
    );
}
