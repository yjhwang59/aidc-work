import Link from "next/link";
import { Container } from "./Container";

type CTASectionProps = {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CTASectionProps) {
  return (
    <section className="bg-brand-900 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-4 text-brand-300">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center rounded-md border border-brand-600 px-6 py-3 text-sm font-medium text-brand-200 transition-colors hover:border-brand-400 hover:text-white"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
