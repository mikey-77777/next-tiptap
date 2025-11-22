/**
 * Tiptap extension - code-block-shiki
 */

import CodeBlock from "@tiptap/extension-code-block";

import { defaultLanguage } from "../../helpers/shiki-config";

import { shikiPlugin } from "./shiki-plugin";

export const CodeBlockShiki = CodeBlock.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: defaultLanguage,
    };
  },

  addProseMirrorPlugins() {
    return [shikiPlugin];
  },
});
