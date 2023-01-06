import type { Content } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { EditContentsForm } from "./EditContentsForm";

interface EditContentsFormProps {
    subjectId: string;
    contents: Content[];
}

export function EditSubjectContentsForm({
    contents,
    subjectId,
}: EditContentsFormProps) {
    const utils = trpc.useContext();

    const addContent = trpc.subject.addContent.useMutation({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: async () => {
            await utils.subject.get.invalidate({ id: subjectId });

            console.log('Success');
        },
    });

    const removeContentMutation = trpc.subject.removeContent.useMutation({
        onError: (error) => {
            console.log(error);
        },
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
    }

    function removeContent(id: string) {
        removeContentMutation.mutate({ id: subjectId, contentId: id });
    }

    return (
        <EditContentsForm
            contents={contents}
            removeContent={removeContent}
            handleSubmit={handleSubmit}
        />
    );
}
