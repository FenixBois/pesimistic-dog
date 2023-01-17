import type { Content } from '@prisma/client';
import { ContentCard } from '../Content';
import { ActionIcon, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { EditTopicForm } from 'components/Forms/EditTopicForm';
import { useState } from 'react';
import { FormModal, DeleteConfirmationModal } from 'components/utils';
import { trpc } from '../../utils/trpc';

interface TopicCardProps {
    subjectId: string;
    topicId: string;
    title: string;
    description: string;
    contents: Content[];
    editable?: boolean;
    edit?: () => void;
    removable?: boolean;
    remove?: () => void;
}

export function TopicCard({
    subjectId,
    topicId,
    title,
    description,
    contents,
    removable,
    editable,
    edit,
}: TopicCardProps) {
    const utils = trpc.useContext();
    const [editTopicModalState, setEditTopicModalState] = useState(false);
    const [deleteTopicModalState, setDeleteTopicModalState] = useState(false);

    const removeTopicMutation = trpc.topic.delete.useMutation({
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });
        },
    });

    const removeContentMutation = trpc.topic.removeContent.useMutation({
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });
        },
    });

    function removeTopic() {
        removeTopicMutation.mutate({ id: topicId });
    }

    const addContentMutation = trpc.topic.addContent.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });

    function removeContent(contentId: string) {
        removeContentMutation.mutate({ contentId, id: topicId });
    }

    function addContent(id: string) {
        addContentMutation.mutate({
            id: topicId,
            contentId: id,
        });
    }

    return (
        <Paper withBorder radius='md' p='lg'>
            <Group position='apart'>
                <Stack w={400} spacing='xs'>
                    <Title order={4}>{title}</Title>
                    <Text>{description}</Text>
                </Stack>
                <Stack>
                    {removable && (
                        <div>
                            <ActionIcon
                                variant='outline'
                                color='red'
                                onClick={() => setDeleteTopicModalState(true)}
                            >
                                <XMarkIcon />
                            </ActionIcon>
                            <DeleteConfirmationModal
                                title='Are you sure you want to delete this topic?'
                                deleteModalState={deleteTopicModalState}
                                setDeleteModalState={(state) =>
                                    setDeleteTopicModalState(state)
                                }
                                confirmDelete={removeTopic}
                            />
                        </div>
                    )}
                    {editable && (
                        <div>
                            <ActionIcon
                                variant='outline'
                                onClick={() => setEditTopicModalState(true)}
                            >
                                <AdjustmentsVerticalIcon width={18} />
                            </ActionIcon>
                            <FormModal
                                title='Edit Topic'
                                state={editTopicModalState}
                                setState={setEditTopicModalState}
                            >
                                <EditTopicForm
                                    subjectId={subjectId}
                                    topicId={topicId}
                                    contents={contents}
                                    title={title}
                                    description={description}
                                />
                            </FormModal>
                        </div>
                    )}
                </Stack>
            </Group>
            <Stack mt={20}>
                {contents?.map(({ id, title, link }) => (
                    <ContentCard
                        key={id}
                        id={id}
                        title={title}
                        link={link}
                        editable={editable}
                        edit={() => edit?.()}
                        removable={editable}
                        remove={() => removeContent(id)}
                    />
                ))}
            </Stack>
        </Paper>
    );
}
