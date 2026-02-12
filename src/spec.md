# Specification

## Summary
**Goal:** Fix the production startup initialization failure so the app reliably loads to the main UI (Editor tab) instead of showing the global StartupFallbackScreen.

**Planned changes:**
- Diagnose and eliminate uncaught errors/unhandled promise rejections during initial mount that trigger StartupErrorBoundary in production builds.
- Harden 3D viewport initialization so WebGL renderer creation and post-processing setup failures degrade gracefully (disable effects or show an in-viewport WebGL-required/context-lost message) without crashing the whole app.
- Improve StartupFallbackScreen diagnostics so it consistently shows error message/stack (when available) plus WebGL diagnostics, and “Copy details” copies both as a single plain-text blob.

**User-visible outcome:** In production builds the app opens to the normal editor UI; 3D viewport failures fall back gracefully with clear in-viewport messaging, and if a true startup failure occurs the fallback screen provides actionable error + WebGL details that can be copied.
