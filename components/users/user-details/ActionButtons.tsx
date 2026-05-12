type ActionButtonsProps = {
  isEditing: boolean;
  isPending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export function ActionButtons({
  isEditing,
  isPending,
  onEdit,
  onCancel,
  onSave,
}: ActionButtonsProps) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onEdit}
      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    >
      Edit User
    </button>
  );
}
