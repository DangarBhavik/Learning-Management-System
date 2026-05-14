import { useState } from 'react';
import NewLesson from './lesson/NewLesson';
import DropDown from '../ui/DropDown';
import { BiPlus } from 'react-icons/bi';
import NewAssignment from './assignment/NewAssignment';

const CourseAction = ({ moduleId }: { moduleId: string }) => {
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');

  const handleCloseForm = () => {
    setShowForm(false);
    setFormName('');
  };

  return (
    <div className="flex justify-center items-center">
      {!showForm ? (
        <DropDown
          trigger={
            <div className="bg-white dark:bg-gray-700 rounded-md">
              <span className="block bg-red-400/20 text-red-400 p-2 rounded-md  cursor-pointer">
                <BiPlus />
              </span>
            </div>
          }
          options={['Assignment', 'Lesson']}
          onSelect={val => {
            setFormName(val);
            setShowForm(true);
          }}
        />
      ) : (
        <>
          {formName.toLowerCase() == 'assignment' ? (
            <NewAssignment moduleId={moduleId} onClose={handleCloseForm} />
          ) : (
            <NewLesson onClose={handleCloseForm} key={moduleId} moduleId={moduleId} />
          )}
        </>
      )}
    </div>
  );
};

export default CourseAction;
