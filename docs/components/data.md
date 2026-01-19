---
title: "Data Components"
category: reference
tags: [components, primereact, data, datatable, dataview, tree, timeline]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
---

# Data Components

Components for displaying and manipulating structured data.

**Quick Links**: [DataTable](#datatable) | [DataView](#dataview) | [Tree](#tree) | [TreeTable](#treetable) | [Timeline](#timeline) | [VirtualScroller](#virtualscroller) | [OrderList](#orderlist) | [PickList](#picklist)

---

## DataTable

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

**PrimeReact Docs**: https://primereact.org/datatable/

---

## DataView

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

**PrimeReact Docs**: https://primereact.org/dataview/

---

## Tree

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

**PrimeReact Docs**: https://primereact.org/tree/

---

## TreeTable

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

**PrimeReact Docs**: https://primereact.org/treetable/

---

## Timeline

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

**PrimeReact Docs**: https://primereact.org/timeline/

---

## VirtualScroller

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

**PrimeReact Docs**: https://primereact.org/virtualscroller/

---

## OrderList

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

**PrimeReact Docs**: https://primereact.org/orderlist/

---

## PickList

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

**PrimeReact Docs**: https://primereact.org/picklist/
