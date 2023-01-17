import React from 'react';
import { useForm } from '@mantine/form';
import { InferQueryInput } from '../../utils/trpc';
import { AppRouter } from '../../server/trpc/router/_app';
import { TextInput } from '@mantine/core';
import { CreateContentInputType } from "../../types/content";

// TODO data
export const ContentForm: React.FC = () => {
    const form = useForm<CreateContentInputType>();

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <
            <TextInput
                withAsterisk
                label='Title'
                placeholder='Programování a algoritmy'
                {...form.getInputProps('title')}
            />
          <TextInput
                withAsterisk
                label='Email'
                placeholder='your@email.com'
                {...form.getInputProps('title')}
            />
        </form>
    );
};
