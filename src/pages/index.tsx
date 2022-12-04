import { type NextPage } from 'next';
import Head from 'next/head';
import StudyProgrammes from './study-programmes';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Subject Manager</title>
                <meta name='description' content='Subject Manager' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <StudyProgrammes />
        </>
    );
};

export default Home;
