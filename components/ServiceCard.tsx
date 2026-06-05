import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href?: string;
};

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  const content = (
    <>
      <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-brand-600">
        {description}
      </p>
      {href && (
        <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
          了解更多
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      )}
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
