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

type Props = {};

const CreateNote = (props: Props) => {
  const [input, setInput] = React.useState('');
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
        <form>
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
