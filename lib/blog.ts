import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  draft: boolean;
  content: string;
  readingMinutes: number;
};

type FrontMatter = Omit<BlogPost, "slug" | "content" | "readingMinutes">;

function parseFrontMatter(raw: string): { data: FrontMatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Blog post is missing front matter.");
  }

  const entries = match[1].split(/\r?\n/).filter(Boolean);
  const data: Record<string, string | string[] | boolean> = {};

  for (const entry of entries) {
    const separatorIndex = entry.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = entry.slice(0, separatorIndex).trim();
    const rawValue = entry.slice(separatorIndex + 1).trim();

    if (rawValue === "true" || rawValue === "false") {
      data[key] = rawValue === "true";
    } else if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((value) => value.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = rawValue.replace(/^"|"$/g, "");
    }
  }

  return {
    data: {
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      author: String(data.author ?? ""),
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: String(data.category ?? ""),
      draft: Boolean(data.draft),
    },
    content: match[2].trim(),
  };
}

function getReadingMinutes(content: string) {
  const words = content.replace(/[^\p{L}\p{N}\s]/gu, " ").trim().split(/\s+/);
  return Math.max(1, Math.ceil(words.length / 240));
}

export function getAllBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getBlogPost(slug);
    })
    .filter((post): post is BlogPost => post !== null && !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontMatter(raw);

  return {
    slug,
    ...data,
    content,
    readingMinutes: getReadingMinutes(content),
  };
}
