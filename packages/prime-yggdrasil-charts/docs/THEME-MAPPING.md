# Yggdrasil → Highcharts Theme Mapping

This document describes how Prime Yggdrasil semantic tokens are mapped to Highcharts theme options.

## Overview

The Yggdrasil Highcharts theme adapter reads CSS custom properties (variables) from the DOM and applies them to Highcharts configuration. This ensures charts visually match other Yggdrasil components and adapt automatically to light/dark theme changes.

## Chart Color Palettes

### Category Palette (12 colors)

Used for multi-series categorical data where each series needs a distinct color.

| Token | Foundation Color | Highcharts Mapping |
|-------|------------------|-------------------|
| `--chart-category-1` | `--charts-sapphire-500` | `colors[0]` |
| `--chart-category-2` | `--charts-garnet-600` | `colors[1]` |
| `--chart-category-3` | `--charts-amber-500` | `colors[2]` |
| `--chart-category-4` | `--charts-charoite-600` | `colors[3]` |
| `--chart-category-5` | `--charts-emerald-500` | `colors[4]` |
| `--chart-category-6` | `--charts-aquamarine-600` | `colors[5]` |
| `--chart-category-7` | `--charts-ruby-600` | `colors[6]` |
| `--chart-category-8` | `--charts-topaz-400` | `colors[7]` |
| `--chart-category-9` | `--charts-amethyst-600` | `colors[8]` |
| `--chart-category-10` | `--charts-sapphire-300` | `colors[9]` |
| `--chart-category-11` | `--charts-garnet-400` | `colors[10]` |
| `--chart-category-12` | `--charts-amber-300` | `colors[11]` |

**Usage:** `getCategoryPalette()` returns all 12 colors as an array.

### Sentiment Palette (4 colors)

Used for sentiment analysis (positive/neutral/negative/undefined).

| Token | Foundation Color | Meaning | Light Mode | Dark Mode |
|-------|------------------|---------|------------|-----------|
| `--chart-sentiment-positive` | `--charts-emerald-400` | Positive sentiment | emerald-400 | emerald-400 |
| `--chart-sentiment-neutral` | `--charts-topaz-300` | Neutral sentiment | topaz-300 | topaz-300 |
| `--chart-sentiment-negative` | `--charts-ruby-600` | Negative sentiment | ruby-600 | ruby-500 |
| `--chart-sentiment-undefined` | `--foundation-rock-300` | Undefined/unknown | rock-300 | rock-600 |

**Usage:** `getSentimentPalette()` returns `{ positive, neutral, negative, undefined }`.

### Boolean Palette (6 colors)

Used for binary comparisons, with emphasis variants and diminish/subdued options.

| Token | Foundation Color | Meaning | Light Mode | Dark Mode |
|-------|------------------|---------|------------|-----------|
| `--chart-boolean-primary` | aquamarine-500 | Primary value (default) | aquamarine-500 | aquamarine-400 |
| `--chart-boolean-primary-emphasis` | aquamarine-700 | Primary value (emphasized) | aquamarine-700 | aquamarine-200 |
| `--chart-boolean-secondary` | charoite-500 | Secondary value (default) | charoite-500 | charoite-400 |
| `--chart-boolean-secondary-emphasis` | charoite-700 | Secondary value (emphasized) | charoite-700 | charoite-200 |
| `--chart-boolean-diminish` | rock-300 | De-emphasized data | rock-300 | rock-600 |
| `--chart-boolean-subdued` | rock-200 | Background/subtle data | rock-200 | rock-700 |

**Usage:** `getBooleanPalette()` returns `{ primary, primaryEmphasis, secondary, secondaryEmphasis, diminish, subdued }`.

### Sequential/Scale Palette (6 levels)

Used for heatmaps, choropleth maps, and intensity visualizations.

| Token | Foundation Color | Level | Light Mode | Dark Mode |
|-------|------------------|-------|------------|-----------|
| `--chart-scale-0` | sapphire-050 | Lightest | sapphire-050 | sapphire-900 |
| `--chart-scale-1` | sapphire-200 | Light | sapphire-200 | sapphire-700 |
| `--chart-scale-2` | sapphire-300 | Medium-light | sapphire-300 | sapphire-500 |
| `--chart-scale-3` | sapphire-500 | Medium | sapphire-500 | sapphire-400 |
| `--chart-scale-4` | sapphire-600 | Medium-dark | sapphire-600 | sapphire-300 |
| `--chart-scale-5` | sapphire-700 | Darkest | sapphire-700 | sapphire-200 |

**Usage:** `getSequentialPalette()` returns all 6 levels as an array.

**Note:** Dark mode uses reversed scale order (darker values are lighter) to maintain visual hierarchy.

## Chart Scaffolding

Chart structural elements (axes, gridlines, borders) use subtle colors to avoid competing with data.

| Element | Yggdrasil Token | Highcharts Mapping | Light Mode | Dark Mode |
|---------|----------------|-------------------|------------|-----------|
| Axis lines | `--chart-scaffolding-border` | `xAxis.lineColor`, `yAxis.lineColor` | rock-200 | rock-700 |
| Grid lines | `--chart-scaffolding-border` | `xAxis.gridLineColor`, `yAxis.gridLineColor` | rock-200 | rock-700 |
| Tick marks | `--chart-scaffolding-border` | `xAxis.tickColor`, `yAxis.tickColor` | rock-200 | rock-700 |

