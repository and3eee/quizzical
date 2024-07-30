import { Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import QuestionCreator from "./QuestionCreator";

export default function QuestionBank() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Drawer opened={opened} onClose={close} title="Question Bay">

       <QuestionCreator/>
      </Drawer>
    


      <Button variant="outline" onClick={open}>Open Drawer</Button>
    </>
  );
}
