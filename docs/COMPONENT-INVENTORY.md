---
title: "Component Inventory: Use Case Mapping"
category: reference
tags: [components, primereact, inventory, use-cases, catalog, component-library]
audience: ai-agent
version: 0.7.0
lastUpdated: 2026-01-17
relatedDocs:
  - AI-AGENT-GUIDE.md
  - DECISION-MATRIX.md
  - .ai/agents/block-composer.md
---

# Component Inventory: Use Case Mapping

**Purpose**: Searchable catalog mapping UI requirements to PrimeReact components. Use this to discover which component solves your need instead of creating custom components.

**For Agents**: Before implementing any UI, search this inventory by use case or component name.

---

## Quick Search Table

| I need to... | Use Component | Category | Import |
|-------------|---------------|----------|--------|
| Display tabular data | DataTable | Data | `primereact/datatable` |
| Show list with actions | DataView | Data | `primereact/dataview` |
| Display tree/hierarchy | Tree, TreeTable | Data | `primereact/tree` |
| Show timeline/activity | Timeline | Data | `primereact/timeline` |
| Display chart/graph | Chart | Data | `primereact/chart` |
| Show single record | Card | Panel | `primereact/card` |
| Edit user profile | Form components | Form | Multiple |
| Upload file | FileUpload | File | `primereact/fileupload` |
| Select date/time | Calendar | Form | `primereact/calendar` |
| Choose from dropdown | Dropdown | Form | `primereact/dropdown` |
| Multi-select items | MultiSelect | Form | `primereact/multiselect` |
| Text input | InputText | Form | `primereact/inputtext` |
| Password input | Password | Form | `primereact/password` |
| Number input | InputNumber | Form | `primereact/inputnumber` |
| Rich text editor | Editor | Form | `primereact/editor` |
| Toggle switch | InputSwitch | Form | `primereact/inputswitch` |
| Checkbox | Checkbox | Form | `primereact/checkbox` |
| Radio button | RadioButton | Form | `primereact/radiobutton` |
| Color picker | ColorPicker | Form | `primereact/colorpicker` |
| Rating stars | Rating | Form | `primereact/rating` |
| Slider | Slider | Form | `primereact/slider` |
| Auto-complete search | AutoComplete | Form | `primereact/autocomplete` |
| Confirm destructive action | ConfirmDialog | Overlay | `primereact/confirmdialog` |
| Show modal/dialog | Dialog | Overlay | `primereact/dialog` |
| Display sidebar | Sidebar | Overlay | `primereact/sidebar` |
| Show tooltip | Tooltip | Overlay | `primereact/tooltip` |
| Context menu | ContextMenu | Menu | `primereact/contextmenu` |
| Popover/flyout | OverlayPanel | Overlay | `primereact/overlaypanel` |
| Top navigation | Menubar | Menu | `primereact/menubar` |
| Side navigation | Menu, PanelMenu | Menu | `primereact/menu` |
| Breadcrumb | BreadCrumb | Menu | `primereact/breadcrumb` |
| Tabs | TabView, NavigationTabs | Panel | `primereact/tabview` |
| Accordion | Accordion | Panel | `primereact/accordion` |
| Pagination | Paginator | Misc | `primereact/paginator` |
| Success message | Toast, Message | Messages | `primereact/toast` |
| Error message | Toast, Message | Messages | `primereact/toast` |
| Loading spinner | ProgressSpinner | Misc | `primereact/progressspinner` |
| Progress bar | ProgressBar | Misc | `primereact/progressbar` |
| Badge/tag | Badge, Tag | Misc | `primereact/badge` |
| Avatar | Avatar | Misc | `primereact/avatar` |
| Primary action | Button | Button | `primereact/button` |
| Icon button | Button | Button | `primereact/button` |
| Button group | Multiple Buttons | Button | `primereact/button` |
| Split button | SplitButton | Button | `primereact/splitbutton` |
| Speed dial | SpeedDial | Button | `primereact/speeddial` |
| Skeleton loading | Skeleton | Misc | `primereact/skeleton` |
| Block UI | BlockUI | Misc | `primereact/blockui` |
| Scroll panel | ScrollPanel | Panel | `primereact/scrollpanel` |
| Divider | Divider | Misc | `primereact/divider` |
| Chip/tag | Chip | Misc | `primereact/chip` |
| Image display | Image | Media | `primereact/image` |
| Carousel | Carousel | Media | `primereact/carousel` |
| Galleria | Galleria | Media | `primereact/galleria` |
| Virtual scroller | VirtualScroller | Data | `primereact/virtualscroller` |
| Steps/wizard | Steps | Panel | `primereact/steps` |
| Toolbar | Toolbar | Misc | `primereact/toolbar` |
| Splitter | Splitter | Panel | `primereact/splitter` |
| Terminal | Terminal | Misc | `primereact/terminal` |
| Organize layout | Fieldset | Panel | `primereact/fieldset` |

**Total Components**: 70+

---

## Table of Contents

