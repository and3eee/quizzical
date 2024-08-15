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
  Avatar,
  Tooltip,
  Drawer,
  Modal,
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
import { User } from "@prisma/client";
import { useDisclosure } from '@mantine/hooks';
import  QuestionEditor from "./QuestionEdit"
import { ModalsProvider } from '@mantine/modals'
import { useModals } from '@mantine/modals'
import { DeleteQuestion } from  "./QuestionControl"
import { modals } from "@mantine/modals"
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

export default function QuestionSelectTable(props: {
  questions: Question[] | any[];
  session: any;
  full?: boolean;
}) {
  const data = props.questions;

  const [search, setSearch] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<Question[]>(
    props.session.questions ?? []
  );
  const [editingQues, setEditingQues] = useState<Question | null>(null)

  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Question | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

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
    console.log("IN FILTER DATA");
    console.log(data)
    
    const query = search.toLowerCase().trim();
    const wrap = tags.map((value: string) => {
      return value.toLowerCase();
    });
    console.log(tags);
    // this was yeeting out questions that didn't have tags on them.
    // so if we're specifically searching by tag, then we yeet out ones with no tags, as well as no matching tags
    //but if we're not searching by tag, we don't have to do this whole process.
    let hold = null;
    if (wrap.length > 0)
    {
      hold = data.filter((item: Question) =>
        item.tags.some(
          (tag: string) => (wrap.includes(tag.toLowerCase()) || tags.length == 0)
        )
      );
    }
    else 
    {
      hold = data;
    }
    console.log(hold)
    
    const output = hold.filter((item) =>
      keys(data[0]).some((key) =>
        item[key]?.toString().toLowerCase().includes(query)
      )
    );
    console.log(output);
    return output;
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
      console.log("CONDITION TRUE");
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
    console.log("IN SET SORTING");
    console.log(data);
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
    
    if (input ) {
      selected.push(question);
      const hold = selected.concat([question])
      setSelected(hold);
    }

    if (!input) {
      setSelected(selected.filter((run) => run.id != question.id));
    }
  };

  const router = useRouter();

  const saveSelected = async () => {
    const resp = await SetSessionQuestions(props.session, selected);

    if (resp) router.refresh();
  };

  const reviewedAvatars = (question: any) => {
    if (!question.reviewedBy) return;
    return (
      <Avatar.Group>
        {question.reviewedBy.map((user: User) => (
          <Tooltip label={user.name}>
            <Avatar>
              {user.name.split(" ").map((value) => value.charAt(0))}
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    );
  };

  //SONIKA CHANGE

  const editDrawer = (question:any) => {
    const handleButtonClick = () => {
      open();
      setEditingQues(question);
    }
    return (
      <>
        <Button onClick={handleButtonClick}>Edit</Button>
      </>
    );
  };

  const openDeleteModal = (input: Question) =>
    modals.openConfirmModal({
      title: 'Delete Question',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this question?
        </Text>
      ),
      labels: { confirm: 'Delete Question', cancel: "Cancel"},
      confirmProps: { color: 'red' },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        console.log(input);
        console.log("INPUT.ID", input.id);
        let index_to_remove = 0;
        for (let i = 0; i < data.length; i++)
        {
          if(data[i].id == input.id)
          {
            index_to_remove = i;
          }
        }
        data.splice(index_to_remove, 1)
        console.log(data);
        if (input.id)
        {
          console.log(input.id);
          DeleteQuestion(input.id); 
        }
        setSortedData(sortData(data, {sortBy: sortBy, reversed: false, search, tags}));
      }
    
    })
  
  const delete_question = (input: any) => {

      return  (
      <>
        <Button onClick={() => openDeleteModal(input)} color="red">X</Button>
      
      </>
      )

  }

  const rows = sortedData.map((question) => (
    <Table.Tr key={question.id}>
      <Table.Td>{question.content}</Table.Td>
      <Table.Td>{question.answer}</Table.Td>
      <Table.Td>{question.tags}</Table.Td>
      <Table.Td>{question.level}</Table.Td>
      {props.full && <Table.Td>{reviewedAvatars(question)}</Table.Td>}
      <Table.Td>{question.lastReviewed.toLocaleString() ?? ""}</Table.Td>
      <Table.Td>
        <Checkbox
          variant={
            props.session.QuestionInstance.some(
              (run: any) => run.question.id === question.id
            ) && !selected.some((run) => run.id == question.id)
              ? "outline"
              : "default"
          }
          indeterminate={
            props.session.QuestionInstance.some(
              (run: any) => run.question.id === question.id
            ) && !selected.some((run) => run.id == question.id)
          }
          defaultChecked={selected.some((run) => run.id === question.id)}
          onChange={(event) =>
            handleSelectChange(event.currentTarget.checked, question)
          }
        />
      </Table.Td>
      <Table.Td>{editDrawer(question)}
        {delete_question(question)}
      </Table.Td>
    </Table.Tr>
  ));

  const edit = (input:Question|null) => {
    //console.log(input);
    if (input)
    {
      console.log("INPUT FOUND");
      // const new_data =(data.map((question) => {
      //   if (question.id === input.id){
      //     console.log("REPLACEMENT HAS HAPPENED")
      //     return input;
      //   }
      //   else{
      //     return question;
      //   }
      
   // }))
   for (let i = 0; i < data.length; i++)
    {
      if (data[i].id === input.id)
      {
        data[i] = input;
      }
    }
    close();
    setSortedData(sortData(data, {sortBy: sortBy, reversed: false, search, tags}));
  }
  }

  return (
    <ModalsProvider>
      <Paper shadow="xl" withBorder radius={"lg"}>
        <Stack justify="center">
          <Paper bg={"cyan"} p="12" px="1rem" shadow="xl" radius={"lg"}>
            <Group justify="space-between">
              <Title py={8} order={2} c={"white"}>
                Question Bay
              </Title>
              <Modal opened={opened} onClose={close} title="Authentication">
                {<QuestionEditor
                    editingQues={editingQues}
                    id={editingQues?.id!}
                    callback={edit}/>}
              </Modal>
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
                <Table.Th>Actions</Table.Th>   
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
    </ModalsProvider>
  );
}
