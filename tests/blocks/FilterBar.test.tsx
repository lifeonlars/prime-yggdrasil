import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FilterBar } from '../../src/blocks/FilterBar'
import type { FilterConfig } from '../../src/blocks/FilterBar'

describe('FilterBar', () => {
  const mockFilterChange = vi.fn()
  const mockClearAll = vi.fn()

  const baseFilters: FilterConfig[] = [
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
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      value: null,
    },
  ]

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders all visible filters', () => {
      render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} />)

      // Check that inputs are rendered
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
      // Dropdown renders placeholder in multiple places, check for the dropdown element itself
      expect(screen.getByRole('combobox', { hidden: true })).toBeInTheDocument()
    })

    it('shows filter icon when showFilterIcon is true', () => {
      const { container } = render(
        <FilterBar filters={baseFilters} onFilterChange={mockFilterChange} showFilterIcon={true} />
      )

      const filterIcon = container.querySelector('.pi-filter')
      expect(filterIcon).toBeInTheDocument()
    })

    it('hides filter icon when showFilterIcon is false', () => {
      const { container } = render(
        <FilterBar filters={baseFilters} onFilterChange={mockFilterChange} showFilterIcon={false} />
      )

      const filterIcon = container.querySelector('.pi-filter')
      expect(filterIcon).not.toBeInTheDocument()
    })

    it('hides filters beyond visibleFilterCount', () => {
      const manyFilters: FilterConfig[] = [
        ...baseFilters,
        {
          id: 'extra1',
          label: 'Extra 1',
          type: 'text',
          value: '',
        },
        {
          id: 'extra2',
          label: 'Extra 2',
          type: 'text',
          value: '',
        },
      ]

      render(<FilterBar filters={manyFilters} onFilterChange={mockFilterChange} visibleFilterCount={2} />)

      // First 2 should be visible
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
      expect(screen.getByRole('combobox', { hidden: true })).toBeInTheDocument()

      // Extra filters should not be visible inline (they're in the sidebar only)
      // Verify the "All filters" button appears (indicating overflow)
      expect(screen.getByRole('button', { name: /all filters/i })).toBeInTheDocument()
    })

    it('shows "All filters" button when filters overflow', () => {
      const manyFilters: FilterConfig[] = [
        ...baseFilters,
        {
          id: 'extra',
          label: 'Extra',
          type: 'text',
          value: '',
        },
      ]

      render(<FilterBar filters={manyFilters} onFilterChange={mockFilterChange} visibleFilterCount={2} />)

      expect(screen.getByRole('button', { name: /all filters/i })).toBeInTheDocument()
    })

    it('does not show "All filters" button when all filters fit inline', () => {
      render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} visibleFilterCount={5} />)

      expect(screen.queryByRole('button', { name: /all filters/i })).not.toBeInTheDocument()
    })

    it('renders with elevation style', () => {
      const { container } = render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} elevation={true} />)

      const filterBar = container.querySelector('.surface-card')
      expect(filterBar).toHaveStyle({ boxShadow: 'var(--elevation-elevated)' })
    })
  })

  describe('Interactions', () => {
    it('calls onFilterChange when text filter value changes', () => {
      render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} />)

      const searchInput = screen.getByPlaceholderText('Search...')
      fireEvent.change(searchInput, { target: { value: 'test query' } })

      expect(mockFilterChange).toHaveBeenCalledWith('search', 'test query')
    })

    it('opens sidebar when "All filters" button clicked', () => {
      const manyFilters: FilterConfig[] = [
        ...baseFilters,
        {
          id: 'extra',
          label: 'Extra Filter',
          type: 'text',
          value: '',
        },
      ]

      render(<FilterBar filters={manyFilters} onFilterChange={mockFilterChange} visibleFilterCount={2} />)

      const allFiltersButton = screen.getByRole('button', { name: /all filters/i })
      fireEvent.click(allFiltersButton)

      // Sidebar should now be visible with the title
      expect(screen.getByText('All Filters')).toBeInTheDocument()
    })

    it('clears all filters when "Clear" button clicked', () => {
      const filtersWithValues: FilterConfig[] = [
        {
          id: 'search',
          label: 'Search',
          type: 'text',
          value: 'some search',
        },
        {
          id: 'status',
          label: 'Status',
          type: 'single-select',
          options: [{ label: 'Active', value: 'active' }],
          value: 'active',
        },
      ]

      render(<FilterBar filters={filtersWithValues} onFilterChange={mockFilterChange} onClearAll={mockClearAll} />)

      const clearButton = screen.getByRole('button', { name: /clear all filters/i })
      fireEvent.click(clearButton)

      // Should call onClearAll
      expect(mockClearAll).toHaveBeenCalled()

      // Should clear each filter
      expect(mockFilterChange).toHaveBeenCalledWith('search', null)
      expect(mockFilterChange).toHaveBeenCalledWith('status', null)
    })
  })

  describe('Clear Button', () => {
    it('shows clear button only when filters are active', () => {
      const filtersWithValue: FilterConfig[] = [
        {
          id: 'search',
          label: 'Search',
          type: 'text',
          value: 'active search',
        },
      ]

      render(<FilterBar filters={filtersWithValue} onFilterChange={mockFilterChange} />)

      expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument()
    })

    it('hides clear button when no filters have values', () => {
      const filtersWithoutValue: FilterConfig[] = [
        {
          id: 'search',
          label: 'Search',
          type: 'text',
          value: '',
        },
        {
          id: 'status',
          label: 'Status',
          type: 'single-select',
          options: [],
          value: null,
        },
      ]

      render(<FilterBar filters={filtersWithoutValue} onFilterChange={mockFilterChange} />)

      expect(screen.queryByRole('button', { name: /clear all filters/i })).not.toBeInTheDocument()
    })

    it('shows clear button when multi-select filter has values', () => {
      const filtersWithArray: FilterConfig[] = [
        {
          id: 'types',
          label: 'Types',
          type: 'multi-select',
          options: [],
          value: ['option1', 'option2'],
        },
      ]

      render(<FilterBar filters={filtersWithArray} onFilterChange={mockFilterChange} />)

      expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument()
    })

    it('hides clear button when multi-select filter has empty array', () => {
      const filtersWithEmptyArray: FilterConfig[] = [
        {
          id: 'types',
          label: 'Types',
          type: 'multi-select',
          options: [],
          value: [],
        },
      ]

      render(<FilterBar filters={filtersWithEmptyArray} onFilterChange={mockFilterChange} />)

      expect(screen.queryByRole('button', { name: /clear all filters/i })).not.toBeInTheDocument()
    })
  })

  describe('Filter Types', () => {
    it('renders text input for text type', () => {
      const textFilter: FilterConfig[] = [
        {
          id: 'search',
          label: 'Search',
          type: 'text',
          placeholder: 'Search here',
          value: '',
        },
      ]

      render(<FilterBar filters={textFilter} onFilterChange={mockFilterChange} />)

      expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument()
    })

    it('renders Dropdown for single-select type', () => {
      const dropdownFilter: FilterConfig[] = [
        {
          id: 'category',
          label: 'Category',
          type: 'single-select',
          options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ],
          value: null,
        },
      ]

      render(<FilterBar filters={dropdownFilter} onFilterChange={mockFilterChange} />)

      // Check for dropdown by role instead of text (text appears multiple times in DOM)
      expect(screen.getByRole('combobox', { hidden: true })).toBeInTheDocument()
    })

    it('renders MultiSelect for multi-select type', () => {
      const multiSelectFilter: FilterConfig[] = [
        {
          id: 'tags',
          label: 'Tags',
          type: 'multi-select',
          options: [
            { label: 'Tag 1', value: 't1' },
            { label: 'Tag 2', value: 't2' },
          ],
          value: [],
        },
      ]

      render(<FilterBar filters={multiSelectFilter} onFilterChange={mockFilterChange} />)

      expect(screen.getByText('Select Tags')).toBeInTheDocument()
    })

    it('renders Calendar for date type', () => {
      const dateFilter: FilterConfig[] = [
        {
          id: 'publishDate',
          label: 'Publish Date',
          type: 'date',
          placeholder: 'Select date',
          value: null,
        },
      ]

      const { container } = render(<FilterBar filters={dateFilter} onFilterChange={mockFilterChange} />)

      // Calendar renders as an input with date picker icon
      const calendarInput = container.querySelector('.p-calendar')
      expect(calendarInput).toBeInTheDocument()
    })

    it('renders Calendar with range for date-range type', () => {
      const dateRangeFilter: FilterConfig[] = [
        {
          id: 'dateRange',
          label: 'Date Range',
          type: 'date-range',
          placeholder: 'Select range',
          value: null,
        },
      ]

      const { container } = render(<FilterBar filters={dateRangeFilter} onFilterChange={mockFilterChange} />)

      const calendarInput = container.querySelector('.p-calendar')
      expect(calendarInput).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA labels on buttons', () => {
      const filtersWithValue: FilterConfig[] = [
        {
          id: 'search',
          label: 'Search',
          type: 'text',
          value: 'test',
        },
      ]

      render(<FilterBar filters={filtersWithValue} onFilterChange={mockFilterChange} />)

      const clearButton = screen.getByRole('button', { name: /clear all filters/i })
      expect(clearButton).toHaveAttribute('aria-label', 'Clear all filters')
    })

    it('sets aria-expanded on "All filters" button', () => {
      const manyFilters: FilterConfig[] = [
        ...baseFilters,
        {
          id: 'extra',
          label: 'Extra',
          type: 'text',
          value: '',
        },
      ]

      render(<FilterBar filters={manyFilters} onFilterChange={mockFilterChange} visibleFilterCount={2} />)

      const allFiltersButton = screen.getByRole('button', { name: /all filters/i })
      expect(allFiltersButton).toHaveAttribute('aria-expanded', 'false')

      // Click to open
      fireEvent.click(allFiltersButton)
      expect(allFiltersButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('associates labels with inputs in sidebar', () => {
      const manyFilters: FilterConfig[] = [
        ...baseFilters,
        {
          id: 'extra',
          label: 'Extra Filter',
          type: 'text',
          value: '',
        },
      ]

      render(<FilterBar filters={manyFilters} onFilterChange={mockFilterChange} visibleFilterCount={2} />)

      // Open sidebar
      const allFiltersButton = screen.getByRole('button', { name: /all filters/i })
      fireEvent.click(allFiltersButton)

      // Check that labels exist for all filters in the sidebar
      // Labels are rendered for each filter
      const labels = screen.getAllByText('Search')
      expect(labels.length).toBeGreaterThan(0)

      // Check for Status label/text
      const statusElements = screen.getAllByText('Status')
      expect(statusElements.length).toBeGreaterThan(0)

      // Check for Extra Filter label
      expect(screen.getByText('Extra Filter')).toBeInTheDocument()
    })

    it('marks filter icon as decorative', () => {
      const { container } = render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} />)

      const filterIcon = container.querySelector('.pi-filter')
      expect(filterIcon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Composition', () => {
    it('renders startContent when provided', () => {
      const startContent = <button data-testid="start-button">Start</button>

      render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} startContent={startContent} />)

      expect(screen.getByTestId('start-button')).toBeInTheDocument()
    })

    it('renders endContent when provided', () => {
      const endContent = <span data-testid="end-badge">Badge</span>

      render(<FilterBar filters={baseFilters} onFilterChange={mockFilterChange} endContent={endContent} />)

      expect(screen.getByTestId('end-badge')).toBeInTheDocument()
    })

    it('renders both startContent and endContent', () => {
      const startContent = <button data-testid="start-button">Start</button>
      const endContent = <span data-testid="end-badge">Badge</span>

      render(
        <FilterBar
          filters={baseFilters}
          onFilterChange={mockFilterChange}
          startContent={startContent}
          endContent={endContent}
        />
      )

      expect(screen.getByTestId('start-button')).toBeInTheDocument()
      expect(screen.getByTestId('end-badge')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty filters array', () => {
      render(<FilterBar filters={[]} onFilterChange={mockFilterChange} />)

      // Should render without crashing
      const { container } = render(<FilterBar filters={[]} onFilterChange={mockFilterChange} />)
      expect(container.querySelector('.surface-card')).toBeInTheDocument()
    })

    it('handles disabled filters', () => {
      const disabledFilter: FilterConfig[] = [
        {
          id: 'search',
          label: 'Search',
          type: 'text',
          value: '',
          disabled: true,
        },
      ]

      render(<FilterBar filters={disabledFilter} onFilterChange={mockFilterChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })
  })
})
