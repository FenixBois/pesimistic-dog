import { Button, Group, Select, Title } from '@mantine/core';
import { ContentCard } from 'components/Content';
import type { Content } from '@prisma/client';
import { trpc } from '../../../utils/trpc';
import { useForm } from '@mantine/form';

interface EditContentsFormProps {
    subjectId: string;
    contents: Content[];
}

export function EditContentsForm({
    contents,
    subjectId,
}: EditContentsFormProps) {
    const {
        data: databaseContents,
    } = trpc.content.getAll.useQuery();
    const utils = trpc.useContext();

    const addContent = trpc.subject.addContent.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });
    const removeContentMutation = trpc.subject.removeContent.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });

    const form = useForm({
        initialValues: {
            newContentId: '',
        },
    });

    function handleSubmit() {
        addContent.mutate({
            id: subjectId,
            contentId: form.values.newContentId,
        });
    }

    function removeContent(id: string) {
        removeContentMutation.mutate({ id: subjectId, contentId: id });
    }

    return (
        <div>
            <form>
                <Group mb={20}>
                    <Select
                        searchable
                        data={
                            databaseContents?.map((content) => ({
                                label: content.title,
                                value: content.id,
                            })) || []
                        }
                        {...form.getInputProps('newContentId')}
                    />
                    <Button onClick={() => handleSubmit()}>Add</Button>
                </Group>
            </form>
            <Title order={5} mb={20}>
                Already added contents
            </Title>

            {contents.map(({ id, title, link }) => (
                <ContentCard
                    key={id}
                    title={title}
                    link={link}
                    removable
                    remove={() => removeContent(id)}
                />
            ))}
        </div>
    );
}
