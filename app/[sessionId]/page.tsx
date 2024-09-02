import { Group, Stack } from "@mantine/core";
import SessionCard from "../../components/session/SessionCard";
import { prisma } from "../../lib/prisma";
import { Session } from "../../lib/types";
import QuestionSelectTable from "../../components/question/QuestionSelectTable";
import InstructorView from "../../components/InstructorView";

export async function generateStaticParams() {
  const posts = await prisma.session.findMany({});

  return posts.map((session) => ({
    slug: session.id,
  }));
}

export default async function SessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const questions = await prisma.question.findMany({
    include: {
      parent: true,
      followUps: true,
      reviewComments: { include: { author: true } },
      reviewedBy: true,
    },
  });
  const input = await prisma.session.findFirst({
    where: { id: Number.parseInt(params.sessionId) },
    include: {
      questions: true,
      QuestionInstance: {
        include: {
          comments: { include: { author: true } },
          question: { include: { followUps: true, parent: true } },
          ranBy: true,
        },
      },
    },
  });

  if (input) {
    return (
      <div>
        <Stack p="2rem">
 
            <QuestionSelectTable questions={questions} session={input} />
            <InstructorView
              session={input}
              instances={input.QuestionInstance}
            />
     
        </Stack>
      </div>
    );
  }
}
