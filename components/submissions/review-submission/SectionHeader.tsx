interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  badge?: string;
}

const SectionHeader = ({
  title,
  icon,
  gradientFrom = 'violet',
  gradientTo = 'indigo',
  badge,
}: SectionHeaderProps) => {
  return (
    <div className="relative border-b border-gray-100 dark:border-gray-800 px-6 py-5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-${gradientFrom}-500 to-${gradientTo}-500 rounded-r-full`}
        />
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/50 ring-1 ring-violet-100 dark:ring-violet-900/50">
            {icon}
          </div>
        )}
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {badge && (
        <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 px-3 py-1.5 text-[10px] font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
          {badge}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
