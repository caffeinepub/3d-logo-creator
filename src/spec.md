# Specification

## Summary
**Goal:** Build a DaVinci Resolve–inspired cinematic 3D logo creator that renders editable 3D text in real time with presets, advanced 3D/material/lighting controls, effects, background modes, exports, and in-app documentation plus Free vs Pro feature gating.

**Planned changes:**
- Create the core 3D Logo Editor screen with real-time 3D text rendering, brand name input, and selectable styles (Metal, Gold, Chrome, Glass, Neon, Cinematic) with interactive camera controls.
- Add advanced geometry/transform controls: extrusion depth, bevel/edge smoothness, and rotation X/Y/Z with reset.
- Implement lighting, shadows, and reflection/metallic-style controls (direction/angle, intensity, shadow toggle/strength, reflection/metalness-like adjustment).
- Add material presets (Gold, Silver, Matte, Carbon Fiber, Marble), roughness/gloss (or equivalent) controls, and custom texture upload with remove/reset, including drag-and-drop for at least one texture workflow.
- Add cinematic effects controls: bloom/glow, rim lighting, and at least one particle effect (smoke or sparks) with toggle and intensity/density control.
- Add motion blur and depth-of-field controls with on/off toggles and at least one adjustable parameter each.
- Provide background/scene modes: Studio, Dark cinematic stage, Gradient, and Transparent, ensuring exports respect the selected mode.
- Implement export options: PNG (transparent), JPG up to 4K, SVG best-effort vector representation, and rotating logo animation video export (MP4 if supported, otherwise a clearly labeled fallback such as WebM).
- Add one-click brand presets (Luxury, Tech, Spiritual, Gaming, Corporate) that apply coherent combinations of settings while remaining editable.
- Build a dark, professional UI layout: left presets/assets panel, center 3D viewport, right inspector, and bottom timeline-like strip for animation playback/scrubbing; ensure all user-facing text is English.
- Add an in-app “Architecture & Pipeline” documentation section describing architecture, UI flow, rendering pipeline, deterministic styling logic, and including representative code snippets.
- Add an in-app “Free vs Pro” section describing tiers and indicative pricing, plus local UI feature gating with Pro-only features marked/disabled and a toggle to switch Free/Pro for demo.

**User-visible outcome:** Users can type a brand name, preview and edit a cinematic 3D text logo with materials/lighting/effects/backgrounds, apply brand presets, animate and export the result (images/SVG/video), view built-in architecture documentation, and see Free vs Pro gating with a demo toggle.
