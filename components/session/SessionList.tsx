"use client";
import { Container, Grid } from "@mantine/core";
import { Session } from "@prisma/client";
import SessionCard from "./SessionCard";

export default function SessionList(props: { sessions: Session[] }) {
  return (
    <Container fluid py={24} px={64}>
      <Grid gutter="lg">
        {props.sessions.map((session: Session) => (
          <Grid.Col key={session.id} span={6}>
            <SessionCard session={session} withLink />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
