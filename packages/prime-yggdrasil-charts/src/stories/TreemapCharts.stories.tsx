/**
 * Treemap Chart Stories
 *
 * Hierarchical treemap charts for displaying proportional data
 * grouped by category with drill-down support.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Treemap } from '../charts/Treemap';

const meta: Meta = {
  title: 'Charts/Treemap',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// =============================================================================
// DATA
// =============================================================================

// Top entities data matching the design screenshot
const topEntitiesData = [
  // Organization (teal)
  { name: 'Korben Dallas', value: 232, type: 'Organization' },
  { name: 'Paul Atreides', value: 235, type: 'Organization' },
  { name: 'John Kimble', value: 231, type: 'Organization' },
  { name: 'John Wick', value: 132, type: 'Organization' },
  { name: 'Dana Scully', value: 132, type: 'Organization' },
  { name: 'Cordelia Chase', value: 88, type: 'Organization' },
  { name: 'Ellen Ripley', value: 91, type: 'Organization' },
  { name: 'Rick Dalton', value: 34, type: 'Organization' },
  { name: 'Cliff Booth', value: 32, type: 'Organization' },
  { name: 'Marty McFly', value: 33, type: 'Organization' },
  { name: 'Thomas Anderson', value: 71, type: 'Organization' },
  { name: 'Elle Driver', value: 59, type: 'Organization' },
  { name: 'Fox Mulder', value: 67, type: 'Organization' },
  { name: 'Marsellus Wallace', value: 41, type: 'Organization' },
  { name: 'Hattori Hanzo', value: 44, type: 'Organization' },
  { name: 'James Kirk', value: 129, type: 'Organization' },
  { name: 'Hans Gruber', value: 68, type: 'Organization' },
  { name: 'Vincent Vega', value: 74, type: 'Organization' },
  { name: 'Buckaroo Banzai', value: 132, type: 'Organization' },
  { name: 'Kara Thrace', value: 67, type: 'Organization' },
  // Person (gold/orange)
  { name: 'Zorg Industries', value: 122, type: 'Person' },
  { name: 'Tyrell Corporation', value: 132, type: 'Person' },
  { name: 'Wallace Corporation', value: 144, type: 'Person' },
  { name: 'Weyland-Yutani Corp', value: 99, type: 'Person' },
  { name: 'Blue Sun', value: 57, type: 'Person' },
  { name: 'InGen', value: 59, type: 'Person' },
  { name: 'Rekall', value: 32, type: 'Person' },
  { name: 'Hyperion Labs', value: 33, type: 'Person' },
  { name: 'Umbrella Corporation', value: 71, type: 'Person' },
  { name: 'Minerva Collective', value: 81, type: 'Person' },
  { name: 'Cyberdyne Systems', value: 67, type: 'Person' },
  { name: 'Kiroshi Opticals', value: 109, type: 'Person' },
  { name: 'Kang Tao', value: 47, type: 'Person' },
  { name: 'Militech', value: 41, type: 'Person' },
  { name: 'Arasaka Industries', value: 111, type: 'Person' },
  // Location (pink)
  { name: 'Tokushima', value: 168, type: 'Location' },
  { name: 'Night City', value: 168, type: 'Location' },
  { name: 'Well Springs', value: 231, type: 'Location' },
  { name: 'Hogwarts', value: 132, type: 'Location' },
  { name: 'North Oak', value: 71, type: 'Location' },
  { name: 'Kabuki', value: 68, type: 'Location' },
  { name: 'Arkham', value: 36, type: 'Location' },
  { name: 'Castle Rock', value: 31, type: 'Location' },
  { name: 'Basin City', value: 59, type: 'Location' },
  { name: 'Thunderdome', value: 55, type: 'Location' },
  { name: 'Duckburg', value: 81, type: 'Location' },
  { name: 'District 9', value: 69, type: 'Location' },
  { name: 'New Vegas', value: 44, type: 'Location' },
  { name: 'Vice City', value: 46, type: 'Location' },
  { name: 'Mega City One', value: 74, type: 'Location' },
];

// Color map matching the design: teal for Org, gold for Person, pink for Location
const entityColorMap: Record<string, string> = {
  Organization: '#3EADC9',
  Person: '#FFC876',
  Location: '#EB99BC',
};

// =============================================================================
// STORIES
// =============================================================================

/**
 * Top entities treemap with drill-down
 * Click on a category group to expand it. Use the Back button to return.
 */
export const TopEntities: StoryObj = {
  render: () => (
    <Treemap
      data={topEntitiesData}
      encoding={{
        x: 'name',
        y: 'value',
        group: 'type',
        colorMap: entityColorMap,
      }}
      height={600}
      drillDown
      ariaLabel="Top entities treemap showing organizations, persons, and locations"
    />
  ),
};

/**
 * Treemap without drill-down (flat view)
 */
export const NoDrillDown: StoryObj = {
  render: () => (
    <Treemap
      data={topEntitiesData}
      encoding={{
        x: 'name',
        y: 'value',
        group: 'type',
        colorMap: entityColorMap,
      }}
      height={600}
      drillDown={false}
      ariaLabel="Top entities treemap flat view"
    />
  ),
};

/**
 * Small treemap with auto-assigned colors
 */
export const AutoColors: StoryObj = {
  render: () => (
    <Treemap
      data={[
        { item: 'Widget A', count: 450, category: 'Hardware' },
        { item: 'Widget B', count: 320, category: 'Hardware' },
        { item: 'Service X', count: 280, category: 'Software' },
        { item: 'Service Y', count: 190, category: 'Software' },
        { item: 'Support', count: 150, category: 'Services' },
      ]}
      encoding={{
        x: 'item',
        y: 'count',
        group: 'category',
      }}
      title="Product Distribution"
      height={400}
      ariaLabel="Product distribution treemap"
    />
  ),
};

/**
 * Loading state
 */
export const Loading: StoryObj = {
  render: () => (
    <Treemap
      data={[]}
      encoding={{ x: 'name', y: 'value', group: 'type' }}
      loading
      height={500}
    />
  ),
};

/**
 * Empty state
 */
export const Empty: StoryObj = {
  render: () => (
    <Treemap
      data={[]}
      encoding={{ x: 'name', y: 'value', group: 'type' }}
      height={500}
    />
  ),
};
