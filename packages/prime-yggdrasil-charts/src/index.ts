/**
 * Prime Yggdrasil Charts & Dashboards
 *
 * Highcharts-based charts, widgets, and dashboard composition
 * aligned with the Yggdrasil design system.
 *
 * Installation:
 * ```bash
 * npm install @lifeonlars/prime-yggdrasil-charts highcharts
 * ```
 *
 * Usage:
 * ```tsx
 * import { TimeSeriesLine } from '@lifeonlars/prime-yggdrasil-charts';
 *
 * function App() {
 *   const data = [
 *     { date: '2026-01-01', value: 100 },
 *     { date: '2026-01-02', value: 150 },
 *   ];
 *
 *   return (
 *     <TimeSeriesLine
 *       data={data}
 *       encoding={{ x: 'date', y: 'value' }}
 *       title="Sales Over Time"
 *     />
 *   );
 * }
 * ```
 */

/**
 * Package version
 */
export const version = '0.3.0';

/**
 * Package information
 */
export const packageInfo = {
  name: '@lifeonlars/prime-yggdrasil-charts',
  version: '0.3.0',
  description: 'Charts, widgets, and dashboards for Prime Yggdrasil',
};

// Theme
export {
  getYggdrasilHighchartsTheme,
  applyYggdrasilTheme,
  getCategoryPalette,
  getSentimentPalette,
  getBooleanPalette,
  getSequentialPalette,
} from './theme/highcharts-theme';

export {
  getAllPalettes,
  getPalette,
  getSentimentColor,
  getBooleanColor,
  getCategoryColor,
  getSequentialColor,
} from './theme/palettes';

export type { PaletteType, PaletteInfo } from './theme/palettes';

// Tooltip formatters (Phase 1C)
export {
  createDefaultTooltipFormatter,
  createMultiSeriesTooltipFormatter,
  createPercentageTooltipFormatter,
  createTimeBreakdownTooltipFormatter,
  createSentimentTooltipFormatter,
  createPeriodComparisonTooltipFormatter,
} from './theme/tooltipFormatters';

// Charts (Phase 1B)
export { TimeSeriesLine } from './charts/TimeSeriesLine';
export { Column } from './charts/Column';
export { Bar } from './charts/Bar';
export { StackedColumn } from './charts/StackedColumn';
export { Donut } from './charts/Donut';

// Chart types and utilities
export type {
  BaseChartProps,
  ChartRow,
  ChartSize,
  ChartEncoding,
  ChartFormatOptions,
  LegendConfig,
  TooltipConfig,
  ChartType,
  ChartState,
} from './types/chart';

export { formatNumber, formatCompact, formatDate, formatDateTime } from './utils/formatters';

// Placeholder: Widgets will be exported here in Phase 4
// export { WidgetFrame } from './widgets/WidgetFrame';
// export { ChartWidget } from './widgets/ChartWidget';

// Placeholder: Dashboard components will be exported here in Phase 5
// export { Dashboard } from './dashboard/Dashboard';
