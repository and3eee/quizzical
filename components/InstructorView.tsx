import { Divider, Paper, Stack, Title } from "@mantine/core";
import { QuestionInstance, Session } from "../lib/types";
import QuestionInstanceCard from "./question/QuestionInstanceCard";

export default function InstructorView(props: {
  session: Session |any ;
  instances: QuestionInstance[] | any[];
}) {
  return (
    <Paper>
      <Stack>
        <Title>Instructor Bay</Title>
        <Divider />
        <Stack>
          {props.instances.map((instance) => {
            return (
              <QuestionInstanceCard
                detached={!props.session.questions?.some(
                  (question: any) => question.id === instance.questionId
                )}
                key={instance.id}
                question={instance}
              />
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
