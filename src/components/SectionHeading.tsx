type Props = { id: string; index: string; title: string; children?: React.ReactNode };

export function SectionHeading({ id, index, title, children }: Props) {
  return (
    <div className="mb-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs text-muted">{index}</p>
        <h2 id={id} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {children && <div className="max-w-sm text-sm text-muted">{children}</div>}
    </div>
  );
}
