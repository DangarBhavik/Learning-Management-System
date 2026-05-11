import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: 'Sign In - Learning Management System',
  description: 'Sign in to access your courses, track progress, and manage your learning experience on our LMS platform.',
};

function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
        <SignIn />
    </div>
  )
}

export default SignUpPage;