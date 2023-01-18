import { Button, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { trpc } from '../../utils/trpc';
import { ContentCard } from '../Content';
import { TopicCard } from './TopicCard';
import { useState } from 'react';
import {
    CreateContentForm,
    EditSubjectContentsForm,
    EditSubjectForm,
} from 'components/Subject';
import { useRouter } from 'next/router';
import { DeleteConfirmationModal, FormModal } from 'components/utils';
import { CreateTopicForm } from '../Forms/CreateTopicForm';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';

interface SubjectDetailProps {
    id: string;
}

export function SubjectDetail({ id }: SubjectDetailProps) {
    const router = useRouter();
    const utils = trpc.useContext();
    const role = useSession().data?.user?.role;
    const canEditSubject =
        !!role &&
        (
            [Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS, Role.TEACHER] as Role[]
        ).includes(role);
    const canRemoveSubject =
        !!role && role === Role.DEPARTMENT_OF_ACADEMIC_AFFAIRS;

    const {
        isLoading,
        isError,
        data: subject,
        error,
    } = trpc.subject.get.useQuery({ id });

    const deleteSubjectMutation = trpc.subject.delete.useMutation({
        onSuccess: () => {
            router.push('/subjects');
        },
    });

    const addContentMutation = trpc.subject.addContent.useMutation({
        onSettled: async () => {
            setCreateContentModalState(false);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id });
        },
    });

    const removeContentMutation = trpc.subject.removeContent.useMutation({
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: id });
        },
    });

    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editContentsModalState, setEditContentsModalState] = useState(false);
    const [createTopicModalState, setCreateTopicModalState] = useState(false);
    const [createContentModalState, setCreateContentModalState] =
        useState(false);

    function handleDelete() {
        if (!subject) return;
        deleteSubjectMutation.mutate({ id: subject.id });
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError || subject === null) return <p>{error?.message}</p>;

    return (
        <Stack>
            <Flex justify='space-between'>
                <Title>{subject.title}</Title>

                <Group>
                    {canEditSubject && (
                        <>
                            <Button
                                variant='light'
                                onClick={() => setEditModalState(true)}
                            >
                                Edit subject details
                            </Button>
                            <FormModal
                                title='Edit subject details'
                                state={editModalState}
                                setState={setEditModalState}
                            >
                                <EditSubjectForm
                                    subject={subject}
                                    submit={() => setEditModalState(false)}
                                />
                            </FormModal>
                        </>
                    )}
                    {canRemoveSubject && (
                        <>
                            <Button
                                variant='light'
                                color='red'
                                onClick={() => setDeleteModalState(true)}
                            >
                                Delete subject
                            </Button>
                            <DeleteConfirmationModal
                                title='Are you sure you want to delete this subject?'
                                deleteModalState={deleteModalState}
                                setDeleteModalState={(state) =>
                                    setDeleteModalState(state)
                                }
                                confirmDelete={handleDelete}
                            />
                        </>
                    )}
                </Group>
            </Flex>
            <Text>{subject.description}</Text>
            <Title order={5}>
                Teacher: {subject.teacher.name}, Credits:{' '}
                {subject.numberOfCredits}, Degree: {subject.degreeOfStudy},
                Language: {subject.language}
            </Title>
            <Stack align={'stretch'}>
                {subject.contents.map(({ content }) => (
                    <ContentCard
                        key={content.id}
                        {...content}
                        removable={canEditSubject}
                        editable={canEditSubject}
                        edit={() => {
                            utils.subject.get.invalidate({ id });
                        }}
                        remove={() =>
                            removeContentMutation.mutate({
                                id,
                                contentId: content.id,
                            })
                        }
                    />
                ))}
                {canEditSubject && (
                    <Flex gap='md'>
                        <Button
                            variant='light'
                            onClick={() => setEditContentsModalState(true)}
                        >
                            Add existing content
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
                                onAdded={() => setEditContentsModalState(false)}
                            />
                        </FormModal>
                        <FormModal
                            state={createContentModalState}
                            setState={setCreateContentModalState}
                            title='Create content'
                        >
                            <CreateContentForm
                                submit={(content) =>
                                    addContentMutation.mutate({
                                        contentId: content.id,
                                        id,
                                    })
                                }
                            ></CreateContentForm>
                        </FormModal>
                        <Button
                            onClick={() => setCreateContentModalState(true)}
                        >
                            Create content
                        </Button>
                    </Flex>
                )}
            </Stack>
            <Stack>
                <FormModal
                    state={createTopicModalState}
                    setState={setCreateTopicModalState}
                    title='Create topic'
                >
                    <CreateTopicForm
                        subjectId={subject.id}
                        onSubmit={() => {
                            utils.subject.get.invalidate({ id: subject.id });
                            setCreateTopicModalState(false);
                        }}
                    />
                </FormModal>
                {subject.topics.map(({ id, title, description, contents }) => (
                    <TopicCard
                        key={id}
                        subjectId={subject.id}
                        topicId={id}
                        title={title}
                        description={description}
                        contents={contents.map(({ content }) => content)}
                        removable={canEditSubject}
                        editable={canEditSubject}
                        edit={() => utils.subject.get.invalidate()}
                        remove={() => utils.subject.get.invalidate()}
                    />
                ))}
                {canEditSubject && (
                    <Button
                        variant='light'
                        onClick={() => setCreateTopicModalState(true)}
                    >
                        Add topic
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
