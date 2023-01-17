import { trpc } from '../../utils/trpc';
import { useForm } from '@mantine/form';

interface CreateTopicFormValues {
    title: string;
    schoolId: string;
}

export const CreateStudyProgramme = () => {
    const utils = trpc.useContext();

    const form = useForm<CreateTopicFormValues>({
        initialValues: {
            title: '',
            schoolId: '',
        },
    });

    const createStudyProgramme = trpc.studyProgramme.create.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            //  await utils.subject.get.invalidate({ id: subjectId });
        },
    });

    function createTopic() {
        createStudyProgramme.mutate({
            ...form.values,
        });
    }

    return (
        <div>
            <h1>Add Study Programme</h1>
        </div>
    );
};
