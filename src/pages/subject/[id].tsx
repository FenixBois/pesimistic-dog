import { SubjectDetail } from '../../components/Subject';
import { Layout } from '../../components/Layout';
import type { GetServerSideProps } from 'next';
import type { Subject } from '@prisma/client';

export default function Subject({ id }: { id: Subject['id'] }) {
    return (
        <Layout>
            <SubjectDetail id={String(id)} />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    return { props: { id } };
};
