import type React from 'react';
import { useForm, zodResolver } from '@mantine/form';
import type { CreateSubjectInputType } from '../../types/subject';
import { createSubjectInput } from '../../types/subject';
import { trpc } from '../../utils/trpc';
import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core';

interface CreateSubjectFormProps {
    onSubmit?: () => void;
}

export const CreateSubjectForm: React.FC<CreateSubjectFormProps> = ({
    onSubmit,
}: CreateSubjectFormProps) => {
    const teachers = trpc.user.getAllTeachers.useQuery().data;
    const studyProgrammes = trpc.studyProgramme.getAll.useQuery().data;
    const createSubjectMutation = trpc.subject.create.useMutation({
        onSuccess: async () => {
            onSubmit?.();
        },
    });

    const form = useForm<CreateSubjectInputType>({
        validateInputOnBlur: true,
        validate: zodResolver(createSubjectInput),
        // @ts-expect-error needed a default value for title, as i received warnings
        //  but no need to pass all the values
        initialValues: {
            title: '',
        },
    });

    if (createSubjectMutation.isLoading) return <p>Creating subject...</p>;
    if (createSubjectMutation.isError)
        return <p>{createSubjectMutation.error.message}</p>;

    return (
        <form onSubmit={form.onSubmit((v) => createSubjectMutation.mutate(v))}>
            <Stack>
                <TextInput
                    label='Title'
                    placeholder='Title'
                    withAsterisk
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
                <Select
                    searchable
                    label='Study programme'
                    nothingFound='No study programmes found'
                    placeholder='Pick a study programme'
                    data={
                        studyProgrammes?.map((s) => ({
                            value: s.id,
                            label: s.title,
                        })) || []
                    }
                    {...form.getInputProps('studyProgrammeId')}
                />
                <Group>
                    <Button type='submit'>Save</Button>
                </Group>
            </Stack>
        </form>
    );
};
