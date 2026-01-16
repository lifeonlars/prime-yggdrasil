import type { Meta, StoryObj } from '@storybook/react';

/**
 * Yggdrasil Utilities provide minimal, essential utility classes for layout and composition.
 *
 * ## Philosophy
 * - **Component-driven over utility-first**: Utilities are for layout/structure, not styling
 * - **Design tokens for visual properties**: All utilities use Yggdrasil tokens
 * - **Predictable patterns**: Clear, agent-friendly class names
 * - **Self-contained**: No external dependencies
 *
 * ## Key Advantages Over PrimeFlex
 * - **97.5% smaller**: 11KB vs 436KB
 * - **No bridging tokens**: Direct use of Yggdrasil design tokens
 * - **Full control**: Only utilities that enforce design system
 * - **No deprecated dependencies**: Self-maintained, future-proof
 *
 * ## Categories
 * - **Layout**: Flexbox, Grid, Display utilities
 * - **Spacing**: Margin and Padding (0.25rem scale)
 * - **Typography**: Font sizes, weights using design tokens
 * - **Borders**: Border utilities using design tokens
 * - **Shadows**: Elevation utilities
 * - **Responsive**: Mobile-first breakpoints (md, lg, xl)
 */
const meta = {
  title: 'Utilities/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive utility class system built on Yggdrasil design tokens.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Layout Utilities
 *
 * Essential utilities for flexbox, grid, and display control.
 */
export const Layout: Story = {
  render: () => (
    <div className="flex flex-column gap-4">
      <div>
        <h3 className="text-primary font-bold mb-2">Flexbox</h3>
        <div className="flex gap-3 p-3 surface-card border-round">
          <div className="p-3 surface-brand-primary text-white border-round">flex item 1</div>
          <div className="p-3 surface-brand-primary text-white border-round">flex item 2</div>
          <div className="p-3 surface-brand-primary text-white border-round">flex item 3</div>
        </div>
        <pre className="mt-2 text-sm text-secondary">
          {`<div className="flex gap-3">...</div>`}
        </pre>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-2">Flexbox with Alignment</h3>
        <div className="flex align-items-center justify-content-between p-3 surface-card border-round">
          <div className="p-2 surface-brand-primary text-white border-round">Start</div>
          <div className="p-2 surface-brand-primary text-white border-round">Center</div>
          <div className="p-2 surface-brand-primary text-white border-round">End</div>
        </div>
        <pre className="mt-2 text-sm text-secondary">
          {`<div className="flex align-items-center justify-content-between">...</div>`}
        </pre>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-2">Grid System (12 columns)</h3>
        <div className="grid-12 p-3 surface-card border-round">
          <div className="col-12 md:col-6 lg:col-3 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">col-12 md:col-6 lg:col-3</div>
          </div>
          <div className="col-12 md:col-6 lg:col-3 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">col-12 md:col-6 lg:col-3</div>
          </div>
          <div className="col-12 md:col-6 lg:col-3 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">col-12 md:col-6 lg:col-3</div>
          </div>
          <div className="col-12 md:col-6 lg:col-3 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">col-12 md:col-6 lg:col-3</div>
          </div>
        </div>
        <pre className="mt-2 text-sm text-secondary">
          {`<div className="grid-12">
  <div className="col-12 md:col-6 lg:col-3">...</div>
</div>`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * ## Spacing Utilities
 *
 * Margin and padding utilities using a consistent 0.25rem (4px) scale.
 * - `m-*`: margin (all sides)
 * - `mt-*`, `mb-*`, `ml-*`, `mr-*`: margin top/bottom/left/right
 * - `mx-*`, `my-*`: margin horizontal/vertical
 * - `p-*`: padding (all sides)
 * - `pt-*`, `pb-*`, `pl-*`, `pr-*`: padding top/bottom/left/right
 * - `px-*`, `py-*`: padding horizontal/vertical
 *
 * Scale: 0 (0rem), 1 (0.25rem), 2 (0.5rem), 3 (0.75rem), 4 (1rem), 5 (1.25rem), 6 (1.5rem)
 */
export const Spacing: Story = {
  render: () => (
    <div className="flex flex-column gap-4">
      <div>
        <h3 className="text-primary font-bold mb-3">Margin Examples</h3>
        <div className="surface-card p-4 border-round">
          <div className="m-4 p-3 surface-brand-primary text-white border-round">m-4 (margin all sides)</div>
          <div className="mt-3 p-3 surface-brand-primary text-white border-round">mt-3 (margin top)</div>
          <div className="mx-4 p-3 surface-brand-primary text-white border-round">mx-4 (margin horizontal)</div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Padding Examples</h3>
        <div className="surface-card border-round">
          <div className="p-4 surface-brand-primary text-white border-round mb-2">p-4 (padding all sides)</div>
          <div className="px-4 py-2 surface-brand-primary text-white border-round mb-2">px-4 py-2</div>
          <div className="p-2 surface-brand-primary text-white border-round">p-2 (padding all sides)</div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Gap Utilities (Flexbox/Grid)</h3>
        <div className="flex gap-2 surface-card p-3 border-round mb-2">
          <div className="p-2 surface-brand-primary text-white border-round">gap-2</div>
          <div className="p-2 surface-brand-primary text-white border-round">gap-2</div>
          <div className="p-2 surface-brand-primary text-white border-round">gap-2</div>
        </div>
        <div className="flex gap-4 surface-card p-3 border-round">
          <div className="p-2 surface-brand-primary text-white border-round">gap-4</div>
          <div className="p-2 surface-brand-primary text-white border-round">gap-4</div>
          <div className="p-2 surface-brand-primary text-white border-round">gap-4</div>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Typography Utilities
 *
 * Font size, weight, and alignment utilities using Yggdrasil typography scale.
 * All text colors use semantic design tokens.
 */
export const Typography: Story = {
  render: () => (
    <div className="flex flex-column gap-4">
      <div>
        <h3 className="text-primary font-bold mb-3">Font Sizes</h3>
        <div className="surface-card p-4 border-round flex flex-column gap-2">
          <div className="text-xs">text-xs: Extra small text (0.75rem)</div>
          <div className="text-sm">text-sm: Small text (0.875rem)</div>
          <div className="text-base">text-base: Base text (1rem)</div>
          <div className="text-lg">text-lg: Large text (1.125rem)</div>
          <div className="text-xl">text-xl: Extra large text (1.25rem)</div>
          <div className="text-2xl">text-2xl: 2XL text (1.5rem)</div>
          <div className="text-3xl">text-3xl: 3XL text (1.875rem)</div>
          <div className="text-4xl">text-4xl: 4XL text (2.25rem)</div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Font Weights</h3>
        <div className="surface-card p-4 border-round flex flex-column gap-2">
          <div className="font-medium">font-medium: Medium weight (500)</div>
          <div className="font-semibold">font-semibold: Semibold weight (600)</div>
          <div className="font-bold">font-bold: Bold weight (700)</div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Text Colors (Semantic Tokens)</h3>
        <div className="surface-card p-4 border-round flex flex-column gap-2">
          <div className="text-primary">text-primary: Primary text (--text-neutral-default)</div>
          <div className="text-secondary">text-secondary: Secondary text (--text-neutral-subdued)</div>
          <div className="text-loud">text-loud: Loud text (--text-neutral-loud)</div>
          <div className="text-brand">text-brand: Brand text (--text-brand-primary)</div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Text Alignment</h3>
        <div className="surface-card p-4 border-round flex flex-column gap-3">
          <div className="text-left">text-left: Left aligned text</div>
          <div className="text-center">text-center: Center aligned text</div>
          <div className="text-right">text-right: Right aligned text</div>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Border & Shadow Utilities
 *
 * Border and elevation utilities using Yggdrasil design tokens.
 */
export const BordersAndShadows: Story = {
  render: () => (
    <div className="flex flex-column gap-4">
      <div>
        <h3 className="text-primary font-bold mb-3">Borders</h3>
        <div className="flex gap-3 flex-wrap">
          <div className="border-1 p-4 border-round">
            <div>border-1</div>
            <div className="text-sm text-secondary">1px solid</div>
          </div>
          <div className="border-2 p-4 border-round">
            <div>border-2</div>
            <div className="text-sm text-secondary">2px solid</div>
          </div>
          <div className="border-1 border-dashed p-4 border-round">
            <div>border-dashed</div>
            <div className="text-sm text-secondary">Dashed style</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Elevation (Shadows)</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="shadow-subtle p-4 surface-card border-round">
            <div className="font-semibold">shadow-subtle</div>
            <div className="text-sm text-secondary">Subtle elevation</div>
          </div>
          <div className="shadow-moderate p-4 surface-card border-round">
            <div className="font-semibold">shadow-moderate</div>
            <div className="text-sm text-secondary">Moderate elevation</div>
          </div>
          <div className="shadow-elevated p-4 surface-card border-round">
            <div className="font-semibold">shadow-elevated</div>
            <div className="text-sm text-secondary">Elevated</div>
          </div>
          <div className="shadow-high p-4 surface-card border-round">
            <div className="font-semibold">shadow-high</div>
            <div className="text-sm text-secondary">High elevation</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Responsive Utilities
 *
 * Mobile-first responsive utilities with breakpoints:
 * - `md:`: Tablet (768px and up)
 * - `lg:`: Desktop (1024px and up)
 * - `xl:`: Large desktop (1280px and up)
 *
 * Prefix any utility with breakpoint modifiers: `md:flex`, `lg:hidden`, `xl:col-6`
 */
export const Responsive: Story = {
  render: () => (
    <div className="flex flex-column gap-4">
      <div>
        <h3 className="text-primary font-bold mb-3">Responsive Display</h3>
        <div className="surface-card p-4 border-round">
          <div className="hidden md:block p-3 surface-brand-primary text-white border-round mb-2">
            <strong>hidden md:block</strong> - Hidden on mobile, visible on tablet+
          </div>
          <div className="block md:hidden p-3 surface-brand-accent text-white border-round">
            <strong>block md:hidden</strong> - Visible on mobile, hidden on tablet+
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Responsive Grid</h3>
        <div className="grid-12 surface-card p-3 border-round">
          <div className="col-12 md:col-6 lg:col-4 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">
              <div className="font-bold">Responsive Column</div>
              <div className="text-sm">12 → 6 → 4</div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-4 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">
              <div className="font-bold">Responsive Column</div>
              <div className="text-sm">12 → 6 → 4</div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-4 p-2">
            <div className="p-3 surface-brand-primary text-white border-round text-center">
              <div className="font-bold">Responsive Column</div>
              <div className="text-sm">12 → 6 → 4</div>
            </div>
          </div>
        </div>
        <pre className="mt-2 text-sm text-secondary">
          {`<div className="col-12 md:col-6 lg:col-4">
  Stacks on mobile, 2 cols on tablet, 3 cols on desktop
</div>`}
        </pre>
      </div>

      <div>
        <h3 className="text-primary font-bold mb-3">Responsive Flex Direction</h3>
        <div className="flex flex-column md:flex-row gap-3 surface-card p-3 border-round">
          <div className="flex-1 p-3 surface-brand-primary text-white border-round text-center">
            <div className="font-bold">flex-column</div>
            <div className="text-sm">md:flex-row</div>
          </div>
          <div className="flex-1 p-3 surface-brand-primary text-white border-round text-center">
            <div className="font-bold">Stacks vertically</div>
            <div className="text-sm">on mobile</div>
          </div>
          <div className="flex-1 p-3 surface-brand-primary text-white border-round text-center">
            <div className="font-bold">Horizontal</div>
            <div className="text-sm">on tablet+</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## Complete Class Reference
 *
 * Quick reference for all available utility classes.
 */
export const Reference: Story = {
  render: () => (
    <div className="surface-card p-4 border-round">
      <h3 className="text-primary font-bold mb-4">Complete Utility Class Reference</h3>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Display</h4>
        <code className="text-sm">flex, inline-flex, grid, block, inline-block, hidden</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Flex Direction</h4>
        <code className="text-sm">flex-row, flex-column, flex-wrap, flex-nowrap</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Flex Sizing</h4>
        <code className="text-sm">flex-auto, flex-none, flex-1</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Align & Justify</h4>
        <code className="text-sm">
          align-items-start, align-items-center, align-items-end, align-items-stretch, align-items-baseline<br />
          justify-content-start, justify-content-center, justify-content-end, justify-content-between, justify-content-around, justify-content-evenly
        </code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Gap</h4>
        <code className="text-sm">gap-1, gap-2, gap-3, gap-4, gap-5, gap-6</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Margin</h4>
        <code className="text-sm">
          m-0 through m-6, mt-*, mb-*, ml-*, mr-*, mx-*, my-*, mx-auto
        </code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Padding</h4>
        <code className="text-sm">
          p-0 through p-6, pt-*, pb-*, pl-*, pr-*, px-*, py-*
        </code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Sizing</h4>
        <code className="text-sm">w-full, w-auto, w-screen, w-30rem, h-full, h-auto, h-screen, h-12rem</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Borders</h4>
        <code className="text-sm">border-1, border-2, border-dashed, border-round</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Typography</h4>
        <code className="text-sm">
          font-medium, font-semibold, font-bold<br />
          text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl<br />
          text-left, text-center, text-right<br />
          text-primary, text-secondary, text-loud, text-brand, text-white
        </code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Shadows</h4>
        <code className="text-sm">shadow-subtle, shadow-moderate, shadow-elevated, shadow-high, shadow-none</code>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Grid</h4>
        <code className="text-sm">grid-12, col-1 through col-12</code>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Responsive Prefixes</h4>
        <code className="text-sm">md:*, lg:*, xl:* (prefix any utility)</code>
      </div>
    </div>
  ),
};
