"use client";

import { Button, Container, Group, Text } from "@mantine/core";
import QuestionBank from "./question/QuestionBank";
import SessionGenerator from "./session/SessionGenerator";


export default function NavBar() {
  return (
    <Container p="2" fluid>
      <Group px="2rem" py={6} gap="xl" justify="space-between">
        <QuestionBank/>
        <Text size="xl">Quizzical</Text>
       <SessionGenerator/>
      </Group>
    </Container>
  );
}
