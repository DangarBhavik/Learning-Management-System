type DetailItemProps = {
  label: string;
  value: string;
};

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="break-all font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
