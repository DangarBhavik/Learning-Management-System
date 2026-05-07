'use client';

import DropDown from '@/components/ui/DropDown';
import { useDeleteModule } from '@/hooks/module/useDeleteModule';
import { useModifyModule } from '@/hooks/module/useModifyModule';
import { GripVertical } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { RiLoader4Fill } from 'react-icons/ri';
import DeleteConfirmation from '../DeleteConfimation';
import { toast } from 'sonner';
import createToast from '@/utils/toast';

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
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleEditTitle = async () => {
    if (text.trim() == '') {
      return;
    }

    await modifyModule(
      { title: text },
      {
        onSuccess: () => {
          createToast('Module Title Updated Successfully!', 'success');
        },
      }
    );
    setShowEditForm(false);
  };

  const handleSelectDropDown = (val: string) => {
    if (val == 'Edit') {
      setShowEditForm(true);
    } else if (val == 'Delete') {
      setDeleteConfirmation(true);
    }
  };

  const handleDelete = async () => {
    await deleteModule();
    setDeleteConfirmation(false);
  };

  return (
    <div className="flex justify-center mx-8 sm:mx-4  items-center gap-2">
      <GripVertical className=" mb-0.5" />
      <h4 className="text-lg sm:text-md  font-medium ">Module {index + 1} : </h4>
      <div className=" flex-1  flex justify-between border-gray-400/60 rounded-xl">
        <input
          className="flex-1 text-sm lg:text-lg font-medium h-9 px-2 focus:outline-none transition "
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
          <DropDown
            trigger={<BsThreeDotsVertical className="h-8" />}
            options={['Edit', 'Delete']}
            onSelect={handleSelectDropDown}
          />
        )}

        {deleteConfirmation && (
          <DeleteConfirmation
            isPending={isDeleting}
            itemType={`module "${title}"`}
            onConfirm={handleDelete}
            onCancel={() => setDeleteConfirmation(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ModuleInput;
