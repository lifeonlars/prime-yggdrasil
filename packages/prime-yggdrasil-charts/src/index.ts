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
export const version = '0.5.0';

/**
 * Package information
 */
export const packageInfo = {
  name: '@lifeonlars/prime-yggdrasil-charts',
  version: '0.5.0',
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

// Error boundary
export { ChartErrorBoundary } from './charts/ChartErrorBoundary';
export type { ChartErrorBoundaryProps } from './charts/ChartErrorBoundary';

// Charts (Phase 1B)
export { TimeSeriesLine } from './charts/TimeSeriesLine';
export { Column } from './charts/Column';
export { Bar } from './charts/Bar';
export { StackedColumn } from './charts/StackedColumn';
export { Donut } from './charts/Donut';

// Charts (Phase 2A - Combined)
export { ColumnLine } from './charts/ColumnLine';
export type { ColumnLineProps } from './charts/ColumnLine';

// Charts (Phase 3 - Specialty)
export { Treemap } from './charts/Treemap';
export type { TreemapProps, TreemapEncoding } from './charts/Treemap';

// Legends (Phase 1D)
export { ChartLegend } from './legends/ChartLegend';
export type { ChartLegendProps } from './legends/ChartLegend';
export { ScaleLegend } from './legends/ScaleLegend';
export type { ScaleLegendProps } from './legends/ScaleLegend';

// Chart types and utilities
export type {
  BaseChartProps,
  ChartRow,
  ChartSize,
  ChartEncoding,
  ChartFormatOptions,
  LegendConfig,
  LegendLayout,
  LegendMarker,
  LegendItem,
  ScaleLegendRange,
  TooltipConfig,
  ChartType,
  ChartState,
} from './types/chart';

export { formatNumber, formatCompact, formatDate, formatDateTime } from './utils/formatters';
export { transformToTreemapData } from './utils/dataTransform';

// Widgets (Phase 4)
export { WidgetContainer } from './widgets/WidgetContainer';
export type { WidgetContainerProps } from './widgets/WidgetContainer';
export { WidgetHeader } from './widgets/WidgetHeader';
export type { WidgetHeaderProps } from './widgets/WidgetHeader';
export { WidgetMenuBar } from './widgets/WidgetMenuBar';
export type { WidgetMenuBarProps, DownloadFormat, DownloadOption } from './widgets/WidgetMenuBar';
export { KeyFigure } from './widgets/KeyFigure';
export type { KeyFigureProps } from './widgets/KeyFigure';

// Placeholder: Dashboard components will be exported here in Phase 5
// export { Dashboard } from './dashboard/Dashboard';
