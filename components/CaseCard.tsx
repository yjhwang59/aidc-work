import Link from "next/link";

type CaseCardProps = {
  title: string;
  industry: string;
  serviceType: string;
  description: string;
  tags: string[];
  href?: string;
};

export function CaseCard({
  title,
  industry,
  serviceType,
  description,
  tags,
  href,
}: CaseCardProps) {
  const content = (
    <>
      <div className="flex flex-wrap gap-2 text-xs text-brand-500">
        <span>{industry}</span>
        <span>·</span>
        <span>{serviceType}</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-brand-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-600">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs text-brand-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  const className =
    "flex h-full flex-col rounded-lg border border-brand-100 bg-white p-6 transition-shadow hover:shadow-md";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
