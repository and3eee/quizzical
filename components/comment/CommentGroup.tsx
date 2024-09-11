"use client";

import {
  ActionIcon,
  Button,
  Paper,
  Text,
  Popover,
  Stack,
  TextInput,
  Tooltip,
  Group,
  Textarea,
} from "@mantine/core";
import { Comment } from "../../lib/types";
import CommentCard from "./CommentCard";
import { RiMessageLine } from "react-icons/ri";
import { useState } from "react";

export default function CommentGroup(props: {
  comments: Comment[];
  submitComment?: (input:string) => void;
}) {
  const [commentField, setComment] = useState('');
  return (
    <Paper w="40rem" withBorder mih="15rem">
      <Stack mih="14rem" align="center" justify="space-between" gap="sm">
        <Text c="dimmed">Comments</Text>
        {props.submitComment && (
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
                    value={commentField}
                    onChange={(event) => setComment(event.currentTarget.value)}
                    size="xs"
                  />
                  <Button onClick={() => {props.submitComment!(commentField)}}>Submit</Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
