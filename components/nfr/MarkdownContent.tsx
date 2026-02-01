"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const sections = parseMarkdownToSections(content);

  return (
    <motion.div
      className={cn("prose prose-lg dark:prose-invert max-w-none", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
        >
          {renderSection(section)}
        </motion.div>
      ))}
    </motion.div>
  );
}

interface ParsedSection {
  type: "h1" | "h2" | "h3" | "h4" | "paragraph" | "list" | "ordered-list" | "table" | "code" | "blockquote" | "hr";
  content: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  language?: string;
}

function parseMarkdownToSections(content: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const lines = content.split("\n");

  let i = 0;
  let currentListItems: string[] = [];
  let isOrderedList = false;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = "";
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      sections.push({
        type: isOrderedList ? "ordered-list" : "list",
        content: "",
        items: [...currentListItems],
      });
      currentListItems = [];
      isOrderedList = false;
    }
  };

  const flushTable = () => {
    if (tableHeaders.length > 0 || tableRows.length > 0) {
      sections.push({
        type: "table",
        content: "",
        headers: tableHeaders,
        rows: tableRows,
      });
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Code blocks
    if (trimmedLine.startsWith("```")) {
      if (!inCodeBlock) {
        flushList();
        flushTable();
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.slice(3).trim() || "text";
        codeBlockContent = [];
      } else {
        inCodeBlock = false;
        sections.push({
          type: "code",
          content: codeBlockContent.join("\n"),
          language: codeBlockLanguage,
        });
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      i++;
      continue;
    }

    // Horizontal rule
    if (trimmedLine === "---" || trimmedLine === "***" || trimmedLine === "___" || /^-{3,}$/.test(trimmedLine)) {
      flushList();
      flushTable();
      sections.push({ type: "hr", content: "" });
      i++;
      continue;
    }

    // Headers
    if (trimmedLine.startsWith("# ") && !trimmedLine.startsWith("## ")) {
      flushList();
      flushTable();
      sections.push({ type: "h1", content: trimmedLine.slice(2) });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("## ")) {
      flushList();
      flushTable();
      sections.push({ type: "h2", content: trimmedLine.slice(3) });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("### ")) {
      flushList();
      flushTable();
      sections.push({ type: "h3", content: trimmedLine.slice(4) });
      i++;
      continue;
    }

    if (trimmedLine.startsWith("#### ")) {
      flushList();
      flushTable();
      sections.push({ type: "h4", content: trimmedLine.slice(5) });
      i++;
      continue;
    }

    // Blockquote
    if (trimmedLine.startsWith("> ")) {
      flushList();
      flushTable();
      sections.push({ type: "blockquote", content: trimmedLine.slice(2) });
      i++;
      continue;
    }

    // Table detection
    if (trimmedLine.includes("|") && trimmedLine.startsWith("|")) {
      flushList();
      const cells = trimmedLine.split("|").map(c => c.trim()).filter(Boolean);

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else if (trimmedLine.includes("---") || trimmedLine.includes(":-")) {
        // Skip separator line
      } else {
        tableRows.push(cells);
      }
      i++;
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmedLine)) {
      if (!isOrderedList && currentListItems.length > 0) {
        flushList();
      }
      isOrderedList = true;
      currentListItems.push(trimmedLine.replace(/^\d+\.\s*/, ""));
      i++;
      continue;
    }

    // Unordered list
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      if (isOrderedList && currentListItems.length > 0) {
        flushList();
      }
      isOrderedList = false;
      currentListItems.push(trimmedLine.slice(2));
      i++;
      continue;
    }

    // Empty line - flush lists
    if (trimmedLine === "") {
      flushList();
      flushTable();
      i++;
      continue;
    }

    // Regular paragraph
    flushList();
    flushTable();
    sections.push({ type: "paragraph", content: trimmedLine });
    i++;
  }

  // Flush remaining
  flushList();
  flushTable();

  return sections;
}

function renderSection(section: ParsedSection) {
  switch (section.type) {
    case "h1":
      return (
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-primary-900 dark:text-primary-100 flex items-center gap-3">
          {renderInlineText(section.content)}
        </h1>
      );

    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 pb-3 border-b border-[var(--border)] text-primary-800 dark:text-primary-200 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-primary-500 rounded-full" />
          {renderInlineText(section.content)}
        </h2>
      );

    case "h3":
      return (
        <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-primary-700 dark:text-primary-300">
          {renderInlineText(section.content)}
        </h3>
      );

    case "h4":
      return (
        <h4 className="text-lg font-semibold mt-6 mb-3 text-[var(--foreground)]">
          {renderInlineText(section.content)}
        </h4>
      );

    case "paragraph":
      return (
        <p className="text-[var(--foreground)] leading-relaxed mb-4">
          {renderInlineText(section.content)}
        </p>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-primary-50 dark:bg-primary-950/30 rounded-r-lg italic text-[var(--muted-foreground)]">
          {renderInlineText(section.content)}
        </blockquote>
      );

    case "list":
      return (
        <ul className="space-y-2 mb-4 ml-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
              <span className="text-[var(--foreground)] leading-relaxed">
                {renderInlineText(item)}
              </span>
            </li>
          ))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol className="space-y-2 mb-4 ml-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-sm font-semibold text-primary-600 dark:text-primary-400 flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-[var(--foreground)] leading-relaxed">
                {renderInlineText(item)}
              </span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-[var(--border)]">
          <table className="min-w-full divide-y divide-[var(--border)]">
            {section.headers && section.headers.length > 0 && (
              <thead className="bg-[var(--muted)]">
                <tr>
                  {section.headers.map((header, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider text-[var(--foreground)]"
                    >
                      {renderInlineText(header)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-[var(--border)]">
              {section.rows?.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[var(--muted)]/50 transition-colors">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-sm text-[var(--foreground)]">
                      {renderTableCell(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <div className="mb-6">
          <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
            {section.language && section.language !== "text" && (
              <div className="px-4 py-2 bg-[#2d2d2d] border-b border-[#404040] text-xs text-gray-400 font-mono">
                {section.language}
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-gray-200 whitespace-pre">
                {section.content}
              </code>
            </pre>
          </div>
        </div>
      );

    case "hr":
      return <hr className="my-8 border-t-2 border-[var(--border)]" />;

    default:
      return null;
  }
}

function renderInlineText(text: string): React.ReactNode {
  // Process inline formatting: bold, italic, code, links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="font-semibold text-primary-700 dark:text-primary-300">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic: *text* or _text_
    const italicMatch = remaining.match(/^[*_]([^*_]+)[*_]/);
    if (italicMatch) {
      parts.push(<em key={key++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 bg-[var(--muted)] rounded text-sm font-mono text-primary-600 dark:text-primary-400">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Find next special character
    const nextSpecial = remaining.search(/[\*`\[_]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Special char but no match, just add it
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function renderTableCell(cell: string): React.ReactNode {
  // Special formatting for table cells
  const content = renderInlineText(cell);

  // Highlight good values
  if (cell.startsWith("<") || cell.includes("Good") || cell.includes("Yes")) {
    return <span className="text-green-600 dark:text-green-400 font-medium">{content}</span>;
  }

  // Highlight bad values
  if (cell.startsWith(">") || cell.includes("Poor") || cell.includes("No") || cell.includes("Bad")) {
    return <span className="text-red-600 dark:text-red-400 font-medium">{content}</span>;
  }

  // Highlight warnings
  if (cell.includes("Needs Improvement") || cell.includes("Medium") || cell.includes("Warning")) {
    return <span className="text-yellow-600 dark:text-yellow-400 font-medium">{content}</span>;
  }

  return content;
}
