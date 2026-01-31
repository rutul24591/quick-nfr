"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Play, RotateCcw, Code2, FileCode } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  editable?: boolean;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({
  code: initialCode,
  language = "typescript",
  filename,
  editable = false,
  showLineNumbers = true,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setIsEditing(false);
  }, [initialCode]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  }, []);

  const lines = code.split("\n");

  // Determine if code has bad/good indicator
  const isBadExample = code.includes("// ❌") || code.includes("❌ Bad");
  const isGoodExample = code.includes("// ✅") || code.includes("✅ Good");

  // Get language display name and icon color
  const languageConfig: Record<string, { name: string; color: string }> = {
    typescript: { name: "TypeScript", color: "#3178c6" },
    javascript: { name: "JavaScript", color: "#f7df1e" },
    tsx: { name: "TSX", color: "#3178c6" },
    jsx: { name: "JSX", color: "#61dafb" },
    css: { name: "CSS", color: "#264de4" },
    html: { name: "HTML", color: "#e34c26" },
    json: { name: "JSON", color: "#292929" },
    yaml: { name: "YAML", color: "#cb171e" },
    bash: { name: "Bash", color: "#4eaa25" },
    sql: { name: "SQL", color: "#f29111" },
    python: { name: "Python", color: "#3776ab" },
    go: { name: "Go", color: "#00add8" },
    rust: { name: "Rust", color: "#dea584" },
  };

  const langConfig = languageConfig[language] || { name: language, color: "#6b7280" };

  return (
    <motion.div
      className={cn(
        "relative group rounded-xl overflow-hidden shadow-lg",
        "border",
        isBadExample && "border-red-500/30",
        isGoodExample && "border-green-500/30",
        !isBadExample && !isGoodExample && "border-[var(--border)]",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-3 border-b",
        isBadExample && "bg-red-950/50 border-red-500/30",
        isGoodExample && "bg-green-950/50 border-green-500/30",
        !isBadExample && !isGoodExample && "bg-[#181825] border-[#313244]"
      )}>
        <div className="flex items-center gap-3">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
            <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
            <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
          </div>

          <div className="flex items-center gap-2 ml-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: langConfig.color }}
            />
            {filename ? (
              <span className="text-sm font-mono text-[#cdd6f4]">
                {filename}
              </span>
            ) : (
              <span className="text-xs font-medium text-[#a6adc8] uppercase tracking-wide">
                {langConfig.name}
              </span>
            )}
          </div>

          {/* Example type indicator */}
          {isBadExample && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400 font-medium">
              ❌ Bad Practice
            </span>
          )}
          {isGoodExample && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 font-medium">
              ✅ Good Practice
            </span>
          )}
          {editable && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-[#cba6f7]/20 text-[#cba6f7] font-medium">
              Editable
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {editable && code !== initialCode && (
            <motion.button
              onClick={handleReset}
              className="p-2 rounded-lg text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#313244] transition-colors"
              title="Reset to original"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          )}
          <motion.button
            onClick={handleCopy}
            className="p-2 rounded-lg text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#313244] transition-colors"
            title="Copy code"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Check className="w-4 h-4 text-[#a6e3a1]" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Copy className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto bg-[#1e1e2e]">
        {editable && isEditing ? (
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onBlur={() => setIsEditing(false)}
            className={cn(
              "w-full min-h-[200px] p-4 font-mono text-sm leading-6",
              "bg-transparent text-[#cdd6f4]",
              "border-none outline-none resize-y",
              showLineNumbers && "pl-16"
            )}
            spellCheck={false}
          />
        ) : (
          <pre
            className={cn(
              "p-4 font-mono text-sm leading-6 overflow-x-auto",
              editable && "cursor-text"
            )}
            onClick={editable ? handleEdit : undefined}
          >
            <code className="block">
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex hover:bg-[#313244]/30 transition-colors",
                    highlightLines.includes(index + 1) && "bg-[#cba6f7]/10"
                  )}
                >
                  {showLineNumbers && (
                    <span className="select-none w-10 pr-4 text-right text-[#6c7086] border-r border-[#313244] mr-4 flex-shrink-0">
                      {index + 1}
                    </span>
                  )}
                  <span className="flex-1 whitespace-pre">
                    <HighlightedCode code={line} language={language} />
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </div>

      {/* Edit hint for editable blocks */}
      {editable && !isEditing && (
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-[#a6adc8] bg-[#313244] px-3 py-1.5 rounded-full shadow-lg">
            Click to edit
          </span>
        </div>
      )}

      {/* Copy success indicator */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 right-4 bg-[#a6e3a1] text-[#1e1e2e] px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Enhanced syntax highlighting
function HighlightedCode({ code, language }: { code: string; language: string }) {
  // Language-specific keywords
  const jsKeywords = [
    "const", "let", "var", "function", "return", "if", "else", "for", "while",
    "class", "interface", "type", "import", "export", "from", "async", "await",
    "try", "catch", "throw", "new", "this", "extends", "implements", "public",
    "private", "protected", "static", "readonly", "default", "null", "undefined",
    "true", "false", "typeof", "instanceof", "void", "enum", "namespace", "module",
    "declare", "abstract", "as", "is", "keyof", "infer", "never", "unknown", "any",
    "switch", "case", "break", "continue", "do", "finally", "in", "of", "super",
    "yield", "delete", "with", "debugger"
  ];

  const htmlKeywords = ["DOCTYPE", "html", "head", "body", "div", "span", "a", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "li", "ol", "table", "tr", "td", "th", "form", "input", "button", "label", "select", "option", "textarea", "img", "link", "meta", "script", "style", "header", "footer", "nav", "main", "section", "article", "aside"];

  const cssKeywords = ["@import", "@media", "@keyframes", "@font-face", "!important"];

  const keywords = language === "html" ? htmlKeywords :
                   language === "css" ? cssKeywords : jsKeywords;

  // Escape HTML entities
  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Order matters! Apply highlighting in specific order

  // 1. Comments (highest priority - don't highlight inside comments)
  // Single line comments
  highlighted = highlighted.replace(
    /(\/\/.*$)/gm,
    '<span class="code-comment">$1</span>'
  );
  // Multi-line comments (simplified)
  highlighted = highlighted.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span class="code-comment">$1</span>'
  );
  // HTML comments
  highlighted = highlighted.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,
    '<span class="code-comment">$1</span>'
  );

  // 2. Strings (after comments)
  // Template literals
  highlighted = highlighted.replace(
    /(`(?:[^`\\]|\\.)*`)/g,
    '<span class="code-string">$1</span>'
  );
  // Double and single quoted strings
  highlighted = highlighted.replace(
    /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g,
    '<span class="code-string">$&</span>'
  );

  // 3. JSX/HTML tags
  highlighted = highlighted.replace(
    /(&lt;\/?)([\w-]+)/g,
    '$1<span class="code-tag">$2</span>'
  );

  // 4. Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="code-number">$1</span>'
  );

  // 5. Keywords
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, "g");
    highlighted = highlighted.replace(
      regex,
      '<span class="code-keyword">$1</span>'
    );
  });

  // 6. Function calls
  highlighted = highlighted.replace(
    /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    '<span class="code-function">$1</span>'
  );

  // 7. Object properties after dot
  highlighted = highlighted.replace(
    /\.([a-zA-Z_$][\w$]*)/g,
    '.<span class="code-property">$1</span>'
  );

  // 8. Types in TypeScript (after colon)
  highlighted = highlighted.replace(
    /:\s*([A-Z][a-zA-Z0-9_]*)/g,
    ': <span class="code-type">$1</span>'
  );

  // 9. Decorators
  highlighted = highlighted.replace(
    /@([a-zA-Z_$][\w$]*)/g,
    '<span class="code-decorator">@$1</span>'
  );

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}

// Editable code playground variant
export interface CodePlaygroundProps {
  initialCode: string;
  language?: string;
  onRun?: (code: string) => void;
  output?: string;
}

export function CodePlayground({
  initialCode,
  language = "javascript",
  onRun,
  output,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);

  return (
    <div className="space-y-4">
      <CodeBlock
        code={code}
        language={language}
        editable
        showLineNumbers
      />

      {onRun && (
        <div className="flex justify-end">
          <motion.button
            onClick={() => onRun(code)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            Run Code
          </motion.button>
        </div>
      )}

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#1e1e2e] border border-[#313244] font-mono text-sm"
        >
          <div className="flex items-center gap-2 text-xs text-[#a6adc8] mb-3">
            <div className="w-2 h-2 rounded-full bg-[#a6e3a1]" />
            Output
          </div>
          <pre className="text-[#cdd6f4] whitespace-pre-wrap">{output}</pre>
        </motion.div>
      )}
    </div>
  );
}
