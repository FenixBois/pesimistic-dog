import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.subject.create({
        data: {
            title: 'Math',
            description: 'Math is a subject',
            studyProgramme: {
                create: {
                    title: 'An epic study programme',
                    school: {
                        create: {
                            name: 'An epic school',
                        },
                    },
                },
            },
            teacher: {
                create: {
                    name: 'Jiri Rezler',
                    email: 'jiri.rezler@oracle.com',
                    role: 'TEACHER',
                },
            },
            contents: {
                create: [
                    {
                        content: {
                            create: {
                                title: 'Basic mathematics',
                                link: 'https://example.com',
                            },
                        },
                    },
                    {
                        content: {
                            create: {
                                title: 'Quantum mechanics for dummies',
                                link: 'https://example.com',
                            },
                        },
                    },
                ],
            },
            topics: {
                create: {
                    title: 'Discrete mathematics',
                    description:
                        'This chapter will walk you through the basics of discrete mathematics',
                    orderNumber: 1,
                    contents: {
                        create: [
                            {
                                content: {
                                    create: {
                                        title: 'Information theory',
                                        link: 'https://example.com',
                                    },
                                },
                            },
                            {
                                content: {
                                    create: {
                                        title: 'Combinatorics',
                                        link: 'https://example.com',
                                    },
                                },
                            },
                        ],
                    },
                },
            },
            numberOfCredits: 5,
            degreeOfStudy: 'BC',
            language: 'EN',
        },
    });

    await prisma.user.create({
        data: {
            name: 'Martin Macura',
            email: 'marty.party@unicorn.com',
            role: 'TEACHER',
        },
    });

    await prisma.user.create({
        data: {
            name: 'Adam Tretera',
            email: 'adam.tretera@gmail.com',
            role: 'DEPARTMENT_OF_ACADEMIC_AFFAIRS',
        },
    });

    await prisma.user.create({
        data: {
            name: 'Honza Kral',
            email: 'jan.siegl@awesome.com',
            role: 'STUDENT',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
