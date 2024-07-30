import {
  Modal,
  Button,
  Group,
  Stepper,
  TextInput,
  Textarea,
  TagsInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { CreateSession } from "./SessionControl";
import { Session } from "../../lib/types";
import SessionCard from "./SessionCard";

export default function SessionGenerator() {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const [tags, setTags] = useState<string[]>([]);
  const [coreTags, setCoreTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const [desc, setDesc] = useState("");
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const submit = () => {
    const out: Session = {
      date: new Date(),
      name: title,
      coreTags: coreTags,
      tags: tags,
      questions: [],
    };
    const resp = CreateSession(out);

  };
  return (
    <>
      <Modal size="md" opened={opened} onClose={close} title="Authentication">
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="First step" description="Enter Info">
            <TextInput
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              label="Session Title"
            />
          
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Select Tags">
            <TagsInput
              label="Core Tags"
              placeholder="Pick some tags..."
              data={["React", "Angular", "Vue", "Svelte"]}
              value={coreTags}
              onChange={setCoreTags}
            />
            <TagsInput
              label="Topic Tags"
              placeholder="Pick some tags..."
              data={["React", "Angular", "Vue", "Svelte"]}
              value={tags}
              onChange={setTags}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Review Info
            <SessionCard
              session={{
                date: new Date(),
                name: title,
                coreTags: coreTags,
                tags: tags,
                questions: [],
              }}
            />
          </Stepper.Step>
          <Stepper.Completed>
          <Button variant="default" onClick={submit}>
            Create new Session
          </Button>
          </Stepper.Completed>
     
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </Modal>
      <Button onClick={open}>New Session</Button>
    </>
  );
}
