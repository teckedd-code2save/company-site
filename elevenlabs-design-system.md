ElevenLabs Design System
Brand Overview
ElevenLabs is an AI audio platform powering enterprises, creators, and developers through voice generation, voice agents, and audio research. The brand embodies technological sophistication, human-like warmth, and seamless integration between AI and human creativity.
Brand Promise: Bringing technology to life
Color Palette
Primary Colors
Table
Token	Hex	Usage
--color-primary	#000000	Primary text, logos, key UI elements
--color-background	#FFFFFF	Main backgrounds
--color-surface	#F5F5F5	Secondary backgrounds, cards
Accent Colors (Research Timeline Gradients)
Table
Token	Hex	Usage
--color-accent-purple	#6B4EE6	Innovation, AI models
--color-accent-coral	#E85D5D	Expressive features
--color-accent-blue	#4A90D9	Trust, reliability
--color-accent-green	#5A9A6E	Growth, accuracy
Gradient Patterns
Hero Gradient: Deep blue to coral to purple
plain
Copy
linear-gradient(135deg, #2E3A8C 0%, #E85D5D 50%, #9B6BFF 100%)
Research Card Gradients:
Purple/Blue: #6B4EE6 → #4A90D9 (Innovation)
Green/Brown: #5A9A6E → #8B7355 (Natural/Growth)
Semantic Colors
Table
Token	Hex	Usage
--color-success	#10B981	Positive states, accuracy metrics
--color-text-primary	#1A1A1A	Headings
--color-text-secondary	#6B7280	Body text, descriptions
--color-text-muted	#9CA3AF	Timestamps, metadata
--color-border	#E5E7EB	Dividers, card borders
Typography
Font Family
Primary: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
Type Scale
Table
Level	Size	Weight	Line Height	Usage
Hero	48-64px	700	1.1	Main headlines
H1	36-42px	700	1.2	Section headers
H2	28-32px	600	1.3	Subsection titles
H3	20-24px	600	1.4	Card titles
Body Large	18px	400	1.6	Lead paragraphs
Body	16px	400	1.6	General text
Small	14px	400	1.5	Descriptions
Caption	12px	500	1.4	Labels, timestamps
Typography Patterns
Headlines: Bold, tight letter-spacing (-0.02em)
Body: Regular weight, comfortable reading width (max 65ch)
Labels/Tags: Uppercase, letter-spacing 0.05em, font-weight 600
Layout & Spacing
Grid System
Container Max Width: 1280px
Grid: 12-column
Gutter: 24px (desktop), 16px (mobile)
Margins: 64px (desktop), 24px (mobile)
Spacing Scale
Table
Token	Value	Usage
--space-xs	4px	Tight gaps
--space-sm	8px	Icon gaps
--space-md	16px	Component padding
--space-lg	24px	Section gaps
--space-xl	32px	Card padding
--space-2xl	48px	Section breaks
--space-3xl	64px	Major sections
--space-4xl	96px	Hero spacing
Border Radius
Table
Token	Value	Usage
--radius-sm	4px	Buttons, inputs
--radius-md	8px	Cards
--radius-lg	12px	Feature cards
--radius-xl	16px	Modals
--radius-full	9999px	Pills, avatars
Components
Buttons
Primary Button
css
Copy
background: #000000;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 4px;
font-weight: 500;
transition: opacity 0.2s ease;
States:
Hover: opacity: 0.8
Active: opacity: 0.6
Disabled: opacity: 0.4
Secondary Button
css
Copy
background: transparent;
color: #000000;
border: 1px solid #000000;
padding: 12px 24px;
border-radius: 4px;
Ghost Button
css
Copy
background: transparent;
color: #6B7280;
padding: 8px 16px;
Cards
Feature Card
Background: White or subtle gradient
Border: 1px solid #E5E7EB
Border Radius: 12px
Padding: 32px
Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)
Research Timeline Card
Full-bleed gradient background
Rounded corners: 16px
Date badge: Top-left, small caps
Content: White or high-contrast text
Tags/Badges
css
Copy
background: #F3F4F6;
color: #374151;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.05em;
API Model Cards
Clean white background
Model name: Large, bold
Description: Secondary text
Metrics: Highlighted with accent color
Latency badges: Small pills (e.g., "75ms")
Visual Elements
Gradients & Backgrounds
Mesh Gradients (Research Section):
Soft, organic color transitions
Grain texture overlay
Colors blend smoothly without hard edges
Hero Background:
Subtle animated gradient or static mesh
Low saturation to maintain text readability
Imagery Style
Product Screenshots: Clean, minimal UI captures
Abstract Visuals: Soft gradients, organic shapes
Data Visualizations: Clean charts, minimal styling
Illustrations: Isometric 3D elements (API visualization)
Logo Usage
Primary: Black on light backgrounds
Clear space: Minimum 24px around logo
Minimum size: 32px height
Voice & Tone
Brand Voice Characteristics
Technically Precise - Accurate specifications, clear metrics
Warmly Human - "Bringing technology to life"
Confidently Simple - Complex AI made accessible
Innovation-Focused - Research-forward positioning
Content Patterns
Headlines: Direct, benefit-focused
"Create, edit and localize in one AI platform"
"Deploy agents that talk, type, and take action"
Descriptions: Clear value proposition + capability list
Pattern: [Benefit]. [Capability 1], [Capability 2], [Capability 3].
CTAs: Action-oriented
"Get started"
"Explore API"
"View documentation"
Animation & Motion
Principles
Smooth: Ease-in-out curves
Fast: 200-300ms for micro-interactions
Purposeful: Motion guides attention
Transitions
Table
Element	Duration	Easing
Button hover	200ms	ease-out
Card hover	300ms	cubic-bezier(0.4, 0, 0.2, 1)
Page transitions	400ms	ease-in-out
Scroll reveals	600ms	cubic-bezier(0, 0, 0.2, 1)
Hover Effects
Cards: Subtle lift (translateY(-4px)) + shadow increase
Buttons: Opacity change
Links: Underline animation
Platform-Specific Patterns
ElevenCreative
Visual-first layout
Creative tool previews
Media-focused examples (video, audio)
ElevenAgents
Technical specifications prominent
Use case examples
Integration patterns
ElevenAPI
Code-friendly dark mode option
Clean documentation layout
Endpoint cards with method badges
Responsive Breakpoints
Table
Breakpoint	Width	Adjustments
Mobile	< 640px	Single column, stacked layout
Tablet	640-1024px	2-column grid, reduced spacing
Desktop	1024-1280px	Full layout
Wide	> 1280px	Max-width container centered
Accessibility
Contrast Ratio: Minimum 4.5:1 for body text
Focus States: Visible 2px outline on interactive elements
Reduced Motion: Respect prefers-reduced-motion
Semantic HTML: Proper heading hierarchy
Alt Text: Descriptive for all product imagery
Design Tokens Summary
css
Copy
:root {
  /* Colors */
  --color-primary: #000000;
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-accent-purple: #6B4EE6;
  --color-accent-coral: #E85D5D;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  
  /* Spacing */
  --space-unit: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Typography */
  --font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-bold: 700;
  --font-weight-semibold: 600;
  --font-weight-regular: 400;
  
  /* Radius */
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
