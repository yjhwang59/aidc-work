import Link from "next/link";
import { Container } from "./Container";

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="bg-brand-50 py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          {subtitle && (
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
              {subtitle}
            </p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-600">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center rounded-md border border-brand-300 bg-white px-6 py-3 text-sm font-medium text-brand-700 transition-colors hover:border-brand-400 hover:bg-brand-50"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
