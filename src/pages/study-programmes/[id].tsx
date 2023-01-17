import type { GetServerSideProps } from 'next';
import { trpc } from '../../utils/trpc';
import { Layout } from '../../components/Layout';

import { LoadingOverlay, Title } from '@mantine/core';

export default function StudyProgrammeDetailPage({ id }: { id: string }) {
    const { data, isLoading } = trpc.studyProgramme.get.useQuery({ id });

    if (isLoading) {
        return <LoadingOverlay visible={true} />;
    }

    return (
        <Layout>
            {data?.title ? <Title order={1}>{data.title}</Title> : null}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    return {
        props: {
            id,
        },
    };
};
