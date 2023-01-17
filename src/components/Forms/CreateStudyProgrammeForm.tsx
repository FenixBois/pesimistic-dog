import { useForm, zodResolver } from '@mantine/form';
import { Button, Select, Stack, TextInput, Title } from '@mantine/core';

import { trpc } from 'utils/trpc';

import { studyProgrammeCreateInput } from 'types/study-programme';
import type { StudyProgrammeCreateInputType } from 'types/study-programme';
import { useQueryClient } from '@tanstack/react-query';

interface CreateStudyProgrammeFormProps {
    submit: () => void;
    schoolId: string;
}

export const CreateStudyProgrammeForm = ({
    submit,
    schoolId,
}: CreateStudyProgrammeFormProps) => {
    const form = useForm<StudyProgrammeCreateInputType>({
        validate: zodResolver(studyProgrammeCreateInput),
        initialValues: {
            schoolId: schoolId,
            title: '',
        },
    });
    const utils = trpc.useContext();

    const createStudyProgramme = trpc.studyProgramme.create.useMutation({
        onSuccess: async () => {
            submit();
            await utils.studyProgramme.getAll.invalidate();
        },
    });

    function createTopic(values: StudyProgrammeCreateInputType) {
        console.log(values);
        createStudyProgramme.mutate({
            title: values.title,
            schoolId: schoolId,
        });
    }

    return (
        <form onSubmit={form.onSubmit(createTopic)}>
            <Stack spacing='lg'>
                <Title order={4}>Create Study Programme</Title>
                <TextInput
                    label='Title'
                    placeholder='Title'
                    {...form.getInputProps('title')}
                />

                <Button type={'submit'}>Add study programme</Button>
            </Stack>
        </form>
    );
};
