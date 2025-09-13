'use client';

import Button from '@/components/ui/Button';
import InputBox from '@/components/ui/InputBox';
import { useState } from 'react';

interface CreateTaskListFormProps {
  onSubmit: (title: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CreateTaskListForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateTaskListFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputBox
        label="List Name"
        id="title"
        name="title"
        variant="underlined"
        placeholder="Enter name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        focusBorderColor="focus:border-primary"
        focusRingColor="focus:ring-primary"
        focusLabelColor="text-primary"
        defaultLabelColor="text-gray-800"
        borderColor="border-gray-500"
        disabled={isLoading}
        autoFocus
        height="h-10"
        className=''
      />
      
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          label="Cancel"
          variant='text'
          size="medium"
          onClick={onCancel}
          disabled={isLoading}
          className='text-sm'
        />
        <Button
          type="submit"
          label="Done"
          variant="text"
          size="medium"
          loading={isLoading}
          disabled={!title.trim()}
          className='text-sm'
        />
      </div>
    </form>
  );
}
