"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { Question, QuestionInstance } from "../../lib/types";
import { connect } from "http2";
import { auth } from "../../auth";

export async function CreateQuestion(input: Question) {
  const out = await prisma.question.create({
    data: {
      content: input.content,
      tags: input.tags,
      answer: input.answer,
      level: input.level,
      isCoreQuestion: input.isCoreQuestion,
      lastReviewed: new Date(),
      userId: 0,
      expectedMinutes: input.expectedMinutes ?? 5,
    },
  });

  if (!out) return false;
}

export async function EditQuestion(input: Question, quesid: number) {
  return await prisma.question.update({
    where: {
      id: quesid,
    },
    data: {
      content: input.content,
      tags: input.tags,
      answer: input.answer,
      level: input.level,
      isCoreQuestion: input.isCoreQuestion,
      lastReviewed: input.lastReviewed,
      userId: 0,
      expectedMinutes: input.expectedMinutes,
    },
  });
}

export async function LinkQuestions(parent: Question, child: Question) {
  if (parent.parent?.id == child.id) return false;

  const followCall = await prisma.question.update({
    where: { id: parent.id! },
    data: { followUps: { connect: { id: child.id! } } },
  });

  const parentCall = await prisma.question.update({
    where: { id: child.id! },
    data: { parent: { connect: { id: parent.id! } } },
  });

  return true;
}

export async function CreateComment(parent: QuestionInstance, content: string) {
  const session = await auth();

  console.log("Hit")
  if (session?.user)
    return await prisma.comment.create({
      data: {
        author: { connect: { id: session.user.id! } },
        content: content,
        questionInstanceId: parent.id,
        postedOn: new Date(),
      },
    });
}

export async function UnLinkQuestions(parent: Question, child: Question) {
  const followCall = await prisma.question.update({
    where: { id: parent.id! },
    data: { followUps: { disconnect: { id: child.id! } } },
  });

  const parentCall = await prisma.question.update({
    where: { id: child.id! },
    data: { parent: { disconnect: { id: parent.id! } } },
  });

  return true;
}
