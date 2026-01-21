import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FilterBar } from './FilterBar'
import type { FilterConfig } from './FilterBar'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const meta = {
  title: 'Blocks/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for stories
const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Swedish', value: 'sv' },
  { label: 'Norwegian', value: 'no' },
  { label: 'Danish', value: 'da' },
  { label: 'Finnish', value: 'fi' },
]

const mediaTypeOptions = [
  { label: 'Web', value: 'web' },
  { label: 'Print', value: 'print' },
  { label: 'TV/Radio', value: 'broadcast' },
  { label: 'Blog', value: 'blog' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Archived', value: 'archived' },
]

const themeOptions = [
  { label: 'Politics', value: 'politics' },
  { label: 'Technology', value: 'tech' },
  { label: 'Business', value: 'business' },
  { label: 'Sports', value: 'sports' },
  { label: 'Entertainment', value: 'entertainment' },
]

/**
 * Default FilterBar with dropdown filters (no search)
 */
export const Default: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'language',
        label: 'Language',
        type: 'single-select',
        options: languageOptions,
        value: null,
      },
      {
        id: 'status',
        label: 'Status',
        type: 'single-select',
        options: statusOptions,
        value: null,
      },
    ])

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    return (
      <div>
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        <div className="mt-4 p-4 surface-card">
          <p className="text-color">
            <strong>Active Filters:</strong>
          </p>
          <pre className="text-sm">{JSON.stringify(filters.map((f) => ({ [f.id]: f.value })), null, 2)}</pre>
        </div>
      </div>
    )
  },
}

/**
 * Showcase all filter types: single-select, multi-select (comma), multi-select (chip), date
 */
export const AllFilterTypes: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'language',
        label: 'Language',
        type: 'single-select',
        options: languageOptions,
        value: null,
      },
      {
        id: 'mediaTypes',
        label: 'Media Type',
        type: 'multi-select',
        options: mediaTypeOptions,
        value: [],
        display: 'comma',
        maxSelectedLabels: 2,
      },
      {
        id: 'themes',
        label: 'Theme',
        type: 'multi-select',
        options: themeOptions,
        value: [],
        display: 'chip',
        maxSelectedLabels: 3,
      },
      {
        id: 'publishDate',
        label: 'Publish Date',
        type: 'date',
        value: null,
      },
    ])

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    return (
      <div>
        <FilterBar filters={filters} onFilterChange={handleFilterChange} visibleFilterCount={5} />
        <div className="mt-4 p-4 surface-card">
          <p className="text-color">
            <strong>Filter Values:</strong>
          </p>
          <ul className="text-sm">
            {filters.map((f) => (
              <li key={f.id}>
                <strong>{f.label}:</strong> {JSON.stringify(f.value)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
}

/**
 * Optional search filter with icon (using IconField)
 */
export const WithSearch: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search articles...',
        icon: 'pi pi-search',
        value: '',
      },
      {
        id: 'category',
        label: 'Category',
        type: 'single-select',
        options: themeOptions,
        value: null,
      },
    ])

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    return <FilterBar filters={filters} onFilterChange={handleFilterChange} />
  },
}

/**
 * MultiSelect with filter/search for many options
 */
export const MultiSelectWithFilter: Story = {
  render: () => {
    // Create many theme options
    const manyThemes = [
      ...themeOptions,
      { label: 'Health', value: 'health' },
      { label: 'Education', value: 'education' },
      { label: 'Environment', value: 'environment' },
      { label: 'Travel', value: 'travel' },
      { label: 'Food', value: 'food' },
      { label: 'Fashion', value: 'fashion' },
      { label: 'Music', value: 'music' },
      { label: 'Art', value: 'art' },
      { label: 'Science', value: 'science' },
      { label: 'History', value: 'history' },
    ]

    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'language',
        label: 'Language',
        type: 'single-select',
        options: languageOptions,
        value: null,
      },
      {
        id: 'themes',
        label: 'Themes',
        type: 'multi-select',
        options: manyThemes,
        value: [],
        display: 'comma',
        showFilter: true,
        maxSelectedLabels: 3,
      },
      {
        id: 'mediaType',
        label: 'Media Type',
        type: 'multi-select',
        options: mediaTypeOptions,
        value: [],
        display: 'chip',
        maxSelectedLabels: 3,
      },
    ])

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    return (
      <div>
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        <div className="mt-4 p-4 surface-card border-round">
          <p className="text-color-secondary text-sm">
            The "Themes" filter has <code>showFilter: true</code> to enable search within the dropdown when there
            are many options.
          </p>
        </div>
      </div>
    )
  },
}

/**
 * Many filters with overflow to "All filters" sidebar
 */
