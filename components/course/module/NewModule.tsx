'use client';

import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCreateModule } from '@/hooks/module/useCreateModule';
import Pending from '../Pending';

const NewModule = () => {
  const [inputText, setInputText] = useState<string>('');

  const { id: courseId } = useParams<{ id: string }>();

  const { createModule, isCreating } = useCreateModule({ courseId });

  const handleModuleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText.trim() == '') {
      return;
    }
    await createModule({ title: inputText });
    setInputText('');
  };

  return (
    <div className="mt-4 flex pb-8 justify-center items-center">
      <form
        className="flex-1 max-w-200 border border-gray-400/30 p-2 rounded-lg bg-white  dark:bg-[#1e2939]"
        onSubmit={handleModuleSubmit}
      >
        <div className="flex-1 flex  gap-4">
          <input
            placeholder="Enter New Module Name"
            className="flex-1  text-sm rounded-md  focus:outline-none py-1 px-2"
            value={inputText}
            onChange={event => setInputText(event.target.value)}
            type="text"
          />

          <button
            disabled={isCreating}
            className={`bg-red-400/20 text-red-400 p-2 ${isCreating ? 'animate-spin rounded-full' : 'rounded-md '}`}
          >
            {!isCreating ? <BiPlus /> : <Pending />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewModule;
