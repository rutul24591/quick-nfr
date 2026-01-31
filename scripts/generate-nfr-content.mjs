#!/usr/bin/env node

// Script to generate nfr-content.ts from markdown files in content/nfr/
// Run: node scripts/generate-nfr-content.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content", "nfr");
const OUTPUT_FILE = path.join(
  __dirname,
  "..",
  "lib",
  "constants",
  "nfr-content.ts"
);

// --- Main ---

function main() {
  console.log("Generating NFR content from markdown files...");
  console.log(`Reading from: ${CONTENT_DIR}`);

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  console.log(`Found ${files.length} markdown files`);

  const entries = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    // Extract ID from frontmatter
    const idMatch = raw.match(/^id:\s*(\d+)/m);
    if (!idMatch) {
      console.warn(`  Skipping ${file}: no id in frontmatter`);
      continue;
    }

    const id = parseInt(idMatch[1], 10);

    // Extract slug from frontmatter or filename
    const slugMatch = raw.match(/^slug:\s*(.+)$/m);
    let slug = slugMatch ? slugMatch[1].trim() : null;

    if (!slug) {
      // Derive slug from filename: "01-page-load-performance-full.md" -> needs NFR_METADATA lookup
      // We'll use the ID to map later
      slug = `__id_${id}`;
    }

    // Parse content
    const body = stripFrontmatter(raw);
    const rawSections = splitBySections(body);
    const categorized = categorizeSections(rawSections);
    const nfrSection = mapToNFRSection(categorized);

    entries.push({ id, slug, section: nfrSection });
    console.log(`  Processed NFR #${id} (${file})`);
  }

  // Generate TypeScript file
  const tsContent = generateTypeScript(entries);
  fs.writeFileSync(OUTPUT_FILE, tsContent, "utf-8");
  console.log(`\nGenerated ${OUTPUT_FILE}`);
  console.log(`Total: ${entries.length} NFRs with content`);
}

// --- Frontmatter ---

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\s*/, "");
}

// --- Section Parsing ---

function splitBySections(content) {
  const sections = [];
  const parts = content.split(/(?=^## )/gm);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith("## ")) continue;

    const firstNewline = trimmed.indexOf("\n");
    if (firstNewline === -1) {
      sections.push({ header: trimmed.substring(3).trim(), body: "" });
      continue;
    }

    const header = trimmed.substring(3, firstNewline).trim();
    const body = trimmed
      .substring(firstNewline + 1)
      .replace(/^-{3,}\s*$/gm, "")
      .trim();
    sections.push({ header, body });
  }

  return sections;
}

// --- Section Categorization ---

function categorize(header) {
  const h = header.toLowerCase();

  if (h.includes("explain like") || h.includes("eli")) return "eli10";
  if (h.includes("engineering definition")) return "engineering";
  if (h.includes("advanced system") || h.includes("system perspective"))
    return "advanced";
  if (h.includes("why it matters")) return "importance";
  if (h.includes("mental model") || (h.includes("how") && h.includes("load")))
    return "mentalModel";
  if (h.includes("root cause")) return "rootCauses";
  if (h.includes("real-world") || h.includes("scenario")) return "scenario";
  if (h.includes("solution")) return "solutions";
  if (h.includes("measur") || h.includes("metric")) return "metrics";
  if (h.includes("common mistake") || h.includes("mistake")) return "mistakes";
  if (h.includes("interview")) return "interview";
  if (h.includes("tradeoff")) return "tradeoffs";
  if (h.includes("related nfr")) return "relatedNFRs";
  if (h.includes("reference")) return "references";
  if (h.includes("quiz")) return "quiz";

  return "unknown";
}

function categorizeSections(sections) {
  const result = {
    eli10: [],
    engineering: [],
    advanced: [],
    importance: [],
    mentalModel: [],
    rootCauses: [],
    scenario: [],
    solutions: [],
    metrics: [],
    mistakes: [],
    interview: [],
    tradeoffs: [],
    relatedNFRs: [],
    references: [],
    quiz: [],
    unknown: [],
  };

  for (const section of sections) {
    const cat = categorize(section.header);
    result[cat].push(section.body);
  }

  return result;
}

// --- Section Mapping ---

function mapToNFRSection(cats) {
  return {
    overview: buildOverview(cats),
    problem: buildProblem(cats),
    solutions: buildSolutions(cats),
    examples: buildExamples(cats),
    references: buildReferences(cats),
  };
}

function buildOverview(cats) {
  const parts = [];

  if (cats.eli10.length > 0) {
    parts.push(`### Explain Like I'm 10\n\n${cats.eli10.join("\n\n")}`);
  }
  if (cats.engineering.length > 0) {
    parts.push(
      `### Engineering Definition\n\n${cats.engineering.join("\n\n")}`
    );
  }
  if (cats.advanced.length > 0) {
    parts.push(
      `### Advanced System Perspective\n\n${cats.advanced.join("\n\n")}`
    );
  }
  if (cats.importance.length > 0) {
    parts.push(`### Why It Matters\n\n${cats.importance.join("\n\n")}`);
  }

  return parts.join("\n\n") || "Content loading...";
}

function buildProblem(cats) {
  const parts = [];

  // Intro from scenario or mental model
  if (cats.scenario.length > 0) {
    const scenarioText = cats.scenario.join("\n\n");
    const introLine = scenarioText
      .split("\n")
      .find((l) => l.trim() && !l.startsWith("#") && !l.startsWith("-"));
    if (introLine) {
      parts.push(introLine.replace(/\*\*/g, "").trim());
    }
  } else if (cats.mentalModel.length > 0) {
    const modelText = cats.mentalModel.join("\n\n");
    const introLine = modelText
      .split("\n")
      .find((l) => l.trim() && !l.startsWith("#") && !l.startsWith("-"));
    if (introLine) {
      parts.push(introLine.replace(/\*\*/g, "").trim());
    }
  }

  // Root Causes
  if (cats.rootCauses.length > 0) {
    const rootContent = cats.rootCauses.join("\n\n");
    const formatted = formatRootCauses(rootContent);
    parts.push(`### Root Causes\n\n${formatted}`);
  } else if (cats.scenario.length > 0) {
    const scenarioContent = cats.scenario.join("\n\n");
    const rootCauses = extractRootCausesFromScenario(scenarioContent);
    if (rootCauses) {
      parts.push(`### Root Causes\n\n${rootCauses}`);
    }
  }

  // Mental model
  if (cats.mentalModel.length > 0 && parts.length <= 1) {
    const modelText = cats.mentalModel.join("\n\n");
    parts.push(modelText);
  }

  // Common Mistakes
  if (cats.mistakes.length > 0) {
    const mistakeContent = cats.mistakes.join("\n");
    const mistakeLines = mistakeContent
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => `- ❌ ${line.replace(/^-\s*/, "").trim()}`);

    if (mistakeLines.length > 0) {
      parts.push(`### Common Mistakes\n\n${mistakeLines.join("\n")}`);
    } else {
      parts.push(`### Common Mistakes\n\n${mistakeContent}`);
    }
  }

  return parts.join("\n\n") || "Problem analysis loading...";
}

