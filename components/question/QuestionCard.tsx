import { Card, Text } from "@mantine/core";
import { Question } from "../../lib/types";

export default function QuestionCard(props:{question:Question}){



    return<Card>
        <Text>{props.question.id}</Text>
    </Card>
}