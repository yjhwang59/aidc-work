import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { createPageMetadata } from "@/lib/metadata";
import { courses } from "@/lib/site-data";

export const metadata = createPageMetadata(
  "課程與培訓",
  "Vibe Coding 工作坊、AI Agent 工作流設計與企業 AI 工具培訓等課程說明。",
);

export default function CoursesPage() {
  return (
    <>
      <HeroSection
        subtitle="Courses & Training"
        title="課程與培訓"
        description="依企業需求提供客製化培訓，協助團隊建立 AI 工具使用、Vibe Coding 與 Agent 工作流設計的實務能力。"
        primaryCta={{ label: "洽詢課程", href: "/contact" }}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.slug}
                className="flex flex-col rounded-lg border border-brand-100 bg-white p-6"
              >
                <h2 className="text-lg font-semibold text-brand-900">
                  {course.title}
                </h2>
                <dl className="mt-4 space-y-2 text-sm text-brand-600">
                  <div>
                    <dt className="inline font-medium text-brand-700">
                      適合對象：
                    </dt>
                    <dd className="inline"> {course.audience}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-brand-700">
                      形式：
                    </dt>
                    <dd className="inline"> {course.format}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-brand-700">
                      時數：
                    </dt>
                    <dd className="inline"> {course.duration}</dd>
                  </div>
                </dl>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-600">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs text-brand-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-brand-500">
            課程詳情頁與報名流程將於後續版本開放，目前請透過聯絡頁面洽詢。
          </p>
        </Container>
      </section>

      <CTASection
        title="為團隊規劃專屬培訓？"
        description="可依企業場景客製化課程內容與時程，歡迎聯繫討論。"
        primaryCta={{ label: "洽詢課程", href: "/contact" }}
      />
    </>
  );
}
