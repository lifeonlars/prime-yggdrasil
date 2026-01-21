import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Calendar } from 'primereact/calendar'

/**
 * Filter configuration object
 */
export interface FilterConfig {
  /** Unique identifier for the filter */
  id: string
  /** Display label for the filter */
  label: string
  /** Filter type */
  type: 'text' | 'single-select' | 'multi-select' | 'date'
  /** Options for select-type filters */
  options?: Array<{ label: string; value: any }>
  /** Placeholder text */
  placeholder?: string
  /** Current value */
  value?: any
  /** Whether filter is disabled */
  disabled?: boolean
  /** Icon to display (PrimeIcons class name, only for text type) */
  icon?: string
  /** MultiSelect display mode: 'comma' or 'chip' (default: 'comma') */
  display?: 'comma' | 'chip'
  /** Show filter search in dropdown for multi-select (default: false) */
  showFilter?: boolean
  /** Maximum number of selected labels to display before showing "N items selected" */
  maxSelectedLabels?: number
}

/**
 * FilterBar component properties
 */
export interface FilterBarProps {
  /** Array of filter configurations */
  filters: FilterConfig[]
  /** Callback when any filter value changes */
  onFilterChange: (filterId: string, value: any) => void
  /** Callback when all filters are cleared */
  onClearAll?: () => void
  /** Number of filters to show inline before hiding in "All filters" */
  visibleFilterCount?: number
  /** Whether to show the filter icon at the start */
  showFilterIcon?: boolean
  /** Whether to show "All filters" button */
  showAllFiltersButton?: boolean
  /** Position for the Sidebar when "All filters" is opened */
  sidebarPosition?: 'left' | 'right' | 'top' | 'bottom'
  /** Additional CSS classes */
  className?: string
  /** Whether to show elevation shadow */
  elevation?: boolean
  /** Optional start content (before filters) */
  startContent?: ReactNode
  /** Optional end content (after clear button) */
  endContent?: ReactNode
}

interface FilterControlProps {
  filter: FilterConfig
  onChange: (value: any) => void
  fullWidth?: boolean
}

/**
 * Internal component that renders the appropriate control based on filter type
 */
