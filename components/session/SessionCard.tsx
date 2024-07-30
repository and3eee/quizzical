'use client';
import {
  Card,
  Title,
  Text,
  Group,
  Pill,
  Grid,
  Stack,
  Divider,
  Button,
  Center,
} from "@mantine/core";
import { Session } from "../../lib/types";
import Link from "next/link";

export default function SessionCard(props: {
  session: any;
  withLink?: boolean;
}) {
  return (
    <Card maw="30rem">
      <Stack>
        <Group justify="space-between">
          <Title order={3}>{props.session.name}</Title>
          <Text>{props.session.date.toLocaleString()}</Text>
        </Group>
        <Divider />
        <Group >
          <Stack>
            <Title order={5}>Core Tags</Title>
            <Grid>
              {props.session.coreTags.map((tag: string) => {
                return (
                  <Grid.Col span="auto" key="tag">
                    <Pill>{tag}</Pill>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Stack>

          <Divider orientation="vertical" />
          <Stack>
            <Title order={5}>Extra Tags</Title>
            <Grid>
              {props.session.tags.map((tag: string) => {
                return (
                  <Grid.Col span="auto" key="tag">
                    <Pill>{tag}</Pill>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Stack>
        </Group>

        {props.withLink && (
          <Button maw="10rem" component="a" href={`/${props.session.id}`}>
            Goto Session
          </Button>
        )}
      </Stack>
    </Card>
  );
}
