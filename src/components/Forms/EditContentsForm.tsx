import { Button, Group, Select, Stack, Title } from "@mantine/core";
import { ContentCard } from "components/Content";
import type { Content } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { useForm } from "@mantine/form";

interface EditContentsFormProps {
    contents: Content[];
    removeContent: (id: string) => void;
    handleSubmit: (id: string) => void;
}

export function EditContentsForm({contents, removeContent, handleSubmit} : EditContentsFormProps) {
    const { data: databaseContents } = trpc.content.getAll.useQuery();

    const form = useForm({
        initialValues: {
            newContentId: '',
        },
    });

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
                    <Button onClick={() => handleSubmit(form.values.newContentId)}>Add</Button>
                </Group>
            </form>
            <Title order={5} mb={20}>
                Already added contents
            </Title>

            <Stack>{contents.map(({ id, title, link }) => (
                <ContentCard
                    key={id}
                    title={title}
                    link={link}
                    removable
                    remove={() => removeContent(id)}
                />
            ))}</Stack>
        </div>
    )
}