'use client';
import type { UserRole } from '@/types/types';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import NavBar from '../NavBar';
import { GiHamburgerMenu } from 'react-icons/gi';

type Props = {
  children: React.ReactNode;
  role: UserRole;
  user: {
    name: string;
    email: string;
    image: string;
    role: string;
  };
};

const DashboardLayout: React.FC<Props> = ({ children, role, user }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        show={showSidebar}
        onClick={() => setShowSidebar(!showSidebar)}
        role={role}
        user={user}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <GiHamburgerMenu
          className="mt-4  block lg:hidden ml-8"
          onClick={() => setShowSidebar(prev => !prev)}
        />
        <NavBar onClick={() => setShowSidebar(!showSidebar)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
