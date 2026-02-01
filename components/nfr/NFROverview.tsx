"use client";

import { motion } from "framer-motion";
import { Clock, BarChart3, Tag, Info, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CategoryBadge, DifficultyBadge, TagBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/nfr/CodeBlock";
import type { NFRContent } from "@/types/nfr";

interface NFROverviewProps {
  nfr: NFRContent;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function NFROverview({ nfr, className }: NFROverviewProps) {
  const importanceColors = {
    critical: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
    high: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
    medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
  };

  return (
    <motion.div
      className={cn("space-y-8", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* TL;DR Card - Most Important */}
      <motion.div variants={itemVariants}>
        <Card variant="bordered" className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/40 dark:to-primary-900/20 border-primary-200 dark:border-primary-800 overflow-hidden">
          <div className="flex items-start gap-4 p-6">
            <div className="p-3 rounded-xl bg-primary-500 text-white shadow-lg">
              <Info className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-2">
                Quick Summary
              </h3>
              <p className="text-lg text-primary-800 dark:text-primary-200 leading-relaxed">
                {nfr.tldr}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Metadata Grid with Icons */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetadataCard
            icon={<BarChart3 className="w-5 h-5" />}
            label="Category"
            value={<CategoryBadge category={nfr.category} size="md" />}
            color="blue"
          />
          <MetadataCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Difficulty"
            value={<DifficultyBadge difficulty={nfr.difficulty} size="md" />}
            color="green"
          />
          <MetadataCard
            icon={<Clock className="w-5 h-5" />}
            label="Read Time"
            value={<span className="font-semibold">{nfr.readTime} minutes</span>}
            color="purple"
          />
          <MetadataCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="Importance"
            value={
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium capitalize", importanceColors[nfr.importance])}>
                {nfr.importance}
              </span>
            }
            color="orange"
          />
        </div>
      </motion.div>

      {/* Tags Section */}
      {nfr.tags.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold">Related Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {nfr.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TagBadge tag={tag} />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Main Content with Rich Markdown Rendering */}
      {nfr.content.overview && (
        <motion.div variants={itemVariants}>
          <div className="prose dark:prose-invert max-w-none">
            <EnhancedMarkdown content={nfr.content.overview} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function MetadataCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
}) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
    purple: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
    orange: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
  };

  const iconColors = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    orange: "text-orange-600 dark:text-orange-400",
  };

  return (
    <motion.div
      className={cn(
        "p-4 rounded-xl border",
        colorClasses[color]
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={cn("mb-2", iconColors[color])}>{icon}</div>
      <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
        {label}
      </div>
      <div>{value}</div>
    </motion.div>
  );
}

// Enhanced markdown renderer with animations
function EnhancedMarkdown({ content }: { content: string }) {
  const sections = parseMarkdown(content);

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSection(section, index)}
        </motion.div>
      ))}
    </div>
  );
}

interface ParsedSection {
  type: "heading" | "paragraph" | "list" | "table" | "highlight" | "code" | "divider" | "diagram";
  level?: number;
  content: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  language?: string;
}

