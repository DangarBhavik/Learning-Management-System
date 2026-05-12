type RoleBadgeProps = {
  role: string;
  styles: Record<string, string>;
};

export function RoleBadge({ role, styles }: RoleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[role as keyof typeof styles]
      }`}
    >
      {role}
    </span>
  );
}
