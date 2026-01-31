"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  AlertCircle,
  TrendingDown,
  XCircle,
  ChevronDown,
  Zap
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "./CodeBlock";
import { extractCodeBlocks } from "@/lib/nfr";
import type { NFRContent } from "@/types/nfr";

interface NFRProblemProps {
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

export function NFRProblem({ nfr, className }: NFRProblemProps) {
  const content = nfr.content.problem;
  const codeBlocks = extractCodeBlocks(content);
  const sections = parseProblemContent(content);

  return (
    <motion.div
      className={cn("space-y-8", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Problem Introduction */}
      {sections.intro && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" className="bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
            <div className="flex items-start gap-4 p-6">
              <div className="p-3 rounded-xl bg-red-500 text-white shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                  The Problem
                </h3>
                <p className="text-lg text-red-800 dark:text-red-200 leading-relaxed">
                  {sections.intro}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Root Causes with Animated Expandable Sections */}
      {sections.rootCauses.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="none" className="overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                <h3 className="text-xl font-bold">Root Causes</h3>
              </div>
              <p className="mt-2 text-red-100">
                Understanding why these problems occur
              </p>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {sections.rootCauses.map((cause, index) => (
                <RootCauseItem key={index} cause={cause} index={index} />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Impact Assessment with Visual Indicators */}
      {sections.impact && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="none" className="overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-6 h-6" />
                <h3 className="text-xl font-bold">Impact Assessment</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {sections.impact.map((impact, index) => (
                  <ImpactCard key={index} impact={impact} index={index} />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Anti-Patterns / Common Issues */}
      {sections.antiPatterns.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold">Common Mistakes to Avoid</h3>
            </div>

            <div className="space-y-3">
              {sections.antiPatterns.map((pattern, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl">❌</span>
                  <span className="text-red-800 dark:text-red-200">{pattern}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Code Examples Showing Problems */}
      {codeBlocks.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="bordered" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900/30">
                <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-bold">Problematic Code Patterns</h3>
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
    </motion.div>
  );
}

interface RootCause {
  title: string;
  items: string[];
}

function RootCauseItem({ cause, index }: { cause: RootCause; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border-l-4 border-transparent hover:border-red-500 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center gap-4 text-left hover:bg-[var(--muted)]/50 transition-colors"
      >
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {index + 1}
        </motion.div>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{cause.title}</h4>
          <p className="text-sm text-[var(--muted-foreground)]">
            {cause.items.length} common issues
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4 pl-16">
          <ul className="space-y-2">
            {cause.items.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
                transition={{ delay: i * 0.05 }}
              >
                <AlertCircle className="w-4 h-4 mt-1 text-red-500 flex-shrink-0" />
                <span className="text-[var(--foreground)]">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

interface ImpactItem {
  category: string;
  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  details: string[];
}

function ImpactCard({ impact, index }: { impact: ImpactItem; index: number }) {
  const levelColors = {
    CRITICAL: "from-red-500 to-red-600",
    HIGH: "from-orange-500 to-orange-600",
    MEDIUM: "from-yellow-500 to-yellow-600",
    LOW: "from-green-500 to-green-600",
  };

  const levelBgColors = {
    CRITICAL: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    HIGH: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
    MEDIUM: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    LOW: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl border p-4",
        levelBgColors[impact.level]
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{impact.category}</h4>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r",
            levelColors[impact.level]
          )}
        >
          {impact.level}
        </span>
      </div>
      <ul className="space-y-1 text-sm">
        {impact.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-[var(--muted-foreground)]">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface ProblemSections {
  intro: string;
  rootCauses: RootCause[];
  impact: ImpactItem[];
  antiPatterns: string[];
}

function parseProblemContent(content: string): ProblemSections {
  const sections: ProblemSections = {
    intro: "",
    rootCauses: [],
    impact: [],
    antiPatterns: [],
  };

  const lines = content.split("\n");
  let currentSection = "";
  let currentCause: RootCause | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect sections
    if (line.startsWith("### Root Causes")) {
      currentSection = "rootCauses";
      continue;
    }
    if (line.startsWith("### Impact Assessment")) {
      currentSection = "impact";
      continue;
    }
    if (line.startsWith("### Anti-Patterns") || line.startsWith("### Common")) {
      currentSection = "antiPatterns";
      continue;
    }

    // Parse intro (first paragraph before any section)
    if (!currentSection && line.trim() && !line.startsWith("#") && !line.startsWith("```")) {
      if (!sections.intro) {
        sections.intro = line;
      }
      continue;
    }

    // Parse root causes
    if (currentSection === "rootCauses") {
      // Numbered item with bold title: "1. **Title**"
      const numberedMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
      if (numberedMatch) {
        if (currentCause) {
          sections.rootCauses.push(currentCause);
        }
        currentCause = { title: numberedMatch[1], items: [] };
        continue;
      }

      // List item under current cause
      if (line.trim().startsWith("- ") && currentCause) {
        currentCause.items.push(line.replace(/^\s*-\s*/, ""));
        continue;
      }
    }

    // Parse impact assessment
    if (currentSection === "impact") {
      // Look for impact categories in code block format
      if (line.includes("Impact:")) {
        const category = line.replace(/:/g, "").trim();
        const levelMatch = lines[i + 1]?.match(/(CRITICAL|HIGH|MEDIUM|LOW)/i);
        const level = (levelMatch?.[1]?.toUpperCase() || "MEDIUM") as ImpactItem["level"];

        // Collect details until next section or empty line
        const details: string[] = [];
        for (let j = i + 2; j < lines.length; j++) {
          const detailLine = lines[j];
          if (detailLine.startsWith("-") || detailLine.startsWith("•")) {
            details.push(detailLine.replace(/^[-•]\s*/, ""));
          } else if (detailLine.trim() === "" || detailLine.includes("Impact:") || detailLine.startsWith("```")) {
            break;
          }
        }

        if (details.length > 0) {
          sections.impact.push({ category, level, details });
        }
      }
    }

    // Parse anti-patterns
    if (currentSection === "antiPatterns") {
      if (line.includes("❌") || (line.trim().startsWith("-") && !line.includes("Impact"))) {
        sections.antiPatterns.push(line.replace(/^[-❌]\s*/, "").trim());
      }
    }
  }

  // Don't forget the last cause
  if (currentCause) {
    sections.rootCauses.push(currentCause);
  }

  // Parse impact from code block if not found
  if (sections.impact.length === 0) {
    const impactMatch = content.match(/```[\s\S]*?(User Impact[\s\S]*?)```/);
    if (impactMatch) {
      const impactContent = impactMatch[1];
      const impactCategories = impactContent.split(/\n\n/);

      impactCategories.forEach((cat) => {
        const lines = cat.split("\n");
        const firstLine = lines[0]?.trim();
        if (firstLine?.includes("Impact:")) {
          const categoryName = firstLine.replace(":", "").trim();
          const levelMatch = lines[0]?.match(/(CRITICAL|HIGH|MEDIUM|LOW)/i);
          const level = (levelMatch?.[1]?.toUpperCase() || "MEDIUM") as ImpactItem["level"];
          const details = lines.slice(1).filter(l => l.startsWith("-")).map(l => l.replace(/^-\s*/, ""));

          if (categoryName && details.length > 0) {
            sections.impact.push({ category: categoryName, level, details });
          }
        }
      });
    }
  }

  // Better impact parsing from structured code block
  if (sections.impact.length === 0) {
    const codeBlockMatch = content.match(/```([\s\S]*?)```/);
    if (codeBlockMatch) {
      const codeContent = codeBlockMatch[1];
      const impactBlocks = codeContent.split(/\n(?=\w+ Impact:)/);

      impactBlocks.forEach((block) => {
        const lines = block.trim().split("\n");
        if (lines[0]) {
          const headerMatch = lines[0].match(/(\w+)\s+Impact:\s*(CRITICAL|HIGH|MEDIUM|LOW)?/i);
          if (headerMatch) {
            const category = headerMatch[1] + " Impact";
            const level = (headerMatch[2]?.toUpperCase() || "MEDIUM") as ImpactItem["level"];
            const details = lines.slice(1).filter(l => l.startsWith("-")).map(l => l.replace(/^-\s*/, ""));

            sections.impact.push({ category, level, details });
          }
        }
      });
    }
  }

  return sections;
}
