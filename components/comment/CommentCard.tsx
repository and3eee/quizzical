import { Card, Text } from "@mantine/core";
import { Comment } from "../../lib/types";

export default function CommentCard(props: { comment: Comment }) {
  return (
    <Card>
      <Text>{props.comment.content}</Text>
    </Card>
  );
}
