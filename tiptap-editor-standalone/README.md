# Tiptap Editor - Standalone Package

Package độc lập chứa toàn bộ code xử lý cho Tiptap Editor, có thể tái sử dụng trong các dự án khác.

## 📁 Cấu trúc thư mục

```
tiptap-editor-standalone/
├── components/          # Các React components
│   ├── controls/       # Các nút điều khiển editor (bold, italic, etc.)
│   ├── menus/          # Các menu context (link, image, table, etc.)
│   ├── ui/             # UI components cơ bản (button, input, dropdown, etc.)
│   ├── icons/          # Icon components
│   ├── color-picker/   # Color picker component
│   └── emoji-picker/   # Emoji picker component
├── extensions/          # Tiptap extensions tùy chỉnh
├── helpers/            # Utility functions
├── hooks/              # React hooks
├── styles/             # SCSS stylesheets
└── index.ts            # Entry point chính
```

## 🚀 Cài đặt

### Dependencies cần thiết

```json
{
  "@tiptap/react": "^3.10.0",
  "@tiptap/starter-kit": "^3.10.0",
  "@tiptap/extension-subscript": "^3.10.0",
  "@tiptap/extension-superscript": "^3.10.0",
  "@tiptap/extension-table": "^3.10.0",
  "@tiptap/extension-text-align": "^3.10.0",
  "@tiptap/extension-text-style": "^3.10.0",
  "@tiptap/extensions": "^3.10.0",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-popover": "^1.1.15",
  "@radix-ui/react-tooltip": "^1.2.8",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-colorful": "^5.6.1",
  "react-icons": "^5.4.0",
  "react-window": "^2.2.0",
  "clsx": "^2.1.1",
  "lowlight": "^3.3.0",
  "shiki": "^3.12.2"
}
```

### Optional Dependencies

- `@tiptap/extension-code-block-lowlight`: Nếu muốn sử dụng code highlighting với lowlight
- `@tiptap/extension-drag-handle`: Nếu muốn sử dụng drag handle
- `codemirror`: Nếu muốn sử dụng source editor mode

## 📖 Sử dụng

### Import cơ bản

```tsx
import TiptapEditor from './tiptap-editor-standalone';
import './tiptap-editor-standalone/styles/index.scss';

function App() {
  return (
    <TiptapEditor
      content="<p>Hello World</p>"
      output="html"
      onChange={(content) => console.log(content)}
    />
  );
}
```

### Với TypeScript

```tsx
import TiptapEditor, { TiptapEditorRef } from './tiptap-editor-standalone';
import { useRef } from 'react';

function App() {
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <TiptapEditor
      ref={editorRef}
      content="<p>Hello World</p>"
      output="html"
      onChange={(content) => console.log(content)}
    />
  );
}
```

## ⚙️ Props

### TiptapEditorProps

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `content` | `Content` | - | Nội dung ban đầu của editor |
| `readonly` | `boolean` | `false` | Chế độ chỉ đọc |
| `disabled` | `boolean` | `false` | Vô hiệu hóa editor |
| `minHeight` | `string \| number` | `320` | Chiều cao tối thiểu (px) |
| `maxHeight` | `string \| number` | - | Chiều cao tối đa (px) |
| `maxWidth` | `string \| number` | - | Chiều rộng tối đa (px) |
| `placeholder` | `string \| Record<string, string>` | - | Placeholder text |
| `output` | `"html" \| "json"` | `"html"` | Định dạng output |
| `ssr` | `boolean` | `false` | Server-side rendering |
| `editorProps` | `EditorProps` | - | Props cho Tiptap editor |
| `throttleDelay` | `number` | `1500` | Delay cho onChange callback (ms) |
| `onChange` | `(value: Content) => void` | - | Callback khi nội dung thay đổi |

## 🎨 Customization

### CSS Variables

Bạn có thể tùy chỉnh giao diện thông qua CSS variables:

```css
:root {
  --rte-bg: #ffffff;
  --rte-fg: #1f2328;
  --rte-border: #d1d9e0;
  --rte-primary: #0969da;
  --rte-primary-fg: #ffffff;
  --rte-radius: 0.5rem;
  --rte-editor-font-size: 1rem;
  --rte-editor-line-height: 1.75;
  /* ... và nhiều biến khác */
}
```

Xem file `styles/_variables.scss` để biết đầy đủ các biến có sẵn.

## 📝 Notes

- Package này đã được tách ra từ dự án gốc và thêm đầy đủ comments
- Một số dependencies bên ngoài (như SourceEditor) có thể cần được implement riêng hoặc loại bỏ
- Code highlighting sử dụng Shiki hoặc Lowlight, bạn có thể chọn một trong hai
- Emoji picker sử dụng CDN từ jsdelivr.net

## 🔧 Development

Để phát triển hoặc tùy chỉnh:

1. Copy toàn bộ folder `tiptap-editor-standalone` vào dự án của bạn
2. Cài đặt các dependencies cần thiết
3. Import và sử dụng như hướng dẫn ở trên
4. Tùy chỉnh styles và components theo nhu cầu

## 📄 License

Giữ nguyên license từ dự án gốc.

