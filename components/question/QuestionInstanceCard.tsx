import { Card, Group } from "@mantine/core";
import { QuestionInstance } from "../../lib/types";
import QuestionCard from "./QuestionCard";

export default function QuestionInstaceCard(props: {
  question: QuestionInstance;
}) {
  return (
    <Group>
      {props.question.id}
      {props.question.question && (
        <QuestionCard question={props.question.question} />
      )}
    </Group>
  );
}
