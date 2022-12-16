import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { trpc } from '../../utils/trpc';
import type { Subject } from '@prisma/client';

interface EditSubjectFormProps {
    subject: Subject;
    submit: () => void;
}

export function EditSubjectForm({ subject, submit }: EditSubjectFormProps) {
    const teachers = trpc.user.getAllTeachers.useQuery().data;
    const utils = trpc.useContext();
    const editSubjectMutation = trpc.subject.edit.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subject.id });
            submit();
        },
    });

    const form = useForm({
        initialValues: {
            title: subject.title,
            description: subject.description,
            numberOfCredits: subject.numberOfCredits,
            degreeOfStudy: subject.degreeOfStudy,
            language: subject.language,
            teacherId: subject.teacherId,
        },
    });

    const handleSubmit = async (values: any) => {
        // TODO: Infer type from tRPC
        editSubjectMutation.mutate({ id: subject.id, ...values });
    };

    if (editSubjectMutation.isLoading) return <p>Editing subject...</p>;
    if (editSubjectMutation.isError)
        return <p>{editSubjectMutation.error.message}</p>;

    return (
        <form>
            <Stack>
                <TextInput
                    label='Title'
                    placeholder='Title'
                    {...form.getInputProps('title')}
                />
                <Textarea
                    label='Description'
                    placeholder='Description'
                    {...form.getInputProps('description')}
                />
                <NumberInput
                    label='Number of credits'
                    placeholder='Number of credits'
                    {...form.getInputProps('numberOfCredits')}
                />
                <Select
                    label='Degree of study'
                    data={[
                        { value: 'BC', label: 'Bachelor' },
                        { value: 'MGR', label: 'Magister' },
                    ]}
                    {...form.getInputProps('degreeOfStudy')}
                />
                <Select
                    label='Language'
                    data={[
                        { value: 'EN', label: 'English' },
                        { value: 'CS', label: 'Czech' },
                    ]}
                    {...form.getInputProps('language')}
                />
                <Select
                    searchable
                    label='Teacher'
                    nothingFound='No teachers found'
                    placeholder='Pick a teacher'
                    data={
                        teachers?.map((teacher) => ({
                            value: teacher.id,
                            label: teacher.name,
                        })) ?? []
                    }
                    {...form.getInputProps('teacherId')}
                />
                <Group>
                    <Button onClick={() => handleSubmit(form.values)}>
                        Save
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}
