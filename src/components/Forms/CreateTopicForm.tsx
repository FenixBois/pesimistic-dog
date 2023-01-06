import { Button, Stack, TextInput, Title } from "@mantine/core";
import type { Content } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { useForm } from "@mantine/form";
import { EditContentsForm } from "./EditContentsForm";

interface CreateTopicFormProps {
    subjectId: string;
    contents: Content[];
}

export function CreateTopicForm({
                                  subjectId,
                                  contents,
                              }: CreateTopicFormProps) {
    const utils = trpc.useContext();
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            contents: [],
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

    function addContent(id: string) {
        form.values.contents.push(id)
    }

    function removeContent(id: string) {
        
    }

    function createTopic(id: string) {
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
            </form>
            <Stack mt='xl'>
                <Title order={4}>Contents</Title>
                <EditContentsForm
                    contents={contents}
                    removeContent={(id) => removeContent(id)}
                    handleSubmit={(id) => addContent(id)}
                />
            </Stack>
            <Button onClick={createTopic} mt='lg'>Create topic</Button>
        </div>
    );
}
