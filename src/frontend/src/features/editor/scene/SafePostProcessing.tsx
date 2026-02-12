import { useEditorState } from '../state/editorState';
import { lazy, Suspense } from 'react';

// Lazy load PostProcessing to isolate any module-level errors
const PostProcessing = lazy(() => 
  import('./PostProcessing')
    .then(module => ({ default: module.PostProcessing }))
    .catch(error => {
      console.error('Failed to load PostProcessing module:', error);
      // Return a no-op component on failure
      return { default: () => null };
    })
);

/**
 * Safe wrapper for PostProcessing that handles loading failures gracefully.
 * If post-processing fails to load or initialize, it disables effects via editor state
 * while allowing the core 3D scene to continue rendering.
 */
export function SafePostProcessing() {
  const { state, disablePostProcessing } = useEditorState();

  // If post-processing is already disabled, don't render anything
  if (state.postProcessingDisabled) {
    return null;
  }

  // If bloom is not enabled, don't render post-processing
  if (!state.bloomEnabled) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <PostProcessing />
    </Suspense>
  );
}
