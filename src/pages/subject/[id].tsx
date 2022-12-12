import { useRouter } from 'next/router';
import { SubjectDetail } from '../../components/Subject';
import { Layout } from '../../components/Layout';

export default function Subject() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
            <SubjectDetail id={String(id)} />
        </Layout>
    );
}
