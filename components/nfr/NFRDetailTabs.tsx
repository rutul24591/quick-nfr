"use client";

import { useState } from "react";
import {
  FileText,
  AlertTriangle,
  Lightbulb,
  Code,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Tabs } from "@/components/ui/Tabs";
import { NFROverview } from "./NFROverview";
import { NFRProblem } from "./NFRProblem";
import { NFRSolutions } from "./NFRSolutions";
import { NFRExamples } from "./NFRExamples";
import { NFRReferences } from "./NFRReferences";
import type { NFRContent, NFRMetadata } from "@/types/nfr";

interface NFRDetailTabsProps {
  nfr: NFRContent;
  relatedNFRs?: NFRMetadata[];
}

const tabs = [
  { value: "overview", label: "Overview", icon: FileText },
  { value: "problem", label: "Problem", icon: AlertTriangle },
  { value: "solutions", label: "Solutions", icon: Lightbulb },
  { value: "examples", label: "Examples", icon: Code },
  { value: "references", label: "References", icon: BookOpen },
];

export function NFRDetailTabs({ nfr, relatedNFRs = [] }: NFRDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs.Root defaultValue="overview" onValueChange={setActiveTab}>
      <Tabs.List className="flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;

          return (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2"
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-[var(--muted-foreground)]"
                )}
              />
              <span className="hidden sm:inline">{tab.label}</span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <Tabs.Content value="overview">
        <NFROverview nfr={nfr} />
      </Tabs.Content>
      <Tabs.Content value="problem">
        <NFRProblem nfr={nfr} />
      </Tabs.Content>
      <Tabs.Content value="solutions">
        <NFRSolutions nfr={nfr} />
      </Tabs.Content>
      <Tabs.Content value="examples">
        <NFRExamples nfr={nfr} />
      </Tabs.Content>
      <Tabs.Content value="references">
        <NFRReferences nfr={nfr} relatedNFRs={relatedNFRs} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

// Mobile-friendly accordion version
export function NFRDetailAccordion({ nfr, relatedNFRs = [] }: NFRDetailTabsProps) {
  return (
    <div className="space-y-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        let content: React.ReactNode = null;
        switch (tab.value) {
          case "overview":
            content = <NFROverview nfr={nfr} />;
            break;
          case "problem":
            content = <NFRProblem nfr={nfr} />;
            break;
          case "solutions":
            content = <NFRSolutions nfr={nfr} />;
            break;
          case "examples":
            content = <NFRExamples nfr={nfr} />;
            break;
          case "references":
            content = <NFRReferences nfr={nfr} relatedNFRs={relatedNFRs} />;
            break;
        }

        return (
          <details
            key={tab.value}
            className="group border border-[var(--border)] rounded-lg overflow-hidden"
            open={tab.value === "overview"}
          >
            <summary className="flex items-center gap-3 p-4 cursor-pointer bg-[var(--muted)]/30 hover:bg-[var(--muted)]/50 transition-colors">
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="font-medium">{tab.label}</span>
              <svg
                className="w-5 h-5 ml-auto transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="p-4 border-t border-[var(--border)]">{content}</div>
          </details>
        );
      })}
    </div>
  );
}
