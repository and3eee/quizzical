import { Card, Group, Paper } from "@mantine/core";
import { QuestionInstance } from "../../lib/types";
import QuestionCard from "./QuestionCard";
import CommentGroup from "../comment/CommentGroup";

export default function QuestionInstanceCard(props: {
  question: QuestionInstance;
  detached?: boolean;
}) {
  return (
    <Paper bg={props.detached ? "gray" : "default"}>
      <Group grow>

        {props.question.question && (
          <QuestionCard attached question={props.question.question} complete={props.question.passed} ranBy={props.question.ranBy} />
        )}

        <CommentGroup comments={props.question.comments} />
      </Group>
    </Paper>
  );
}
