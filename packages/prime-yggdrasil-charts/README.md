# @lifeonlars/prime-yggdrasil-charts

Highcharts-based charts, widgets, and dashboard composition for the Prime Yggdrasil design system.

**Status:** Phase 4 (Widgets) complete, Phase 2B (Performance) complete

## Installation

```bash
npm install @lifeonlars/prime-yggdrasil-charts highcharts
```

## Peer Dependencies

- `@lifeonlars/prime-yggdrasil` ^0.8.0
- `highcharts` ^11.0.0
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `primereact` ^10.9.7

## Available Charts

### Core Charts

```tsx
import { TimeSeriesLine, Column, Bar, StackedColumn, Donut, ColumnLine, Treemap } from '@lifeonlars/prime-yggdrasil-charts';
```

| Chart | Use Case |
|-------|----------|
| `TimeSeriesLine` | Time series data with date X-axis |
| `Column` | Vertical bars for categorical comparisons |
| `Bar` | Horizontal bars (ranked data, comparisons) |
| `StackedColumn` | Composition/parts of a whole |
| `Donut` | Proportions with center hole |
| `ColumnLine` | Combined column + line (period comparison) |
| `Treemap` | Hierarchical data with drill-down |

### Widgets

```tsx
import { WidgetContainer, WidgetHeader, WidgetMenuBar, KeyFigure } from '@lifeonlars/prime-yggdrasil-charts';
```

| Widget | Use Case |
|--------|----------|
| `WidgetContainer` | Card wrapper with header, menu bar, and chart |
| `WidgetHeader` | Title + subtitle for widgets |
| `WidgetMenuBar` | Context labels + download dropdown |
| `KeyFigure` | Large metric with change badge and previous period |

### Utilities

```tsx
import { ChartErrorBoundary, ChartLegend, ScaleLegend } from '@lifeonlars/prime-yggdrasil-charts';
```

| Component | Use Case |
|-----------|----------|
| `ChartErrorBoundary` | Catches chart render errors with retry |
| `ChartLegend` | Custom categorical legend |
| `ScaleLegend` | Gradient/sequential scale legend |

### Color Palettes

```tsx
import {
  getCategoryPalette,
  getSentimentPalette,
  getBooleanPalette,
  getSequentialPalette
} from '@lifeonlars/prime-yggdrasil-charts';

// Category: Distinct colors for categorical data (5 colors)
const categoryColors = getCategoryPalette();

// Sentiment: positive (#AAECBC), neutral (#F2DE6E), negative (#F4B6B6)
const sentiment = getSentimentPalette();

// Boolean: primary/secondary with emphasis and diminish variants
const boolean = getBooleanPalette();

// Sequential: For heatmaps and gradients
const sequential = getSequentialPalette();
```

## Basic Usage

```tsx
import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';

const data = [
  { date: '2025-01-01', mentions: 1200 },
  { date: '2025-01-02', mentions: 1450 },
  { date: '2025-01-03', mentions: 1100 },
];

<TimeSeriesLine
  data={data}
  encoding={{ x: 'date', y: 'mentions' }}
  title="Daily Mentions"
  format={{ compact: true }}
/>
```

## Props API

All charts share a common props interface:

```typescript
interface BaseChartProps {
  // Data
  data: ChartRow[];
  encoding: {
    x: string;
    y: string | string[];
    series?: string;
    colors?: string[];  // Custom colors per point/series
  };

  // Formatting
  format?: {
    units?: string;      // "kr", "%", "mentions"
    decimals?: number;
    compact?: boolean;   // 1.5M instead of 1,500,000
    percent?: boolean;
  };

  // Features
  title?: string;
  subtitle?: string;
  legend?: boolean | LegendConfig;
  tooltip?: boolean | TooltipConfig;

  // States
  loading?: boolean;
  empty?: ReactNode;
  error?: string | ReactNode;

  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
}
```

## Roadmap

- ✅ **Phase 0**: Monorepo infrastructure setup
- ✅ **Phase 1A**: Highcharts theme foundation
- ✅ **Phase 1B**: 5 core chart types
- ✅ **Phase 1C**: Custom tooltips
- ✅ **Phase 1D**: Custom legends (ChartLegend, ScaleLegend)
- ✅ **Phase 2A**: Combined charts (ColumnLine)
- ✅ **Phase 2B**: Performance & robustness (React.memo, error boundaries, lazy loading)
- ✅ **Phase 3**: Specialty charts (Treemap with drill-down)
- ✅ **Phase 4**: Widgets (WidgetContainer, WidgetHeader, WidgetMenuBar, KeyFigure)
- ⏳ **Phase 5**: Dashboard composition

## Development

### Claude Code Integration

Skills are provided by the main `@lifeonlars/prime-yggdrasil` package.

When you install both packages:

```bash
npm install @lifeonlars/prime-yggdrasil @lifeonlars/prime-yggdrasil-charts
```

Claude Code is automatically configured with:

- **verification-before-completion** - Enforces evidence-based completion
- **frontend-design** - Design system consistency
- **vercel-react-best-practices** - React best practices
- **agent-browser** - Automated UI verification

**Task Management**: Press **Ctrl+T** to view task list and completion status.

**Visual Verification**: For chart changes, visual verification via `agent-browser` is MANDATORY. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the complete workflow

### Verification Commands

```bash
# Type check
npm run build -w @lifeonlars/prime-yggdrasil-charts

# Lint
npm run lint -w @lifeonlars/prime-yggdrasil-charts

# Storybook
npm run storybook
```

## License

MIT © Lars Farstad
