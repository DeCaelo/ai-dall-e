'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {};

const CreateNote = (props: Props) => {
  const [input, setInput] = React.useState('');

  const createNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/createNote', {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      window.alert('Please enter a name for your note');
      return;
    }
    createNote.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log('created new note:', { note_id });
        // hit another endpoint to uplod the temp dalle url to permanent firebase url
      },
      onError: (error) => {
        console.error(error);
        window.alert('Failed to create new note');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6" strokeWidth={3} />
          <h2 className="font-semibold sm:mt-2">New Note Book</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            placeholder="Name..."
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-4">
            <Button type="reset" intent={'outline'}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNote;
