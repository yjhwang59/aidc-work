import Link from "next/link";
import { Container } from "./Container";
import { navItems, siteConfig } from "@/lib/site-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-100 bg-brand-50">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-brand-900">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-600">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-sm text-brand-500">{siteConfig.author}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-900">快速連結</p>
            <ul className="mt-3 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-600 transition-colors hover:text-brand-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-900">聯絡</p>
            <p className="mt-3 text-sm text-brand-600">
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-brand-900"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-4 text-sm text-brand-500">
              歡迎洽詢企業 AI 導入、培訓與顧問合作。
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-200 pt-6 text-center text-sm text-brand-500">
          <p>
            © {year} {siteConfig.author}. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-brand-400">v{siteConfig.version}</p>
        </div>
      </Container>
    </footer>
  );
}
