'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import TraineeSelector from '@/components/course-assignment/TraineeSelector';
import TraineeDetails from '@/components/course-assignment/TraineeDetails';
import AssignableCourses from '@/components/course-assignment/AssignableCourses';
import AssignedCourses from '@/components/course-assignment/AssignedCourses';
import queryClient from '@/utils/query-client';
import AssignSkeleton from '@/components/course-assignment/AssignSkeleton';
import { useGetAssignableUsers } from '@/hooks/user/useGetAssignableUsers';
import { UserType } from '@/types/user';

const AssignCoursePage = () => {
  const [selectedUserId, setSelectedUserId] = useState('');

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  const { users, isLoading, isError, error } = useGetAssignableUsers();

  if (isLoading) {
    return <AssignSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-8">
        <Card className="shadow-md border border-border">
          <CardHeader>
            <CardTitle>Unable to load users</CardTitle>

            <CardDescription>
              {error?.message || 'Something went wrong while fetching users.'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleSelectUser = (value: string) => {
    setLoading(true);

    const user = users.find(u => u.id === value) ?? null;

    setSelectedUserId(value);

    setSelectedUser(user);

    queryClient.invalidateQueries({
      queryKey: ['assignable-courses', value],
    });

    queryClient.invalidateQueries({
      queryKey: ['assigned-courses', value],
    });

    setLoading(false);
  };

  return (
    <div className="space-y-4 dark:bg-[#101828] min-h-screen p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Assign Courses</h1>

        <p className="text-sm text-muted-foreground">
          Select a user (trainee or mentor) to manage course assignments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TraineeSelector
          trainees={users}
          selectedTraineeId={selectedUserId}
          onTraineeSelect={handleSelectUser}
        />

        <TraineeDetails traineeDetails={selectedUser} />
      </div>

      {!loading && selectedUserId && (
        <AssignableCourses key={`assignable-${selectedUserId}}`} selectedUserId={selectedUserId} />
      )}

      {!loading && selectedUserId && (
        <AssignedCourses key={`assigned-${selectedUserId}`} selectedUserId={selectedUserId} />
      )}
    </div>
  );
};

export default AssignCoursePage;
