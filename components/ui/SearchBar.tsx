import { CourseStatus } from '@/generated/prisma/enums';
import CustomSelect from './CustomSelect';

const SearchBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  options,
}: {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: CourseStatus | 'ALL';
  setStatusFilter: (status: CourseStatus | 'ALL') => void;
  options: { label: string; value: string }[];
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search assignments..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 
              bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 
              focus:ring-indigo-500"
      />

      <CustomSelect
        value={statusFilter}
        onChange={val => setStatusFilter(val as CourseStatus | 'ALL')}
        options={options || [{ label: 'All', value: 'ALL' }]}
        className="min-w-40"
      />
    </div>
  );
};

export default SearchBar;
