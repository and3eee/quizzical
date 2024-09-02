import {
  ActionIcon,
  Text,
  Badge,
  Button,
  Card,
  Group,
  Popover,
  Stack,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { Question } from "../../lib/types";
import { RiMessageLine, RiCheckLine } from "react-icons/ri";
import LinkButton from "./LinkButton";

export default function LinkCard(props: {
  question: Question;
  target: Question;
}) {
  return (
    <Card>
      <Stack gap="sm">
        <Group justify="space-between">
          <Group justify="right" gap="xs">
            {props.question.isCoreQuestion && (
              <Badge color="green">Core Question</Badge>
            )}

            {props.question.tags.map((value) => (
              <Badge key={value} size="sm" color="gray">
                {value}
              </Badge>
            ))}
            <Badge> Level {props.question.level}</Badge>
          </Group>{" "}
          <Group gap="xs">
            <LinkButton question={props.question} target={props.target} />
            <LinkButton
              parentMode
              question={props.question}
              target={props.target}
            />
          </Group>
        </Group>

        <Group grow>
          <Stack>
            <Text c="dimmed"> Question</Text>{" "}
            <Text>{props.question.content}</Text>
          </Stack>

          <Stack>
            <Text c="dimmed"> Answer</Text> <Text>{props.question.answer}</Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
}
