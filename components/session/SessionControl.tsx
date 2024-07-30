"use server";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { Session } from "../../lib/types";

export async function CreateSession(input: Session) {
  const out = await prisma.session.create({
    data: {
      date: input.date,
      createdOn: new Date(),
      tags: input.tags,
      coreTags: input.coreTags,
      name: input.name,
    },
  });

  if (!out) return false;


  redirect("/" + out.id)
}
