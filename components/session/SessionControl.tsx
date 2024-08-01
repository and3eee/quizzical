"use server";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { Question, Session } from "../../lib/types";
import { QuestionInstance } from "@prisma/client";

export async function CreateSession(input: Session) {
  const out = await prisma.session.create({
    data: {
      date: input.date,
      createdOn: new Date(),
      tags: input.tags,
      coreTags: input.coreTags,
      name: input.name,
    },
  });

  if (!out) return false;

  redirect("/" + out.id);
}

export async function DeleteSession(input: Session) {
  const out = await prisma.session.delete({
    where: {
      id: input.id,
    },
  });

  if (!out) return false;

  redirect("/");
}

export async function SetSessionQuestions(
  input: Session | any,
  selected: Question[]
) {
  console.log(selected);
  const dif_ids = selected
    .filter(
      (question: Question) =>
        !input.QuestionInstance?.some(
          (instance: any) => instance.question?.id == question.id
        )
    )
    .map((question: Question) => {
      return {
        questionId: question.id!,
      };
    });

  const removal = input.questions
    ? input.questions
        .filter(
          (question: Question) =>
            !selected.some((instance) => instance.id == question.id)
        )
        .map((question: Question) => {
          return {
            id: question.id!,
          };
        })
    : [];
    console.log(removal);
 

  const out = await prisma.session.update({
    where: { id: input.id },
    data: {
      questions: {
        connect: selected.map((question: Question) => {
          return { id: question.id };
        }),
        disconnect: removal,
      },
      QuestionInstance: {
        createMany: { data: dif_ids },
      },
    },
    include: { QuestionInstance: true },
  });

  return out;
}
