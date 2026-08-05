import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.claude']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // shadcn/ui primitives: generated components export cva variant objects and
  // constants next to components by design (react-refresh), and shadcn-shipped
  // code (e.g. SidebarMenuSkeleton's random width) predates the react-hooks 7
  // compiler rules (purity). These files are not authored by hand — keep the
  // strict rules for hand-written code, not generated primitives.
  {
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/purity': 'off',
    },
  },
  // Imperative animation loops that run outside React's render phase:
  // - HeroParticles mutates the R3F camera per-frame inside useFrame — the
  //   canonical react-three-fiber pattern.
  // - MouseReactiveGrid schedules itself via requestAnimationFrame inside a
  //   useCallback (self-referential rAF loop).
  // The react-hooks 7 compiler rules (purity, immutability) don't model these
  // framework loops, so they report false positives here.
  {
    files: ['src/components/HeroParticles.tsx', 'src/components/MouseReactiveGrid.tsx'],
    rules: {
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
    },
  },
  // React context module: exports ModalProvider (component) + useModal (hook)
  // from one file, which the react-refresh rule flags. Splitting would ripple
  // import changes across every consumer; the React docs sanction disabling
  // fast refresh for context modules like this.
  {
    files: ['src/lib/modal-context.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
