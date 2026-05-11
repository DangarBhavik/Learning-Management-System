import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign Up - Learning Management System',
  description:
    'Create an account to access courses, track progress, and manage your learning experience on our LMS platform.',
};

function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