function formatRootCauses(content) {
  if (/^\d+\.\s+\*\*/.test(content)) {
    return content;
  }

  let counter = 0;
  return content.replace(/^### .+$/gm, (match) => {
    counter++;
    let title = match.substring(4);
    title = cleanEmojiPrefix(title);
    return `${counter}. **${title}**`;
  });
}

function extractRootCausesFromScenario(content) {
  const lines = content.split("\n");
  const bullets = lines
    .filter((l) => l.trim().startsWith("-"))
    .map((l) => l.replace(/^-\s*/, "").trim());

  if (bullets.length === 0) return null;
  return `1. **Key Issues**\n${bullets.map((b) => `   - ${b}`).join("\n")}`;
}

function buildSolutions(cats) {
  if (cats.solutions.length === 0) return "Solutions coming soon.";

  const content = cats.solutions.join("\n\n");

  let counter = 0;
  const transformed = content.replace(/^### .+$/gm, (match) => {
    counter++;
    let title = match.substring(4);
    title = cleanEmojiPrefix(title);
    return `### Solution ${counter}: ${title || "Approach " + counter}`;
  });

  return transformed;
}

function buildExamples(cats) {
  const parts = [];

  if (cats.scenario.length > 0) {
    const scenarioContent = cats.scenario.join("\n\n");
    if (
      scenarioContent.includes("Before") ||
      scenarioContent.includes("Symptoms") ||
      scenarioContent.includes("Result") ||
      scenarioContent.includes("Fix")
    ) {
      parts.push(
        `### Real-World Case Study: Implementation\n\n${scenarioContent}`
      );
    }
  }

  if (cats.metrics.length > 0) {
    parts.push(`### Performance Metrics\n\n${cats.metrics.join("\n\n")}`);
  }

  if (cats.interview.length > 0) {
    parts.push(`### Interview Framing\n\n${cats.interview.join("\n\n")}`);
  }

  if (cats.tradeoffs.length > 0) {
    parts.push(`### Tradeoff Analysis\n\n${cats.tradeoffs.join("\n\n")}`);
  }

  if (cats.quiz.length > 0) {
    const quizContent = cats.quiz.join("\n\n");
    parts.push(`### Self-Assessment Quiz\n\n${quizContent}`);
  }

  return parts.join("\n\n") || "Examples coming soon.";
}

function buildReferences(cats) {
  const parts = [];

  if (cats.references.length > 0) {
    const refContent = cats.references.join("\n\n");

    if (refContent.includes("###")) {
      const transformed = transformReferenceSubSections(refContent);
      parts.push(transformed);
    } else {
      const transformed = transformRawUrls(refContent);
      parts.push(`### External Resources\n\n${transformed}`);
    }
  }

  if (cats.relatedNFRs.length > 0) {
    const nfrContent = cats.relatedNFRs.join("\n\n");
    parts.push(`### Related NFRs\n\n${nfrContent}`);
  }

  return (
    parts.join("\n\n") ||
    "### External Resources\n\n- Industry resources and documentation"
  );
}

