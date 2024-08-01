"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { Question } from "../../lib/types";

export default async function CreateQuestion(input: Question) {
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
