/**
 * Tiptap extension - code-block-lowlight
 */

import CodeBlock from "@tiptap/extension-code-block";

import { defaultLanguage } from "../../helpers/lowlight-config";

import { lowlightPlugin } from "./lowlight-plugin";

export const CodeBlockLowlight = CodeBlock.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: defaultLanguage,
    };
  },

  addProseMirrorPlugins() {
    return [lowlightPlugin];
  },
});
