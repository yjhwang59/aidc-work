import Link from "next/link";

type BlogCardProps = {
  title: string;
  date: string;
  category: string;
  description: string;
  tags?: string[];
  href?: string;
};

export function BlogCard({
  title,
  date,
  category,
  description,
  tags,
  href,
}: BlogCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-xs text-brand-500">
        <time dateTime={date}>{date}</time>
        <span>·</span>
        <span>{category}</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-brand-900">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-600">
        {description}
      </p>
      {tags && tags.length > 0 && (
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
      )}
      {href && (
        <span className="mt-5 inline-flex text-sm font-medium text-accent">
          閱讀文章
        </span>
      )}
    </>
  );

  const className =
    "flex h-full flex-col rounded-lg border border-brand-100 bg-white p-6 transition-shadow hover:border-accent/40 hover:shadow-md";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
