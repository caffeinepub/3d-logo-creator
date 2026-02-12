import { EditorLayout } from './layout/EditorLayout';
import { EditorStateProvider } from './state/editorState';

export function EditorScreen() {
  return (
    <EditorStateProvider>
      <EditorLayout />
    </EditorStateProvider>
  );
}
