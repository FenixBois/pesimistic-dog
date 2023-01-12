import { Button, Group, Title } from '@mantine/core';
import { trpc } from "../../utils/trpc";
import { ContentCard } from "components/Content";
import { FormModal } from "../utils";
import { useState } from "react";
import { CreateContentForm } from "components/Forms";

export function ContentPage() {
    const utils = trpc.useContext();
    const contents = trpc.content.getAll.useQuery().data
    const deleteContentMutation = trpc.content.delete.useMutation({
        onError: (error: string | undefined) => {
            throw new Error(error);
        },
        onSuccess: async () => {
            await utils.content.invalidate()
        }
    })

    const [contentModalState, setContentModalState] = useState(false);

    function removeContent(id: string) {
        deleteContentMutation.mutate({ id: id });
    }

    return (
        <>
            <Group spacing='xl'>
                <Title>Contents</Title>
                <Button onClick={() => setContentModalState(true)}>Add a content</Button>
                <FormModal
                    title='Edit subject details'
                    state={contentModalState}
                    setState={setContentModalState}
                >
                    <CreateContentForm submit={() => setContentModalState(false)} />
                </FormModal>
            </Group>
            {contents?.map(({ id, title, link }) => (
                <ContentCard key={id} id={id} title={title} link={link} editable removable remove={() => removeContent(id)}/>
            ))}
        </>
    );
}
