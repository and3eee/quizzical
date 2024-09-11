"use client";
import { useState } from "react";
import { Question, QuestionInstance } from "../../lib/types";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Card,
  Slider,
  Stack,
  Transition,
  Tooltip,
} from "@mantine/core";
import {
  RiArrowDownDoubleFill,
  RiArrowUpDoubleFill,
  RiCheckFill,
  RiCloseFill,
  RiCodeFill,
  RiCrossFill,
} from "react-icons/ri";

export default function RatingButton(props: {
  question: QuestionInstance;
  max?: number;
}) {
  const [rating, setRating] = useState<number>(props.question.rating);
  const [opened, setOpened] = useState(false);
  const submitRating = (input: number) => {
    setRating(input);
  };

  const val = rating >-1;
  const pos = rating < (props.max ?? 10) / 2;

  return (
    <Container>
      <Card radius="xl" withBorder p="6">
        <Stack align="center">
          <ActionIcon
            variant={ val && !pos ?  "filled":"outline"}
            color="green"
            size="lg"
            aria-label="Pass"
            onClick={() => submitRating(props.max ?? 10)}
          >
            <RiArrowUpDoubleFill />
          </ActionIcon>
          <Stack h="2rem">
            <Transition
              mounted={!opened}
              transition="scale-x"
              enterDelay={300}
              exitDelay={10}
            >
              {(transitionStyle) => (
                <Tooltip label={val ? ("Rating: " + rating + " / " + (props.max??10)) : "Unrated"}>
                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Set Rating"
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  <RiCodeFill />
                </ActionIcon></Tooltip>
              )}
            </Transition>
            <Transition
              mounted={opened}
              transition="pop"
              enterDelay={300}
              exitDelay={10}
            >
              {(transitionStyle) => (
                <Group  style={{ ...transitionStyle, zIndex: 1 }}>
                  <Slider
                    color="blue"
                    min={0}
                    miw="10rem"
                    value={rating}
                    onChange={(value) => setRating(value)}
                    max={10}
                    marks={[{ value: 0 }, { value: 5 }, { value: 10 }]}
                  />
                  <Tooltip label="Close"><ActionIcon size="sm" color="red" onClick={() => setOpened(false)}><RiCloseFill/></ActionIcon></Tooltip>
    
                </Group>
              )}
            </Transition>
          </Stack>
          <ActionIcon
            variant={val && pos ? "filled" : "outline"}
            color="red"
            size="lg"
            aria-label="Fail"
            onClick={() => submitRating(0)}
          >
            <RiArrowDownDoubleFill />
          </ActionIcon>
        </Stack>
      </Card>
    </Container>
  );
}
