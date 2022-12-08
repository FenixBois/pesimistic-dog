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
import type { Prisma, Subject } from '@prisma/client';

interface EditSubjectFormProps {
    subject: Subject;
    submit: (subject: Prisma.SubjectUpdateInput) => void;
}

export function EditSubjectForm({ subject, submit }: EditSubjectFormProps) {
    const form = useForm({
        initialValues: {
            title: subject.title,
            description: subject.description,
            numberOfCredits: subject.numberOfCredits,
            degreeOfStudy: subject.degreeOfStudy,
            language: subject.language,
            // TODO: Add ability to edit teacher
        },
    });

    function handleSubmit(values: Prisma.SubjectUpdateInput) {
        console.log(values);
        submit(values);
    }

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
                <Group>
                    <Button onClick={() => handleSubmit(form.values)}>
                        Save
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}
