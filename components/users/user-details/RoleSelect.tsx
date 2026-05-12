import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { type AdminUserDetails } from '@/services/apis/users';

type UserRole = AdminUserDetails['role'];

type RoleSelectProps = {
  value: UserRole;
  onChange: (value: UserRole) => void;
};

export function RoleSelect({ value, onChange }: RoleSelectProps) {
  const roles = ['ADMIN', 'MENTOR', 'TRAINEE'];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="group h-12 w-40 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:hover:border-blue-500">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="bottom"
          align="start"
          sideOffset={6}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          {roles.map(role => (
            <SelectItem
              key={role}
              value={role}
              className="cursor-pointer rounded-xl px-3 py-3 text-sm font-medium outline-none transition-all focus:bg-blue-50 dark:focus:bg-blue-950/40"
            >
              <div className="flex w-full items-center justify-between">
                <span>{role}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
