import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { type MentorOption } from '@/services/apis/users';

type MentorSelectProps = {
  value: string;
  mentors: MentorOption[];
  isLoading: boolean;
  onChange: (value: string) => void;
};

export function MentorSelect({ value, mentors, isLoading, onChange }: MentorSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mentor</label>
      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger className="group h-12 w-60 rounded-xl border border-gray-200 bg-white px-4 text-sm shadow-sm transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-700 dark:bg-gray-950 dark:hover:border-blue-500">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading mentors...
            </div>
          ) : (
            <SelectValue placeholder="Select mentor" />
          )}
        </SelectTrigger>
        <SelectContent
          position="popper"
          side="bottom"
          align="start"
          sideOffset={6}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          {mentors.length > 0 ? (
            mentors.map(mentor => (
              <SelectItem
                key={mentor.id}
                value={mentor.id}
                className="my-1 cursor-pointer rounded-xl px-3 py-3 outline-none transition-all focus:bg-blue-50 dark:focus:bg-blue-950/40"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {mentor.username}
                  </span>
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
              No mentors found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
