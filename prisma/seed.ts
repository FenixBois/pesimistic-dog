import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const math = await prisma.subject.create({
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
            numberOfCredits: 5,
            degreeOfStudy: 'BC',
            language: 'EN',
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
