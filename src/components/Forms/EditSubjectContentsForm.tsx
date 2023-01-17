import type { Content } from '@prisma/client';
import { trpc } from '../../utils/trpc';
import { EditContentsForm } from './EditContentsForm';

interface EditContentsFormProps {
    subjectId: string;
    contents: Content[];
    onAdded: () => void;
}

export function EditSubjectContentsForm({
    contents,
    subjectId,
    onAdded,
}: EditContentsFormProps) {
    const utils = trpc.useContext();

    const addContent = trpc.subject.addContent.useMutation({
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });

    function handleSubmit(id: string) {
        addContent.mutate({
            id: subjectId,
            contentId: id,
        });
        onAdded();
    }

    return (
        <EditContentsForm
            contents={new Set(contents.map((c) => c.id))}
            handleSubmit={handleSubmit}
        />
    );
}