// --- Helpers ---

function cleanEmojiPrefix(title) {
  // Remove "✅ Pattern N --- " prefix
  title = title.replace(/^✅\s*Pattern\s*\d+\s*[-–—]+\s*/, "");

  // Remove keycap digit emoji (1️⃣, etc.)
  title = title.replace(/^\d\uFE0F?\u20E3\s*/, "");

  // Remove other emoji-like prefixes
  title = title.replace(
    /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}]+\s*/u,
    ""
  );

  // Remove leading non-alphanumeric
  title = title.replace(/^[^\w(]+/, "");

  return title.trim();
}

function transformReferenceSubSections(content) {
  return content
    .replace(/^### Articles?\s*$/gm, "### External Resources")
    .replace(/^### Tools?\s*$/gm, "### Tools")
    .replace(/^### Standards?\s*$/gm, "### Standards")
    .split("\n")
    .map((line) => {
      if (line.trim().startsWith("-") && !line.includes("[")) {
        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          const url = urlMatch[0];
          const title = extractTitleFromUrl(url);
          return line.replace(url, `[${title}](${url})`);
        }
      }
      return line;
    })
    .join("\n");
}

function transformRawUrls(content) {
  return content
    .split("\n")
    .map((line) => {
      if (line.trim().startsWith("-") && !line.includes("[")) {
        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          const url = urlMatch[0];
          const title = extractTitleFromUrl(url);
          return line.replace(url, `[${title}](${url})`);
        }
      }
      return line;
    })
    .join("\n");
}

function extractTitleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const pathSegments = parsed.pathname
      .replace(/\/$/, "")
      .split("/")
      .filter(Boolean);

    const lastSegment = pathSegments[pathSegments.length - 1] || "";

    if (lastSegment) {
      return lastSegment
        .replace(/[-_]/g, " ")
        .replace(/\.\w+$/, "")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    return parsed.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

// --- TypeScript Generation ---

function escapeForTemplate(str) {
  // Escape backticks and ${} in template literals
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function generateTypeScript(entries) {
  const lines = [];

  lines.push(
    "// AUTO-GENERATED FILE - Do not edit directly"
  );
  lines.push(
    "// Generated by: node scripts/generate-nfr-content.mjs"
  );
  lines.push(
    `// Generated at: ${new Date().toISOString()}`
  );
  lines.push("");
  lines.push('import type { NFRSection } from "@/types/nfr";');
  lines.push("");
  lines.push(
    "// Content indexed by NFR ID for reliable lookup"
  );
  lines.push(
    "const NFR_CONTENT_BY_ID: Record<number, NFRSection> = {"
  );

  for (const entry of entries) {
    lines.push(`  ${entry.id}: {`);
    lines.push(
      `    overview: \`${escapeForTemplate(entry.section.overview)}\`,`
    );
    lines.push(
      `    problem: \`${escapeForTemplate(entry.section.problem)}\`,`
    );
    lines.push(
      `    solutions: \`${escapeForTemplate(entry.section.solutions)}\`,`
    );
    lines.push(
      `    examples: \`${escapeForTemplate(entry.section.examples)}\`,`
    );
    lines.push(
      `    references: \`${escapeForTemplate(entry.section.references)}\`,`
    );
    lines.push("  },");
  }

  lines.push("};");
  lines.push("");
  lines.push("// Slug-to-ID mapping (populated at import time)");
  lines.push(
    "// Uses NFR_METADATA for slug resolution - import separately if needed"
  );
  lines.push("");
  lines.push("/**");
  lines.push(" * Get NFR content by slug");
  lines.push(" */");
  lines.push(
    "export function getNFRContent(slug: string): NFRSection | null {"
  );
  lines.push("  // Try direct slug match from slug mapping");
  lines.push("  const id = SLUG_TO_ID[slug];");
  lines.push("  if (id !== undefined) {");
  lines.push("    return NFR_CONTENT_BY_ID[id] || null;");
  lines.push("  }");
  lines.push("  return null;");
  lines.push("}");
  lines.push("");
  lines.push("/**");
  lines.push(" * Get NFR content by ID");
  lines.push(" */");
  lines.push(
    "export function getNFRContentById(id: number): NFRSection | null {"
  );
  lines.push("  return NFR_CONTENT_BY_ID[id] || null;");
  lines.push("}");
  lines.push("");

  // Generate slug-to-ID mapping
  // We need to import NFR_METADATA for this, but to avoid circular deps,
  // we'll hardcode the mapping based on what we know
  lines.push("// Slug-to-ID mapping");
  lines.push("const SLUG_TO_ID: Record<string, number> = {};");
  lines.push("");
  lines.push("// Initialize slug mapping from NFR_METADATA");
  lines.push("import { NFR_METADATA } from './nfr-data';");
  lines.push("for (const nfr of NFR_METADATA) {");
  lines.push("  SLUG_TO_ID[nfr.slug] = nfr.id;");
  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

// Run
main();
