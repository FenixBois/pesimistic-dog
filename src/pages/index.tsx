import { type NextPage } from 'next';
import Head from 'next/head';
import { StudyProgrammePage } from 'components/StudyProgramme';
import { Layout } from 'components/Layout';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Subject Manager</title>
                <meta name='description' content='Subject Manager' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <StudyProgrammePage />
            </Layout>
        </>
    );
};

export default Home;
