import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import type { CreateContentInputType } from '../../types/content';

// TODO data
export const ContentForm: React.FC = () => {
    const form = useForm<CreateContentInputType>();

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
                withAsterisk
                label='Title'
                placeholder='Programování a algoritmy'
                {...form.getInputProps('title')}
            />
            <TextInput
                withAsterisk
                label='Link'
                placeholder='google.com'
                {...form.getInputProps('title')}
            />
        </form>
    );
};
