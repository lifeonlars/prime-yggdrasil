/**
 * Theme Stories - Visualize Yggdrasil → Highcharts theme mapping
 *
 * These stories demonstrate all chart color palettes and their semantic meanings.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Charts/Theme',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

/**
 * Color swatch component that uses CSS variables directly
 */
function ColorSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
      <div
        style={{
          width: '80px',
          height: '32px',
          backgroundColor: `var(${cssVar})`,
          border: '1px solid var(--chart-scaffolding-border)',
          borderRadius: '4px',
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-neutral-default)' }}>
          {label}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-neutral-subdued)', fontFamily: 'monospace' }}>
          {cssVar}
        </div>
      </div>
    </div>
  );
}

/**
 * Palette display component
 */
interface PaletteDisplayProps {
  title: string;
  description: string;
  colors: Array<{ cssVar: string; label: string }>;
}

function PaletteDisplay({ title, description, colors }: PaletteDisplayProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-neutral-default)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: 'var(--text-neutral-subdued)', marginBottom: '16px' }}>
        {description}
      </p>
      <div>
        {colors.map((color, index) => (
          <ColorSwatch key={index} cssVar={color.cssVar} label={color.label} />
        ))}
      </div>
    </div>
  );
}

/**
 * Story: All Chart Palettes
 */
export const AllPalettes: StoryObj = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-neutral-default)' }}>
          Yggdrasil Chart Color Palettes
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-neutral-subdued)', marginBottom: '32px' }}>
          These palettes are mapped from Yggdrasil CSS variables to Highcharts theme options.
          They adapt automatically to light and dark themes.
        </p>

        <PaletteDisplay
          title="Category Palette"
          description="Multi-series categorical data - 12 distinct colors for different categories"
          colors={[
            { cssVar: '--chart-category-1', label: 'Sapphire' },
            { cssVar: '--chart-category-2', label: 'Garnet' },
            { cssVar: '--chart-category-3', label: 'Amber' },
            { cssVar: '--chart-category-4', label: 'Charoite' },
            { cssVar: '--chart-category-5', label: 'Emerald' },
            { cssVar: '--chart-category-6', label: 'Aquamarine' },
            { cssVar: '--chart-category-7', label: 'Ruby' },
            { cssVar: '--chart-category-8', label: 'Topaz' },
            { cssVar: '--chart-category-9', label: 'Amethyst' },
            { cssVar: '--chart-category-10', label: 'Sapphire Light' },
            { cssVar: '--chart-category-11', label: 'Garnet Light' },
            { cssVar: '--chart-category-12', label: 'Amber Light' },
          ]}
        />

        <PaletteDisplay
          title="Sentiment Palette"
          description="Sentiment analysis - positive, neutral, negative, undefined"
          colors={[
            { cssVar: '--chart-sentiment-positive', label: 'Positive' },
            { cssVar: '--chart-sentiment-neutral', label: 'Neutral' },
            { cssVar: '--chart-sentiment-negative', label: 'Negative' },
            { cssVar: '--chart-sentiment-undefined', label: 'Undefined' },
          ]}
        />

        <PaletteDisplay
          title="Boolean Palette"
          description="Binary comparisons - primary/secondary with emphasis variants, diminish/subdued for background"
          colors={[
            { cssVar: '--chart-boolean-primary', label: 'Primary' },
            { cssVar: '--chart-boolean-primary-emphasis', label: 'Primary Emphasis' },
            { cssVar: '--chart-boolean-secondary', label: 'Secondary' },
            { cssVar: '--chart-boolean-secondary-emphasis', label: 'Secondary Emphasis' },
            { cssVar: '--chart-boolean-diminish', label: 'Diminish' },
            { cssVar: '--chart-boolean-subdued', label: 'Subdued' },
          ]}
        />

        <PaletteDisplay
          title="Sequential Palette"
          description="Sequential scale - 6 levels from lightest to darkest, for heatmaps and choropleth"
          colors={[
            { cssVar: '--chart-scale-0', label: 'Level 0 (Lightest)' },
            { cssVar: '--chart-scale-1', label: 'Level 1' },
            { cssVar: '--chart-scale-2', label: 'Level 2' },
            { cssVar: '--chart-scale-3', label: 'Level 3' },
            { cssVar: '--chart-scale-4', label: 'Level 4' },
            { cssVar: '--chart-scale-5', label: 'Level 5 (Darkest)' },
          ]}
        />
      </div>
    );
  },
};

/**
 * Story: Category Palette
 */