1. [Data Components](#data-components)
2. [Form Components](#form-components)
3. [Button Components](#button-components)
4. [Panel Components](#panel-components)
5. [Overlay Components](#overlay-components)
6. [Menu Components](#menu-components)
7. [Messages Components](#messages-components)
8. [Media Components](#media-components)
9. [Misc Components](#misc-components)
10. [File Components](#file-components)
11. [Chart Components](#chart-components)

---

## Data Components

Components for displaying and manipulating structured data.

### DataTable

**Use Cases**:
- Display array of records in table format
- Sortable/filterable data grid
- Paginated data display
- Row selection for batch actions
- Inline editing
- Expandable rows
- Frozen columns

**Key Props**:
- `value` - Array of data objects
- `loading` - Boolean for loading state
- `paginator` - Enable pagination
- `sortMode` - Single or multiple column sorting
- `selection` - Selected rows (single/multiple)
- `filterDisplay` - Row or menu filtering
- `emptyMessage` - Text when no data

**States to Handle**: loading, empty, error, data, filtered, sorted

**Example**:
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

<DataTable
  value={users}
  loading={isLoading}
  paginator
  rows={10}
  selection={selectedUsers}
  onSelectionChange={(e) => setSelectedUsers(e.value)}
  emptyMessage="No users found"
>
  <Column selectionMode="multiple" />
  <Column field="name" header="Name" sortable filter />
  <Column field="email" header="Email" sortable filter />
  <Column field="role" header="Role" />
</DataTable>
```

**Storybook**: DataTable stories
**PrimeReact Docs**: https://primereact.org/datatable/

---

### DataView

**Use Cases**:
- Display items as cards/grid
- List view with custom templates
- Product catalogs
- User directories
- Project galleries

**Key Props**:
- `value` - Array of data
- `layout` - 'list' or 'grid'
- `itemTemplate` - Custom render function
- `paginator` - Enable pagination
- `emptyMessage` - No data message

**States to Handle**: loading, empty, data

**Example**:
```tsx
import { DataView } from 'primereact/dataview';

const itemTemplate = (item) => (
  <div className="col-12 md:col-4">
    <div style={{
      background: 'var(--surface-neutral-secondary)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem'
    }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  </div>
);

<DataView
  value={products}
  layout="grid"
  itemTemplate={itemTemplate}
  loading={isLoading}
/>
```

**Storybook**: DataView stories
**PrimeReact Docs**: https://primereact.org/dataview/

---

### Tree

**Use Cases**:
- Display hierarchical data (folders, categories)
- File/folder structure
- Organization chart
- Nested navigation
- Taxonomy browser

**Key Props**:
- `value` - TreeNode array with children
- `selectionMode` - Single, multiple, checkbox
- `selectionKeys` - Selected node keys
- `expandedKeys` - Expanded node keys
- `loading` - Loading state

**States to Handle**: loading, empty, data, expanded, collapsed

**Example**:
```tsx
import { Tree } from 'primereact/tree';

const nodes = [
  {
    key: '0',
    label: 'Documents',
    icon: 'pi pi-folder',
    children: [
      { key: '0-0', label: 'Work', icon: 'pi pi-folder' },
      { key: '0-1', label: 'Personal', icon: 'pi pi-folder' }
    ]
  }
];

<Tree
  value={nodes}
  selectionMode="single"
  selectionKeys={selectedKey}
  onSelectionChange={(e) => setSelectedKey(e.value)}
/>
```

**Storybook**: Tree stories
**PrimeReact Docs**: https://primereact.org/tree/

---

### TreeTable

**Use Cases**:
- Hierarchical data in table format
- Budget breakdown
- Bill of materials
- Nested tasks/subtasks

**Key Props**:
- `value` - TreeNode array
- `expandedKeys` - Expanded rows
- `selectionMode` - Row selection
- Same Column props as DataTable

**States to Handle**: loading, empty, data, expanded

**Example**:
```tsx
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

<TreeTable value={nodes} expandedKeys={expandedKeys}>
  <Column field="name" header="Name" expander />
  <Column field="size" header="Size" />
  <Column field="type" header="Type" />
</TreeTable>
```

**Storybook**: TreeTable stories
**PrimeReact Docs**: https://primereact.org/treetable/

---

### Timeline

**Use Cases**:
- Activity feed
- Event history
- Order tracking
- Project milestones
- Changelog

**Key Props**:
- `value` - Array of events
- `align` - 'left', 'right', 'alternate'
- `layout` - 'vertical' or 'horizontal'
- `marker` - Custom marker template
- `content` - Event content template

**States to Handle**: loading, empty, data

**Example**:
```tsx
import { Timeline } from 'primereact/timeline';

const events = [
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart' }
];

<Timeline value={events} content={(item) => item.status} />
```

**Storybook**: Timeline stories
**PrimeReact Docs**: https://primereact.org/timeline/

---

### VirtualScroller

**Use Cases**:
- Large datasets (1000+ items)
- Infinite scroll
- Performance optimization for long lists

**Key Props**:
- `items` - Array of data
- `itemSize` - Height of each item (px)
- `itemTemplate` - Render function
- `lazy` - Load items on demand

**States to Handle**: loading, data, loading more

**Example**:
```tsx
import { VirtualScroller } from 'primereact/virtualscroller';

<VirtualScroller
  items={items}
  itemSize={50}
  itemTemplate={(item) => <div>{item.name}</div>}
  style={{ height: '400px' }}
/>
```

**Storybook**: VirtualScroller stories
**PrimeReact Docs**: https://primereact.org/virtualscroller/

---

### OrderList

**Use Cases**:
- Reorder list items
- Priority management
- Playlist editor

**Key Props**:
- `value` - Array of items
- `onChange` - Reorder callback
- `itemTemplate` - Custom render
- `dragdrop` - Enable drag & drop

**States to Handle**: default, dragging, reordered

**Example**:
```tsx
import { OrderList } from 'primereact/orderlist';

<OrderList
  value={items}
  onChange={(e) => setItems(e.value)}
  itemTemplate={(item) => <div>{item.name}</div>}
  dragdrop
/>
```

**Storybook**: OrderList stories
**PrimeReact Docs**: https://primereact.org/orderlist/

---

### PickList

**Use Cases**:
- Move items between two lists
- Available vs Selected
- Transfer list

**Key Props**:
- `source` - Available items
- `target` - Selected items
- `onChange` - Transfer callback
- `itemTemplate` - Render function

**States to Handle**: default, items transferred

**Example**:
```tsx
import { PickList } from 'primereact/picklist';

<PickList
  source={available}
  target={selected}
  onChange={(e) => {
    setAvailable(e.source);
    setSelected(e.target);
  }}
  itemTemplate={(item) => <div>{item.name}</div>}
/>
```

**Storybook**: PickList stories
**PrimeReact Docs**: https://primereact.org/picklist/

---

## Form Components

Components for user input and data entry.

### InputText

**Use Cases**:
- Single-line text input
- Username, email, search
- Any text field

**Key Props**:
- `value` - Input value
- `onChange` - Change handler
- `placeholder` - Placeholder text
- `disabled` - Disabled state
- `className` - Add 'p-invalid' for errors

**States to Handle**: default, focus, error, disabled

**Example**:
```tsx
import { InputText } from 'primereact/inputtext';

<InputText
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Enter username"
  className={errors.username ? 'p-invalid' : ''}
/>
```

**Storybook**: InputText stories
**PrimeReact Docs**: https://primereact.org/inputtext/

---

### InputTextarea

**Use Cases**:
- Multi-line text input
- Comments, descriptions, notes

**Key Props**:
- `value`, `onChange`
- `rows` - Number of visible rows
- `autoResize` - Auto-expand height

**States to Handle**: default, focus, error, disabled

**Example**:
```tsx
import { InputTextarea } from 'primereact/inputtextarea';

<InputTextarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={5}
  autoResize
/>
```

**Storybook**: InputTextarea stories
**PrimeReact Docs**: https://primereact.org/inputtextarea/

---

### InputNumber

**Use Cases**:
- Numeric input
- Quantity, price, age
- Currency input

**Key Props**:
- `value`, `onValueChange`
- `min`, `max` - Range limits
- `mode` - 'decimal' or 'currency'
- `currency` - Currency code (e.g., 'USD')
- `locale` - Locale for formatting

**States to Handle**: default, focus, error, disabled

**Example**:
```tsx
import { InputNumber } from 'primereact/inputnumber';

<InputNumber
  value={price}
  onValueChange={(e) => setPrice(e.value)}
  mode="currency"
  currency="USD"
  locale="en-US"
/>
```

**Storybook**: InputNumber stories
**PrimeReact Docs**: https://primereact.org/inputnumber/

---

### Dropdown

**Use Cases**:
- Select single option from list
- Country selector, status picker
- Any single-select field

**Key Props**:
- `value` - Selected value
- `options` - Array of { label, value }
- `onChange` - Selection handler
- `placeholder` - Placeholder text
- `filter` - Enable search
- `showClear` - Show clear button

**States to Handle**: default, open, selected, disabled, error

**Example**:
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
  filter
/>
```

**Storybook**: Dropdown stories
**PrimeReact Docs**: https://primereact.org/dropdown/

---

### MultiSelect

**Use Cases**:
- Select multiple options
- Tags, skills, categories
- Multi-select field

**Key Props**:
- `value` - Array of selected values
- `options` - Array of options
- `onChange` - Selection handler
- `display` - 'comma' or 'chip'
- `filter` - Enable search
- `maxSelectedLabels` - Max chips to show

**States to Handle**: default, open, some selected, all selected

**Example**:
```tsx
import { MultiSelect } from 'primereact/multiselect';

const skills = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'ts' }
];

<MultiSelect
  value={selectedSkills}
  options={skills}
  onChange={(e) => setSelectedSkills(e.value)}
  display="chip"
  filter
/>
```

**Storybook**: MultiSelect stories
**PrimeReact Docs**: https://primereact.org/multiselect/

---

### Calendar

**Use Cases**:
- Date picker
- Date range picker
- Date + time picker
- Birth date, appointment scheduling

**Key Props**:
- `value` - Date or Date array (range)
- `onChange` - Date change handler
- `selectionMode` - 'single', 'multiple', 'range'
- `showTime` - Include time picker
- `hourFormat` - '12' or '24'
- `dateFormat` - Date display format

**States to Handle**: default, open, selected, range selected

**Example**:
```tsx
import { Calendar } from 'primereact/calendar';

{/* Single date */}
<Calendar
  value={date}
  onChange={(e) => setDate(e.value)}
  dateFormat="mm/dd/yy"
/>

{/* Date range */}
<Calendar
  value={dateRange}
  onChange={(e) => setDateRange(e.value)}
  selectionMode="range"
/>

{/* Date + time */}
<Calendar
  value={datetime}
  onChange={(e) => setDatetime(e.value)}
  showTime
  hourFormat="12"
/>
```

**Storybook**: Calendar stories
**PrimeReact Docs**: https://primereact.org/calendar/

---

### AutoComplete

**Use Cases**:
- Search with suggestions
- User search, tag search
- Type-ahead field

**Key Props**:
- `value` - Selected value
- `suggestions` - Filtered suggestions
- `completeMethod` - Search function
- `onChange` - Selection handler
- `field` - Object property to display
- `multiple` - Select multiple items

**States to Handle**: default, searching, suggestions shown, selected

**Example**:
```tsx
import { AutoComplete } from 'primereact/autocomplete';

const searchUsers = (event) => {
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(event.query.toLowerCase())
  );
  setSuggestions(filtered);
};

<AutoComplete
  value={selectedUser}
  suggestions={suggestions}
  completeMethod={searchUsers}
  onChange={(e) => setSelectedUser(e.value)}
  field="name"
  placeholder="Search users..."
/>
```

**Storybook**: AutoComplete stories
**PrimeReact Docs**: https://primereact.org/autocomplete/

---

### Password

**Use Cases**:
- Password input field
- Signup/login forms
- Password with strength meter

**Key Props**:
- `value`, `onChange`
- `toggleMask` - Show/hide password
- `feedback` - Show strength meter
- `promptLabel`, `weakLabel`, `mediumLabel`, `strongLabel`

**States to Handle**: hidden, visible, weak, medium, strong

**Example**:
```tsx
import { Password } from 'primereact/password';

<Password
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  toggleMask
  feedback
/>
```

**Storybook**: Password stories
**PrimeReact Docs**: https://primereact.org/password/

---

### Checkbox

**Use Cases**:
- Boolean toggle (on/off)
- Terms agreement
- Multi-select in forms

**Key Props**:
- `checked` - Boolean value
- `onChange` - Change handler (e.checked)
- `inputId` - ID for label association

**States to Handle**: unchecked, checked, indeterminate, disabled

**Example**:
```tsx
import { Checkbox } from 'primereact/checkbox';

<div className="flex align-items-center gap-2">
  <Checkbox
    inputId="terms"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.checked)}
  />
  <label htmlFor="terms">I agree to terms</label>
</div>
```

**Storybook**: Checkbox stories
**PrimeReact Docs**: https://primereact.org/checkbox/

---

### RadioButton

**Use Cases**:
- Select one option from small set (2-5 options)
- Payment method, shipping option

**Key Props**:
- `checked` - Boolean value
- `onChange` - Change handler
- `value` - Option value
- `inputId` - ID for label

**States to Handle**: unchecked, checked, disabled

**Example**:
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
      <label htmlFor={option}>{option}</label>
    </div>
  ))}
</div>
```

**Storybook**: RadioButton stories
**PrimeReact Docs**: https://primereact.org/radiobutton/

---

### InputSwitch

**Use Cases**:
- Toggle switch (on/off)
- Enable/disable features
- Settings toggles

**Key Props**:
- `checked` - Boolean value
- `onChange` - Change handler (e.value)

**States to Handle**: off, on, disabled

**Example**:
```tsx
import { InputSwitch } from 'primereact/inputswitch';

<div className="flex align-items-center gap-2">
  <label htmlFor="notifications">Enable notifications</label>
  <InputSwitch
    inputId="notifications"
    checked={notificationsEnabled}
    onChange={(e) => setNotificationsEnabled(e.value)}
  />
</div>
```

**Storybook**: InputSwitch stories
**PrimeReact Docs**: https://primereact.org/inputswitch/

---

### Slider

**Use Cases**:
- Select value from range
- Volume, brightness, price range
- Numeric input with visual feedback

**Key Props**:
- `value` - Number or [min, max] for range
- `onChange` - Change handler (e.value)
- `min`, `max` - Range limits
- `step` - Increment step
- `range` - Enable range slider

**States to Handle**: default, dragging, disabled

**Example**:
```tsx
import { Slider } from 'primereact/slider';

{/* Single value */}
<Slider
  value={volume}
  onChange={(e) => setVolume(e.value)}
  min={0}
  max={100}
/>

{/* Range */}
<Slider
  value={priceRange}
  onChange={(e) => setPriceRange(e.value)}
  range
  min={0}
  max={1000}
/>
```

**Storybook**: Slider stories
**PrimeReact Docs**: https://primereact.org/slider/

---

### ColorPicker

**Use Cases**:
- Select color value
- Theme customization
- Design tools

**Key Props**:
- `value` - Color value (hex string)
- `onChange` - Change handler (e.value)
- `format` - 'hex', 'rgb', 'hsb'
- `inline` - Show picker inline

**States to Handle**: default, open, selected

**Example**:
```tsx
import { ColorPicker } from 'primereact/colorpicker';

<ColorPicker
  value={color}
  onChange={(e) => setColor(e.value)}
/>
```

**Storybook**: ColorPicker stories
**PrimeReact Docs**: https://primereact.org/colorpicker/

---

### Editor

**Use Cases**:
- Rich text editor
- Blog post content
- Email composition
- Formatted text input

**Key Props**:
- `value` - HTML content
- `onTextChange` - Change handler (e.htmlValue)
- `style` - Custom height/width

**States to Handle**: default, focus, disabled

**Example**:
```tsx
import { Editor } from 'primereact/editor';

<Editor
  value={content}
  onTextChange={(e) => setContent(e.htmlValue)}
  style={{ height: '320px' }}
/>
```

**Storybook**: Editor stories
**PrimeReact Docs**: https://primereact.org/editor/

---

### Rating

**Use Cases**:
- Product rating
- Feedback collection
- Star rating input

**Key Props**:
- `value` - Number of stars
- `onChange` - Change handler (e.value)
- `stars` - Total stars (default 5)
- `cancel` - Show cancel button

**States to Handle**: default, selected, disabled

**Example**:
```tsx
import { Rating } from 'primereact/rating';

<Rating
  value={rating}
  onChange={(e) => setRating(e.value)}
  cancel={false}
/>
```

**Storybook**: Rating stories
**PrimeReact Docs**: https://primereact.org/rating/

---

### Chips

**Use Cases**:
- Tag input
- Email recipients
- Keyword entry

**Key Props**:
- `value` - Array of strings
- `onChange` - Change handler (e.value)
- `separator` - Delimiter (e.g., ',')
- `max` - Max number of chips

**States to Handle**: default, adding, removing

**Example**:
```tsx
import { Chips } from 'primereact/chips';

<Chips
  value={tags}
  onChange={(e) => setTags(e.value)}
  separator=","
  placeholder="Add tags"
/>
```

**Storybook**: Chips stories
**PrimeReact Docs**: https://primereact.org/chips/

---

### InputMask

**Use Cases**:
- Phone number input
- Credit card number
- SSN, ZIP code
- Formatted text input

**Key Props**:
- `value`, `onChange`
- `mask` - Input mask pattern
- `placeholder` - Mask placeholder

**States to Handle**: default, focus, error, disabled

**Example**:
```tsx
import { InputMask } from 'primereact/inputmask';

<InputMask
  value={phone}
  onChange={(e) => setPhone(e.value)}
  mask="(999) 999-9999"
  placeholder="(999) 999-9999"
/>
```

**Storybook**: InputMask stories
**PrimeReact Docs**: https://primereact.org/inputmask/

---

### Knob

**Use Cases**:
- Dial/knob input
- Volume control (visual)
- Circular slider

**Key Props**:
- `value`, `onChange`
- `min`, `max`
- `size` - Diameter in pixels
- `valueColor` - Color of progress arc

**States to Handle**: default, dragging, disabled

**Example**:
```tsx
import { Knob } from 'primereact/knob';

<Knob
  value={volume}
  onChange={(e) => setVolume(e.value)}
  min={0}
  max={100}
  size={150}
/>
```

**Storybook**: Knob stories
**PrimeReact Docs**: https://primereact.org/knob/

---

### ListBox

**Use Cases**:
- Multi-select list
- Visible list of options (no dropdown)
- Item picker

**Key Props**:
- `value` - Selected value(s)
- `options` - Array of options
- `onChange` - Selection handler
- `multiple` - Enable multi-select
- `filter` - Enable search

**States to Handle**: default, selected, filtered

**Example**:
```tsx
import { ListBox } from 'primereact/listbox';

<ListBox
  value={selectedCity}
  options={cities}
  onChange={(e) => setSelectedCity(e.value)}
  filter
/>
```

**Storybook**: ListBox stories
**PrimeReact Docs**: https://primereact.org/listbox/

---

### SelectButton

**Use Cases**:
- Single/multi-select from small set
- View mode toggle (list/grid)
- Filter buttons

**Key Props**:
- `value` - Selected value(s)
- `options` - Array of options
- `onChange` - Selection handler
- `multiple` - Multi-select mode

**States to Handle**: default, selected, disabled

**Example**:
```tsx
import { SelectButton } from 'primereact/selectbutton';

const options = [
  { label: 'List', value: 'list', icon: 'pi pi-list' },
  { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' }
];

<SelectButton
  value={viewMode}
  options={options}
  onChange={(e) => setViewMode(e.value)}
/>
```

**Storybook**: SelectButton stories
**PrimeReact Docs**: https://primereact.org/selectbutton/

---

### ToggleButton

**Use Cases**:
- Single toggle button
- Boolean state with icon
- Favorite toggle, bookmark

**Key Props**:
- `checked` - Boolean value
- `onChange` - Change handler (e.value)
- `onLabel`, `offLabel`
- `onIcon`, `offIcon`

**States to Handle**: off, on, disabled

**Example**:
```tsx
import { ToggleButton } from 'primereact/togglebutton';

<ToggleButton
  checked={isFavorite}
  onChange={(e) => setIsFavorite(e.value)}
  onLabel="Favorite"
  offLabel="Not Favorite"
  onIcon="pi pi-star-fill"
  offIcon="pi pi-star"
/>
```

**Storybook**: ToggleButton stories
**PrimeReact Docs**: https://primereact.org/togglebutton/

---

### TreeSelect

**Use Cases**:
- Select from hierarchical options
- Category picker
- Nested selection

**Key Props**:
- `value` - Selected node key(s)
- `options` - TreeNode array
- `onChange` - Selection handler
- `selectionMode` - 'single', 'multiple', 'checkbox'

**States to Handle**: default, open, selected, expanded

**Example**:
```tsx
import { TreeSelect } from 'primereact/treeselect';

<TreeSelect
  value={selectedNodeKey}
  options={nodes}
  onChange={(e) => setSelectedNodeKey(e.value)}
  placeholder="Select category"
/>
```

**Storybook**: TreeSelect stories
**PrimeReact Docs**: https://primereact.org/treeselect/

---

### CascadeSelect

**Use Cases**:
- Nested dropdown selection
- Country > State > City
- Category > Subcategory

**Key Props**:
- `value` - Selected option
- `options` - Nested options array
- `onChange` - Selection handler
- `optionLabel` - Property to display
- `optionGroupLabel` - Group property
- `optionGroupChildren` - Children property

**States to Handle**: default, open, selected

**Example**:
```tsx
import { CascadeSelect } from 'primereact/cascadeselect';

const countries = [
  {
    name: 'USA',
    states: [
      { name: 'California', cities: [{ name: 'Los Angeles' }] }
    ]
  }
];

<CascadeSelect
  value={selectedCity}
  options={countries}
  onChange={(e) => setSelectedCity(e.value)}
  optionLabel="name"
  optionGroupLabel="name"
  optionGroupChildren={['states', 'cities']}
/>
```

**Storybook**: CascadeSelect stories
**PrimeReact Docs**: https://primereact.org/cascadeselect/

---

## Button Components

### Button

**Use Cases**:
- Primary action
- Secondary action
- Destructive action
- Icon-only button
- Link button

**Key Props**:
- `label` - Button text
- `icon` - Icon class (PrimeIcons)
- `onClick` - Click handler
- `loading` - Show loading spinner
- `disabled` - Disabled state
- `severity` - 'danger' for destructive
- `outlined` - Outlined variant
- `text` - Text/link variant
- `rounded` - Circular button
- `size` - 'small' or 'large'

**States to Handle**: default, hover, active, loading, disabled

**Example**:
```tsx
import { Button } from 'primereact/button';

{/* Primary */}
<Button label="Save Changes" onClick={handleSave} />

{/* Secondary */}
<Button label="Cancel" outlined onClick={handleCancel} />

{/* Destructive */}
<Button label="Delete" severity="danger" onClick={handleDelete} />

{/* Icon only */}
<Button icon="pi pi-pencil" rounded text aria-label="Edit" />

{/* Loading */}
<Button label="Saving..." loading={isSaving} disabled={isSaving} />
```

**Storybook**: Button stories
**PrimeReact Docs**: https://primereact.org/button/

---

### SplitButton

**Use Cases**:
- Primary action + alternatives
- Save / Save As / Save Template
- Actions with variations

**Key Props**:
- `label` - Primary action label
- `icon` - Primary action icon
- `onClick` - Primary action handler
- `model` - Array of menu items

**States to Handle**: default, dropdown open, action clicked

**Example**:
```tsx
import { SplitButton } from 'primereact/splitbutton';

const items = [
  { label: 'Save as Draft', command: saveDraft },
  { label: 'Save as Template', command: saveTemplate }
];

<SplitButton
  label="Save"
  icon="pi pi-save"
  onClick={handleSave}
  model={items}
/>
```

**Storybook**: SplitButton stories
**PrimeReact Docs**: https://primereact.org/splitbutton/

---

### SpeedDial

**Use Cases**:
- Floating action button with sub-actions
- Quick actions menu
- Mobile-style FAB

**Key Props**:
- `model` - Array of action items
- `direction` - 'up', 'down', 'left', 'right'
- `type` - 'linear', 'circle', 'semi-circle', 'quarter-circle'
- `radius` - Distance from center

**States to Handle**: collapsed, expanded

**Example**:
```tsx
import { SpeedDial } from 'primereact/speeddial';

const items = [
  { label: 'Add', icon: 'pi pi-plus', command: handleAdd },
  { label: 'Edit', icon: 'pi pi-pencil', command: handleEdit },
  { label: 'Delete', icon: 'pi pi-trash', command: handleDelete }
];

<SpeedDial
  model={items}
  direction="up"
  style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
/>
```

**Storybook**: SpeedDial stories
**PrimeReact Docs**: https://primereact.org/speeddial/

---

## Panel Components

### Card

**Use Cases**:
- Container for content
- Product card
- User profile card
- Dashboard widget

**Key Props**:
- `title` - Card header
- `subTitle` - Subtitle
- `header` - Custom header template
- `footer` - Custom footer template

**States to Handle**: default

**Example**:
```tsx
import { Card } from 'primereact/card';

<Card
  title="Card Title"
  subTitle="Card Subtitle"
  footer={<Button label="Action" />}
>
  <p>Card content</p>
</Card>
```

**Storybook**: Card stories
**PrimeReact Docs**: https://primereact.org/card/

---

### Panel

**Use Cases**:
- Collapsible content section
- Expandable details
- Settings section

**Key Props**:
- `header` - Panel title
- `toggleable` - Enable collapse/expand
- `collapsed` - Collapsed state
- `onToggle` - Toggle handler

**States to Handle**: expanded, collapsed

**Example**:
```tsx
import { Panel } from 'primereact/panel';

<Panel header="Advanced Settings" toggleable>
  <p>Panel content</p>
</Panel>
```

**Storybook**: Panel stories
**PrimeReact Docs**: https://primereact.org/panel/

---

### TabView

**Use Cases**:
- Tabbed navigation
- Switch between views
- Settings categories

**Key Props**:
- `activeIndex` - Active tab index
- `onTabChange` - Tab change handler
- Children are `<TabPanel>` components

**States to Handle**: default, active tab

**Example**:
```tsx
import { TabView, TabPanel } from 'primereact/tabview';

<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
  <TabPanel header="Overview">Content 1</TabPanel>
  <TabPanel header="Settings">Content 2</TabPanel>
  <TabPanel header="Users">Content 3</TabPanel>
</TabView>
```

**Storybook**: TabView stories
**PrimeReact Docs**: https://primereact.org/tabview/

---

### Accordion

**Use Cases**:
- FAQ section
- Collapsible content groups
- Multi-section form

**Key Props**:
- `activeIndex` - Active tab index (can be array for multiple)
- `onTabChange` - Tab change handler
- `multiple` - Allow multiple tabs open
- Children are `<AccordionTab>` components

**States to Handle**: collapsed, expanded, multiple expanded

**Example**:
```tsx
import { Accordion, AccordionTab } from 'primereact/accordion';

<Accordion activeIndex={0}>
  <AccordionTab header="Question 1">Answer 1</AccordionTab>
  <AccordionTab header="Question 2">Answer 2</AccordionTab>
  <AccordionTab header="Question 3">Answer 3</AccordionTab>
</Accordion>
```

**Storybook**: Accordion stories
**PrimeReact Docs**: https://primereact.org/accordion/

---

### Fieldset

**Use Cases**:
- Group related form fields
- Collapsible section
- Logical grouping

**Key Props**:
- `legend` - Fieldset title
- `toggleable` - Enable collapse
- `collapsed` - Collapsed state

**States to Handle**: expanded, collapsed

**Example**:
```tsx
import { Fieldset } from 'primereact/fieldset';

<Fieldset legend="Personal Information" toggleable>
  {/* Form fields */}
</Fieldset>
```

**Storybook**: Fieldset stories
**PrimeReact Docs**: https://primereact.org/fieldset/

---

### Toolbar

**Use Cases**:
- Action toolbar
- Page header with actions
- Context-sensitive actions

**Key Props**:
- `left` - Left content template
- `right` - Right content template
- `center` - Center content template

**States to Handle**: default

**Example**:
```tsx
import { Toolbar } from 'primereact/toolbar';

<Toolbar
  left={<h2>Page Title</h2>}
  right={
    <div className="flex gap-2">
      <Button label="Save" />
      <Button label="Delete" severity="danger" />
    </div>
  }
/>
```

**Storybook**: Toolbar stories
**PrimeReact Docs**: https://primereact.org/toolbar/

---

### ScrollPanel

**Use Cases**:
- Custom scrollable area
- Styled scrollbar
- Constrained content area

**Key Props**:
- `style` - Custom height/width

**States to Handle**: default, scrolling

**Example**:
```tsx
import { ScrollPanel } from 'primereact/scrollpanel';

<ScrollPanel style={{ width: '100%', height: '400px' }}>
  <p>Long content...</p>
</ScrollPanel>
```

**Storybook**: ScrollPanel stories
**PrimeReact Docs**: https://primereact.org/scrollpanel/

---

### Splitter

**Use Cases**:
- Resizable panes
- Split view (editor/preview)
- Multi-column layout

**Key Props**:
- `layout` - 'horizontal' or 'vertical'
- `gutterSize` - Resize handle size
- Children are `<SplitterPanel>` with `size` prop

**States to Handle**: default, resizing

**Example**:
```tsx
import { Splitter, SplitterPanel } from 'primereact/splitter';

<Splitter style={{ height: '600px' }}>
  <SplitterPanel size={30}>Panel 1</SplitterPanel>
  <SplitterPanel size={70}>Panel 2</SplitterPanel>
</Splitter>
```

**Storybook**: Splitter stories
**PrimeReact Docs**: https://primereact.org/splitter/

---

### Divider

**Use Cases**:
- Visual separator
- Section divider
- Content break

**Key Props**:
- `layout` - 'horizontal' or 'vertical'
- `align` - Content alignment
- `type` - 'solid' or 'dashed'

**States to Handle**: N/A (static)

**Example**:
```tsx
import { Divider } from 'primereact/divider';

<div>
  <p>Content above</p>
  <Divider />
  <p>Content below</p>
</div>

{/* With text */}
<Divider align="center">OR</Divider>
```

**Storybook**: Divider stories
**PrimeReact Docs**: https://primereact.org/divider/

---

### Steps

**Use Cases**:
- Wizard/stepper
- Progress indicator
- Multi-step form

**Key Props**:
- `model` - Array of step items
- `activeIndex` - Current step
- `onSelect` - Step select handler
- `readOnly` - Disable navigation

**States to Handle**: current step, completed steps

**Example**:
```tsx
import { Steps } from 'primereact/steps';

const items = [
  { label: 'Personal' },
  { label: 'Address' },
  { label: 'Confirmation' }
];

<Steps model={items} activeIndex={activeIndex} />
```

**Storybook**: Steps stories
**PrimeReact Docs**: https://primereact.org/steps/

---

## Overlay Components

### Dialog

**Use Cases**:
- Modal dialog
- Form dialog
- Confirmation dialog (use ConfirmDialog instead)
- Content overlay

**Key Props**:
- `visible` - Show/hide dialog
- `onHide` - Close handler
- `header` - Dialog title
- `footer` - Dialog footer template
- `modal` - Block background
- `style` - Custom width/height
- `position` - 'center', 'top', 'bottom', etc.

**States to Handle**: hidden, shown

**Example**:
```tsx
import { Dialog } from 'primereact/dialog';

<Dialog
  visible={visible}
  onHide={() => setVisible(false)}
  header="Edit User"
  footer={
    <div className="flex justify-content-end gap-2">
      <Button label="Cancel" outlined onClick={() => setVisible(false)} />
      <Button label="Save" onClick={handleSave} />
    </div>
  }
  style={{ width: '450px' }}
  modal
>
  <p>Dialog content</p>
</Dialog>
```

**Storybook**: Dialog stories
**PrimeReact Docs**: https://primereact.org/dialog/

---

### ConfirmDialog

**Use Cases**:
- Confirm destructive action
- Delete confirmation
- Discard changes confirmation

**Key Props**:
- Uses `confirmDialog()` function
- `message` - Confirmation text
- `header` - Dialog title
- `icon` - Warning icon
- `accept` - Confirm callback
- `reject` - Cancel callback
- `acceptLabel`, `rejectLabel`
- `acceptClassName` - e.g., 'p-button-danger'

**States to Handle**: hidden, shown, confirmed, rejected

**Example**:
```tsx
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const confirm = () => {
  confirmDialog({
    message: 'Delete this item? This action cannot be undone.',
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: handleDelete,
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptClassName: 'p-button-danger'
  });
};

<>
  <ConfirmDialog />
  <Button label="Delete" severity="danger" onClick={confirm} />
</>
```

**Storybook**: ConfirmDialog stories
**PrimeReact Docs**: https://primereact.org/confirmdialog/

---

### Sidebar

**Use Cases**:
- Side drawer
- Navigation panel
- Details panel

**Key Props**:
- `visible` - Show/hide
- `onHide` - Close handler
- `position` - 'left', 'right', 'top', 'bottom'
- `fullScreen` - Full screen mode
- `style` - Custom width

**States to Handle**: hidden, shown

**Example**:
```tsx
import { Sidebar } from 'primereact/sidebar';

<Sidebar
  visible={visible}
  onHide={() => setVisible(false)}
  position="right"
  style={{ width: '350px' }}
>
  <h2>Sidebar Content</h2>
</Sidebar>
```

**Storybook**: Sidebar stories
**PrimeReact Docs**: https://primereact.org/sidebar/

---

### Tooltip

**Use Cases**:
- Show hint on hover
- Icon explanation
- Additional info

**Key Props**:
- `target` - CSS selector or ref
- `content` - Tooltip text (or use data-pr-tooltip)
- `position` - 'top', 'bottom', 'left', 'right'

**States to Handle**: hidden, shown

**Example**:
```tsx
import { Tooltip } from 'primereact/tooltip';

<>
  <Tooltip target=".custom-tooltip" />
  <Button
    className="custom-tooltip"
    data-pr-tooltip="Click to save"
    data-pr-position="top"
    label="Save"
  />
</>
```

**Storybook**: Tooltip stories
**PrimeReact Docs**: https://primereact.org/tooltip/

---

### OverlayPanel

**Use Cases**:
- Popover
- Additional content overlay
- Info panel (not full dialog)

**Key Props**:
- `ref` - Reference for toggle
- Uses `ref.current.toggle(event)` to show/hide

**States to Handle**: hidden, shown

**Example**:
```tsx
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react';

const op = useRef(null);

<>
  <Button label="Show Info" onClick={(e) => op.current.toggle(e)} />
  <OverlayPanel ref={op}>
    <p>Panel content</p>
  </OverlayPanel>
</>
```

**Storybook**: OverlayPanel stories
**PrimeReact Docs**: https://primereact.org/overlaypanel/

---

## Menu Components

### Menubar

**Use Cases**:
- Top navigation bar
- Main application menu
- Horizontal menu with dropdowns

**Key Props**:
- `model` - Array of menu items
- `start` - Left content template
- `end` - Right content template

**States to Handle**: default, item active, dropdown open

**Example**:
```tsx
import { Menubar } from 'primereact/menubar';

const items = [
  { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
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

**Storybook**: Menubar stories
**PrimeReact Docs**: https://primereact.org/menubar/

---

### Menu

**Use Cases**:
- Vertical menu
- Sidebar navigation
- Context menu items

**Key Props**:
- `model` - Array of menu items
- `popup` - Popup mode (use with ref.toggle)

**States to Handle**: default, item active

**Example**:
```tsx
import { Menu } from 'primereact/menu';

const items = [
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Users', icon: 'pi pi-users' },
  { separator: true },
  { label: 'Settings', icon: 'pi pi-cog' }
];

<Menu model={items} style={{ width: '250px' }} />
```

**Storybook**: Menu stories
**PrimeReact Docs**: https://primereact.org/menu/

---

### ContextMenu

**Use Cases**:
- Right-click menu
- Contextual actions
- Table row menu

**Key Props**:
- `model` - Array of menu items
- `ref` - Reference for show()
- Uses `ref.current.show(event)` to display

**States to Handle**: hidden, shown

**Example**:
```tsx
import { ContextMenu } from 'primereact/contextmenu';
import { useRef } from 'react';

const cm = useRef(null);

const items = [
  { label: 'Edit', icon: 'pi pi-pencil', command: handleEdit },
  { label: 'Delete', icon: 'pi pi-trash', command: handleDelete }
];

<>
  <ContextMenu model={items} ref={cm} />
  <div onContextMenu={(e) => cm.current.show(e)}>
    Right-click me
  </div>
</>
```

**Storybook**: ContextMenu stories
**PrimeReact Docs**: https://primereact.org/contextmenu/

---

### BreadCrumb

**Use Cases**:
- Navigation breadcrumb
- Show current location in hierarchy
- Path navigation

**Key Props**:
- `model` - Array of breadcrumb items
- `home` - Home item

**States to Handle**: N/A (static)

**Example**:
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

**Storybook**: BreadCrumb stories
**PrimeReact Docs**: https://primereact.org/breadcrumb/

---

### PanelMenu

**Use Cases**:
- Accordion-style menu
- Nested navigation
- Sidebar menu with submenus

**Key Props**:
- `model` - Array of menu items with nested items

**States to Handle**: collapsed, expanded

**Example**:
```tsx
import { PanelMenu } from 'primereact/panelmenu';

const items = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    items: [
      { label: 'Overview' },
      { label: 'Analytics' }
    ]
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    items: [
      { label: 'Profile' },
      { label: 'Account' }
    ]
  }
];

<PanelMenu model={items} style={{ width: '300px' }} />
```

**Storybook**: PanelMenu stories
**PrimeReact Docs**: https://primereact.org/panelmenu/

---

### TabMenu

**Use Cases**:
- Horizontal tab navigation
- Top-level navigation tabs
- Category switcher

**Key Props**:
- `model` - Array of tab items
- `activeIndex` - Active tab index
- `onTabChange` - Tab change handler

**States to Handle**: default, active tab

**Example**:
```tsx
import { TabMenu } from 'primereact/tabmenu';

const items = [
  { label: 'Overview', icon: 'pi pi-home' },
  { label: 'Settings', icon: 'pi pi-cog' },
  { label: 'Users', icon: 'pi pi-users' }
];

<TabMenu
  model={items}
  activeIndex={activeIndex}
  onTabChange={(e) => setActiveIndex(e.index)}
/>
```

**Storybook**: TabMenu stories
**PrimeReact Docs**: https://primereact.org/tabmenu/

---

### MegaMenu

**Use Cases**:
- Large navigation menu
- Multi-column dropdowns
- Feature-rich navigation

**Key Props**:
- `model` - Array of menu items with columns
- `orientation` - 'horizontal' or 'vertical'

**States to Handle**: default, dropdown open

**Example**:
```tsx
import { MegaMenu } from 'primereact/megamenu';

const items = [
  {
    label: 'Products',
    items: [
      [
        { label: 'Category 1', items: [{ label: 'Item 1' }] }
      ],
      [
        { label: 'Category 2', items: [{ label: 'Item 2' }] }
      ]
    ]
  }
];

<MegaMenu model={items} />
```

**Storybook**: MegaMenu stories
**PrimeReact Docs**: https://primereact.org/megamenu/

---

## Messages Components

### Toast

**Use Cases**:
- Success notification
- Error notification
- Info/warning message
- Transient feedback

**Key Props**:
- `ref` - Reference for show()
- Uses `ref.current.show({ severity, summary, detail, life })`

**States to Handle**: hidden, shown, multiple shown

**Example**:
```tsx
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const toast = useRef(null);

const showSuccess = () => {
  toast.current.show({
    severity: 'success',
    summary: 'Success',
    detail: 'Settings saved successfully',
    life: 3000
  });
};

<>
  <Toast ref={toast} />
  <Button label="Save" onClick={handleSaveAndShowToast} />
</>
```

**Storybook**: Toast stories
**PrimeReact Docs**: https://primereact.org/toast/

---

### Message

**Use Cases**:
- Inline message (persistent)
- Form validation error
- Alert banner
- Info box

**Key Props**:
- `severity` - 'success', 'info', 'warn', 'error'
- `text` - Message text
- `closable` - Show close button
- `onClose` - Close handler

**States to Handle**: shown, dismissed

**Example**:
```tsx
import { Message } from 'primereact/message';

<Message severity="error" text="Unable to save. Try again." closable />
<Message severity="success" text="Settings saved successfully" />
<Message severity="warn" text="Session expires in 5 minutes" />
<Message severity="info" text="Maintenance tonight at 11 PM" />
```

**Storybook**: Message stories
**PrimeReact Docs**: https://primereact.org/message/

---

### Messages

**Use Cases**:
- Multiple messages
- Message stack
- Imperative message display

**Key Props**:
- `ref` - Reference for show()
- Uses `ref.current.show([messages])`

**States to Handle**: shown, cleared

**Example**:
```tsx
import { Messages } from 'primereact/messages';
import { useRef } from 'react';

const msgs = useRef(null);

const show = () => {
  msgs.current.show([
    { severity: 'success', summary: 'Success', detail: 'Operation completed' },
    { severity: 'info', summary: 'Info', detail: 'New features available' }
  ]);
};

<Messages ref={msgs} />
```

**Storybook**: Messages stories
**PrimeReact Docs**: https://primereact.org/messages/

---

### InlineMessage

**Use Cases**:
- Compact inline message
- Field-level validation message
- Small feedback

**Key Props**:
- `severity` - Message severity
- `text` - Message text

**States to Handle**: shown

**Example**:
```tsx
import { InlineMessage } from 'primereact/inlinemessage';

<InlineMessage severity="error" text="Email is required" />
```

**Storybook**: InlineMessage stories
**PrimeReact Docs**: https://primereact.org/inlinemessage/

---

## Media Components

### Image

**Use Cases**:
- Display image
- Image with preview
- Lazy-loaded image

**Key Props**:
- `src` - Image URL
- `alt` - Alt text
- `preview` - Enable preview/zoom
- `loading` - 'lazy' for lazy loading

**States to Handle**: loading, loaded, error

**Example**:
```tsx
import { Image } from 'primereact/image';

<Image
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  preview
  width="250"
/>
```

**Storybook**: Image stories
**PrimeReact Docs**: https://primereact.org/image/

---

### Carousel

**Use Cases**:
- Image carousel
- Product showcase
- Featured content slider

**Key Props**:
- `value` - Array of items
- `itemTemplate` - Custom render
- `numVisible` - Visible items count
- `numScroll` - Scroll count
- `autoplayInterval` - Auto-advance time

**States to Handle**: default, scrolling, autoplay

**Example**:
```tsx
import { Carousel } from 'primereact/carousel';

<Carousel
  value={products}
  numVisible={3}
  numScroll={1}
  itemTemplate={(product) => (
    <div>
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
    </div>
  )}
/>
```

**Storybook**: Carousel stories
**PrimeReact Docs**: https://primereact.org/carousel/

---

### Galleria

**Use Cases**:
- Photo gallery
- Product image gallery
- Lightbox

**Key Props**:
- `value` - Array of images
- `item` - Full-size template
- `thumbnail` - Thumbnail template
- `numVisible` - Visible thumbnails
- `fullScreen` - Full-screen mode

**States to Handle**: default, full-screen, image selected

**Example**:
```tsx
import { Galleria } from 'primereact/galleria';

<Galleria
  value={images}
  item={(item) => <img src={item.itemImageSrc} alt={item.alt} />}
  thumbnail={(item) => <img src={item.thumbnailImageSrc} alt={item.alt} />}
  numVisible={5}
/>
```

**Storybook**: Galleria stories
**PrimeReact Docs**: https://primereact.org/galleria/

---

## Misc Components

### ProgressSpinner

**Use Cases**:
- Page loading
- Content loading
- Async operation indicator

**Key Props**:
- `style` - Custom size/color
- `strokeWidth` - Spinner thickness

**States to Handle**: loading

**Example**:
```tsx
import { ProgressSpinner } from 'primereact/progressspinner';

<div className="flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
  <ProgressSpinner />
</div>
```

**Storybook**: ProgressSpinner stories
**PrimeReact Docs**: https://primereact.org/progressspinner/

---

### ProgressBar

**Use Cases**:
- Upload progress
- Task completion
- Determinate progress

**Key Props**:
- `value` - Progress value (0-100)
- `mode` - 'determinate' or 'indeterminate'
- `showValue` - Display percentage

**States to Handle**: indeterminate, determinate (value)

**Example**:
```tsx
import { ProgressBar } from 'primereact/progressbar';

{/* Determinate */}
<ProgressBar value={uploadProgress} />

{/* Indeterminate */}
<ProgressBar mode="indeterminate" />
```

**Storybook**: ProgressBar stories
**PrimeReact Docs**: https://primereact.org/progressbar/

---

### Skeleton

**Use Cases**:
- Content placeholder
- Loading skeleton
- Shimmer effect

**Key Props**:
- `shape` - 'rectangle', 'circle'
- `width`, `height` - Custom size

**States to Handle**: loading, loaded

**Example**:
```tsx
import { Skeleton } from 'primereact/skeleton';

<div className="flex flex-column gap-2">
  <Skeleton width="100%" height="2rem" />
  <Skeleton width="80%" height="1.5rem" />
  <Skeleton width="60%" height="1.5rem" />
  <Skeleton shape="circle" size="4rem" />
</div>
```

**Storybook**: Skeleton stories
**PrimeReact Docs**: https://primereact.org/skeleton/

---

### Avatar

**Use Cases**:
- User profile image
- User initials
- Icon avatar

**Key Props**:
- `image` - Image URL
- `icon` - Icon class
- `label` - Initials
- `size` - 'normal', 'large', 'xlarge'
- `shape` - 'square' or 'circle'

**States to Handle**: default

**Example**:
```tsx
import { Avatar } from 'primereact/avatar';

{/* Image */}
<Avatar image="/avatar.jpg" size="large" shape="circle" />

{/* Initials */}
<Avatar label="JD" size="large" shape="circle" />

{/* Icon */}
<Avatar icon="pi pi-user" size="large" shape="circle" />
```

**Storybook**: Avatar stories
**PrimeReact Docs**: https://primereact.org/avatar/

---

### Badge

**Use Cases**:
- Notification count
- Status indicator
- Overlay badge

**Key Props**:
- `value` - Badge value
- `severity` - Color variant
- `size` - 'normal' or 'large'

**States to Handle**: default

**Example**:
```tsx
import { Badge } from 'primereact/badge';

{/* Standalone */}
<Badge value="3" />

{/* Overlay on button/icon */}
<i className="pi pi-bell p-overlay-badge">
  <Badge value="5" severity="danger" />
</i>
```

**Storybook**: Badge stories
**PrimeReact Docs**: https://primereact.org/badge/

---

### Tag

**Use Cases**:
- Label/tag
- Status tag
- Category tag

**Key Props**:
- `value` - Tag text
- `severity` - Color variant
- `icon` - Icon class

**States to Handle**: default

**Example**:
```tsx
import { Tag } from 'primereact/tag';

<Tag value="New" severity="success" />
<Tag value="Important" severity="danger" icon="pi pi-exclamation-triangle" />
```

**Storybook**: Tag stories
**PrimeReact Docs**: https://primereact.org/tag/

---

### Chip

**Use Cases**:
- Removable tag
- User chip
- Filter chip

**Key Props**:
- `label` - Chip text
- `image` - Image URL
- `icon` - Icon class
- `removable` - Show remove icon
- `onRemove` - Remove handler

**States to Handle**: default, removed

**Example**:
```tsx
import { Chip } from 'primereact/chip';

<Chip label="John Doe" image="/avatar.jpg" removable onRemove={handleRemove} />
<Chip label="Tag" icon="pi pi-tag" removable />
```

**Storybook**: Chip stories
**PrimeReact Docs**: https://primereact.org/chip/

---

### Paginator

**Use Cases**:
- Standalone pagination
- Custom pagination UI

**Key Props**:
- `first` - Index of first record
- `rows` - Rows per page
- `totalRecords` - Total record count
- `onPageChange` - Page change handler
- `rowsPerPageOptions` - Rows options

**States to Handle**: first page, middle page, last page

**Example**:
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

**Storybook**: Paginator stories
**PrimeReact Docs**: https://primereact.org/paginator/

---

### BlockUI

**Use Cases**:
- Block UI during operation
- Loading overlay
- Prevent interaction

**Key Props**:
- `blocked` - Block state
- `template` - Custom block template

**States to Handle**: blocked, unblocked

**Example**:
```tsx
import { BlockUI } from 'primereact/blockui';

<BlockUI blocked={isProcessing}>
  <YourContent />
</BlockUI>
```

**Storybook**: BlockUI stories
**PrimeReact Docs**: https://primereact.org/blockui/

---

### Terminal

**Use Cases**:
- Command terminal
- CLI interface
- Interactive shell

**Key Props**:
- `welcomeMessage` - Initial message
- `prompt` - Command prompt text

**States to Handle**: default, command entered

**Example**:
```tsx
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';

TerminalService.on('command', (command) => {
  // Handle command
  return `You entered: ${command}`;
});

<Terminal welcomeMessage="Welcome!" prompt="$" />
```

**Storybook**: Terminal stories
**PrimeReact Docs**: https://primereact.org/terminal/

---

## File Components

### FileUpload

**Use Cases**:
- File upload
- Multiple file upload
- Drag & drop upload
- Image upload

**Key Props**:
- `name` - Form field name
- `url` - Upload endpoint
- `accept` - File types (e.g., 'image/*')
- `maxFileSize` - Max size in bytes
- `multiple` - Multiple files
- `auto` - Auto-upload
- `onUpload` - Upload complete handler
- `customUpload` - Manual upload
- `uploadHandler` - Custom upload function

**States to Handle**: default, uploading, uploaded, error

**Example**:
```tsx
import { FileUpload } from 'primereact/fileupload';

<FileUpload
  name="file"
  url="/api/upload"
  accept="image/*"
  maxFileSize={1000000}
  onUpload={handleUpload}
  emptyTemplate={<p>Drag and drop files here</p>}
/>
```

**Storybook**: FileUpload stories
**PrimeReact Docs**: https://primereact.org/fileupload/

---

## Chart Components

### Chart

**Use Cases**:
- Line chart
- Bar chart
- Pie chart
- Doughnut chart
- Radar chart
- Polar area chart
- Any Chart.js chart type

**Key Props**:
- `type` - 'line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea'
- `data` - Chart data object
- `options` - Chart.js options

**States to Handle**: loading, data, no data

**Example**:
```tsx
import { Chart } from 'primereact/chart';

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80],
      backgroundColor: 'var(--surface-brand-primary)'
    }
  ]
};

<Chart type="line" data={chartData} />
```

**Storybook**: Chart stories
**PrimeReact Docs**: https://primereact.org/chart/

---

## Summary

**Total Components Documented**: 70+

**By Category**:
- Data: 8 components
- Form: 23 components
- Button: 3 components
- Panel: 9 components
- Overlay: 5 components
- Menu: 7 components
- Messages: 4 components
- Media: 3 components
- Misc: 11 components
- File: 1 component
- Chart: 1 component

---

## Using This Inventory

1. **Search by use case** in the Quick Search Table
2. **Find the component** in its category section
3. **Copy the example code** as starting point
4. **Handle all required states** listed for the component
5. **Reference Storybook** for interactive examples
6. **Read PrimeReact docs** for complete API

---

**Last Updated**: 2026-01-17
**Version**: 0.7.0

For implementation patterns, see [DECISION-MATRIX.md](./DECISION-MATRIX.md).
For mistakes to avoid, see [ANTI-PATTERNS.md](./ANTI-PATTERNS.md).
