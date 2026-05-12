type GithubLinkInputProps = {
  value: string;
  onChange: (value: string) => void;
  isPending: boolean;
};

export function GithubLinkInput({ value, onChange, isPending }: GithubLinkInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="https://github.com/username/repo"
        disabled={isPending}
        className="
            w-full rounded-xl border px-4 py-2.5 text-sm
            bg-white dark:bg-gray-900
            border-gray-200 dark:border-gray-700
            text-gray-700 dark:text-gray-200
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-all
          "
      />
      <p className="text-[11px] text-gray-400 dark:text-gray-500">
        Paste your GitHub repository link here
      </p>
    </div>
  );
}
