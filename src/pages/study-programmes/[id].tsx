import type { GetServerSideProps } from 'next';
import { LoadingOverlay, Space, Stack, Title } from '@mantine/core';

import { trpc } from 'utils/trpc';

import { SubjectCard } from '../../components/Subject';
import { Layout } from '../../components/Layout';

export default function StudyProgrammeDetailPage({ id }: { id: string }) {
    const { data, isLoading } = trpc.studyProgramme.get.useQuery({ id });
    const { data: subjects, isLoading: isSubjectsLoading } =
        trpc.subject.getAllForStudyProgramme.useQuery({ id });

    if (isLoading) {
        return (
            <Layout>
                <LoadingOverlay visible={true} />
            </Layout>
        );
    }

    return (
        <Layout>
            {data?.title ? <Title order={1}>{data.title}</Title> : null}
            <Stack pt={20}>
                <LoadingOverlay visible={isSubjectsLoading} />
                {subjects?.map((item) => (
                    <SubjectCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        degree={item.degreeOfStudy}
                        numberOfCredits={item.numberOfCredits}
                        language={item.language}
                    />
                ))}
            </Stack>
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