## Typography

All chart text uses **Roboto** font family (consistent with Yggdrasil).

| Element | Yggdrasil Token | Highcharts Mapping | Font Size | Font Weight |
|---------|----------------|-------------------|-----------|-------------|
| Chart title | `--text-neutral-default` | `title.style.color` | 18px | 500 (Medium) |
| Chart subtitle | `--text-neutral-subdued` | `subtitle.style.color` | 14px | 400 (Regular) |
| Axis labels | `--text-neutral-subdued` | `xAxis.labels.style.color`, `yAxis.labels.style.color` | 12px | 400 (Regular) |
| Axis titles | `--text-neutral-default` | `xAxis.title.style.color`, `yAxis.title.style.color` | 14px | 500 (Medium) |
| Legend items | `--text-neutral-default` | `legend.itemStyle.color` | 12px | 400 (Regular) |
| Data labels | N/A (inherits) | `plotOptions.series.dataLabels.style` | 12px | 400 (Regular) |

**Font stack:** `"Roboto", arial, sans-serif`

## Background and Surfaces

| Element | Yggdrasil Token | Highcharts Mapping | Light Mode | Dark Mode |
|---------|----------------|-------------------|------------|-----------|
| Chart background | `--surface-neutral-primary` | `chart.backgroundColor` | white | sky-800 |
| Legend background | `--surface-neutral-primary` | `legend.backgroundColor` | white | sky-800 |

## Spacing and Layout

| Property | Value | Highcharts Mapping |
|----------|-------|-------------------|
| Chart padding | 16px (all sides) | `chart.spacing` |
| Title alignment | Left | `title.align` |
| Subtitle alignment | Left | `subtitle.align` |

## Accessibility

The Yggdrasil theme enables Highcharts accessibility features by default:

```typescript
accessibility: {
  enabled: true,
  keyboardNavigation: {
    enabled: true,
  },
}
```

Charts support:
- Keyboard navigation (arrow keys, Enter, Esc)
- Screen reader announcements (ARIA labels)
- High contrast mode compatibility
- Reduced motion preferences (to be implemented in Phase 2B)

## Usage Examples

### Apply Theme Globally

```typescript
import Highcharts from 'highcharts';
import { applyYggdrasilTheme } from '@lifeonlars/prime-yggdrasil-charts';

// Call once at app startup
applyYggdrasilTheme();
```

### Get Theme Object

```typescript
import Highcharts from 'highcharts';
import { getYggdrasilHighchartsTheme } from '@lifeonlars/prime-yggdrasil-charts';

const theme = getYggdrasilHighchartsTheme();
Highcharts.setOptions(theme);
```

### Use Specific Palettes

```typescript
import {
  getCategoryPalette,
  getSentimentPalette,
  getBooleanPalette,
  getSequentialPalette,
} from '@lifeonlars/prime-yggdrasil-charts';

// Category colors for multi-series chart
const categoryColors = getCategoryPalette();
Highcharts.chart('container', {
  colors: categoryColors,
  // ...
});

// Sentiment colors for specific series
const sentiment = getSentimentPalette();
Highcharts.chart('container', {
  series: [
    { name: 'Positive', color: sentiment.positive, data: [...] },
    { name: 'Negative', color: sentiment.negative, data: [...] },
  ],
});

// Boolean comparison (current vs previous)
const boolean = getBooleanPalette();
Highcharts.chart('container', {
  series: [
    { name: 'Current Period', color: boolean.primaryEmphasis, data: [...] },
    { name: 'Previous Period', color: boolean.subdued, data: [...] },
  ],
});

// Heatmap with sequential scale
const scale = getSequentialPalette();
Highcharts.chart('container', {
  colorAxis: {
    stops: scale.map((color, index) => [index / (scale.length - 1), color]),
  },
  // ...
});
```

## Theme Adaptation

The theme automatically adapts to light/dark mode changes:

1. **CSS variables are queried at runtime** - When `getYggdrasilHighchartsTheme()` is called, it reads the current computed CSS values from the DOM.

2. **Re-apply on theme change** - If your app supports runtime theme switching, call `applyYggdrasilTheme()` again after changing the `data-theme` attribute:

```typescript
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);

  // Re-apply Highcharts theme
  applyYggdrasilTheme();

  // Redraw all charts (if needed)
  Highcharts.charts.forEach(chart => {
    if (chart) {
      chart.redraw();
    }
  });
}
```

## Future Enhancements

The following features are planned for future phases:

- **Phase 1C (Custom Tooltips):** Yggdrasil-styled tooltip variants
- **Phase 1D (Custom Legends):** Yggdrasil-styled legend variants
- **Phase 2B (Performance):** Reduced motion support via `prefers-reduced-motion` media query

## References

- [Highcharts Theme Documentation](https://api.highcharts.com/highcharts/colors)
- [Highcharts Accessibility Guide](https://www.highcharts.com/docs/accessibility/accessibility-module)
- [Prime Yggdrasil Design System](../../packages/prime-yggdrasil/README.md)
