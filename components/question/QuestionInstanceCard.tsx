"use client";
import { Card, Group, Paper } from "@mantine/core";
import { QuestionInstance } from "../../lib/types";
import QuestionCard from "./QuestionCard";
import CommentGroup from "../comment/CommentGroup";
import RatingButton from "./RatingButton";
import { useRouter } from "next/navigation";
import { CreateComment } from "./QuestionControl";

export default function QuestionInstanceCard(props: {
  question: QuestionInstance;
  detached?: boolean;
}) {

  const router = useRouter();

  const onComment = async(input:string) => {
    console.log("resp")
    const resp = await CreateComment(props.question,input)


    if(resp)
    router.refresh()
    
  }
  return (
    <Paper withBorder={props.detached ? true : false}>
      <Group justify="space-between">
        {props.question.question && (
          <QuestionCard
            attached
            question={props.question.question}
            complete={props.question.passed}
            ranBy={props.question.ranBy}
          />
        )}
        <RatingButton question={props.question} />
        <CommentGroup comments={props.question.comments} submitComment={onComment} />
      </Group>
    </Paper>
  );
}
