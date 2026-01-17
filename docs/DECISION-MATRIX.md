---
title: "Decision Matrix: Common UI Scenarios"
category: reference
tags: [decision-matrix, patterns, use-cases, primereact, components, scenarios]
audience: ai-agent
version: 0.7.0
lastUpdated: 2026-01-17
relatedDocs:
  - AI-AGENT-GUIDE.md
  - MASTER-TOKEN-REFERENCE.md
  - COMPONENT-INVENTORY.md
  - .ai/agents/block-composer.md
---

# Decision Matrix: Common UI Scenarios

**Purpose**: Quick reference for mapping UI requirements to PrimeReact components, semantic tokens, and implementation patterns. Use this to avoid reinventing existing solutions.

**For Agents**: Before implementing any UI, search this matrix for the scenario. Copy the pattern directly instead of creating custom components.

---

## Table of Contents

1. [Data Display (10 scenarios)](#data-display)
2. [Form Interactions (12 scenarios)](#form-interactions)
3. [Loading & Empty States (8 scenarios)](#loading-empty-states)
4. [Validation & Errors (10 scenarios)](#validation-errors)
5. [Modals & Overlays (6 scenarios)](#modals-overlays)
6. [Navigation (5 scenarios)](#navigation)
7. [Actions & Confirmations (8 scenarios)](#actions-confirmations)

**Total Scenarios**: 59

---

## Data Display

### Scenario 1: Show List of Items with Actions

**Use Case**: Display array of data with row-level actions (edit, delete, view)

**Pattern**: DataTable with action column

**Required States**: loading, empty, error, data

**Implementation**:
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

<DataTable
  value={items}
  loading={isLoading}
  emptyMessage="No items found"
>
  <Column field="name" header="Name" />
  <Column field="email" header="Email" />
  <Column
    header="Actions"
    body={(rowData) => (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    )}
  />
</DataTable>
```

**Tokens**:
- Background: `--surface-neutral-primary`
- Text: `--text-neutral-default`
- Border: `--border-neutral-subdued`
- Row hover: `--surface-state-hover`

**Storybook**: DataTable stories

---

### Scenario 2: Show Cards/Grid of Items

**Use Case**: Display items as cards in grid layout (products, users, projects)

**Pattern**: DataView with grid template

**Required States**: loading, empty, error, data

**Implementation**:
```tsx
import { DataView } from 'primereact/dataview';

const itemTemplate = (item) => (
  <div
    className="col-12 md:col-6 lg:col-4"
    style={{
      background: 'var(--surface-neutral-secondary)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem'
    }}
  >
    <h3 style={{ color: 'var(--text-neutral-loud)' }}>{item.name}</h3>
    <p style={{ color: 'var(--text-neutral-subdued)' }}>{item.description}</p>
  </div>
);

<DataView
  value={items}
  layout="grid"
  itemTemplate={itemTemplate}
  loading={isLoading}
  emptyMessage="No items found"
/>
```

**Tokens**:
- Card background: `--surface-neutral-secondary`
- Title: `--text-neutral-loud`
- Description: `--text-neutral-subdued`
- Border radius: `--radius-lg`

**Storybook**: DataView stories

---

### Scenario 3: Show Paginated Table

**Use Case**: Large dataset requiring pagination

**Pattern**: DataTable with built-in pagination

**Required States**: loading, empty, error, data, page change

**Implementation**:
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

<DataTable
  value={items}
  paginator
  rows={10}
  rowsPerPageOptions={[5, 10, 25, 50]}
  totalRecords={totalRecords}
  lazy
  first={first}
  onPage={(e) => {
    setFirst(e.first);
    setRows(e.rows);
  }}
  loading={isLoading}
>
  <Column field="name" header="Name" sortable />
  <Column field="date" header="Date" sortable />
</DataTable>
```

**Tokens**: Standard DataTable tokens

**Storybook**: DataTable pagination examples

---

### Scenario 4: Show Sortable/Filterable Table

**Use Case**: User needs to sort and filter table data

**Pattern**: DataTable with column filters

**Required States**: loading, filtered, sorted, empty

**Implementation**:
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

<DataTable
  value={items}
  sortMode="multiple"
  filterDisplay="row"
  loading={isLoading}
>
  <Column
    field="name"
    header="Name"
    sortable
    filter
    filterPlaceholder="Search by name"
  />
  <Column
    field="status"
    header="Status"
    sortable
    filter
    filterElement={statusFilterTemplate}
  />
</DataTable>
```

**Tokens**: Standard DataTable + input tokens

**Storybook**: DataTable filtering examples

---

### Scenario 5: Show Selectable Rows

**Use Case**: User needs to select multiple items for batch actions

**Pattern**: DataTable with selection

**Required States**: none selected, some selected, all selected

**Implementation**:
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

<DataTable
  value={items}
  selection={selectedItems}
  onSelectionChange={(e) => setSelectedItems(e.value)}
  dataKey="id"
>
  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
  <Column field="name" header="Name" />
</DataTable>

{selectedItems.length > 0 && (
  <div className="flex gap-2 p-3">
    <Button label={`Delete ${selectedItems.length} items`} severity="danger" />
  </div>
)}
```

**Tokens**:
- Selection background: `--surface-state-selected`
- Checkbox: PrimeReact default

**Storybook**: DataTable selection examples

---

### Scenario 6: Show Tree/Hierarchical Data

**Use Case**: Display nested/hierarchical data (folders, categories, org chart)

**Pattern**: TreeTable or Tree component

**Required States**: loading, expanded, collapsed, empty

**Implementation**:
```tsx
import { Tree } from 'primereact/tree';

<Tree
  value={treeData}
  loading={isLoading}
  selectionMode="single"
  selectionKeys={selectedKeys}
  onSelectionChange={(e) => setSelectedKeys(e.value)}
/>
```

**Tokens**: Standard tree tokens

**Storybook**: Tree stories

---

### Scenario 7: Show Timeline/Activity Feed

**Use Case**: Display chronological events (activity log, history)

**Pattern**: Timeline component

**Required States**: loading, empty, data

**Implementation**:
```tsx
import { Timeline } from 'primereact/timeline';

const events = [
  { status: 'Created', date: '2024-01-01', icon: 'pi pi-plus' },
  { status: 'Updated', date: '2024-01-05', icon: 'pi pi-pencil' }
];

<Timeline
  value={events}
  align="left"
  content={(item) => (
    <div>
      <h4 style={{ color: 'var(--text-neutral-loud)' }}>{item.status}</h4>
      <p style={{ color: 'var(--text-neutral-subdued)' }}>{item.date}</p>
    </div>
  )}
  marker={(item) => (
    <span
      style={{
        background: 'var(--surface-brand-primary)',
        color: 'var(--text-onsurface-onbrand)',
        borderRadius: 'var(--radius-full)',
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <i className={item.icon} />
    </span>
  )}
/>
```

**Tokens**:
- Marker background: `--surface-brand-primary`
- Marker text: `--text-onsurface-onbrand`
- Event title: `--text-neutral-loud`
- Event date: `--text-neutral-subdued`

**Storybook**: Timeline stories

---

### Scenario 8: Show Statistics/Metrics

**Use Case**: Display KPIs, numbers, metrics dashboard

**Pattern**: Custom cards with tokens (no specific PrimeReact component)

**Required States**: loading, data

**Implementation**:
```tsx
<div className="grid">
  <div className="col-12 md:col-6 lg:col-3">
    <div
      style={{
        background: 'var(--surface-neutral-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem'
      }}
    >
      <p style={{ color: 'var(--text-neutral-subdued)', marginBottom: '0.5rem' }}>
        Total Users
      </p>
      <h2 style={{ color: 'var(--text-neutral-loud)', fontSize: '2rem', margin: 0 }}>
        {isLoading ? <i className="pi pi-spin pi-spinner" /> : '1,234'}
      </h2>
    </div>
  </div>
</div>
```

**Tokens**:
- Card background: `--surface-neutral-secondary`
- Label: `--text-neutral-subdued`
- Value: `--text-neutral-loud`
- Border radius: `--radius-lg`

**Storybook**: Card stories or custom

---

### Scenario 9: Show Chart/Graph

**Use Case**: Visualize data (line chart, bar chart, pie chart)

**Pattern**: Chart component

**Required States**: loading, empty, data

**Implementation**:
```tsx
import { Chart } from 'primereact/chart';

<Chart
  type="line"
  data={chartData}
  options={chartOptions}
/>
```

**Tokens**: Chart colors use semantic tokens in config

**Storybook**: Chart stories

---

### Scenario 10: Show Progress/Status Bar

**Use Case**: Display completion percentage or progress

**Pattern**: ProgressBar component

**Required States**: indeterminate (loading), determinate (value)

**Implementation**:
```tsx
import { ProgressBar } from 'primereact/progressbar';

{/* Determinate */}
<ProgressBar value={uploadProgress} />

{/* Indeterminate */}
<ProgressBar mode="indeterminate" />
```

**Tokens**:
- Bar background: `--surface-brand-primary`
- Track background: `--surface-neutral-tertiary`

**Storybook**: ProgressBar stories

---

## Form Interactions

### Scenario 11: Simple Text Input Field

**Use Case**: Single text input with label and validation

**Pattern**: FormField block or InputText + label

**Required States**: default, focus, error, disabled

**Implementation**:
```tsx
import { FormField } from '@lifeonlars/prime-yggdrasil';

<FormField
  id="username"
  label="Username"
  value={username}
  onChange={setUsername}
  error={errors.username}
  required
/>
```

**Alternative (raw PrimeReact)**:
```tsx
import { InputText } from 'primereact/inputtext';

<div className="flex flex-column gap-2">
  <label htmlFor="username" style={{ color: 'var(--text-neutral-default)' }}>
    Username *
  </label>
  <InputText
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className={errors.username ? 'p-invalid' : ''}
    aria-describedby="username-error"
  />
  {errors.username && (
    <small id="username-error" style={{ color: 'var(--text-context-danger)' }}>
      {errors.username}
    </small>
  )}
</div>
```

**Tokens**:
- Label: `--text-neutral-default`
- Input background: `--surface-input-primary`
- Border: `--border-neutral-default`
- Border (focus): `--border-state-focus`
- Border (error): `--border-context-danger`
- Error text: `--text-context-danger`

**Storybook**: FormField stories

---

### Scenario 12: Dropdown/Select Field

**Use Case**: Select single option from list

**Pattern**: Dropdown component

**Required States**: default, open, selected, disabled, error

**Implementation**:
```tsx
import { Dropdown } from 'primereact/dropdown';

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' }
];

<Dropdown
  value={selectedCountry}
  options={countries}
  onChange={(e) => setSelectedCountry(e.value)}
  placeholder="Select a country"
  className={errors.country ? 'p-invalid' : ''}
/>
```

**Tokens**:
- Input background: `--surface-input-primary`
- Border: `--border-neutral-default`
- Dropdown background: `--surface-neutral-primary`
- Item hover: `--surface-state-hover`
- Item selected: `--surface-state-selected`

**Storybook**: Dropdown stories

---

### Scenario 13: Multi-Select Field

**Use Case**: Select multiple options from list

**Pattern**: MultiSelect component

**Required States**: default, open, some selected, all selected

**Implementation**:
```tsx
import { MultiSelect } from 'primereact/multiselect';

const skills = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Node.js', value: 'nodejs' }
];

<MultiSelect
  value={selectedSkills}
  options={skills}
  onChange={(e) => setSelectedSkills(e.value)}
  placeholder="Select skills"
  display="chip"
  maxSelectedLabels={3}
/>
```

**Tokens**: Same as Dropdown + chip tokens

**Storybook**: MultiSelect stories

---

### Scenario 14: Date Picker

**Use Case**: Select date or date range

**Pattern**: Calendar component

**Required States**: default, open, selected, range selected

**Implementation**:
```tsx
import { Calendar } from 'primereact/calendar';

{/* Single date */}
<Calendar
  value={date}
  onChange={(e) => setDate(e.value)}
  placeholder="Select date"
/>

{/* Date range */}
<Calendar
  value={dateRange}
  onChange={(e) => setDateRange(e.value)}
  selectionMode="range"
  placeholder="Select date range"
/>

{/* Date + Time */}
<Calendar
  value={datetime}
  onChange={(e) => setDatetime(e.value)}
  showTime
  hourFormat="12"
/>
```

**Tokens**: Standard input + calendar panel tokens

**Storybook**: Calendar stories

---

### Scenario 15: File Upload

**Use Case**: Upload single or multiple files

**Pattern**: FileUpload component

**Required States**: default, uploading, uploaded, error

**Implementation**:
```tsx
import { FileUpload } from 'primereact/fileupload';

<FileUpload
  name="file"
  url="/api/upload"
  accept="image/*"
  maxFileSize={1000000}
  onUpload={handleUpload}
  emptyTemplate={
    <p style={{ color: 'var(--text-neutral-subdued)' }}>
      Drag and drop files here to upload
    </p>
  }
/>
```

**Tokens**:
- Border: `--border-neutral-default`
- Drop zone background: `--surface-neutral-secondary`
- Progress bar: `--surface-brand-primary`

**Storybook**: FileUpload stories

---

### Scenario 16: Rich Text Editor

**Use Case**: Edit formatted text (bold, italic, lists)

**Pattern**: Editor component

**Required States**: default, focus, disabled

**Implementation**:
```tsx
import { Editor } from 'primereact/editor';

<Editor
  value={text}
  onTextChange={(e) => setText(e.htmlValue)}
  style={{ height: '320px' }}
/>
```

**Tokens**: Standard input tokens + toolbar

**Storybook**: Editor stories

---

### Scenario 17: Toggle/Checkbox

**Use Case**: Binary choice (on/off, yes/no)

**Pattern**: Checkbox or InputSwitch

**Required States**: unchecked, checked, disabled

**Implementation**:
```tsx
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';

{/* Checkbox */}
<div className="flex align-items-center gap-2">
  <Checkbox
    inputId="terms"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.checked)}
  />
  <label htmlFor="terms" style={{ color: 'var(--text-neutral-default)' }}>
    I agree to terms
  </label>
</div>

{/* Switch */}
<InputSwitch
  checked={enabled}
  onChange={(e) => setEnabled(e.value)}
/>
```

**Tokens**:
- Checked background: `--surface-brand-primary`
- Border: `--border-neutral-default`
- Label: `--text-neutral-default`

**Storybook**: Checkbox, InputSwitch stories

---

### Scenario 18: Radio Buttons

**Use Case**: Select one option from small set (2-5 options)

**Pattern**: RadioButton component

**Required States**: unchecked, checked, disabled

**Implementation**:
```tsx
import { RadioButton } from 'primereact/radiobutton';

const options = ['Option 1', 'Option 2', 'Option 3'];

<div className="flex flex-column gap-3">
  {options.map((option) => (
    <div key={option} className="flex align-items-center gap-2">
      <RadioButton
        inputId={option}
        value={option}
        checked={selectedOption === option}
        onChange={(e) => setSelectedOption(e.value)}
      />
      <label htmlFor={option} style={{ color: 'var(--text-neutral-default)' }}>
        {option}
      </label>
    </div>
  ))}
</div>
```

**Tokens**: Same as Checkbox

**Storybook**: RadioButton stories

---

### Scenario 19: Slider/Range Input

**Use Case**: Select numeric value from range

**Pattern**: Slider component

**Required States**: default, dragging, disabled

**Implementation**:
```tsx
import { Slider } from 'primereact/slider';

<Slider
  value={value}
  onChange={(e) => setValue(e.value)}
  min={0}
  max={100}
/>

{/* Range slider */}
<Slider
  value={rangeValues}
  onChange={(e) => setRangeValues(e.value)}
  range
  min={0}
  max={100}
/>
```

**Tokens**:
- Track: `--surface-neutral-tertiary`
- Fill: `--surface-brand-primary`
- Handle: `--surface-brand-primary`

**Storybook**: Slider stories

---

### Scenario 20: Color Picker

**Use Case**: Select color value

**Pattern**: ColorPicker component

**Required States**: default, open, selected

**Implementation**:
```tsx
import { ColorPicker } from 'primereact/colorpicker';

<ColorPicker
  value={color}
  onChange={(e) => setColor(e.value)}
/>
```

**Tokens**: Standard input tokens

**Storybook**: ColorPicker stories

---

### Scenario 21: Auto-complete Search

**Use Case**: Search with suggestions as user types

**Pattern**: AutoComplete component

**Required States**: default, searching, suggestions shown, selected

**Implementation**:
```tsx
import { AutoComplete } from 'primereact/autocomplete';

<AutoComplete
  value={selectedUser}
  suggestions={filteredUsers}
  completeMethod={searchUsers}
  onChange={(e) => setSelectedUser(e.value)}
  placeholder="Search users..."
  field="name"
/>
```

**Tokens**:
- Input: Standard input tokens
- Suggestions panel: `--surface-neutral-primary`
- Item hover: `--surface-state-hover`

**Storybook**: AutoComplete stories

---

### Scenario 22: Password Input with Toggle

**Use Case**: Password field with show/hide toggle

**Pattern**: Password component

**Required States**: hidden, visible, error

**Implementation**:
```tsx
import { Password } from 'primereact/password';

<Password
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  toggleMask
  feedback={false}
  placeholder="Enter password"
/>
```

**Tokens**: Standard input tokens

**Storybook**: Password stories

---

## Loading & Empty States

### Scenario 23: Page-Level Loading

**Use Case**: Show loading indicator while page loads

**Pattern**: ProgressSpinner centered

**Required States**: loading, loaded

**Implementation**:
```tsx
import { ProgressSpinner } from 'primereact/progressspinner';

{isLoading ? (
  <div
    className="flex align-items-center justify-content-center"
    style={{ minHeight: '400px' }}
  >
    <ProgressSpinner />
  </div>
) : (
  <YourContent />
)}
```

**Tokens**:
- Spinner: `--surface-brand-primary`

**Storybook**: ProgressSpinner stories

---

### Scenario 24: Inline Loading (Button)

**Use Case**: Show loading state on button during async action

**Pattern**: Button with loading prop

**Required States**: default, loading

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<Button
  label={isSubmitting ? 'Saving...' : 'Save Changes'}
  loading={isSubmitting}
  onClick={handleSubmit}
  disabled={isSubmitting}
/>
```

**Tokens**: Standard button tokens + spinner

**Storybook**: Button loading examples

---

### Scenario 25: Skeleton Loading (Content Placeholder)

**Use Case**: Show placeholder while content loads

**Pattern**: Skeleton component

**Required States**: loading, loaded

**Implementation**:
```tsx
import { Skeleton } from 'primereact/skeleton';

{isLoading ? (
  <div className="flex flex-column gap-2">
    <Skeleton width="100%" height="2rem" />
    <Skeleton width="80%" height="1.5rem" />
    <Skeleton width="60%" height="1.5rem" />
  </div>
) : (
  <YourContent />
)}
```

**Tokens**:
- Background: `--surface-neutral-tertiary`
- Animation: CSS shimmer

**Storybook**: Skeleton stories

---

### Scenario 26: Empty State (No Data)

**Use Case**: Show message when no data available

**Pattern**: Custom empty state with icon + message + action

**Required States**: empty

**Implementation**:
```tsx
<div className="flex flex-column align-items-center gap-3 p-6">
  <i
    className="pi pi-inbox"
    style={{
      fontSize: '4rem',
      color: 'var(--icon-neutral-subdued)'
    }}
  />
  <h3 style={{ color: 'var(--text-neutral-default)' }}>
    No projects yet
  </h3>
  <p style={{ color: 'var(--text-neutral-subdued)' }}>
    Create your first project to get started
  </p>
  <Button label="Create Project" onClick={handleCreate} />
</div>
```

**Tokens**:
- Icon: `--icon-neutral-subdued`
- Title: `--text-neutral-default`
- Description: `--text-neutral-subdued`

**Storybook**: Empty state examples

---

### Scenario 27: Loading Overlay (Blocking)

**Use Case**: Block UI during background operation

**Pattern**: BlockUI component

**Required States**: blocked, unblocked

**Implementation**:
```tsx
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

<BlockUI blocked={isProcessing}>
  <YourContent />
  {isProcessing && (
    <div className="flex align-items-center justify-content-center">
      <ProgressSpinner />
    </div>
  )}
</BlockUI>
```

**Tokens**:
- Overlay: `rgba(0, 0, 0, 0.4)`

**Storybook**: BlockUI stories

---

### Scenario 28: Progressive Disclosure (Load More)

**Use Case**: Load more items when scrolling or clicking

**Pattern**: Button + pagination or VirtualScroller

**Required States**: more available, loading more, all loaded

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<>
  <DataView value={items} itemTemplate={itemTemplate} />

  {hasMore && (
    <div className="flex justify-content-center p-3">
      <Button
        label={isLoadingMore ? 'Loading...' : 'Load More'}
        loading={isLoadingMore}
        onClick={loadMore}
        outlined
      />
    </div>
  )}
</>
```

**Tokens**: Standard button tokens

**Storybook**: Pagination examples

---

### Scenario 29: Lazy Loading Images

**Use Case**: Load images only when visible

**Pattern**: Image component with lazy loading

**Required States**: loading, loaded, error

**Implementation**:
```tsx
import { Image } from 'primereact/image';

<Image
  src={imageUrl}
  alt={imageAlt}
  loading="lazy"
  preview
/>
```

**Tokens**: N/A (native image)

**Storybook**: Image stories

---

### Scenario 30: Search Results Loading

**Use Case**: Show loading state during search

**Pattern**: InputText + ProgressSpinner + results

**Required States**: idle, searching, results, no results

**Implementation**:
```tsx
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';

<div className="flex flex-column gap-3">
  <span className="p-input-icon-left">
    <i className="pi pi-search" />
    <InputText
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  </span>

  {isSearching && <ProgressSpinner style={{ width: '20px', height: '20px' }} />}

  {results.length === 0 && !isSearching && query && (
    <p style={{ color: 'var(--text-neutral-subdued)' }}>
      No results found for "{query}"
    </p>
  )}

  {results.length > 0 && <ResultsList items={results} />}
</div>
```

**Tokens**: Standard input + text tokens

**Storybook**: Search examples

---

## Validation & Errors

### Scenario 31: Form Field Validation Error

**Use Case**: Show field-level error message

**Pattern**: Input + error message below

**Required States**: valid, invalid

**Implementation**:
```tsx
import { InputText } from 'primereact/inputtext';

<div className="flex flex-column gap-2">
  <label htmlFor="email" style={{ color: 'var(--text-neutral-default)' }}>
    Email
  </label>
  <InputText
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    onBlur={validateEmail}
    className={emailError ? 'p-invalid' : ''}
    aria-describedby="email-error"
  />
  {emailError && (
    <small id="email-error" style={{ color: 'var(--text-context-danger)' }}>
      {emailError}
    </small>
  )}
</div>
```

**Tokens**:
- Border (error): `--border-context-danger`
- Error text: `--text-context-danger`

**Storybook**: FormField validation examples

---

### Scenario 32: Form-Level Error Banner

**Use Case**: Show general form error at top

**Pattern**: Message component

**Required States**: error, dismissed

**Implementation**:
```tsx
import { Message } from 'primereact/message';

{formError && (
  <Message
    severity="error"
    text={formError}
    onClose={() => setFormError(null)}
    closable
  />
)}
```

**Tokens**:
- Background: `--surface-context-danger`
- Text: `--text-onsurface-oncontext`
- Border: `--border-context-danger`

**Storybook**: Message stories

---

### Scenario 33: Success Toast Notification

**Use Case**: Show success feedback after action

**Pattern**: Toast component

**Required States**: shown, hidden

**Implementation**:
```tsx
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const toast = useRef(null);

const showSuccess = () => {
  toast.current.show({
    severity: 'success',
    summary: 'Settings Saved',
    detail: 'Your changes have been saved successfully',
    life: 3000
  });
};

<>
  <Toast ref={toast} />
  <Button label="Save" onClick={handleSaveAndShowToast} />
</>
```

**Tokens**:
- Background: `--surface-context-success`
- Text: `--text-onsurface-oncontext`
- Icon: `--icon-context-success`

**Storybook**: Toast stories

---

### Scenario 34: Error Toast Notification

**Use Case**: Show error feedback after failed action

**Pattern**: Toast component with error severity

**Required States**: shown, hidden

**Implementation**:
```tsx
toast.current.show({
  severity: 'error',
  summary: 'Error',
  detail: 'Failed to save changes. Please try again.',
  life: 5000
});
```

**Tokens**:
- Background: `--surface-context-danger`
- Text: `--text-onsurface-oncontext`
- Icon: `--icon-context-danger`

**Storybook**: Toast error examples

---

### Scenario 35: Warning Message

**Use Case**: Show warning to user before action

**Pattern**: Message component with warning severity

**Required States**: shown, dismissed

**Implementation**:
```tsx
import { Message } from 'primereact/message';

<Message
  severity="warn"
  text="Your session will expire in 5 minutes. Save your work."
/>
```

**Tokens**:
- Background: `--surface-context-warning`
- Text: `--text-onsurface-oncontext`
- Border: `--border-context-warning`

**Storybook**: Message warning examples

---

### Scenario 36: Info Message

**Use Case**: Show informational message

**Pattern**: Message component with info severity

**Required States**: shown, dismissed

**Implementation**:
```tsx
import { Message } from 'primereact/message';

<Message
  severity="info"
  text="Maintenance scheduled for tonight at 11 PM EST."
  closable
  onClose={() => dismissInfo()}
/>
```

**Tokens**:
- Background: `--surface-context-info`
- Text: `--text-onsurface-oncontext`
- Border: `--border-context-info`

**Storybook**: Message info examples

---

### Scenario 37: Inline Validation (Real-time)

**Use Case**: Validate as user types (username availability)

**Pattern**: InputText + debounced validation + icon indicator

**Required States**: unchecked, checking, valid, invalid

**Implementation**:
```tsx
import { InputText } from 'primereact/inputtext';

<span className="p-input-icon-right">
  {isChecking && <i className="pi pi-spin pi-spinner" />}
  {!isChecking && isAvailable && <i className="pi pi-check" style={{ color: 'var(--icon-context-success)' }} />}
  {!isChecking && !isAvailable && username && <i className="pi pi-times" style={{ color: 'var(--icon-context-danger)' }} />}

  <InputText
    value={username}
    onChange={(e) => checkAvailability(e.target.value)}
    placeholder="Enter username"
    className={!isAvailable && username ? 'p-invalid' : ''}
  />
</span>
```

**Tokens**:
- Success icon: `--icon-context-success`
- Error icon: `--icon-context-danger`

**Storybook**: Validation examples

---

### Scenario 38: Required Field Indicator

**Use Case**: Show which fields are required

**Pattern**: Label with asterisk

**Required States**: N/A (static)

**Implementation**:
```tsx
<label htmlFor="email" style={{ color: 'var(--text-neutral-default)' }}>
  Email <span style={{ color: 'var(--text-context-danger)' }}>*</span>
</label>
```

**Tokens**:
- Label: `--text-neutral-default`
- Asterisk: `--text-context-danger`

**Storybook**: Form examples

---

### Scenario 39: Password Strength Indicator

**Use Case**: Show password strength as user types

**Pattern**: Password component with strength meter

**Required States**: weak, medium, strong

**Implementation**:
```tsx
import { Password } from 'primereact/password';

<Password
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  toggleMask
  promptLabel="Enter password"
  weakLabel="Weak"
  mediumLabel="Medium"
  strongLabel="Strong"
/>
```

**Tokens**: Component-managed colors

**Storybook**: Password strength examples

---

### Scenario 40: Multi-Field Validation

**Use Case**: Validate multiple fields together (password confirmation)

**Pattern**: Form validation with cross-field logic

**Required States**: valid, invalid

**Implementation**:
```tsx
const validatePasswords = () => {
  if (password !== confirmPassword) {
    setErrors({ confirmPassword: 'Passwords do not match' });
    return false;
  }
  return true;
};

<div className="flex flex-column gap-3">
  <div className="flex flex-column gap-2">
    <label htmlFor="password">Password</label>
    <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  </div>

  <div className="flex flex-column gap-2">
    <label htmlFor="confirm">Confirm Password</label>
    <Password
      id="confirm"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      onBlur={validatePasswords}
      className={errors.confirmPassword ? 'p-invalid' : ''}
      feedback={false}
    />
    {errors.confirmPassword && (
      <small style={{ color: 'var(--text-context-danger)' }}>
        {errors.confirmPassword}
      </small>
    )}
  </div>
</div>
```

**Tokens**: Standard validation tokens

**Storybook**: Form validation examples

---

## Modals & Overlays

### Scenario 41: Confirmation Dialog

**Use Case**: Confirm destructive action before proceeding

**Pattern**: ConfirmDialog component

**Required States**: hidden, shown, confirmed, rejected

**Implementation**:
```tsx
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const confirmDelete = () => {
  confirmDialog({
    message: 'Delete this project? This action cannot be undone.',
    header: 'Delete Project',
    icon: 'pi pi-exclamation-triangle',
    accept: handleDelete,
    reject: () => {},
    acceptLabel: 'Delete Project',
    rejectLabel: 'Cancel',
    acceptClassName: 'p-button-danger'
  });
};

<>
  <ConfirmDialog />
  <Button label="Delete" severity="danger" onClick={confirmDelete} />
</>
```

**Tokens**:
- Dialog background: `--surface-neutral-primary`
- Header: `--text-neutral-loud`
- Message: `--text-neutral-default`
- Accept button (danger): `--surface-context-danger`

**Storybook**: ConfirmDialog stories

---

### Scenario 42: Modal Form Dialog

**Use Case**: Edit item in modal dialog

**Pattern**: Dialog component with form

**Required States**: hidden, shown, submitting, submitted

**Implementation**:
```tsx
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

<Dialog
  visible={visible}
  onHide={() => setVisible(false)}
  header="Edit User"
  style={{ width: '450px' }}
  footer={
    <div className="flex justify-content-end gap-2">
      <Button label="Cancel" outlined onClick={() => setVisible(false)} />
      <Button label="Save" onClick={handleSave} loading={isSaving} />
    </div>
  }
>
  <div className="flex flex-column gap-3">
    <div className="flex flex-column gap-2">
      <label htmlFor="name">Name</label>
      <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  </div>
</Dialog>
```

**Tokens**:
- Dialog background: `--surface-neutral-primary`
- Shadow: `--elevation-elevated`

**Storybook**: Dialog stories

---

### Scenario 43: Sidebar/Drawer

**Use Case**: Show side panel for navigation or details

**Pattern**: Sidebar component

**Required States**: hidden, shown

**Implementation**:
```tsx
import { Sidebar } from 'primereact/sidebar';

<Sidebar
  visible={visible}
  onHide={() => setVisible(false)}
  position="right"
  style={{ width: '350px' }}
>
  <h2>User Details</h2>
  <p>Details content here...</p>
</Sidebar>
```

**Tokens**:
- Background: `--surface-neutral-primary`
- Shadow: `--elevation-high`

**Storybook**: Sidebar stories

---

### Scenario 44: Tooltip on Hover

**Use Case**: Show additional info on hover

**Pattern**: Tooltip component

**Required States**: hidden, shown

**Implementation**:
```tsx
import { Tooltip } from 'primereact/tooltip';

<>
  <Tooltip target=".custom-tooltip" />
  <Button
    className="custom-tooltip"
    data-pr-tooltip="Click to save changes"
    data-pr-position="top"
    label="Save"
  />
</>
```

**Tokens**:
- Background: `--surface-neutral-tertiary`
- Text: `--text-neutral-default`
- Shadow: `--elevation-subtle`

**Storybook**: Tooltip stories

---

### Scenario 45: Context Menu (Right-Click)

**Use Case**: Show menu on right-click

**Pattern**: ContextMenu component

**Required States**: hidden, shown

**Implementation**:
```tsx
import { ContextMenu } from 'primereact/contextmenu';

const menuItems = [
  { label: 'Edit', icon: 'pi pi-pencil', command: handleEdit },
  { label: 'Delete', icon: 'pi pi-trash', command: handleDelete }
];

<>
  <ContextMenu model={menuItems} ref={cm} />
  <div onContextMenu={(e) => cm.current.show(e)}>
    Right-click me
  </div>
</>
```

**Tokens**:
- Menu background: `--surface-neutral-primary`
- Item hover: `--surface-state-hover`

**Storybook**: ContextMenu stories

---

### Scenario 46: Popover/Overlay Panel

**Use Case**: Show additional content in overlay (not full dialog)

**Pattern**: OverlayPanel component

**Required States**: hidden, shown

**Implementation**:
```tsx
import { OverlayPanel } from 'primereact/overlaypanel';

<>
  <Button label="Show Info" onClick={(e) => op.current.toggle(e)} />
  <OverlayPanel ref={op}>
    <div className="flex flex-column gap-2">
      <h4>Additional Information</h4>
      <p>Content here...</p>
    </div>
  </OverlayPanel>
</>
```

**Tokens**:
- Background: `--surface-neutral-primary`
- Shadow: `--elevation-moderate`

**Storybook**: OverlayPanel stories

---

## Navigation

### Scenario 47: Top Navigation Bar

**Use Case**: Main application navigation

**Pattern**: Menubar component

**Required States**: default, item active, dropdown open

**Implementation**:
```tsx
import { Menubar } from 'primereact/menubar';

const items = [
  { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
  { label: 'Dashboard', icon: 'pi pi-chart-bar', command: () => navigate('/dashboard') },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    items: [
      { label: 'Profile', command: () => navigate('/profile') },
      { label: 'Logout', command: handleLogout }
    ]
  }
];

<Menubar model={items} />
```

**Tokens**:
- Background: `--surface-neutral-primary`
- Text: `--text-neutral-default`
- Active item: `--surface-state-selected`

**Storybook**: Menubar stories

---

### Scenario 48: Sidebar Navigation

**Use Case**: Vertical navigation menu

**Pattern**: Menu component

**Required States**: default, item active, nested open

**Implementation**:
```tsx
import { Menu } from 'primereact/menu';

const items = [
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Users', icon: 'pi pi-users' },
  { label: 'Settings', icon: 'pi pi-cog' }
];

<Menu model={items} style={{ width: '250px' }} />
```

**Tokens**:
- Background: `--surface-neutral-secondary`
- Item hover: `--surface-state-hover`
- Active item: `--surface-state-selected`

**Storybook**: Menu stories

---

### Scenario 49: Breadcrumb Navigation

**Use Case**: Show current location in hierarchy

**Pattern**: BreadCrumb component

**Required States**: N/A (static)

**Implementation**:
```tsx
import { BreadCrumb } from 'primereact/breadcrumb';

const items = [
  { label: 'Projects' },
  { label: 'My Project' },
  { label: 'Settings' }
];

const home = { icon: 'pi pi-home', url: '/' };

<BreadCrumb model={items} home={home} />
```

**Tokens**:
- Text: `--text-neutral-subdued`
- Active: `--text-neutral-default`
- Separator: `--text-neutral-subdued`

**Storybook**: BreadCrumb stories

---

### Scenario 50: Tabs Navigation

**Use Case**: Switch between views in same context

**Pattern**: TabView component or NavigationTabs block

**Required States**: default, active tab

**Implementation**:
```tsx
import { NavigationTabs } from '@lifeonlars/prime-yggdrasil';

const tabs = [
  { label: 'Overview', icon: 'pi pi-chart-bar' },
  { label: 'Settings', icon: 'pi pi-cog' },
  { label: 'Users', icon: 'pi pi-users' }
];

<NavigationTabs
  items={tabs}
  activeIndex={activeTab}
  onTabChange={setActiveTab}
/>
```

**Alternative (PrimeReact)**:
```tsx
import { TabView, TabPanel } from 'primereact/tabview';

<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
  <TabPanel header="Overview">Content 1</TabPanel>
  <TabPanel header="Settings">Content 2</TabPanel>
</TabView>
```

**Tokens**:
- Active tab: `--surface-state-selected`
- Border: `--border-state-selected`

**Storybook**: NavigationTabs or TabView stories

---

### Scenario 51: Pagination Controls

**Use Case**: Navigate through pages of data

**Pattern**: Paginator component

**Required States**: first page, middle page, last page

**Implementation**:
```tsx
import { Paginator } from 'primereact/paginator';

<Paginator
  first={first}
  rows={rows}
  totalRecords={totalRecords}
  onPageChange={(e) => {
    setFirst(e.first);
    setRows(e.rows);
  }}
  rowsPerPageOptions={[10, 20, 50]}
/>
```

**Tokens**:
- Button: Standard button tokens
- Active page: `--surface-brand-primary`

**Storybook**: Paginator stories

---

## Actions & Confirmations

### Scenario 52: Primary Action Button

**Use Case**: Main call-to-action

**Pattern**: Button component (default variant)

**Required States**: default, hover, active, loading, disabled

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<Button
  label="Save Changes"
  onClick={handleSave}
  loading={isSaving}
  disabled={!isValid || isSaving}
/>
```

**Tokens**:
- Background: `--surface-brand-primary`
- Text: `--text-onsurface-onbrand`
- Hover: `--surface-brand-secondary`

**Storybook**: Button stories

---

### Scenario 53: Secondary Action Button

**Use Case**: Less prominent action

**Pattern**: Button with outlined variant

**Required States**: default, hover, active, disabled

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<Button
  label="Cancel"
  outlined
  onClick={handleCancel}
/>
```

**Tokens**:
- Border: `--border-neutral-default`
- Text: `--text-neutral-default`
- Hover background: `--surface-state-hover`

**Storybook**: Button outlined examples

---

### Scenario 54: Destructive Action Button

**Use Case**: Delete, remove, or other destructive action

**Pattern**: Button with danger severity

**Required States**: default, hover, loading, confirming

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<Button
  label="Delete Project"
  severity="danger"
  onClick={confirmDelete}
/>
```

**Tokens**:
- Background: `--surface-context-danger`
- Text: `--text-onsurface-oncontext`
- Hover: `--surface-context-dangeractive`

**Storybook**: Button danger examples

---

### Scenario 55: Icon-Only Action Button

**Use Case**: Toolbar actions, compact actions

**Pattern**: Button with rounded and icon-only

**Required States**: default, hover, active

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<div className="flex gap-2">
  <Button icon="pi pi-pencil" rounded text tooltip="Edit" />
  <Button icon="pi pi-trash" rounded text severity="danger" tooltip="Delete" />
  <Button icon="pi pi-download" rounded text tooltip="Download" />
</div>
```

**Tokens**:
- Icon: `--icon-neutral-default`
- Hover background: `--surface-state-hover`

**Storybook**: Button icon examples

---

### Scenario 56: Split Button (Primary + Dropdown)

**Use Case**: Main action + alternative actions

**Pattern**: SplitButton component

**Required States**: default, dropdown open, action clicked

**Implementation**:
```tsx
import { SplitButton } from 'primereact/splitbutton';

const items = [
  { label: 'Save as Draft', command: saveDraft },
  { label: 'Save as Template', command: saveTemplate }
];

<SplitButton
  label="Save"
  onClick={handleSave}
  model={items}
/>
```

**Tokens**: Standard button + dropdown tokens

**Storybook**: SplitButton stories

---

### Scenario 57: Button Group

**Use Case**: Related actions grouped together

**Pattern**: Multiple buttons with flex gap

**Required States**: default, one selected (if toggle group)

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<div className="flex gap-2">
  <Button label="Save" onClick={handleSave} />
  <Button label="Save and Close" onClick={handleSaveAndClose} />
  <Button label="Cancel" outlined onClick={handleCancel} />
</div>
```

**Tokens**: Standard button tokens

**Storybook**: Button group examples

---

### Scenario 58: Floating Action Button

**Use Case**: Persistent primary action (mobile-style FAB)

**Pattern**: Button with fixed positioning

**Required States**: default, hover, active

**Implementation**:
```tsx
import { Button } from 'primereact/button';

<Button
  icon="pi pi-plus"
  rounded
  size="large"
  style={{
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '56px',
    height: '56px',
    background: 'var(--surface-brand-primary)',
    color: 'var(--text-onsurface-onbrand)',
    boxShadow: 'var(--elevation-elevated)'
  }}
  onClick={handleCreate}
/>
```

**Tokens**:
- Background: `--surface-brand-primary`
- Text: `--text-onsurface-onbrand`
- Shadow: `--elevation-elevated`

**Storybook**: FAB examples

---

### Scenario 59: Batch Actions Toolbar

**Use Case**: Actions for multiple selected items

**Pattern**: Conditional toolbar with action buttons

**Required States**: hidden (no selection), shown (items selected)

**Implementation**:
```tsx
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

{selectedItems.length > 0 && (
  <Toolbar
    left={
      <span style={{ color: 'var(--text-neutral-default)' }}>
        {selectedItems.length} items selected
      </span>
    }
    right={
      <div className="flex gap-2">
        <Button label="Export" icon="pi pi-download" onClick={handleExport} />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={handleBatchDelete}
        />
      </div>
    }
  />
)}
```

**Tokens**:
- Toolbar background: `--surface-neutral-secondary`
- Text: `--text-neutral-default`

**Storybook**: Toolbar stories

---

## Usage Instructions

### How to Use This Matrix

1. **Identify your scenario** - Search the table of contents or scan scenario titles
2. **Copy the implementation** - Use the code example as a starting point
3. **Apply semantic tokens** - Ensure all tokens match the documented values
4. **Handle all states** - Implement every required state listed
5. **Reference Storybook** - Check the linked story for interactive examples

### When to Create Custom Components

Only create custom components when:
- ❌ PrimeReact doesn't have equivalent functionality (rare)
- ❌ The scenario isn't covered in this matrix
- ✅ You're creating a **composition** of existing components (Block pattern)

### Reporting Missing Scenarios

If you encounter a common UI scenario not covered here, propose it for addition to this matrix.

---

**Last Updated**: 2026-01-17
**Version**: 0.7.0
**Total Scenarios**: 59

For component-specific documentation, see [COMPONENT-INVENTORY.md](./COMPONENT-INVENTORY.md).
For anti-patterns to avoid, see [ANTI-PATTERNS.md](./ANTI-PATTERNS.md).
