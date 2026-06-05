import { CaseCard } from "@/components/CaseCard";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { createPageMetadata } from "@/lib/metadata";
import { cases } from "@/lib/site-data";

export const metadata = createPageMetadata(
  "案例研究",
  "企業 AI 導入與開發成果案例，涵蓋製造業、零售業與金融服務等產業。",
);

export default function CasesPage() {
  return (
    <>
      <HeroSection
        subtitle="Case Studies"
        title="案例研究"
        description="實際協助企業將 AI 導入日常工作的成果摘要。案例內容依客戶授權或匿名方式呈現。"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem) => (
              <CaseCard
                key={caseItem.slug}
                title={caseItem.title}
                industry={caseItem.industry}
                serviceType={caseItem.serviceType}
                description={caseItem.description}
                tags={caseItem.tags}
              />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-brand-500">
            詳情頁將於內容就緒後開放，目前為 MVP 種子案例摘要。
          </p>
        </Container>
      </section>

      <CTASection
        title="想了解類似案例如何應用於您的團隊？"
        description="歡迎聯繫討論，我可以依您的產業與情境提供更具體的建議。"
        primaryCta={{ label: "聯絡我們", href: "/contact" }}
      />
    </>
  );
}
