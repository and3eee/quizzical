"use client";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Popover,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { Question, User } from "../../lib/types";
import { RiCheckLine, RiMessageLine } from "react-icons/ri";

export default function QuestionCard(props: {
  question: Question;
  attached?: boolean;
  complete?: boolean;
  ranBy?: User;
}) {
  const assign = () => {};

  const comment = () => {};

  return (
    <Card mih="15rem" w="40rem"  withBorder={props.complete}>
      <Stack gap="sm">
        <Group justify="right">
          {props.question.isCoreQuestion && (
            <Badge color="green">Core Question</Badge>
          )}
          <Group justify="right" gap="xs">
            {props.question.tags.map((value) => (
              <Badge key={value} size="sm" color="gray">
                {value}
              </Badge>
            ))}
            <Badge> Level {props.question.level}</Badge>
          </Group>
          {props.attached && (
            <Group>
              <Popover
                width={300}
                trapFocus
                position="bottom"
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <Tooltip label="Add Comment">
                    <ActionIcon radius={"md"} variant="outline">
                      <RiMessageLine />
                    </ActionIcon>
                  </Tooltip>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack justify="center" gap="md">
                    <Textarea
                      label="Comment"
                      placeholder="Type your comment here..."
                      size="xs"
                    />
                    <Button>Submit</Button>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Group>
          )}
          {props.complete && (
            <Badge size="xl" circle>
              <RiCheckLine />
            </Badge>
          )}

          {props.ranBy && (
            <Avatar>
              {" "}
              {props.ranBy.name.split(" ").map((value) => value.charAt(0))}
            </Avatar>
          )}

          {!props.ranBy && props.attached && (
            <Button radius="lg"> Take it! </Button>
          )}
        </Group>

        <Stack>
          <Text c="dimmed"> Question</Text>{" "}
          <Text>{props.question.content}</Text>
          <Text c="dimmed"> Answer</Text> <Text>{props.question.answer}</Text>
        </Stack>
      </Stack>
    </Card>
  );
}
