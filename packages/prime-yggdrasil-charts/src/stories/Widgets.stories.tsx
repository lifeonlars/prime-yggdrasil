/**
 * Widget Stories
 *
 * Widget container, header, menubar, and key figure components
 * shown individually and composed together with charts.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WidgetContainer } from '../widgets/WidgetContainer';
import { WidgetHeader } from '../widgets/WidgetHeader';
import { WidgetMenuBar } from '../widgets/WidgetMenuBar';
import { KeyFigure } from '../widgets/KeyFigure';
import { Bar } from '../charts/Bar';
import { Donut } from '../charts/Donut';
import { ColumnLine } from '../charts/ColumnLine';
import { ChartLegend } from '../legends/ChartLegend';
import { getCategoryPalette } from '../theme/highcharts-theme';
import type { DownloadFormat } from '../widgets/WidgetMenuBar';

const meta: Meta = {
  title: 'Widgets/Widget Components',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const categoryPalette = getCategoryPalette();

const handleDownload = (format: DownloadFormat) => {
  console.log(`Download requested: ${format}`);
};

// =============================================================================
// KEY FIGURE STORIES
// =============================================================================

/**
 * Key figure with positive change
 */
export const KeyFigurePositive: StoryObj = {
  render: () => (
    <KeyFigure
      label="Total"
      value={32200}
      changePercent={0.3}
      previousValue={32100}
      showInfo
      infoText="Total media exposure for selected period"
    />
  ),
};

/**
 * Key figure with negative change
 */
export const KeyFigureNegative: StoryObj = {
  render: () => (
    <KeyFigure
      label="Total"
      value={10000}
      changePercent={-2.3}
      previousValue={10500}
      showInfo
    />
  ),
};

// =============================================================================
// WIDGET HEADER STORIES
// =============================================================================

/**
 * Widget header with title, date range, and key figure
 */
export const HeaderWithKeyFigure: StoryObj = {
  render: () => (
    <WidgetHeader
      title="Media exposure over time"
      dateRange="1 May - 30 May 2024"
      showInfo
      keyFigures={
        <KeyFigure
          label="Total"
          value={32200}
          changePercent={0.3}
          previousValue={32100}
          showInfo
        />
      }
    />
  ),
};

// =============================================================================
// WIDGET MENUBAR STORIES
// =============================================================================

/**
 * Menu bar with context labels and download
 */
export const MenuBar: StoryObj = {
  render: () => (
    <div style={{ border: '1px solid #eee', borderRadius: '8px' }}>
      <WidgetMenuBar
        contextLabels={['Editorial', 'Profile name']}
        onDownload={handleDownload}
      />
    </div>
  ),
};

/**
 * Menu bar with extra actions
 */
export const MenuBarWithActions: StoryObj = {
  render: () => (
    <div style={{ border: '1px solid #eee', borderRadius: '8px' }}>
      <WidgetMenuBar
        contextLabels={['Editorial', 'Profile name']}
        onDownload={handleDownload}
        actions={
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '13px',
              color: 'var(--text-neutral-default, #1a2332)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="7" width="4" height="6" rx="0.5" stroke="currentColor" strokeWidth="1" />
              <rect x="5" y="4" width="4" height="9" rx="0.5" stroke="currentColor" strokeWidth="1" />
              <rect x="9" y="1" width="4" height="12" rx="0.5" stroke="currentColor" strokeWidth="1" />
            </svg>
            Bar chart
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3 4l2 2 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
        }
      />
    </div>
  ),
};

// =============================================================================
// FULL WIDGET STORIES
// =============================================================================

/**
 * Complete widget with column+line chart (matching "Media exposure over time" screenshot)
 */
export const MediaExposureWidget: StoryObj = {
  render: () => {
    const data = Array.from({ length: 30 }, (_, i) => ({
      date: `May ${i + 1}`,
      selected: Math.floor(Math.random() * 250 + 25),
      previous: Math.floor(Math.random() * 200 + 50),
    }));

    return (
      <WidgetContainer
        menuBar={{
          contextLabels: ['Editorial', 'Profile name'],
          onDownload: handleDownload,
        }}
        header={{
          title: 'Media exposure over time',
          dateRange: '1 May - 30 May 2024',
          showInfo: true,
          keyFigures: (
            <KeyFigure
              label="Total"
              value={32200}
              changePercent={0.3}
              previousValue={32100}
              showInfo
            />
          ),
        }}
      >
        <ColumnLine
          data={data}
          encoding={{
            x: 'date',
            y: ['selected', 'previous'],
            colors: [categoryPalette[0], categoryPalette[3]],
          }}
          columnFields={['selected']}
          lineFields={['previous']}
          height={300}
          legend={false}
          ariaLabel="Media exposure over time"
        />
        <ChartLegend
          items={[
            { label: 'Selected Period', color: categoryPalette[0] },
            { label: 'Previous period', color: categoryPalette[3] },
          ]}
        />
      </WidgetContainer>
    );
  },
};

