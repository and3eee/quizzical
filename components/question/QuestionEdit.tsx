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
  import { CreateQuestion, EditQuestion } from "./QuestionControl";
  import { Question } from "../../lib/types";
  
  export default function QuestionEditor( props: {editingQues:Question|null, id:number|null, callback?:(input:Question|null)=>void}) {
    const id = props.id
    const editingQues = props.editingQues
    
    const form = useForm({
      mode: "uncontrolled",
      initialValues: {
        content: editingQues?.content,
        tags: editingQues?.tags,
        answer: editingQues?.answer,
        level: editingQues?.level,
        isCoreQuestion: editingQues?.isCoreQuestion,
        lastReviewed: editingQues?.lastReviewed,
        userId: "",
        expectedMinutes: editingQues?.expectedMinutes,
      },
  
      validate: {
  
      },
    });
  
    const submit = async (values) => {
      if (!values || !id){return;}
      const result = await EditQuestion(values, id);
      
      
      if (props.callback) {props.callback(result);}
    }
  
    return (
      <Card radius="xl">
        <form onSubmit={form.onSubmit((values) => submit(values))}>
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
            <Button radius="xl" type="submit">Edit</Button>
          </Stack>{" "}
        </form>
      </Card>
    );
  }
  