import { Divider, Paper, Stack, Title } from "@mantine/core";
import { QuestionInstance } from "../lib/types";
import QuestionInstaceCard from "./question/QuestionInstanceCard";

export default function InstructorView(props:{instances:QuestionInstance[]}) {
  return (
    <Paper >
      <Stack>
        <Title>Instructor Bay</Title>
        <Divider />
        <Stack>
            {props.instances.map((instance) => {
                return <QuestionInstaceCard key={instance.id} question={instance} />;
            })}
        </Stack>
      </Stack>
    </Paper>
  );
}
