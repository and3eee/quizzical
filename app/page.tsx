"use server";
import Hero from "../components/Hero";
import SessionList from "../components/session/SessionList";
import { prisma } from "../lib/prisma";

export default async function HomePage() {
  const sessions = await prisma.session.findMany();
  return (
    <div>
      <Hero />
      <SessionList sessions={sessions} />
    </div>
  );
}
