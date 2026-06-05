import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createPageMetadata("文章不存在", "找不到指定的部落格文章。");
  }

  return createPageMetadata(post.title, post.description);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || post.draft) {
    notFound();
  }

  return (
    <>
      <article className="bg-white">
        <header className="border-b border-brand-100 bg-brand-50 py-14 sm:py-20">
          <Container className="max-w-4xl">
            <Link
              href="/blog"
              className="text-sm font-medium text-accent transition-colors hover:text-accent-dark"
            >
              返回部落格
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-brand-500">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.readingMinutes} 分鐘閱讀</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-600">
              {post.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-sm text-brand-500">作者：{post.author}</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Container>
        </header>

        <Container className="max-w-4xl py-12 sm:py-16" as="section">
          <MarkdownContent content={post.content} />
        </Container>
      </article>

      <CTASection
        title="想把文章方法套用到您的團隊？"
        description="可依企業現況盤點流程、設計試點範圍，並建立可複製的 AI 導入節奏。"
        primaryCta={{ label: "聯絡我們", href: "/contact" }}
        secondaryCta={{ label: "閱讀更多文章", href: "/blog" }}
      />
    </>
  );
}
