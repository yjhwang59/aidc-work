import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { getAllBlogPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "部落格",
  "企業 AI 導入觀點、Vibe Coding 實務與 AI Agent 工作流相關文章。",
);

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <>
      <HeroSection
        subtitle="Blog"
        title="部落格"
        description="分享企業 AI 導入的實務觀點、方法論與技術洞察，協助團隊避開常見陷阱、加速落地。"
      />

      <section className="py-16 sm:py-20">
        <Container>
          {featuredPost && (
            <div className="mb-10 rounded-lg border border-brand-100 bg-brand-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Latest article
              </p>
              <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-600">
                    {featuredPost.description}
                  </p>
                </div>
                <BlogCard
                  title={featuredPost.title}
                  date={featuredPost.date}
                  category={featuredPost.category}
                  description={`${featuredPost.readingMinutes} 分鐘閱讀`}
                  tags={featuredPost.tags}
                  href={`/blog/${featuredPost.slug}`}
                />
              </div>
            </div>
          )}

          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-brand-500">
                Articles
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-900">
                最新文章
              </h2>
            </div>
            <p className="text-sm text-brand-500">
              共 {blogPosts.length} 篇文章
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {remainingPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                date={post.date}
                category={post.category}
                description={post.description}
                tags={post.tags}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="對某個主題想深入討論？"
        description="歡迎聯繫，我可以依您的情境提供更具體的建議與資源。"
        primaryCta={{ label: "聯絡我們", href: "/contact" }}
      />
    </>
  );
}
