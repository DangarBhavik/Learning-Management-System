'use client';
import { getAllTrainee } from '@/services/apis/users';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllTrainee,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <div className="mx-8 space-y-5 mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">All Trainnes</h2>
      </div>

      <ul className="flex">
        {data &&
          data.map(trainee => (
            <li className="border border-gray-300 rounded-md p-2" key={trainee.id}>
              <div className='relative h-8 w-8 rounded-md'>
                <Image src={trainee.image} alt={trainee.username} fill/>
              </div>
              <h2>{trainee.username}</h2>
              <p>{trainee.email}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
