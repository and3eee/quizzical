"use client";
import {
  Checkbox,
  Group,
  Paper,
  Stack,
  Table,
  TagsInput,
  TextInput,
  Title,
} from "@mantine/core";
import { Question, QuestionInstance } from "../../lib/types";

export default function QuestionSelectTable(props: {
  questions: Question[] | any[];
}) {
  const rows = props.questions.map((question) => (
    <Table.Tr key={question.id}>
      <Table.Td>{question.content}</Table.Td>
      <Table.Td>{question.answer}</Table.Td>
      <Table.Td>{question.tags}</Table.Td>
      <Table.Td>{question.level}</Table.Td>
      <Table.Td>{question.lastReviewed.toLocaleString() ?? ""}</Table.Td>{" "}
      <Table.Td>
        <Checkbox />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper shadow="xl" withBorder px="1rem">
      <Stack justify="center">
        <Title py={8} order={3}>Question Bay</Title>
        <Group grow justify="space-between">
          <TextInput size="s" label="Search"  /> <TagsInput size="s"  label="Filter Tags" />
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Question</Table.Th>
              <Table.Th>Answer</Table.Th>
              <Table.Th>Tags</Table.Th>
              <Table.Th>Level</Table.Th>
              <Table.Th>Last Reviewed</Table.Th>
              <Table.Th>Select</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </Paper>
  );
}
