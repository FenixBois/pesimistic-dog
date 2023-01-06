import { Button, Stack, TextInput, Title } from "@mantine/core";
import type { Content } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { useForm } from "@mantine/form";
import { EditContentsForm } from "./EditContentsForm";

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
    contents,
}: EditTopicFormProps) {
    const utils = trpc.useContext();
    const form = useForm({
        initialValues: {
            title: title,
            description: description,
        },
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

    const addContentMutation = trpc.topic.addContent.useMutation({
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

    function addContent(id: string) {
        addContentMutation.mutate({
            id: topicId,
            contentId: id,
        });
    }

    function removeContent(id: string) {
        removeContentMutation.mutate({ id: topicId, contentId: id });
    }

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
                        defaultValue={title}
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        label='Description'
                        placeholder='description'
                        defaultValue={description}
                        {...form.getInputProps('description')}
                    />
                </Stack>
                    <Button onClick={submitDetails} mt='lg'>Save details</Button>
            </form>
            <Stack mt='xl'>
                <Title order={4}>Contents</Title>
                <EditContentsForm
                    contents={contents}
                    removeContent={(id) => removeContent(id)}
                    handleSubmit={(id) => addContent(id)}
                />
            </Stack>
        </div>
    );
}
