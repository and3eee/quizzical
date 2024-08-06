import {
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  MultiSelect,
  NumberInput,
  Stack,
  TagsInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { CreateQuestion } from "./QuestionControl";

export default function QuestionCreator() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      tags: [],
      answer: "",
      level: 1,
      isCoreQuestion: true,
      lastReviewed: new Date(),
      userId: 0,
      expectedMinutes: 5,
    },

    validate: {

    },
  });


  return (
    <Card radius="xl">
      <form onSubmit={form.onSubmit((values) => CreateQuestion(values))}>
        <Stack gap="l" justify="center">
          <Title size="lg">New Question</Title>
          <Divider />
          <Textarea
            label="Question"
            key={form.key("content")}
            {...form.getInputProps("content")}
          />
          <Textarea
            label="Answer"
            key={form.key("answer")}
            {...form.getInputProps("answer")}
          />
          <TagsInput
            label="Add Tags"
            placeholder="Select Tags..."
            data={["Agent", "Env", "DEM", "Networking", "Python"]}
            key={form.key("tags")}
            {...form.getInputProps("tags")}
          />
          <Group grow gap="xl">
            <NumberInput
              label="Level"
              placeholder="0-5"
              min={0}
              max={5}
              key={form.key("level")}
              {...form.getInputProps("level")}
            />

            <NumberInput
              label="Expected Duration (Mins)"
              placeholder="0-10"
              min={0}
              max={15}
              key={form.key("expectedMinutes")}
              {...form.getInputProps("expectedMinutes")}
            />
          </Group> 
          <Checkbox
            mt="md"
            label="Core Question"
            key={form.key("isCoreQuestion")}
            {...form.getInputProps("isCoreQuestion", { type: "checkbox" })}
          />
          <Button radius="xl" type="submit">Create</Button>
        </Stack>{" "}
      </form>
    </Card>
  );
}
