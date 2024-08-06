"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { Question } from "../../lib/types";

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
      expectedMinutes: (input.expectedMinutes ?? 5),
    },
  });

  if (!out) return false;


}

export async function EditQuestion(input: Question, quesid:number) {
  const update = await prisma.question.update({
    where: {
      id: quesid,
    },
    data:{
      content: input.content,
      tags: input.tags,
      answer: input.answer,
      level: input.level,
      isCoreQuestion: input.isCoreQuestion,
      lastReviewed: input.lastReviewed,
      userId: 0,
      expectedMinutes: input.expectedMinutes
    },
  });
}
