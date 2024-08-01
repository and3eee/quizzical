"use client";

import {
  ActionIcon,
  Button,
  Popover,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { Comment } from "../../lib/types";
import CommentCard from "./CommentCard";
import { RiMessageLine } from "react-icons/ri";

export default function CommentGroup(props: { comments: Comment[] }) {
  return (
    <Stack>
    
      {props.comments.map((comment: Comment) => (
        <CommentCard comment={comment} />
      ))}
    </Stack>
  );
}
