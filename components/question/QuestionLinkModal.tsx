import {
  Tooltip,
  ActionIcon,
  Modal,
  Title,
  Stack,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { RiBookFill, RiBookOpenFill, RiLink } from "react-icons/ri";
import { Question } from "../../lib/types";
import QuestionCard from "./QuestionCard";
import LinkCard from "./LinkCard";

export default function QuestionLinkModal(props: {
  question: Question;
  options: Question[];
}) {
  //Only want questions that have a tag in common and its not already the parent or a child.
  const filteredQuestion: Question[] = props.options.filter((opt) => {
    if (
      opt.tags.some((tag) => props.question.tags.includes(tag)) &&
      opt.id != props.question.id &&
      props.question.parent?.id != opt.id &&
      !props.question.followUps?.some((run) => run.id == opt.id)
    )
      return opt;
  });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label="Link Questions">
        <ActionIcon
          radius="lg"
          color="yellow"
          aria-label={"Link Questions"}
          onClick={open}
        >
          <RiLink />
        </ActionIcon>
      </Tooltip>
      <Modal size="lg" opened={opened} onClose={close} title="Link Questions">
        <Stack gap="xl">
          {props.question.parent && (
            <Stack align="center">
              <Title order={3}>Parent Question</Title>
              <LinkCard
                question={props.question.parent}
                target={props.question}
              />
            </Stack>
          )}

          {props.question.followUps && props.question.followUps.length > 0 && (
            <Stack align="center">
              <Title order={3}>Child Question(s)</Title>{" "}
              {props.question.followUps?.map((quest: Question) => (
                <LinkCard
                  key={quest.content}
                  question={quest}
                  target={props.question}
                />
              ))}
            </Stack>
          )}
          {filteredQuestion && (
            <Stack align="center">
              <Title order={3}>Related Questions</Title>
              <ScrollArea mah={650}>
                <Stack gap="xs">
                {filteredQuestion!.map((quest: Question) => (
                  <LinkCard
                    key={quest.content}
                    question={quest}
                    target={props.question}
                  />
                ))}</Stack>
              </ScrollArea>
            </Stack>
          )}
        </Stack>
      </Modal>
    </>
  );
}
