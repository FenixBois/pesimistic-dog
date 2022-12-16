import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { ContentCard } from "../Content";
import { TopicCard } from "./TopicCard";
import { useState } from "react";
import { EditSubjectContentsForm, EditSubjectForm } from "components/Subject";
import { useRouter } from "next/router";
import { FormModal, DeleteConfirmationModal } from "components/utils";

interface SubjectDetailProps {
    id: string;
}

export function SubjectDetail({ id }: SubjectDetailProps) {
    const router = useRouter();
    const {
        isLoading,
        isError,
        data: subject,
        error,
    } = trpc.subject.get.useQuery({
        id,
    }); // TODO: Throws error when page is loaded directly and id is still undefinded

    const deleteSubjectMutation = trpc.subject.delete.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            router.push('/subjects');
        },
    });

    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editContentsModalState, setEditContentsModalState] = useState(false);

    function handleDelete() {
        if (!subject) return;
        deleteSubjectMutation.mutate({ id: subject.id });
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError || subject === null) return <p>{error?.message}</p>;

    return (
        <Stack>
            <Title>{subject.title}</Title>
            <Text>{subject.description}</Text>
            <Title order={5}>
                Teacher: {subject.teacher.name}, Credits:{' '}
                {subject.numberOfCredits}, Degree: {subject.degreeOfStudy},
                Language: {subject.language}
            </Title>
            <Group>
                <Button variant='light' onClick={() => setEditModalState(true)}>
                    Edit subject details
                </Button>
                <FormModal
                    title='Edit subject details'
                    state={editModalState}
                    setState={setEditModalState}
                >
                    <EditSubjectForm subject={subject} submit={() => setEditModalState(false)} />
                </FormModal>
                <Button
                    variant='light'
                    onClick={() => setEditContentsModalState(true)}
                >
                    Edit contents
                </Button>
                <FormModal
                    state={editContentsModalState}
                    setState={setEditContentsModalState}
                    title='Edit contents'
                >
                    <EditSubjectContentsForm
                        contents={subject.contents.map(
                            ({ content }) => content
                        )}

                        subjectId={subject.id}
                    />
                </FormModal>
                <Button
                    variant='light'
                    color='red'
                    onClick={() => setDeleteModalState(true)}
                >
                    Delete subject
                </Button>
                <DeleteConfirmationModal title="Are you sure you want to delete this subject?" deleteModalState={deleteModalState} setDeleteModalState={(state) => setDeleteModalState(state)} confirmDelete={handleDelete}/>
            </Group>
            <Stack align='flex-start'>
                {subject.contents.map(({ content }) => (
                    <ContentCard
                        key={content.id}
                        title={content.title}
                        link={content.link}
                    />
                ))}
            </Stack>
            <Stack align='flex-start'>
                {/*<Button variant='light'>Add topic</Button>*/}
                {subject.topics.map(({ id, title, description, contents }) => (
                    <TopicCard
                        key={id}
                        subjectId={subject.id}
                        topicId={id}
                        title={title}
                        description={description}
                        contents={contents.map(({ content }) => content)}
                        removable
                        editable
                    />
                ))}
            </Stack>
        </Stack>
    );
}
