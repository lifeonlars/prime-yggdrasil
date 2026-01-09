import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import { useEffect } from 'react';
import type { ReactRenderer } from '@storybook/react';
import type { DecoratorFunction } from 'storybook/internal/types';
import { YggdrasilProvider } from '../src/provider/YggdrasilProvider';

// Import base resources (icons and utilities)
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Import blocks styles (theme-agnostic)
import '../src/blocks/blocks.css';

// Note: We DON'T import a theme here - it's injected by the theme manager below

// Global theme management - runs once, not per story
let currentTheme: 'light' | 'dark' | null = null;
let isInitialized = false;

function applyTheme(theme: 'light' | 'dark') {
  const isDark = theme === 'dark';

  // Update theme link
  const currentThemeLink = document.getElementById('yggdrasil-theme') as HTMLLinkElement;
  const newHref = isDark
    ? '../src/theme/yggdrasil-dark.css'
    : '../src/theme/yggdrasil-light.css';

  const hasMatchingTheme = Boolean(currentThemeLink && currentThemeLink.href.includes(theme));
  if (currentTheme === theme && hasMatchingTheme) return; // Skip if already applied
  currentTheme = theme;

  if (!hasMatchingTheme) {
    // Remove existing theme links
    document.querySelectorAll('link[href*="yggdrasil"]').forEach(link => link.remove());

    // Create new theme link
    const link = document.createElement('link');
    link.id = 'yggdrasil-theme';
    link.rel = 'stylesheet';
    link.href = newHref;
    document.head.appendChild(link);
  }

  // Update color-scheme and data-theme
  document.documentElement.style.colorScheme = theme;
  document.documentElement.setAttribute('data-theme', theme);

  // Theme values are resolved from the active CSS variables.
  const colors = {
    bg: 'var(--surface-ground)',
    bgSecondary: 'var(--surface-section)',
    text: 'var(--text-color)',
    textSecondary: 'var(--text-color-secondary)',
    border: 'var(--surface-border)',
    link: 'var(--primary-color)',
  };

  // Apply theme to body and html
  document.documentElement.style.backgroundColor = colors.bg;
  document.documentElement.style.color = colors.text;
  document.body.style.backgroundColor = colors.bg;
  document.body.style.color = colors.text;

  // Create or update style element for docs
  let styleEl = document.getElementById('yggdrasil-docs-theme');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'yggdrasil-docs-theme';
    document.head.appendChild(styleEl);
  }

  // Inject CSS for Storybook docs
  styleEl.textContent = `
    html, body, #storybook-root, #storybook-docs, #root,
    .sb-show-main, .sb-main-padded, .sb-main-fullscreen {
      background-color: ${colors.bg} !important;
      color: ${colors.text};
      font-family: var(--font-family);
    }

    .sbdocs, .sbdocs-wrapper, .sbdocs-content,
    div[class*="DocsWrapper"], div[class*="DocsContent"] {
      background-color: ${colors.bg} !important;
      color: ${colors.text};
      font-family: var(--font-family);
    }

    .sbdocs h1, .sbdocs h2, .sbdocs h3, .sbdocs h4, .sbdocs h5, .sbdocs h6,
    .sbdocs-h1, .sbdocs-h2, .sbdocs-h3, .sbdocs-title,
    div[class*="Title"], div[class*="Heading"] {
      color: ${colors.text};
      font-family: var(--font-family);
    }

    .sbdocs p, .sbdocs li, .sbdocs td, .sbdocs th,
    .sbdocs-p, .sbdocs-li,
    div[class*="Description"], div[class*="Paragraph"] {
      color: ${colors.text};
      font-family: var(--font-family);
    }

    .sbdocs a, .sbdocs a:visited {
      color: ${colors.link};
    }

    .sbdocs pre, .sbdocs code, .sbdocs-pre, .sbdocs-code {
      background-color: ${colors.bgSecondary} !important;
      color: ${colors.text};
      border-color: ${colors.border} !important;
    }

    .sbdocs table {
      border-color: ${colors.border} !important;
      color: ${colors.text};
    }

    .sbdocs table td, .sbdocs table th {
      border-color: ${colors.border} !important;
      background-color: ${colors.bgSecondary} !important;
      color: ${colors.text};
    }

    .docblock-argstable, .docblock-argstable-body, .docblock-argstable-head,
    div[class*="ArgsTable"] {
      background-color: ${colors.bg} !important;
    }

    .docblock-argstable td, .docblock-argstable th {
      border-color: ${colors.border} !important;
    }

    .sbdocs-description, .sbdocs-subtitle,
    div[class*="Subtitle"], div[class*="Description"] {
      color: ${colors.textSecondary} !important;
    }

    .docs-story, .docs-story > div, div[class*="StoryBlock"] {
      background-color: ${colors.bgSecondary} !important;
      border-color: ${colors.border} !important;
    }

    article, article > div {
      background-color: ${colors.bg} !important;
      color: ${colors.text};
    }

    div[class*="Canvas"], div[class*="Preview"] {
      background-color: ${colors.bgSecondary} !important;
      border-color: ${colors.border} !important;
    }

    div[class*="Source"] {
      background-color: ${colors.bgSecondary} !important;
    }

    div[class*="Source"] pre, div[class*="Source"] code {
      background-color: ${colors.bgSecondary} !important;
      color: ${colors.text};
    }

    div[class*="ColorPalette"], div[class*="ColorItem"], div[class*="Swatch"] {
      background-color: ${colors.bg} !important;
      color: ${colors.text};
    }

    div[class*="ColorItem"] [class*="Title"],
    div[class*="ColorItem"] [class*="Subtitle"],
    div[class*="ColorItem"] span, div[class*="ColorItem"] div {
      color: ${colors.text};
    }

    div[class*="IconGallery"], div[class*="IconItem"] {
      background-color: ${colors.bg} !important;
      color: ${colors.text};
    }

    div[class*="IconItem"] {
      background-color: ${colors.bgSecondary} !important;
      border-color: ${colors.border} !important;
    }

    div[class*="IconItem"] span, div[class*="IconItem"] div {
      color: ${colors.text};
    }

    .sbdocs code:not(pre code) {
      background-color: ${colors.bgSecondary} !important;
      color: ${colors.text};
      padding: 2px 6px;
      border-radius: 3px;
    }

    .sbdocs [class*="wrapper"], .sbdocs [class*="container"], .sbdocs [class*="docblock"] {
      background-color: ${colors.bg} !important;
    }

    .sbdocs strong, .sbdocs b, .sbdocs em {
      color: inherit !important;
    }

    .sbdocs ul, .sbdocs ol {
      color: ${colors.text};
    }

    .sbdocs *[class*="border"], .sbdocs hr {
      border-color: ${colors.border} !important;
    }
  `;
}

// Initialize theme watcher once
function initializeThemeWatcher() {
  if (isInitialized) return;
  isInitialized = true;

  // Initial theme detection
  const updateTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'dark' : 'light');
  };

  updateTheme();

  // Watch for class changes on documentElement
  const observer = new MutationObserver(() => {
    updateTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
}

// Simple decorator that only initializes the watcher once
const withTheme: DecoratorFunction<ReactRenderer> = (Story) => {
  useEffect(() => {
    initializeThemeWatcher();
  }, []);

  return Story();
};

// Wrap all stories with YggdrasilProvider to enable ripple effect
const withYggdrasilProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  return (
    <YggdrasilProvider ripple={true}>
      <Story />
    </YggdrasilProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    // Configure dark mode addon
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.light },
      classTarget: 'html',
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
  },

  decorators: [withTheme, withYggdrasilProvider],
};

export default preview;
