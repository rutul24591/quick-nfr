"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  FileCode,
  ArrowRightLeft,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { CodeBlock } from "./CodeBlock";
import { extractCodeBlocks } from "@/lib/nfr";
import type { NFRContent } from "@/types/nfr";

interface NFRExamplesProps {
  nfr: NFRContent;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function NFRExamples({ nfr, className }: NFRExamplesProps) {
  const content = nfr.content.examples;
  const examples = parseExamples(content);
  const codeBlocks = extractCodeBlocks(content);

  return (
    <motion.div
      className={cn("space-y-8", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Real-World Examples</h2>
            <p className="text-[var(--muted-foreground)]">
              Practical implementations and case studies
            </p>
          </div>
        </div>
      </motion.div>

      {/* Case Studies */}
      {examples.caseStudies.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="none" className="overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6" />
                <h3 className="text-xl font-bold">Case Study</h3>
              </div>
              <p className="mt-2 text-blue-100">
                See how real teams solved this problem
              </p>
            </div>

            <div className="p-6">
              {examples.caseStudies.map((study, index) => (
                <CaseStudyCard key={index} study={study} />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Metrics Comparison */}
      {examples.metrics.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Performance Metrics</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    {examples.metrics[0] && Object.keys(examples.metrics[0]).map((header, i) => (
                      <th key={i} className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {examples.metrics.map((row, rowIndex) => (
                    <motion.tr
                      key={rowIndex}
                      className="hover:bg-[var(--muted)]/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: rowIndex * 0.1 }}
                    >
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 text-sm">
                          {renderMetricCell(cell as string)}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Code Examples */}
      {codeBlocks.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <FileCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold">Code Examples</h3>
            </div>

            <div className="space-y-6">
              {codeBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CodeBlock
                    code={block.code}
                    language={block.language}
                    editable={block.editable}
                    showLineNumbers
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Before/After Comparison */}
      {examples.beforeAfter && (
        <motion.div variants={itemVariants}>
          <BeforeAfterComparison comparison={examples.beforeAfter} />
        </motion.div>
      )}

      {/* Implementation Checklist */}
      {examples.checklist.length > 0 && (
        <motion.div variants={itemVariants}>
          <ImplementationChecklist items={examples.checklist} />
        </motion.div>
      )}
    </motion.div>
  );
}

interface CaseStudy {
  title: string;
  description: string;
  before: { label: string; value: string }[];
  after: { label: string; value: string }[];
  changes: string[];
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="space-y-6">
      {study.description && (
        <p className="text-lg text-[var(--muted-foreground)]">{study.description}</p>
      )}

      {/* Before/After Metrics */}
      {(study.before.length > 0 || study.after.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Before */}
          {study.before.length > 0 && (
            <motion.div
              className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 border border-red-200 dark:border-red-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <h4 className="font-bold text-red-700 dark:text-red-400">Before Optimization</h4>
              </div>
              <dl className="space-y-2">
                {study.before.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <dt className="text-sm text-red-600 dark:text-red-400">{item.label}</dt>
                    <dd className="font-mono font-bold text-red-700 dark:text-red-300">{item.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          )}

          {/* After */}
          {study.after.length > 0 && (
            <motion.div
              className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border border-green-200 dark:border-green-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h4 className="font-bold text-green-700 dark:text-green-400">After Optimization</h4>
              </div>
              <dl className="space-y-2">
                {study.after.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <dt className="text-sm text-green-600 dark:text-green-400">{item.label}</dt>
                    <dd className="font-mono font-bold text-green-700 dark:text-green-300">{item.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          )}
        </div>
      )}

      {/* Key Changes */}
      {study.changes.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary-500" />
            Key Changes Made
          </h4>
          <div className="space-y-2">
            {study.changes.map((change, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-medium">
                  {i + 1}
                </span>
                <span className="text-[var(--foreground)]">{change}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface BeforeAfterProps {
  before: { code: string; language: string };
  after: { code: string; language: string };
}

function BeforeAfterComparison({ comparison }: { comparison: BeforeAfterProps }) {
  const [view, setView] = useState<"split" | "before" | "after">("split");

  return (
    <Card variant="bordered" padding="none" className="overflow-hidden">
      <div className="p-4 bg-[var(--muted)] border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary-500" />
            <h3 className="font-bold">Before & After Comparison</h3>
          </div>
          <div className="flex gap-1 bg-[var(--background)] rounded-lg p-1">
            {(["split", "before", "after"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                  view === v
                    ? "bg-primary-500 text-white"
                    : "hover:bg-[var(--muted)]"
                )}
              >
                {v === "split" ? "Side by Side" : v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {view === "split" && (
            <motion.div
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-4"
            >
              <div>
                <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">❌</span> Before (Bad)
                </div>
                <CodeBlock code={comparison.before.code} language={comparison.before.language} showLineNumbers />
              </div>
              <div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">✅</span> After (Good)
                </div>
                <CodeBlock code={comparison.after.code} language={comparison.after.language} showLineNumbers />
              </div>
            </motion.div>
          )}

          {view === "before" && (
            <motion.div
              key="before"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                <span className="text-lg">❌</span> Before (Bad Practice)
              </div>
              <CodeBlock code={comparison.before.code} language={comparison.before.language} showLineNumbers />
            </motion.div>
          )}

          {view === "after" && (
            <motion.div
              key="after"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                <span className="text-lg">✅</span> After (Good Practice)
              </div>
              <CodeBlock code={comparison.after.code} language={comparison.after.language} showLineNumbers />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function ImplementationChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checked);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setChecked(newChecked);
  };

  const progress = (checked.size / items.length) * 100;

  return (
    <Card variant="bordered" padding="lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold">Implementation Checklist</h3>
        </div>
        <div className="text-sm text-[var(--muted-foreground)]">
          {checked.size} of {items.length} completed
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[var(--muted)] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.label
            key={index}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all border",
              checked.has(index)
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                : "bg-[var(--muted)]/30 border-transparent hover:bg-[var(--muted)]/50"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <input
              type="checkbox"
              checked={checked.has(index)}
              onChange={() => toggleItem(index)}
              className="mt-1 w-5 h-5 rounded border-2 border-[var(--border)] text-green-600 focus:ring-green-500"
            />
            <span className={cn(
              "transition-all",
              checked.has(index) && "line-through text-[var(--muted-foreground)]"
            )}>
              {item}
            </span>
          </motion.label>
        ))}
      </div>
    </Card>
  );
}

function renderMetricCell(cell: string): React.ReactNode {
  // Check for percentage improvements
  if (cell.includes("%") && cell.includes("-")) {
    return <span className="text-green-600 dark:text-green-400 font-semibold">{cell}</span>;
  }
  if (cell.includes("%") && cell.includes("+")) {
    return <span className="text-red-600 dark:text-red-400 font-semibold">{cell}</span>;
  }
  // Check for pass/fail
  if (cell.includes("✅") || cell.toLowerCase() === "pass") {
    return <span className="text-green-600 dark:text-green-400 font-semibold">{cell}</span>;
  }
  if (cell.includes("❌") || cell.toLowerCase() === "fail") {
    return <span className="text-red-600 dark:text-red-400 font-semibold">{cell}</span>;
  }
  return cell;
}

interface ExampleSections {
  caseStudies: CaseStudy[];
  metrics: Record<string, string>[];
  beforeAfter: BeforeAfterProps | null;
  checklist: string[];
}

function parseExamples(content: string): ExampleSections {
  const sections: ExampleSections = {
    caseStudies: [],
    metrics: [],
    beforeAfter: null,
    checklist: [],
  };

  // Parse case study
  const caseStudyMatch = content.match(/### Real-World Case Study[^\n]*\n\n?([\s\S]*?)(?=###|$)/i);
  if (caseStudyMatch) {
    const studyContent = caseStudyMatch[1];

    // Parse before metrics
    const beforeMatch = studyContent.match(/\*\*Before[^*]*\*\*:?\s*\n([\s\S]*?)(?=\*\*After|###|$)/i);
    const before: { label: string; value: string }[] = [];
    if (beforeMatch) {
      const lines = beforeMatch[1].split("\n").filter(l => l.includes(":"));
      lines.forEach(line => {
        const [label, value] = line.split(":").map(s => s.replace(/[-*]/g, "").trim());
        if (label && value) before.push({ label, value });
      });
    }

    // Parse after metrics
    const afterMatch = studyContent.match(/\*\*After[^*]*\*\*:?\s*\n([\s\S]*?)(?=\*\*Changes|###|$)/i);
    const after: { label: string; value: string }[] = [];
    if (afterMatch) {
      const lines = afterMatch[1].split("\n").filter(l => l.includes(":"));
      lines.forEach(line => {
        const [label, value] = line.split(":").map(s => s.replace(/[-*]/g, "").trim());
        if (label && value) after.push({ label, value });
      });
    }

    // Parse changes
    const changesMatch = studyContent.match(/\*\*Changes[^*]*\*\*:?\s*\n([\s\S]*?)(?=###|$)/i);
    const changes: string[] = [];
    if (changesMatch) {
      const lines = changesMatch[1].split("\n");
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith("-") || /^\d+\./.test(trimmed)) {
          changes.push(trimmed.replace(/^[-\d.]+\s*/, ""));
        }
      });
    }

    if (before.length > 0 || after.length > 0) {
      sections.caseStudies.push({
        title: "Performance Optimization",
        description: "",
        before,
        after,
        changes,
      });
    }
  }

  // Parse metrics table
  const tableMatch = content.match(/\|([^\n]+)\|\n\|[-|\s]+\|\n((?:\|[^\n]+\|\n?)+)/);
  if (tableMatch) {
    const headers = tableMatch[1].split("|").map(h => h.trim()).filter(Boolean);
    const rows = tableMatch[2].split("\n").filter(r => r.includes("|"));

    rows.forEach(row => {
      const cells = row.split("|").map(c => c.trim()).filter(Boolean);
      const rowObj: Record<string, string> = {};
      headers.forEach((header, i) => {
        rowObj[header] = cells[i] || "";
      });
      sections.metrics.push(rowObj);
    });
  }

  // Parse checklist
  const checklistMatch = content.match(/##.*Checklist[^\n]*\n\n?([\s\S]*?)(?=##|$)/i);
  if (checklistMatch) {
    const items = checklistMatch[1].split("\n").filter(l => l.includes("[ ]") || l.includes("[x]"));
    sections.checklist = items.map(l => l.replace(/^[-*]\s*\[.\]\s*/, "").trim());
  }

  // Also check for simple list items as checklist
  if (sections.checklist.length === 0) {
    const listMatch = content.match(/- \[ \][^\n]+/g);
    if (listMatch) {
      sections.checklist = listMatch.map(l => l.replace(/^- \[ \]\s*/, "").trim());
    }
  }

  return sections;
}
