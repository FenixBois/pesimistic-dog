import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { trpc } from '../../utils/trpc';
import type { Subject } from '@prisma/client';
import {
    editSubjectInput,
    editSubjectInputData,
    EditSubjectInputType,
} from '../../types/subject';

interface EditSubjectFormProps {
    subject: Subject;
    submit: () => void;
}

export function EditSubjectForm({ subject, submit }: EditSubjectFormProps) {
    const teachers = trpc.user.getAllTeachers.useQuery().data;
    const utils = trpc.useContext();
    const editSubjectMutation = trpc.subject.edit.useMutation({
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subject.id });
            submit();
        },
    });

    const form = useForm<Omit<EditSubjectInputType, 'id'>>({
        initialValues: {
            title: subject.title,
            description: subject.description,
            numberOfCredits: subject.numberOfCredits,
            degreeOfStudy: subject.degreeOfStudy,
            language: subject.language,
            teacherId: subject.teacherId,
        },
        validateInputOnBlur: true,
        validate: zodResolver(editSubjectInputData),
    });

    if (editSubjectMutation.isLoading) return <p>Editing subject...</p>;
    if (editSubjectMutation.isError)
        return <p>{editSubjectMutation.error.message}</p>;

    return (
        <form
            onSubmit={form.onSubmit((v) =>
                editSubjectMutation.mutate({ ...v, id: subject.id })
            )}
        >
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
                    <Button type='submit'>Save</Button>
                </Group>
            </Stack>
        </form>
    );
}
