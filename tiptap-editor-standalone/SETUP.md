# Hướng dẫn Setup

## Các dependencies cần cài đặt

Sau khi copy folder `tiptap-editor-standalone` vào dự án của bạn, cần cài đặt các dependencies sau:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-table @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extensions @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-tooltip react react-dom react-colorful react-icons react-window clsx lowlight shiki
```

## Các dependencies tùy chọn

- `@tiptap/extension-code-block-lowlight`: Nếu muốn sử dụng code highlighting với lowlight
- `@tiptap/extension-drag-handle`: Nếu muốn sử dụng drag handle
- `codemirror`: Nếu muốn sử dụng source editor mode

## Xử lý các dependencies bên ngoài

### 1. SourceEditor (Optional)

File `components/provider.tsx` có reference đến `SourceEditor`. Nếu bạn không có component này:

- Option 1: Comment out phần source mode
- Option 2: Tạo SourceEditor component riêng
- Option 3: Import từ dự án của bạn nếu có

### 2. MediaLibrary (Optional)

File `components/controls/image-button-2.tsx` có reference đến `MediaLibrary`. Bạn cần:

- Tạo MediaLibrary component riêng, hoặc
- Sử dụng image-button.tsx thay thế (đã được comment)

### 3. Export Word (Optional)

File `components/controls/export-word-button.tsx` có reference đến `@/lib/docx`. Bạn cần:

- Implement export functionality riêng, hoặc
- Comment out button này nếu không cần

## Import và sử dụng

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

## Customization

### CSS Variables

Bạn có thể tùy chỉnh giao diện thông qua CSS variables trong file styles của bạn:

```css
:root {
  --rte-bg: #ffffff;
  --rte-fg: #1f2328;
  --rte-primary: #0969da;
  /* ... */
}
```

Xem file `styles/_variables.scss` để biết đầy đủ các biến.

## Notes

- Tất cả các file đã được thêm header comments với mô tả tiếng Việt/Anh
- Các dependencies bên ngoài đã được xử lý hoặc làm optional
- Code highlighting sử dụng Shiki (mặc định) hoặc Lowlight (optional)