export const WithManyFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'language',
        label: 'Language',
        type: 'single-select',
        options: languageOptions,
        value: null,
      },
      {
        id: 'mediaType',
        label: 'Media Type',
        type: 'multi-select',
        options: mediaTypeOptions,
        value: [],
        display: 'comma',
        maxSelectedLabels: 2,
      },
      {
        id: 'theme',
        label: 'Theme',
        type: 'multi-select',
        options: themeOptions,
        value: [],
        display: 'comma',
        maxSelectedLabels: 2,
      },
      {
        id: 'status',
        label: 'Status',
        type: 'single-select',
        options: statusOptions,
        value: null,
      },
      {
        id: 'publishDate',
        label: 'Publish Date',
        type: 'date',
        value: null,
      },
    ])

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    const handleClearAll = () => {
      console.log('All filters cleared!')
    }

    return (
      <div>
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          visibleFilterCount={3}
          elevation={true}
        />
        <div className="mt-4 p-4 surface-card">
          <p className="text-color-secondary text-sm">
            Only 3 filters are shown inline. Click "All filters" to see the rest in the sidebar.
          </p>
        </div>
      </div>
    )
  },
}

/**
 * Using startContent and endContent slots
 */
export const WithCustomContent: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search...',
        icon: 'pi pi-search',
        value: '',
      },
      {
        id: 'status',
        label: 'Status',
        type: 'single-select',
        options: statusOptions,
        value: null,
      },
    ])

    const [resultCount] = useState(1247)

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    const handleRefresh = () => {
      console.log('Refreshing data...')
    }

    return (
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        startContent={
          <Button icon="pi pi-refresh" text onClick={handleRefresh} tooltip="Refresh data" tooltipOptions={{ position: 'bottom' }} />
        }
        endContent={
          <Badge value={resultCount} severity="info" size="large" style={{ fontSize: '0.875rem' }} />
        }
        elevation={true}
      />
    )
  },
}

/**
 * Real-world example: FilterBar integrated with DataTable
 */
export const DataTableIntegration: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'language',
        label: 'Language',
        type: 'single-select',
        options: languageOptions,
        value: null,
      },
      {
        id: 'mediaType',
        label: 'Media Type',
        type: 'single-select',
        options: mediaTypeOptions,
        value: null,
      },
      {
        id: 'status',
        label: 'Status',
        type: 'multi-select',
        options: statusOptions,
        value: [],
        display: 'comma',
        maxSelectedLabels: 2,
      },
    ])

    // Sample data
    const sampleData = [
      { id: 1, title: 'Breaking News: Tech Innovation', language: 'en', mediaType: 'web', status: 'active', date: '2026-01-15' },
      { id: 2, title: 'Sportsnyheter från i dag', language: 'sv', mediaType: 'print', status: 'active', date: '2026-01-14' },
      { id: 3, title: 'Business Report Q4', language: 'en', mediaType: 'broadcast', status: 'completed', date: '2026-01-10' },
      { id: 4, title: 'Kulturnyheter', language: 'no', mediaType: 'web', status: 'pending', date: '2026-01-12' },
      { id: 5, title: 'Political Analysis', language: 'en', mediaType: 'blog', status: 'active', date: '2026-01-18' },
    ]

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    // Apply filters to data
    const filteredData = sampleData.filter((item) => {
      const languageFilter = filters.find((f) => f.id === 'language')
      if (languageFilter?.value && item.language !== languageFilter.value) {
        return false
      }

      const mediaTypeFilter = filters.find((f) => f.id === 'mediaType')
      if (mediaTypeFilter?.value && item.mediaType !== mediaTypeFilter.value) {
        return false
      }

      const statusFilter = filters.find((f) => f.id === 'status')
      if (statusFilter?.value && Array.isArray(statusFilter.value) && statusFilter.value.length > 0) {
        if (!statusFilter.value.includes(item.status)) {
          return false
        }
      }

      return true
    })

    return (
      <div className="flex flex-column gap-3">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          endContent={<Badge value={filteredData.length} severity="info" />}
          elevation={true}
        />

        <DataTable value={filteredData} className="surface-card" emptyMessage="No articles found">
          <Column field="id" header="ID" style={{ width: '4rem' }} />
          <Column field="title" header="Title" />
          <Column field="language" header="Language" style={{ width: '6rem' }} />
          <Column field="mediaType" header="Media Type" style={{ width: '8rem' }} />
          <Column field="status" header="Status" style={{ width: '8rem' }} />
          <Column field="date" header="Date" style={{ width: '8rem' }} />
        </DataTable>
      </div>
    )
  },
}

/**
 * FilterBar without filter icon
 */
export const WithoutFilterIcon: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterConfig[]>([
      {
        id: 'search',
        label: 'Search',
        type: 'text',
        placeholder: 'Search...',
        icon: 'pi pi-search',
        value: '',
      },
      {
        id: 'category',
        label: 'Category',
        type: 'single-select',
        options: themeOptions,
        value: null,
      },
    ])

    const handleFilterChange = (id: string, value: any) => {
      setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)))
    }

    return <FilterBar filters={filters} onFilterChange={handleFilterChange} showFilterIcon={false} />
  },
}
