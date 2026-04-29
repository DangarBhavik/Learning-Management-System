'use client';

import { useDeleteModule } from '@/hooks/module/useDeleteModule';
import { useModifyModule } from '@/hooks/module/useModifyModule';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BiSave, BiTrash } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { RiLoader4Fill } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';

const ModuleInput: React.FC<{ title?: string; moduleId: string; index: number }> = ({
  title,
  moduleId,
  index,
}) => {
  const { id: courseId } = useParams<{ id: string }>();

  const { isModifying, modifyModule } = useModifyModule({ courseId, moduleId });
  const { deleteModule, isDeleting } = useDeleteModule({ courseId, moduleId });

  const [text, setText] = useState<string>(title ?? '');
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditTitle = async () => {
    if (text.trim() == '') {
      return;
    }

    await modifyModule({ title: text });
    setShowEditForm(false);
  };

  const handleDelete = async () => {
    await deleteModule();
  };

  return (
    <div className="flex justify-center bg-white dark:bg-[#1e2939] items-center gap-4">
      <h4 className="text-md font-medium">{index + 1}</h4>
      <div className="border flex-1 max-w-[800px] flex justify-between w-full border-gray-400/60 p-2 rounded-xl">
        <input
          className="flex-1 text-sm h-9 px-2 focus:outline-none transition disabled:cursor-not-allowed disabled:opacity-70"
          value={text}
          onChange={event => setText(event.target.value)}
          type="text"
          disabled={!showEditForm || isModifying}
        />

        {showEditForm ? (
          <div className="flex gap-4">
            <button
              onClick={() => setShowEditForm(false)}
              disabled={isModifying}
              className="bg-red-500/20 p-2 rounded-lg hover:bg-red-500/30 transition disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <MdClose className="text-red-400" />
            </button>

            <button
              onClick={handleEditTitle}
              disabled={isModifying}
              className="bg-blue-500/20 p-2 rounded-lg hover:bg-blue-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isModifying ? (
                <RiLoader4Fill className=" border-blue-400 animate-spin" />
              ) : (
                <BiSave className="text-blue-500 " />
              )}
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => setShowEditForm(true)}
              disabled={isDeleting}
              className="bg-blue-500/20 p-2 rounded-lg hover:bg-blue-500/30 transition"
            >
              <VscEdit className="text-blue-500" />
            </button>
            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="bg-red-500/20 p-2 rounded-lg hover:bg-blue-500/30 transition"
            >
              {isDeleting ? (
                <RiLoader4Fill className=" border-red-400 animate-spin" />
              ) : (
                <BiTrash
                  className={`text-red-500 dark:text-red-300 ${isDeleting && 'animate-spin'}`}
                />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleInput;
