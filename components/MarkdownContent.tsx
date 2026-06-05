import Link from "next/link";
import type { ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
};

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-brand-900">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={key}
          className="rounded bg-brand-50 px-1.5 py-0.5 text-[0.9em] text-brand-800"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith("/");
        const className =
          "font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-dark";

        parts.push(
          isInternal ? (
            <Link key={key} href={href} className={className}>
              {label}
            </Link>
          ) : (
            <a
              key={key}
              href={href}
              className={className}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </a>
          ),
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function parseTable(lines: string[], key: string) {
  const rows = lines
    .filter((line) => !/^\|\s*-/.test(line))
    .map((line) =>
      line
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim()),
    );

  const [head, ...body] = rows;

  return (
    <div key={key} className="my-8 overflow-x-auto rounded-lg border border-brand-100">
      <table className="min-w-full divide-y divide-brand-100 text-left text-sm">
        <thead className="bg-brand-50 text-brand-900">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-4 py-3 font-semibold">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100 bg-white text-brand-700">
          {body.map((row, rowIndex) => (
            <tr key={`${key}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${key}-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre
          key={`code-${index}`}
          className="my-8 overflow-x-auto rounded-lg bg-brand-950 p-5 text-sm leading-relaxed text-brand-50"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (line === "---") {
      blocks.push(<hr key={`hr-${index}`} className="my-10 border-brand-100" />);
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      blocks.push(parseTable(tableLines, `table-${index}`));
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      blocks.push(
        level === 2 ? (
          <h2 key={`h2-${index}`} className="mb-4 mt-12 text-2xl font-bold text-brand-900">
            {renderInline(text)}
          </h2>
        ) : (
          <h3 key={`h3-${index}`} className="mb-3 mt-8 text-xl font-semibold text-brand-900">
            {renderInline(text)}
          </h3>
        ),
      );
      index += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line) || /^-\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      const itemPattern = ordered ? /^\d+\.\s+/ : /^-\s+/;
      while (index < lines.length && itemPattern.test(lines[index])) {
        items.push(lines[index].replace(itemPattern, ""));
        index += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={`list-${index}`}
          className={`my-5 space-y-2 pl-6 leading-relaxed text-brand-700 ${
            ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    if (line.startsWith(">")) {
      const quotes: string[] = [];
      while (index < lines.length && lines[index].startsWith(">")) {
        quotes.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <blockquote
          key={`quote-${index}`}
          className="my-8 border-l-4 border-accent bg-brand-50 px-5 py-4 text-lg font-medium leading-relaxed text-brand-800"
        >
          {quotes.map((quote) => (
            <p key={quote}>{renderInline(quote)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{2,3})\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !/^-+\s+/.test(lines[index]) &&
      !lines[index].startsWith("|") &&
      !lines[index].startsWith(">") &&
      !lines[index].startsWith("```") &&
      lines[index] !== "---"
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push(
      <p key={`p-${index}`} className="my-5 leading-8 text-brand-700">
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <div className="text-base">{blocks}</div>;
}
