"use client";
import {
  Button,
  Checkbox,
  Group,
  Paper,
  Text,
  Stack,
  Table,
  TagsInput,
  TextInput,
  Title,
  Center,
  rem,
  keys,
  Divider,
} from "@mantine/core";
import { Question, QuestionInstance, Session } from "../../lib/types";
import {
  RiAlignCenter,
  RiArrowDownWideLine,
  RiArrowUpWideLine,
  RiSearch2Fill,
} from "react-icons/ri";
import { useState } from "react";
import { Router } from "next/router";
import { SetSessionQuestions } from "../session/SessionControl";
import { useRouter } from "next/navigation";
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

export default function QuestionSelectTable(props: {
  questions: Question[] | any[];
  session: any;
}) {
  const data = props.questions;

  const [search, setSearch] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<Question[]>(
    props.session.questions ?? []
  );

  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Question | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (
      reversed ? (
        <RiArrowUpWideLine />
      ) : (
        <RiArrowDownWideLine />
      )
    ) : (
      <RiAlignCenter />
    );
    return (
      <Table.Th>
        <Paper onClick={onSort}>
          <Group justify="space-between">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center>{Icon}</Center>
          </Group>
        </Paper>
      </Table.Th>
    );
  }

  function filterData(data: Question[], search: string, tags: string[]) {
    const query = search.toLowerCase().trim();
    const wrap = tags.map((value: string) => {
      return value.toLowerCase();
    });

    const hold = data.filter((item: Question) =>
      item.tags.some(
        (tag: string) => wrap.includes(tag.toLowerCase()) || tags.length == 0
      )
    );
    return hold.filter((item) =>
      keys(data[0]).some((key) =>
        item[key]?.toString().toLowerCase().includes(query)
      )
    );
  }

  function sortData(
    data: Question[],
    payload: {
      sortBy: keyof Question | null;
      reversed: boolean;
      search: string;
      tags: string[];
    }
  ) {
    const { sortBy } = payload;

    if (!sortBy) {
      return filterData(data, payload.search, payload.tags);
    }

    return filterData(
      [...data].sort((a, b) => {
        if (typeof b === "number" && typeof a === "number") {
          if (payload.reversed) return a[sortBy] - b[sortBy];
          return b[sortBy] - a[sortBy];
        }

        if (payload.reversed) {
          return b[sortBy]!.toString().localeCompare(a[sortBy]!.toString());
        }

        return a[sortBy]!.toString().localeCompare(b[sortBy]!.toString());
      }),
      payload.search,
      payload.tags
    );
  }

  const setSorting = (field: keyof Question) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search, tags }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
        tags: tags,
      })
    );
  };

  const handleTagChange = (input: string[]) => {
    if (input) setTags(input);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search: search,
        tags: input,
      })
    );
  };

  const handleSelectChange = async (input: any, question: Question) => {
    if (input && !selected.some((run) => run.id == question.id)) {
      selected.push(question);
    
      setSelected(selected);
    }

    if (!input && selected.some((run) => run.id == question.id)) {
      setSelected(selected.filter((run) => run.id != question.id));
    }
  };

  const router = useRouter();

  const saveSelected = async () => {
    const resp = await SetSessionQuestions(props.session, selected);

    if (resp) router.refresh();
  };
console.log(selected)

  const rows = sortedData.map((question) => (
    <Table.Tr key={question.id}>
      <Table.Td>{question.content}</Table.Td>
      <Table.Td>{question.answer}</Table.Td>
      <Table.Td>{question.tags}</Table.Td>
      <Table.Td>{question.level}</Table.Td>
      <Table.Td>{question.lastReviewed.toLocaleString() ?? ""}</Table.Td>
      <Table.Td>
        <Checkbox
          indeterminate={
            props.session.QuestionInstance.some(
              (run) => run.question.id === question.id
            ) && !selected.some((run) => run.id == question.id)
          }
          defaultChecked={selected.some((run) => run.id === question.id)}
          onChange={(event) =>
            handleSelectChange(event.currentTarget.checked, question)
          }
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper shadow="xl" withBorder radius={"lg"}>
      <Stack justify="center">
        <Paper bg={"cyan"} p="12" px="1rem" shadow="xl" radius={"lg"}>
          <Group justify="space-between">
            <Title py={8} order={2} c={"white"}>
              Question Bay
            </Title>
            <Group justify="right">
              <Button color="gray">Search By Core Tags</Button>
              <Button color="gray">Search By All Tags</Button>
              <Button color="lime" onClick={saveSelected}>
                Save Questions
              </Button>
            </Group>
          </Group>

          <Group grow justify="space-between">
            <TextInput
              mb="md"
              size="s"
              leftSection={<RiSearch2Fill />}
              value={search}
              onChange={handleSearchChange}
              label="Search"
            />
            <TagsInput
              mb="md"
              size="s"
              label="Filter Tags"
              value={tags}
              onChange={handleTagChange}
            />
          </Group>
          <Text size="xs">{selected.length} Selected</Text>
        </Paper>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Question</Table.Th>
              <Table.Th>Answer</Table.Th>
              <Th
                sorted={sortBy === "tags"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("tags")}
              >
                Tags
              </Th>
              <Th
                sorted={sortBy === "level"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("level")}
              >
                Level
              </Th>
              <Th
                sorted={sortBy === "lastReviewed"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("lastReviewed")}
              >
                Last Reviewed
              </Th>
              <Table.Th>Select</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Stack>
    </Paper>
  );
}
