import { Button, Select, Title } from '@mantine/core';
import { ContentCard } from 'components/Content';
import type { Content } from '@prisma/client';
import { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { useForm } from '@mantine/form';

interface EditContentsFormProps {
    contents: Content[];
}

export function EditContentsForm({ contents }: EditContentsFormProps) {
    const [contentsState, setContentsState] = useState(contents);
    const {
        isLoading,
        isError,
        data: databaseContents,
        error
    } = trpc.content.getAll.useQuery();

    const form = useForm({
        initialValues: {
            newContentId: ""
        }
    });

    function handleSubmit() {

    }

    function removeContent(id: string) {

    }

    return (
        <div>
            <form>
                <Select
                    searchable
                    data={
                        databaseContents?.map((content) => ({
                            label: content.title,
                            value: content.id
                        })) || []
                    }
                    {...form.getInputProps("newContentId")}
                />
                <Button onClick={() => handleSubmit()}>
                    Add
                </Button>
            </form>
            <Title order={5} mb={20}>
                Already added contents
            </Title>
            {contentsState.map(({ id, title, link }) => (
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
