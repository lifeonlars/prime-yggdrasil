---
title: "Yggdrasil Blocks"
category: reference
tags: [components, yggdrasil, blocks, custom, navigation, account, form]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
  - ../AI-AGENT-GUIDE.md
---

# Yggdrasil Blocks

Pre-built composite components with Yggdrasil styling and patterns.

**Rule**: Check these blocks FIRST before using raw PrimeReact components - they include correct tokens, patterns, and accessibility.

**Quick Links**: [NavigationTabs](#navigationtabs) | [AccountMenu](#accountmenu) | [LanguageMenu](#languagemenu) | [NotificationButton](#notificationbutton) | [ThemeToggle](#themetoggle) | [FilterBar](#filterbar) | [Card](#card) | [FormField](#formfield) | [PageHeader](#pageheader) | [SectionTitle](#sectiontitle) | [TableShell](#tableshell) | [Icon](#icon)

---

## NavigationTabs

**Use Cases**:
- Main application navigation with tabs
- Navigation bar with logo and controls
- Responsive nav that collapses logo on mobile

**Key Props**:
- `items` - MenuItem array for tabs
- `activeIndex` - Currently active tab
- `onTabChange` - Tab change handler (receives index)
- `logo` - Object with `wide` and `square` ReactNodes
- `startContent` - Content after logo
- `endContent` - Content at end (account menu, notifications)
- `elevation` - Use elevated shadow (default: false)

**Import**:
```tsx
import { NavigationTabs } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
const items = [
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Projects', icon: 'pi pi-briefcase' },
  { label: 'Settings', icon: 'pi pi-cog' }
];

<NavigationTabs
  items={items}
  activeIndex={activeTab}
  onTabChange={(index) => setActiveTab(index)}
  logo={{
    wide: <img src="/logo-wide.svg" alt="Company" height={32} />,
    square: <img src="/logo-icon.svg" alt="Company" height={32} />
  }}
  endContent={
    <div className="flex align-items-center gap-2">
      <NotificationButton count={3} onClick={() => {}} />
      <AccountMenu user={currentUser} onLogout={logout} />
    </div>
  }
/>
```

---

## AccountMenu

**Use Cases**:
- User account dropdown in navigation
- Profile/settings/logout menu
- Avatar-triggered popup menu

**Key Props**:
- `user` - Object: `{ firstName, lastName, email, avatarUrl? }`
- `onProfileClick` - Profile menu item handler
- `onPreferencesClick` - Preferences menu item handler
- `onLogout` - Logout handler
- `additionalMenuItems` - Extra MenuItem array

**Import**:
```tsx
import { AccountMenu } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<AccountMenu
  user={{
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    avatarUrl: '/avatars/john.jpg'  // Optional - shows initials if omitted
  }}
  onProfileClick={() => navigate('/profile')}
  onPreferencesClick={() => navigate('/settings')}
  onLogout={() => signOut()}
  additionalMenuItems={[
    { label: 'Help', icon: 'pi pi-question-circle', command: () => {} }
  ]}
/>
```

---

## LanguageMenu

**Use Cases**:
- Language/locale selector
- Flag-based language picker

**Key Props**:
- `languages` - Array of language options
- `selectedLanguage` - Currently selected
- `onLanguageChange` - Selection handler
- `showLabel` - Show language name (default: false)

**Import**:
```tsx
import { LanguageMenu } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
const languages = [
  { code: 'en', name: 'English', flag: '/flags/uk.svg' },
  { code: 'no', name: 'Norsk', flag: '/flags/norway.svg' },
  { code: 'sv', name: 'Svenska', flag: '/flags/sweden.svg' }
];

<LanguageMenu
  languages={languages}
  selectedLanguage="en"
  onLanguageChange={(code) => setLocale(code)}
/>
```

---

## NotificationButton

**Use Cases**:
- Notification bell with badge
- Unread count indicator
- Alert trigger

**Key Props**:
- `count` - Number of notifications (shows badge if > 0)
- `onClick` - Click handler

**Import**:
```tsx
import { NotificationButton } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<NotificationButton
  count={5}
  onClick={() => setShowNotifications(true)}
/>
```

---

## ThemeToggle

**Use Cases**:
- Dark/light mode switch
- Theme preference toggle

**Key Props**:
- `theme` - Current theme ('light' | 'dark')
- `onThemeChange` - Theme change handler

**Import**:
```tsx
import { ThemeToggle } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<ThemeToggle
  theme={currentTheme}
  onThemeChange={(theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }}
/>
```

---

## FilterBar

**Use Cases**:
- DataTable filtering interfaces
- Search pages with multiple criteria
- Dashboard filter controls
- Any UI requiring faceted filtering

**Key Props**:
- `filters` - Array of FilterConfig objects
- `onFilterChange` - Callback: `(filterId: string, value: any) => void`
- `onClearAll` - Optional callback when all filters cleared
- `visibleFilterCount` - Number of inline filters (default: 3)
- `showFilterIcon` - Show filter icon at start (default: true)
- `showAllFiltersButton` - Show "All filters" button (default: true)
- `sidebarPosition` - Sidebar position: 'left' | 'right' | 'top' | 'bottom' (default: 'right')
- `elevation` - Enhanced shadow elevation (default: false)
- `startContent` - Optional content before filters
- `endContent` - Optional content after clear button

**FilterConfig Interface**:
```tsx
interface FilterConfig {
  id: string                    // Unique identifier
  label: string                 // Display label
  type: 'text' | 'single-select' | 'multi-select' | 'date'
  options?: Array<{ label: string; value: any }>  // For select types
  placeholder?: string
  value?: any                   // Current value
  disabled?: boolean
  icon?: string                 // PrimeIcons class (text type only)
  display?: 'comma' | 'chip'    // MultiSelect display mode (default: 'comma')
  showFilter?: boolean          // Show search in multi-select dropdown
  maxSelectedLabels?: number    // Max labels before "N items selected"
}
```

**Filter Types**:
- `text` - Text input with optional icon (uses IconField)
- `single-select` - Dropdown with single selection
- `multi-select` - MultiSelect with comma or chip display
- `date` - Calendar date picker

**Import**:
```tsx
import { FilterBar } from '@lifeonlars/prime-yggdrasil';
import type { FilterConfig } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
const [filters, setFilters] = useState<FilterConfig[]>([
  {
    id: 'language',
    label: 'Language',
    type: 'single-select',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Swedish', value: 'sv' }
    ],
    value: null
  },
  {
    id: 'mediaType',
    label: 'Media Type',
    type: 'multi-select',
    options: [
      { label: 'Web', value: 'web' },
      { label: 'Print', value: 'print' },
      { label: 'TV/Radio', value: 'broadcast' }
    ],
    value: [],
    display: 'comma',
    maxSelectedLabels: 2
  }
]);

const handleFilterChange = (id: string, value: any) => {
  setFilters(prev => prev.map(f =>
    f.id === id ? { ...f, value } : f
  ));
};

// Basic usage
<FilterBar
  filters={filters}
  onFilterChange={handleFilterChange}
/>

// With optional search filter (uses IconField)
<FilterBar
  filters={[
    {
      id: 'search',
      type: 'text',
      placeholder: 'Search...',
      icon: 'pi pi-search',
      value: ''
    },
    ...filters
  ]}
  onFilterChange={handleFilterChange}
/>

// Multi-select with filter/search for many options
<FilterBar
  filters={[{
    id: 'themes',
    type: 'multi-select',
    options: manyOptions,
    display: 'comma',
    showFilter: true,
    maxSelectedLabels: 3
  }]}
  onFilterChange={handleFilterChange}
/>
```

**Features**:
- Controlled component (parent manages filter state)
- Automatic "Clear" button when filters are active
- Overflow handling with "All filters" sidebar
- Support for text, dropdown, multi-select, and date filters
- Slot-based architecture (startContent/endContent)
- Full accessibility with ARIA labels
- Responsive flex layout with wrapping

**Design Tokens Used**:
- `--surface-neutral-secondary` - Background color
- `--elevation-moderate` - Default shadow
- `--elevation-elevated` - Enhanced shadow (when elevation=true)
- `--text-color` - Primary text
- `--text-color-secondary` - Icons
- Border radius: 12px

---

## Card

**Use Cases**:
- Content container with elevation
- Dashboard widget wrapper
- Section grouping

**Key Props**:
- `children` - Card content
- `className` - Additional CSS classes
- `usePrimeCard` - Use full PrimeReact Card (default: false)

**Import**:
```tsx
import { Card } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
// Simple card (utility classes)
<Card>
  <h3>User Profile</h3>
  <p>John Doe - john@example.com</p>
</Card>

// With custom spacing
<Card className="mb-4">
  <DataTable value={data} />
</Card>

// Full PrimeReact Card mode
<Card usePrimeCard>
  <h3>Enhanced Features</h3>
</Card>
```

**When to use which:**
- Default mode: Simple content containers
- `usePrimeCard`: When you need header/footer/title slots

---

## FormField

**Use Cases**:
- Wrap any form input with label
- Accessible form field layout
- Consistent form styling

**Key Props**:
- `label` - Label text
- `htmlFor` - ID of the input (for accessibility)
- `children` - Form input component

**Import**:
```tsx
import { FormField } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<FormField label="Email Address" htmlFor="email">
  <InputText
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormField>

<FormField label="Country" htmlFor="country">
  <Dropdown
    id="country"
    options={countries}
    value={selectedCountry}
    onChange={(e) => setSelectedCountry(e.value)}
  />
</FormField>
```

**Accessibility**: Always match `htmlFor` with the input's `id` attribute.

---

## PageHeader

**Use Cases**:
- Page title at top of content
- Section header with consistent styling

**Key Props**:
- `title` - Header text

**Import**:
```tsx
import { PageHeader } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<PageHeader title="Dashboard" />
<PageHeader title="User Settings" />
```

---

## SectionTitle

**Use Cases**:
- Section heading within a page
- Smaller than PageHeader

**Key Props**:
- `title` - Section title text

**Import**:
```tsx
import { SectionTitle } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<SectionTitle title="Recent Activity" />
<DataTable value={recentItems} />
```

---

## TableShell

**Use Cases**:
- DataTable wrapper with standard layout
- Table with loading/empty states
- Consistent table container

**Key Props**:
- `children` - DataTable and columns
- `loading` - Loading state
- `emptyMessage` - Empty state message

**Import**:
```tsx
import { TableShell } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
<TableShell loading={isLoading} emptyMessage="No users found">
  <DataTable value={users}>
    <Column field="name" header="Name" />
    <Column field="email" header="Email" />
  </DataTable>
</TableShell>
```

---

## Icon

**Use Cases**:
- Display PrimeIcons or custom SVG icons
- Consistent icon sizing
- Theme-aware icon colors

**Key Props**:
- `name` - Icon name (PrimeIcon class or custom SVG name)
- `size` - 'small' | 'medium' | 'large' | 'xlarge'
- `className` - Additional classes

**Import**:
```tsx
import { Icon } from '@lifeonlars/prime-yggdrasil';
```

**Example**:
```tsx
// PrimeIcons (requires primeicons package)
<Icon name="pi pi-check" size="medium" />
<Icon name="pi pi-user" size="large" />

// Custom SVG icons (from public/icons/)
<Icon name="my-custom-icon" size="medium" />  // loads public/icons/my-custom-icon.svg
```

---

## Table Column Helpers

Yggdrasil provides typed column factory functions for common DataTable patterns.

**Import**:
```tsx
import {
  textColumn,
  statusColumn,
  actionsColumn,
  identityColumn,
  selectionColumn
} from '@lifeonlars/prime-yggdrasil';
```

### textColumn

Basic text column with optional sorting/filtering.

```tsx
textColumn<User>({
  field: 'email',
  header: 'Email',
  sortable: true,
  filter: true
})
```

### statusColumn

Status badge column with severity colors.

```tsx
statusColumn<Order>({
  field: 'status',
  header: 'Status',
  severityMap: {
    pending: 'warning',
    completed: 'success',
    cancelled: 'danger'
  }
})
```

### actionsColumn

Row actions column (edit, delete, etc.).

```tsx
actionsColumn<User>({
  onEdit: (user) => editUser(user),
  onDelete: (user) => deleteUser(user)
})
```

### identityColumn

User/entity column with avatar and name.

```tsx
identityColumn<User>({
  nameField: 'fullName',
  avatarField: 'avatarUrl',
  subtitleField: 'role'
})
```

### selectionColumn

Checkbox selection column.

```tsx
selectionColumn<User>({
  selectionMode: 'multiple'
})
```

---

## When to Use Yggdrasil Blocks vs PrimeReact

| Scenario | Use |
|----------|-----|
| Navigation with tabs + controls | `NavigationTabs` |
| Simple tab content switching | `TabView` (PrimeReact) |
| User account dropdown | `AccountMenu` |
| Generic popup menu | `Menu` (PrimeReact) |
| Form field with label | `FormField` |
| Just an input | `InputText` (PrimeReact) |
| Themed card | `Card` (Yggdrasil) |
| Card with header/footer | `Card` (PrimeReact) or `usePrimeCard` |

**Rule of thumb**: If a Yggdrasil block exists for your use case, use it - it has the correct tokens, spacing, and patterns built in.