function FilterControl({ filter, onChange, fullWidth = false }: FilterControlProps) {
  const widthStyle = fullWidth ? { width: '100%' } : { minWidth: '200px' }

  switch (filter.type) {
    case 'text':
      if (filter.icon) {
        return (
          <div style={{ ...widthStyle, padding: '4px 0' }}>
            <IconField iconPosition="left" style={{ width: '100%' }}>
              <InputIcon className={filter.icon} />
              <InputText
                id={filter.id}
                value={filter.value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={filter.placeholder || filter.label}
                disabled={filter.disabled}
              />
            </IconField>
          </div>
        )
      }
      return (
        <div style={{ ...widthStyle, padding: '4px 0' }}>
          <InputText
            id={filter.id}
            value={filter.value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={filter.placeholder || filter.label}
            disabled={filter.disabled}
            style={{ width: '100%' }}
          />
        </div>
      )

    case 'single-select':
      return (
        <div style={{ ...widthStyle, padding: '4px 0' }}>
          <Dropdown
            id={filter.id}
            value={filter.value}
            options={filter.options || []}
            onChange={(e) => onChange(e.value)}
            placeholder={filter.placeholder || `Select ${filter.label}`}
            disabled={filter.disabled}
            showClear
            optionLabel="label"
            optionValue="value"
            style={{ width: '100%' }}
          />
        </div>
      )

    case 'multi-select':
      return (
        <div style={{ ...widthStyle, padding: '4px 0' }}>
          <MultiSelect
            id={filter.id}
            value={filter.value || []}
            options={filter.options || []}
            onChange={(e) => onChange(e.value)}
            placeholder={filter.placeholder || `Select ${filter.label}`}
            disabled={filter.disabled}
            optionLabel="label"
            optionValue="value"
            display={filter.display || 'comma'}
            filter={filter.showFilter}
            maxSelectedLabels={filter.maxSelectedLabels}
            style={{ width: '100%' }}
          />
        </div>
      )

    case 'date':
      return (
        <div style={{ ...widthStyle, padding: '4px 0' }}>
          <IconField iconPosition="left" style={{ width: '100%' }}>
            <InputIcon className="pi pi-calendar" />
            <Calendar
              id={filter.id}
              value={filter.value}
              onChange={(e) => onChange(e.value)}
              placeholder={filter.placeholder || filter.label}
              disabled={filter.disabled}
              showIcon={false}
            />
          </IconField>
        </div>
      )

    default:
      return null
  }
}

/**
 * FilterBar - Horizontal toolbar for managing multiple filters
 *
 * A reusable block component for filtering data with multiple criteria. Displays
 * filters inline with automatic overflow to a sidebar drawer. Supports text search,
 * single/multi-select dropdowns, and date pickers.
 *
 * **Features:**
 * - Inline display of primary filters
 * - "All filters" sidebar for additional filters
 * - Automatic "Clear" button when filters are active
 * - Support for text, dropdown, and date filters
 * - Responsive layout with flex wrapping
 * - Consistent Yggdrasil styling and elevation
 *
 * **When to use:**
 * - DataTable filtering interfaces
 * - Search pages with multiple criteria
 * - Dashboard filter controls
 * - Any UI requiring faceted filtering
 *
 * **Design tokens used:**
 * - `--surface-card`: Background color
 * - `--elevation-moderate`: Default shadow
 * - `--elevation-elevated`: Enhanced shadow (when elevation=true)
 * - `--text-color`: Primary text
 * - `--text-color-secondary`: Secondary elements (icons)
 *
 * @param props - Component properties
 * @param props.filters - Array of filter configurations
 * @param props.onFilterChange - Callback when filter value changes
 * @param props.onClearAll - Optional callback when all filters cleared
 * @param props.visibleFilterCount - Number of inline filters (default: 3)
 * @param props.showFilterIcon - Show filter icon (default: true)
 * @param props.showAllFiltersButton - Show "All filters" button (default: true)
 * @param props.sidebarPosition - Sidebar position (default: 'right')
 * @param props.elevation - Enhanced shadow elevation (default: false)
 * @param props.startContent - Optional content before filters
 * @param props.endContent - Optional content after clear button
 *
 * @returns React component
 *
 * @example
 * // Basic usage with text and dropdown filters
 * const [filters, setFilters] = useState([
 *   {
 *     id: 'search',
 *     label: 'Search',
 *     type: 'text',
 *     placeholder: 'Search by name...',
 *     icon: 'pi pi-search',
 *     value: ''
 *   },
 *   {
 *     id: 'status',
 *     label: 'Status',
 *     type: 'single-select',
 *     options: [
 *       { label: 'Active', value: 'active' },
 *       { label: 'Inactive', value: 'inactive' }
 *     ],
 *     value: null
 *   }
 * ])
 *
 * const handleFilterChange = (id, value) => {
 *   setFilters(prev => prev.map(f =>
 *     f.id === id ? { ...f, value } : f
 *   ))
 * }
 *
 * <FilterBar
 *   filters={filters}
 *   onFilterChange={handleFilterChange}
 * />
 *
 * @example
 * // With elevation and custom content
 * <FilterBar
 *   filters={filterConfigs}
 *   onFilterChange={handleChange}
 *   elevation={true}
 *   startContent={<Button icon="pi pi-refresh" text />}
 *   endContent={<Badge value={resultCount} />}
 * />
 *
 * @see {@link https://primereact.org/dropdown/} for Dropdown documentation
 * @see {@link https://primereact.org/multiselect/} for MultiSelect documentation
 * @see {@link https://primereact.org/sidebar/} for Sidebar documentation
 * @see {@link ../../docs/components/yggdrasil-blocks.md} for FilterBar documentation
 */
export function FilterBar({
  filters,
  onFilterChange,
  onClearAll,
  visibleFilterCount = 3,
  showFilterIcon = true,
  showAllFiltersButton = true,
  sidebarPosition = 'right',
  className = '',
  elevation = false,
  startContent,
  endContent,
}: FilterBarProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const filterBarStyle = {
    backgroundColor: 'var(--surface-neutral-secondary)',
    borderRadius: '12px',
    boxShadow: elevation ? 'var(--elevation-elevated)' : 'var(--elevation-moderate)',
  }

  // Compute which filters are active (have values)
  const activeFilters = filters.filter((f) => {
    if (f.value === null || f.value === undefined || f.value === '') return false
    if (Array.isArray(f.value)) return f.value.length > 0
    return true
  })
  const hasActiveFilters = activeFilters.length > 0

  // Split filters into visible and hidden
  const visibleFilters = filters.slice(0, visibleFilterCount)
  const hiddenFilters = filters.slice(visibleFilterCount)
  const hasHiddenFilters = hiddenFilters.length > 0 && showAllFiltersButton

  const handleClearAll = () => {
    onClearAll?.()
    filters.forEach((f) => onFilterChange(f.id, null))
  }

  return (
    <>
      {/* Main FilterBar */}
      <div className={className} style={filterBarStyle}>
        <div className="flex align-items-center px-4 py-2 gap-2">
          {/* Start Content */}
          {startContent && <div className="flex-none">{startContent}</div>}

          {/* Filter Icon */}
          {showFilterIcon && (
            <i className="pi pi-filter text-xl text-color-secondary flex-none" aria-hidden="true" />
          )}

          {/* Visible Filters */}
          <div className="flex align-items-center gap-2 flex-1 flex-wrap">
            {visibleFilters.map((filter) => (
              <FilterControl
                key={filter.id}
                filter={filter}
                onChange={(value) => onFilterChange(filter.id, value)}
              />
            ))}
          </div>

          {/* Clear Button (only when filters are active) */}
          {hasActiveFilters && (
            <Button
              label="Clear"
              icon="pi pi-times"
              text
              onClick={handleClearAll}
              className="flex-none"
              aria-label="Clear all filters"
            />
          )}

          {/* All Filters Button */}
          {hasHiddenFilters && (
            <Button
              label="All filters"
              icon="pi pi-sliders-h"
              outlined
              onClick={() => setSidebarVisible(true)}
              className="flex-none"
              aria-label="Open all filters sidebar"
              aria-expanded={sidebarVisible}
            />
          )}

          {/* End Content */}
          {endContent && <div className="flex-none">{endContent}</div>}
        </div>
      </div>

      {/* All Filters Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        position={sidebarPosition}
        onHide={() => setSidebarVisible(false)}
        style={{ width: '400px' }}
        className="p-sidebar-md"
        aria-labelledby="filters-title"
      >
        <div className="flex flex-column gap-4">
          <h3 id="filters-title" className="text-color font-semibold mb-0">
            All Filters
          </h3>
          {filters.map((filter) => (
            <div key={filter.id}>
              <label htmlFor={filter.id} className="block text-color font-medium mb-2">
                {filter.label}
              </label>
              <FilterControl filter={filter} onChange={(value) => onFilterChange(filter.id, value)} fullWidth />
            </div>
          ))}
        </div>
      </Sidebar>
    </>
  )
}
