import { ActionIcon, Tooltip } from "@mantine/core";
import { Question } from "../../lib/types";
import { RiAlertFill, RiLink, RiParentFill } from "react-icons/ri";
import { LinkQuestions, UnLinkQuestions } from "./QuestionControl";
import { notifications } from "@mantine/notifications";

export default function LinkButton(props: {
  question: Question;
  target: Question;
  parentMode?: boolean;
}) {
  const loopError = () => {
    notifications.show({
      title: "Inheritance Loop",
      message: "Action not completed to prevent loop.",
      color: "red",
      withBorder:true,
      icon: <RiAlertFill/>
    });
  };
  const handleParentLink = async () => {
    const resp = await LinkQuestions(props.question, props.target);

    if (!resp) loopError();
  };

  const handleChildLink = async () => {
    const resp = await LinkQuestions(props.target, props.question);
    if (!resp) loopError();
  };

  const handleParentUnLink = async () => {
    const resp = await UnLinkQuestions(props.question, props.target);
    if (!resp) loopError();
  };

  const handleChildUnLink = async () => {
    const resp = await UnLinkQuestions(props.target, props.question);
    if (!resp) loopError();
  };

  if (props.parentMode) {
    //Check if already parentas

    if (props.target.parent?.id == props.question.id)
      return (
        <Tooltip label="Unlink Parent">
          <ActionIcon onClick={handleParentUnLink} color="orange">
            <RiParentFill />
          </ActionIcon>
        </Tooltip>
      );
    else
      return (
        <Tooltip label="Link as Parent">
          <ActionIcon onClick={handleParentLink} color="green">
            <RiParentFill />
          </ActionIcon>
        </Tooltip>
      );
  } else {
    if (props.target.followUps?.some((quest) => quest.id == props.question.id))
      return (
        <Tooltip label="Unlink Child">
          <ActionIcon onClick={handleChildUnLink} color="orange">
            <RiLink />
          </ActionIcon>
        </Tooltip>
      );
    else
      return (
        <Tooltip label="Link as Child">
          <ActionIcon onClick={handleChildLink} color="indigo">
            <RiLink />
          </ActionIcon>
        </Tooltip>
      );
  }
}
