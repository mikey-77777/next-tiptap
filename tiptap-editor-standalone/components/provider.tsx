/**
 * TiptapProvider Component
 * 
 * Context provider cho Tiptap Editor
 * Quản lý state: fullscreen mode, source mode, và editor instance
 * 
 * NOTE: SourceEditor là optional dependency - nếu không có, source mode sẽ không hoạt động
 * Bạn có thể implement SourceEditor riêng hoặc loại bỏ tính năng này
 */

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { EditorContent, type Editor } from "@tiptap/react";

// Optional: SourceEditor - có thể import từ dự án của bạn hoặc loại bỏ
// import SourceEditor from "@/components/source-editor/editor";

import { getEditorContent } from "../helpers/tiptap";
import { cn } from "../helpers/utils";

type TiptapContextType = {
  editor: Editor;
  isFullScreen: boolean;
  isSourceMode: boolean;
  toggleFullScreen: () => void;
  toggleSourceMode: () => void;
};

const TiptapContext = createContext<TiptapContextType>({} as TiptapContextType);
export const useTiptapEditor = () => useContext(TiptapContext);

type TiptapProviderProps = {
  editor: Editor;
  slotBefore?: ReactNode;
  slotAfter?: ReactNode;
  children?: ReactNode;
};

export const TiptapProvider = ({
  editor,
  children,
  slotBefore,
  slotAfter,
}: TiptapProviderProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSourceMode, setIsSourceMode] = useState(false);

  const providerValue = useMemo(
    () => ({
      editor,
      isFullScreen,
      isSourceMode,
      toggleFullScreen: () => setIsFullScreen((prev) => !prev),
      toggleSourceMode: () => setIsSourceMode((prev) => !prev),
    }),
    [editor, isFullScreen, isSourceMode]
  );

  // Source mode - optional, cần SourceEditor component
  // Nếu không có SourceEditor, luôn hiển thị EditorContent
  const editorContent = isSourceMode ? (
    // Uncomment và import SourceEditor nếu có
    // <SourceEditor initialContent={getEditorContent(editor, "html")} />
    <EditorContent editor={editor} className="rte-editor__container" />
  ) : (
    <EditorContent editor={editor} className="rte-editor__container" />
  );

  return (
    <TiptapContext value={providerValue}>
      <div
        className={cn("rte-editor", { "rte-editor--fullscreen": isFullScreen })}
      >
        {slotBefore}
        {editorContent}
        {slotAfter}
        {children}
      </div>
    </TiptapContext>
  );
};

export default TiptapProvider;