export const CategoryPalette: StoryObj = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <PaletteDisplay
          title="Category Palette"
          description="Multi-series categorical data - 12 distinct colors for different categories"
          colors={[
            { cssVar: '--chart-category-1', label: 'Sapphire' },
            { cssVar: '--chart-category-2', label: 'Garnet' },
            { cssVar: '--chart-category-3', label: 'Amber' },
            { cssVar: '--chart-category-4', label: 'Charoite' },
            { cssVar: '--chart-category-5', label: 'Emerald' },
            { cssVar: '--chart-category-6', label: 'Aquamarine' },
            { cssVar: '--chart-category-7', label: 'Ruby' },
            { cssVar: '--chart-category-8', label: 'Topaz' },
            { cssVar: '--chart-category-9', label: 'Amethyst' },
            { cssVar: '--chart-category-10', label: 'Sapphire Light' },
            { cssVar: '--chart-category-11', label: 'Garnet Light' },
            { cssVar: '--chart-category-12', label: 'Amber Light' },
          ]}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--surface-neutral-secondary)', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-neutral-default)' }}>
            Usage
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)', marginBottom: '8px' }}>
            Use for multi-series categorical data where each series needs a distinct, recognizable color.
            The palette has 12 colors and will cycle if more series are needed.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)' }}>
            <strong>Examples:</strong> Line charts with multiple metrics, grouped bar charts, pie charts with many segments.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Story: Sentiment Palette
 */
export const SentimentPalette: StoryObj = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <PaletteDisplay
          title="Sentiment Palette"
          description="Sentiment analysis - positive, neutral, negative, undefined"
          colors={[
            { cssVar: '--chart-sentiment-positive', label: 'Positive' },
            { cssVar: '--chart-sentiment-neutral', label: 'Neutral' },
            { cssVar: '--chart-sentiment-negative', label: 'Negative' },
            { cssVar: '--chart-sentiment-undefined', label: 'Undefined' },
          ]}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--surface-neutral-secondary)', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-neutral-default)' }}>
            Usage
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)', marginBottom: '8px' }}>
            Use for sentiment analysis visualizations. Positive (green), Neutral (yellow), Negative (red), Undefined (gray).
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)' }}>
            <strong>Examples:</strong> Social media sentiment trends, customer feedback analysis, survey results.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Story: Boolean Palette
 */
export const BooleanPalette: StoryObj = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <PaletteDisplay
          title="Boolean Palette"
          description="Binary comparisons - primary/secondary with emphasis variants, diminish/subdued for background"
          colors={[
            { cssVar: '--chart-boolean-primary', label: 'Primary' },
            { cssVar: '--chart-boolean-primary-emphasis', label: 'Primary Emphasis' },
            { cssVar: '--chart-boolean-secondary', label: 'Secondary' },
            { cssVar: '--chart-boolean-secondary-emphasis', label: 'Secondary Emphasis' },
            { cssVar: '--chart-boolean-diminish', label: 'Diminish' },
            { cssVar: '--chart-boolean-subdued', label: 'Subdued' },
          ]}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--surface-neutral-secondary)', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-neutral-default)' }}>
            Usage
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)', marginBottom: '8px' }}>
            Use for binary comparisons. Primary and Secondary have emphasis variants for highlighting.
            Diminish and Subdued are for background elements or de-emphasized data.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)' }}>
            <strong>Examples:</strong> Current vs Previous period, Yes/No responses, A/B testing results.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Story: Sequential Palette
 */
export const SequentialPalette: StoryObj = {
  render: () => {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <PaletteDisplay
          title="Sequential Palette"
          description="Sequential scale - 6 levels from lightest to darkest, for heatmaps and choropleth"
          colors={[
            { cssVar: '--chart-scale-0', label: 'Level 0 (Lightest)' },
            { cssVar: '--chart-scale-1', label: 'Level 1' },
            { cssVar: '--chart-scale-2', label: 'Level 2' },
            { cssVar: '--chart-scale-3', label: 'Level 3' },
            { cssVar: '--chart-scale-4', label: 'Level 4' },
            { cssVar: '--chart-scale-5', label: 'Level 5 (Darkest)' },
          ]}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--surface-neutral-secondary)', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-neutral-default)' }}>
            Usage
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)', marginBottom: '8px' }}>
            Use for sequential data where values range from low to high. The palette has 6 levels from lightest to darkest.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-neutral-subdued)' }}>
            <strong>Examples:</strong> Heatmaps, choropleth maps, intensity visualizations.
          </p>
        </div>
      </div>
    );
  },
};
