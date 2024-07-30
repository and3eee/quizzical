"use server";

import { Container } from "@mantine/core";
import QuestionCreator from "../../components/question/QuestionCreator";
import { prisma } from "../../lib/prisma";

export default async function QuestionPage() {
  const questions = await prisma.question.findMany();

  return (
    <Container>
      <QuestionCreator />
    </Container>
  );
}
