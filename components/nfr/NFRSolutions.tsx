"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Code2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "./CodeBlock";
import { extractCodeBlocks } from "@/lib/nfr";
import type { NFRContent } from "@/types/nfr";

interface NFRSolutionsProps {
  nfr: NFRContent;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function NFRSolutions({ nfr, className }: NFRSolutionsProps) {
  const content = nfr.content.solutions;
  const solutions = parseSolutions(content);

  return (
    <motion.div
      className={cn("space-y-8", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Solutions Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Solutions & Best Practices</h2>
            <p className="text-[var(--muted-foreground)]">
              {solutions.length} proven approach{solutions.length !== 1 ? "es" : ""} to solve this problem
            </p>
          </div>
        </div>
      </motion.div>

      {/* Solutions Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 hidden md:block" />

        {/* Solution Cards */}
        <div className="space-y-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-3.5 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-[var(--background)] shadow-md hidden md:block z-10" />

              <SolutionCard solution={solution} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* No solutions fallback */}
      {solutions.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="lg">
            <div className="prose dark:prose-invert max-w-none">
              <RawMarkdownRenderer content={content} />
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

interface Solution {
  title: string;
  description: string;
  codeBlocks: { code: string; language: string; editable: boolean; label?: string }[];
  steps?: string[];
}

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [activeCodeTab, setActiveCodeTab] = useState(0);

  const colors = [
    { gradient: "from-green-500 to-emerald-600", bg: "bg-green-50 dark:bg-green-950/20", border: "border-green-200 dark:border-green-800" },
    { gradient: "from-blue-500 to-cyan-600", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800" },
    { gradient: "from-purple-500 to-violet-600", bg: "bg-purple-50 dark:bg-purple-950/20", border: "border-purple-200 dark:border-purple-800" },
    { gradient: "from-orange-500 to-amber-600", bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800" },
  ];

  const color = colors[index % colors.length];

  return (
    <Card
      variant="bordered"
      padding="none"
      className={cn("overflow-hidden md:ml-10", color.border)}
      hoverable
    >
      {/* Solution Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full p-6 text-left flex items-start gap-4 transition-colors",
          expanded ? color.bg : "hover:bg-[var(--muted)]/30"
        )}
      >
        <motion.div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br",
            color.gradient
          )}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {index + 1}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Solution {index + 1}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
          {!expanded && solution.description && (
            <p className="text-[var(--muted-foreground)] line-clamp-2">
              {solution.description}
            </p>
          )}
        </div>

        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-2"
        >
          <ChevronRight className="w-6 h-6 text-[var(--muted-foreground)]" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[var(--border)]">
              {/* Description */}
              {solution.description && (
                <motion.p
                  className="text-lg text-[var(--foreground)] mt-6 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {solution.description}
                </motion.p>
              )}

              {/* Implementation Steps */}
              {solution.steps && solution.steps.length > 0 && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Implementation Steps
                  </h4>
                  <div className="space-y-3">
                    {solution.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                          {i + 1}
                        </span>
                        <span className="text-[var(--foreground)]">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Code Examples with Tabs */}
              {solution.codeBlocks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-primary-500" />
                    <h4 className="font-semibold">Code Example</h4>
                  </div>

                  {/* Code tabs if multiple blocks */}
                  {solution.codeBlocks.length > 1 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {solution.codeBlocks.map((block, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveCodeTab(i)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                            activeCodeTab === i
                              ? "bg-primary-500 text-white"
                              : "bg-[var(--muted)] hover:bg-[var(--muted)]/80"
                          )}
                        >
                          {block.label || `Example ${i + 1}`}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Active code block */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCodeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CodeBlock
                        code={solution.codeBlocks[activeCodeTab].code}
                        language={solution.codeBlocks[activeCodeTab].language}
                        editable={solution.codeBlocks[activeCodeTab].editable}
                        showLineNumbers
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function parseSolutions(content: string): Solution[] {
  const solutions: Solution[] = [];

  // Split by solution headers: "### Solution 1:" or "### Solution 1: Title"
  const solutionRegex = /### Solution \d+:?\s*(.+?)(?=### Solution \d+:|$)/gs;
  let match;

  while ((match = solutionRegex.exec(content)) !== null) {
    const solutionContent = match[1];
    const lines = solutionContent.split("\n");

    // First non-empty line is the title
    let title = "";
    const descriptionLines: string[] = [];
    let inDescription = true;

    for (const line of lines) {
      if (!title && line.trim() && !line.startsWith("```")) {
        title = line.trim();
        continue;
      }
      if (inDescription && line.trim() && !line.startsWith("```") && !line.startsWith("#")) {
        descriptionLines.push(line);
      } else if (line.startsWith("```") || line.startsWith("#")) {
        inDescription = false;
      }
    }

    const description = descriptionLines.slice(0, 3).join(" ").trim();

    // Extract code blocks with labels
    const codeBlocks = extractCodeBlocksWithLabels(solutionContent);

    // Extract steps if present
    const stepsMatch = solutionContent.match(/(?:Steps|Implementation):\s*\n((?:\d+\..+\n?)+)/i);
    const steps = stepsMatch
      ? stepsMatch[1]
          .split("\n")
          .filter((line) => /^\d+\./.test(line.trim()))
          .map((line) => line.replace(/^\s*\d+\.\s*/, "").trim())
      : [];

    if (title) {
      solutions.push({
        title,
        description,
        codeBlocks,
        steps,
      });
    }
  }

  return solutions;
}

function extractCodeBlocksWithLabels(content: string): Solution["codeBlocks"] {
  const blocks: Solution["codeBlocks"] = [];
  const codeBlockRegex = /```(\w+)?(?::editable)?(?:\s*\n)?([\s\S]*?)```/g;

  let match;
  let prevIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const language = match[1] || "text";
    const code = match[2].trim();
    const editable = fullMatch.includes(":editable");

    // Look for a label in the preceding text
    const precedingText = content.slice(prevIndex, match.index);
    let label = "";

    // Check for "❌ Bad:" or "✅ Good:" patterns
    if (precedingText.includes("❌") || precedingText.toLowerCase().includes("bad")) {
      label = "❌ Bad Practice";
    } else if (precedingText.includes("✅") || precedingText.toLowerCase().includes("good")) {
      label = "✅ Good Practice";
    } else if (code.includes("// ❌")) {
      label = "❌ Bad Practice";
    } else if (code.includes("// ✅")) {
      label = "✅ Good Practice";
    }

    blocks.push({ code, language, editable, label });
    prevIndex = match.index + fullMatch.length;
  }

  return blocks;
}

// Simple markdown renderer for fallback
function RawMarkdownRenderer({ content }: { content: string }) {
  const codeBlocks = extractCodeBlocks(content);
  const textContent = content.replace(/```[\s\S]*?```/g, "CODE_BLOCK_PLACEHOLDER");
  let codeBlockIndex = 0;

  const parts = textContent.split("CODE_BLOCK_PLACEHOLDER");

  return (
    <>
      {parts.map((part, index) => (
        <div key={index}>
          {part.split("\n\n").map((para, pIndex) => {
            if (para.startsWith("### ")) {
              return (
                <h3 key={pIndex} className="text-xl font-semibold mt-6 mb-3">
                  {para.replace("### ", "")}
                </h3>
              );
            }
            if (para.trim()) {
              return (
                <p key={pIndex} className="my-4 leading-relaxed">
                  {para}
                </p>
              );
            }
            return null;
          })}

          {index < parts.length - 1 && codeBlocks[codeBlockIndex] && (
            <CodeBlock
              code={codeBlocks[codeBlockIndex].code}
              language={codeBlocks[codeBlockIndex].language}
              editable={codeBlocks[codeBlockIndex++].editable}
              className="my-6"
              showLineNumbers
            />
          )}
        </div>
      ))}
    </>
  );
}
