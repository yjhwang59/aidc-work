import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";

export const metadata = createPageMetadata(
  "聯絡我們",
  "洽詢企業 AI 導入、培訓、Vibe Coding 與 AI Agent 工作流顧問合作。",
);

export default function ContactPage() {
  return (
    <>
      <HeroSection
        subtitle="Contact"
        title="聯絡我們"
        description="想討論您的 AI 導入計畫？歡迎與我聯繫，我會在兩個工作天內回覆。"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-brand-900">合作洽詢</h2>
              <p className="mt-4 leading-relaxed text-brand-600">
                無論是 AI 工具培訓、Vibe Coding 工作坊、Agent
                工作流設計或導入路線圖規劃，都歡迎來信討論。請簡述您的團隊現況、目標與預期時程。
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-sm font-medium text-brand-700">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-accent hover:text-accent-dark"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-700">
                    預期回覆時間
                  </p>
                  <p className="text-brand-600">兩個工作天內</p>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-brand-50 p-6">
                <h3 className="font-semibold text-brand-900">合作流程</h3>
                <ol className="mt-3 space-y-2 text-sm text-brand-600">
                  <li>1. 您來信說明需求與現況</li>
                  <li>2. 安排初步討論（線上或實體）</li>
                  <li>3. 提出服務建議與報價</li>
                  <li>4. 確認合作後開始執行</li>
                </ol>
              </div>
            </div>

            <div className="rounded-lg border border-brand-100 bg-white p-8">
              <h2 className="text-lg font-semibold text-brand-900">聯絡表單</h2>
              <p className="mt-2 text-sm text-brand-500">
                MVP 階段請直接來信，表單功能將於後續版本開放。
              </p>
              <form className="mt-6 space-y-4" action={`mailto:${siteConfig.email}`}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-700"
                  >
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    disabled
                    className="mt-1 w-full rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-500"
                    placeholder="即將開放"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    disabled
                    className="mt-1 w-full rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-500"
                    placeholder="即將開放"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-700"
                  >
                    訊息
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    disabled
                    className="mt-1 w-full rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-500"
                    placeholder="即將開放"
                  />
                </div>
                <a
                  href={`mailto:${siteConfig.email}?subject=AIDC.work 合作洽詢`}
                  className="inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
                >
                  改以 Email 聯絡
                </a>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
