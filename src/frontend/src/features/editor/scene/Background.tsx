import { useEditorState } from '../state/editorState';
import { Environment } from '@react-three/drei';

export function Background() {
  const { state } = useEditorState();

  if (state.backgroundMode === 'Transparent') {
    return null;
  }

  if (state.backgroundMode === 'Studio') {
    return (
      <>
        <color attach="background" args={['#f0f0f0']} />
        <Environment preset="studio" />
      </>
    );
  }

  if (state.backgroundMode === 'DarkStage') {
    return (
      <>
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 10, 50]} />
      </>
    );
  }

  if (state.backgroundMode === 'Gradient') {
    return (
      <>
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#16213e', 10, 50]} />
      </>
    );
  }

  return null;
}
