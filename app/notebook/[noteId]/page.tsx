import DeleteButton from '@/components/DeleteButton';
import TipTapEditor from '@/components/TipTapEditor';
import { Button } from '@/components/ui/button';
import { clerk } from '@/lib/clerk-server';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/dashboard');
  }

  const user = await clerk.users.getUser(userId);

  const allNotes = await db
    .select()
    .from(notes)
    .where(and(eq(notes.id, parseInt(noteId)), eq(notes.userId, userId)));

  if (allNotes.length != 1) {
    return redirect('/dashboard');
  }

  const note = allNotes[0];
  console.log(note);

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl  rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button size="sm">Back</Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className=" font-semibold">{note.imageDescription}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