function parseMarkdown(content: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const lines = content.split("\n");
  let currentList: string[] = [];
  let currentTable: { headers: string[]; rows: string[][] } | null = null;
  let inTable = false;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = "";
  let inDiagram = false;
  let diagramContent: string[] = [];

  // Helper to flush current list
  const flushList = () => {
    if (currentList.length > 0) {
      sections.push({ type: "list", content: "", items: [...currentList] });
      currentList = [];
    }
  };

  // Helper to flush current table
  const flushTable = () => {
    if (currentTable) {
      sections.push({
        type: "table",
        content: "",
        headers: currentTable.headers,
        rows: currentTable.rows,
      });
      currentTable = null;
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks with triple backticks
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        // Start of code block
        flushList();
        flushTable();
        inCodeBlock = true;
        codeBlockLanguage = line.trim().slice(3).trim() || "text";
        codeBlockContent = [];
      } else {
        // End of code block
        inCodeBlock = false;
        sections.push({
          type: "code",
          content: codeBlockContent.join("\n"),
          language: codeBlockLanguage,
        });
        codeBlockContent = [];
        codeBlockLanguage = "";
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Detect diagram patterns (lines with arrows ↓ → ← ↑ or box-like structures)
    const isDiagramLine = /^[\s]*[↓↑←→│├┤┌┐└┘─┬┴┼|+\-]/.test(line) ||
                          /^[\s]*[\w\s]+[↓↑←→][\s]*$/.test(line) ||
                          /^[\s]*[↓↑←→][\s]*$/.test(line);

    if (isDiagramLine && !inTable) {
      if (!inDiagram) {
        flushList();
        flushTable();
        inDiagram = true;
        diagramContent = [];
      }
      diagramContent.push(line);
      continue;
    } else if (inDiagram && line.trim() !== "" && !isDiagramLine) {
      // End of diagram
      sections.push({
        type: "diagram",
        content: diagramContent.join("\n"),
      });
      diagramContent = [];
      inDiagram = false;
      // Continue processing this line
    } else if (inDiagram && line.trim() === "") {
      // End of diagram on empty line
      sections.push({
        type: "diagram",
        content: diagramContent.join("\n"),
      });
      diagramContent = [];
      inDiagram = false;
      continue;
    }

    // Horizontal rules
    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      flushList();
      flushTable();
      sections.push({ type: "divider", content: "" });
      continue;
    }

    // Headers
    if (line.startsWith("#### ")) {
      flushList();
      flushTable();
      sections.push({ type: "heading", level: 4, content: line.replace("#### ", "") });
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      flushTable();
      sections.push({ type: "heading", level: 3, content: line.replace("### ", "") });
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      flushTable();
      sections.push({ type: "heading", level: 2, content: line.replace("## ", "") });
      continue;
    }

    // Tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      flushList();
      if (!inTable) {
        inTable = true;
        currentTable = {
          headers: line.split("|").map(c => c.trim()).filter(Boolean),
          rows: [],
        };
        continue;
      }
      if (line.includes("---") || line.includes(":-")) {
        continue; // Skip separator line
      }
      if (currentTable) {
        currentTable.rows.push(line.split("|").map(c => c.trim()).filter(Boolean));
      }
      continue;
    } else if (inTable && currentTable) {
      flushTable();
    }

    // Numbered list items
    if (/^\d+\.\s/.test(line.trim())) {
      currentList.push(line.replace(/^\s*\d+\.\s*/, ""));
      continue;
    }

    // List items
    if (line.trim().startsWith("- ")) {
      currentList.push(line.replace(/^\s*-\s*/, ""));
      continue;
    } else if (currentList.length > 0 && line.trim() === "") {
      flushList();
      continue;
    }

    // Paragraphs
    if (line.trim() && !line.startsWith("|")) {
      flushList();
      // Check for bold highlights (stats, important info)
      if (line.includes("**") && (line.includes("%") || line.includes(":"))) {
        sections.push({ type: "highlight", content: line });
      } else {
        sections.push({ type: "paragraph", content: line });
      }
    }
  }

  // Handle remaining items
  flushList();
  flushTable();
  if (inDiagram && diagramContent.length > 0) {
    sections.push({ type: "diagram", content: diagramContent.join("\n") });
  }
  if (inCodeBlock && codeBlockContent.length > 0) {
    sections.push({ type: "code", content: codeBlockContent.join("\n"), language: codeBlockLanguage });
  }

  return sections;
}

function renderSection(section: ParsedSection, index: number) {
  switch (section.type) {
    case "heading":
      if (section.level === 2) {
        return (
          <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-3">
            <span className="w-1 h-8 bg-primary-500 rounded-full" />
            {renderInlineFormatting(section.content)}
          </h2>
        );
      }
      return (
        <h3 className="text-xl font-semibold mt-6 mb-3 text-primary-900 dark:text-primary-100">
          {renderInlineFormatting(section.content)}
        </h3>
      );

    case "paragraph":
      return (
        <p className="text-[var(--foreground)] leading-relaxed text-lg">
          {renderInlineFormatting(section.content)}
        </p>
      );

    case "highlight":
      return (
        <div className="p-4 bg-primary-50 dark:bg-primary-950/30 rounded-lg border-l-4 border-primary-500">
          <p className="text-[var(--foreground)]">
            {renderInlineFormatting(section.content)}
          </p>
        </div>
      );

    case "list":
      return (
        <ul className="space-y-3">
          {section.items?.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="mt-2 w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
              <span className="text-[var(--foreground)] leading-relaxed">
                {renderInlineFormatting(item)}
              </span>
            </motion.li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="min-w-full">
            <thead className="bg-[var(--muted)]">
              <tr>
                {section.headers?.map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {section.rows?.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  className="hover:bg-[var(--muted)]/50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowIndex * 0.05 }}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 text-sm">
                      {renderTableCell(cell)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

function renderInlineFormatting(text: string) {
  // Handle bold text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-primary-700 dark:text-primary-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderTableCell(cell: string) {
  // Color coding for table cells
  if (cell.startsWith("≤") || cell === "Good" || cell.includes("✅")) {
    return <span className="text-green-600 dark:text-green-400 font-medium">{cell}</span>;
  }
  if (cell.includes(">") && !cell.includes("≤") || cell === "Poor" || cell.includes("❌")) {
    return <span className="text-red-600 dark:text-red-400 font-medium">{cell}</span>;
  }
  if (cell === "Needs Improvement" || cell.includes("2.5s - 4s")) {
    return <span className="text-yellow-600 dark:text-yellow-400 font-medium">{cell}</span>;
  }
  return cell;
}
