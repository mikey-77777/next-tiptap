/**
 * Lowlight Bundle
 * 
 * File này chứa bundled languages cho lowlight
 * Sử dụng highlight.js để highlight code syntax
 */

import plaintext from "highlight.js/lib/languages/plaintext";
import xml from "highlight.js/lib/languages/xml";
import { createLowlight } from "lowlight";

/**
 * Type định nghĩa cho các ngôn ngữ được bundle
 */
export type BundledLanguage =
  | "bash"
  | "c"
  | "csharp"
  | "css"
  | "go"
  | "graphql"
  | "java"
  | "javascript"
  | "js"
  | "jsx"
  | "json"
  | "kotlin"
  | "makefile"
  | "markdown"
  | "md"
  | "objectivec"
  | "php"
  | "plaintext"
  | "text"
  | "python"
  | "py"
  | "scss"
  | "shell"
  | "sh"
  | "sql"
  | "typescript"
  | "ts"
  | "tsx"
  | "xml"
  | "html";

/**
 * Bundled languages với lazy loading
 */
const bundledLanguages: Record<
  BundledLanguage,
  () => Promise<{ default: any }>
> = {
  bash: () => import("highlight.js/lib/languages/bash"),
  sh: () => import("highlight.js/lib/languages/bash"),
  c: () => import("highlight.js/lib/languages/c"),
  csharp: () => import("highlight.js/lib/languages/csharp"),
  css: () => import("highlight.js/lib/languages/css"),
  go: () => import("highlight.js/lib/languages/go"),
  graphql: () => import("highlight.js/lib/languages/graphql"),
  java: () => import("highlight.js/lib/languages/java"),
  javascript: () => import("highlight.js/lib/languages/javascript"),
  js: () => import("highlight.js/lib/languages/javascript"),
  jsx: () => import("highlight.js/lib/languages/javascript"),
  json: () => import("highlight.js/lib/languages/json"),
  kotlin: () => import("highlight.js/lib/languages/kotlin"),
  makefile: () => import("highlight.js/lib/languages/makefile"),
  markdown: () => import("highlight.js/lib/languages/markdown"),
  md: () => import("highlight.js/lib/languages/markdown"),
  objectivec: () => import("highlight.js/lib/languages/objectivec"),
  php: () => import("highlight.js/lib/languages/php"),
  plaintext: () => import("highlight.js/lib/languages/plaintext"),
  text: () => import("highlight.js/lib/languages/plaintext"),
  python: () => import("highlight.js/lib/languages/python"),
  py: () => import("highlight.js/lib/languages/python"),
  scss: () => import("highlight.js/lib/languages/scss"),
  shell: () => import("highlight.js/lib/languages/shell"),
  sql: () => import("highlight.js/lib/languages/sql"),
  typescript: () => import("highlight.js/lib/languages/typescript"),
  ts: () => import("highlight.js/lib/languages/typescript"),
  tsx: () => import("highlight.js/lib/languages/typescript"),
  xml: () => import("highlight.js/lib/languages/xml"),
  html: () => import("highlight.js/lib/languages/xml"),
};

/**
 * Tạo highlighter instance với lazy loading
 * @returns Highlighter instance với methods để load languages
 */
export const createHighlighter = () => {
  const lowlight = createLowlight();

  // Đăng ký các ngôn ngữ mặc định
  lowlight.register("plaintext", plaintext);
  lowlight.register("xml", xml);

  return {
    lowlight,
    getLoadedLanguages: () => lowlight.listLanguages(),
    loadLanguage: async (language: BundledLanguage) => {
      if (lowlight.registered(language)) {
        return;
      }

      const loader = bundledLanguages[language];
      if (!loader) {
        console.warn(`Language ${language} not found in bundle`);
        return;
      }

      try {
        const { default: lang } = await loader();
        lowlight.register(language, lang);
      } catch (err) {
        console.error(`Failed to load language: ${language}`, err);
      }
    },
  };
};

export type Highlighter = ReturnType<typeof createHighlighter>;

export { bundledLanguages };

