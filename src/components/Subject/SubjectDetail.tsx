import { Button, Group, Stack, Title } from "@mantine/core";

export function SubjectDetail() {
    return (
        <Stack>
            <Title>Subject name</Title>
            <Group>
                <Button variant="light">Edit subject details</Button>
                <Button variant="light">Edit contents</Button>
                <Button variant="light" color="red">Delete subject</Button>
            </Group>
            <Stack align="flex-start">
                {/* TODO: Add simple content cards */}
            </Stack>
            <Stack align="flex-start">
                <Button variant="light">Add topic</Button>
                {/* TODO: Add topic cards */}
            </Stack>
        </Stack>
    );
}