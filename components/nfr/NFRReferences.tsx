"use client";

import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Wrench,
  Link2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { CategoryBadge, DifficultyBadge } from "@/components/ui/Badge";
import type { NFRContent, NFRMetadata } from "@/types/nfr";

interface NFRReferencesProps {
  nfr: NFRContent;
  relatedNFRs?: NFRMetadata[];
  className?: string;
}

export function NFRReferences({
  nfr,
  relatedNFRs = [],
  className,
}: NFRReferencesProps) {
  const content = nfr.content.references;
  const references = parseReferences(content);

  return (
    <div className={cn("space-y-8", className)}>
      {/* Related NFRs */}
      {relatedNFRs.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold">Related NFRs</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedNFRs.map((related) => (
              <RelatedNFRCard key={related.id} nfr={related} />
            ))}
          </div>
        </section>
      )}

      {/* External Resources */}
      {references.resources.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold">External Resources</h3>
          </div>
          <div className="space-y-3">
            {references.resources.map((resource, index) => (
              <ResourceLink key={index} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {/* Tools */}
      {references.tools.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold">Tools & Libraries</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {references.tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Standards & Guidelines */}
      {references.standards.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h3 className="text-lg font-semibold">Standards & Guidelines</h3>
          </div>
          <div className="space-y-3">
            {references.standards.map((standard, index) => (
              <ResourceLink key={index} resource={standard} />
            ))}
          </div>
        </section>
      )}

      {/* Related NFR mentions in content */}
      {references.relatedMentions.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-4">See Also</h3>
          <ul className="space-y-2">
            {references.relatedMentions.map((mention, index) => (
              <li key={index} className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                <span>{mention}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function RelatedNFRCard({ nfr }: { nfr: NFRMetadata }) {
  return (
    <Link href={`/categories/${nfr.category}/${nfr.slug}`}>
      <Card
        variant="interactive"
        hoverable
        className="h-full transition-all hover:border-primary-300 dark:hover:border-primary-700"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-mono text-[var(--muted-foreground)]">
                #{nfr.id}
              </span>
              <CategoryBadge category={nfr.category} size="sm" />
            </div>
            <h4 className="font-semibold mb-1 truncate">{nfr.title}</h4>
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
              {nfr.tldr}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[var(--muted-foreground)] flex-shrink-0" />
        </div>
      </Card>
    </Link>
  );
}

interface Resource {
  title: string;
  url: string;
  description?: string;
}

function ResourceLink({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 hover:bg-[var(--muted)]/50 transition-all group"
    >
      <ExternalLink className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {resource.title}
        </div>
        {resource.description && (
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {resource.description}
          </p>
        )}
        <span className="text-xs text-[var(--muted-foreground)] mt-1 block truncate">
          {new URL(resource.url).hostname}
        </span>
      </div>
    </a>
  );
}

interface Tool {
  name: string;
  url: string;
  description?: string;
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-primary-300 dark:hover:border-primary-700 hover:bg-[var(--muted)]/50 transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
        <Wrench className="w-5 h-5 text-[var(--muted-foreground)]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
          {tool.name}
        </div>
        {tool.description && (
          <p className="text-xs text-[var(--muted-foreground)] truncate">
            {tool.description}
          </p>
        )}
      </div>
      <ExternalLink className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0" />
    </a>
  );
}

interface ReferenceSections {
  resources: Resource[];
  tools: Tool[];
  standards: Resource[];
  relatedMentions: string[];
}

function parseReferences(content: string): ReferenceSections {
  const sections: ReferenceSections = {
    resources: [],
    tools: [],
    standards: [],
    relatedMentions: [],
  };

  // Parse external resources
  const resourcesMatch = content.match(
    /### External Resources\n([\s\S]*?)(?=###|$)/i
  );
  if (resourcesMatch) {
    sections.resources = parseLinks(resourcesMatch[1]);
  }

  // Parse tools
  const toolsMatch = content.match(/### Tools\n([\s\S]*?)(?=###|$)/i);
  if (toolsMatch) {
    sections.tools = parseLinks(toolsMatch[1]).map((link) => ({
      name: link.title,
      url: link.url,
      description: link.description,
    }));
  }

  // Parse standards
  const standardsMatch = content.match(
    /### (?:Standards|Architecture|Best Practices)[^\n]*\n([\s\S]*?)(?=###|$)/i
  );
  if (standardsMatch) {
    sections.standards = parseLinks(standardsMatch[1]);
  }

  // Parse related NFR mentions
  const relatedMatch = content.match(/### Related NFRs\n([\s\S]*?)(?=###|$)/i);
  if (relatedMatch) {
    sections.relatedMentions = relatedMatch[1]
      .split("\n")
      .filter((line) => line.includes("NFR #"))
      .map((line) => line.replace(/^[-*]\s*/, "").trim());
  }

  return sections;
}

function parseLinks(content: string): Resource[] {
  const links: Resource[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    try {
      links.push({
        title: match[1],
        url: match[2],
      });
    } catch {
      // Invalid URL, skip
    }
  }

  return links;
}