/**
 * Donut chart widget (matching "Posts by channel" screenshot)
 */
export const PostsByChannelWidget: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <WidgetContainer
        menuBar={{
          contextLabels: ['Social', '5 search profiles'],
          onDownload: handleDownload,
        }}
        header={{
          title: 'Posts by channel',
          dateRange: '1 May - 30 May 2024',
          showInfo: true,
          keyFigures: (
            <KeyFigure
              label="Total"
              value={10000}
              changePercent={-2.3}
              previousValue={10500}
              showInfo
            />
          ),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <Donut
              data={[
                { channel: 'Facebook', posts: 300 },
                { channel: 'X', posts: 250 },
                { channel: 'Instagram', posts: 180 },
                { channel: 'Podcasts', posts: 120 },
                { channel: 'Blogs', posts: 100 },
                { channel: 'Other', posts: 50 },
              ]}
              encoding={{
                x: 'channel',
                y: 'posts',
                colors: [
                  categoryPalette[0],
                  categoryPalette[1],
                  categoryPalette[2],
                  categoryPalette[3],
                  categoryPalette[4],
                  '#C4C2C5',
                ],
              }}
              height={280}
              legend={false}
              ariaLabel="Posts by channel donut chart"
            />
          </div>
          <ChartLegend
            items={[
              { label: 'Facebook', color: categoryPalette[0], value: 300, percentage: 30 },
              { label: 'X', color: categoryPalette[1], value: 250, percentage: 25 },
              { label: 'Instagram', color: categoryPalette[2], value: 180, percentage: 18 },
              { label: 'Podcasts', color: categoryPalette[3], value: 120, percentage: 12 },
              { label: 'Blogs', color: categoryPalette[4], value: 100, percentage: 10 },
              { label: 'Other', color: '#C4C2C5', value: 50, percentage: 5 },
            ]}
            layout="vertical"
            showValues
            showPercentages
          />
        </div>
      </WidgetContainer>
    </div>
  ),
};

/**
 * Bar chart widget (matching "Source category" screenshot)
 */
export const SourceCategoryWidget: StoryObj = {
  render: () => (
    <WidgetContainer
      menuBar={{
        contextLabels: ['Editorial', 'Profile name'],
        onDownload: handleDownload,
      }}
      header={{
        title: 'Source category',
        dateRange: '1 May - 30 May 2024',
        showInfo: true,
        keyFigures: (
          <KeyFigure
            label="Total"
            value={32200}
            changePercent={0.3}
            previousValue={32100}
            showInfo
          />
        ),
      }}
    >
      <Bar
        data={[
          { source: 'National media', count: 1351 },
          { source: 'Regional media', count: 851 },
          { source: 'Local media', count: 788 },
          { source: 'Blogs', count: 651 },
          { source: 'Magazines', count: 601 },
          { source: 'News agencies', count: 356 },
          { source: 'Specialist media', count: 321 },
          { source: 'Other', count: 1212 },
        ]}
        encoding={{
          x: 'source',
          y: 'count',
          colors: [
            categoryPalette[0],
            categoryPalette[0],
            categoryPalette[0],
            categoryPalette[0],
            categoryPalette[0],
            categoryPalette[0],
            categoryPalette[0],
            '#C4C2C5',
          ],
        }}
        height={400}
        legend={false}
        ariaLabel="Source category bar chart"
      />
    </WidgetContainer>
  ),
};

/**
 * Widget without header (content only)
 */
export const ContentOnly: StoryObj = {
  render: () => (
    <WidgetContainer
      menuBar={{
        contextLabels: ['Social', 'Profile name'],
        onDownload: handleDownload,
      }}
    >
      <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
        Any content can go here: chart, table, list, etc.
      </div>
    </WidgetContainer>
  ),
};

/**
 * Collapsed widget
 */
export const CollapsedWidget: StoryObj = {
  render: () => (
    <WidgetContainer
      menuBar={{
        contextLabels: ['Editorial', 'Profile name'],
        onDownload: handleDownload,
      }}
      header={{
        title: 'Media exposure over time',
        dateRange: '1 May - 30 May 2024',
      }}
      defaultCollapsed
    >
      <div>This content is hidden when collapsed</div>
    </WidgetContainer>
  ),
};
