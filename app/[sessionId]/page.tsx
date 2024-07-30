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
  console.log(params.sessionId);
  const questions = await prisma.question.findMany();
  const input = await prisma.session.findFirst({
    where: { id: Number.parseInt(params.sessionId) },
    include: {
      QuestionInstance: {
        include: { comments: { include: { author: true } }, ranBy: true },
      },
    },
  });

  if (input) {
    console.log(questions);

    return (
      <div>
        <Stack>
          <Group gap={"xl"} px={32} grow>
            <QuestionSelectTable questions={questions} />
            <InstructorView instances={input.QuestionInstance} />
          </Group>
        </Stack>
      </div>
    );
  }
}
