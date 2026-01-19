---
title: "Overlay Components"
category: reference
tags: [components, primereact, overlay, dialog, sidebar, tooltip]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
---

# Overlay Components

Components that appear above the main content.

**Quick Links**: [Dialog](#dialog) | [ConfirmDialog](#confirmdialog) | [Sidebar](#sidebar) | [OverlayPanel](#overlaypanel) | [Tooltip](#tooltip)

---

## Dialog

**Use Cases**:
- Modal dialogs
- Form dialogs
- Information popups

**Key Props**:
- `visible` - Show/hide dialog
- `onHide` - Close handler
- `header` - Dialog title
- `footer` - Footer content (buttons)
- `modal` - Block background interaction
- `closable` - Show close button
- `maximizable` - Allow maximize

**States**: hidden, visible, maximized

**Example**:
```tsx
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const footer = (
  <div>
    <Button label="Cancel" onClick={() => setVisible(false)} text />
    <Button label="Save" onClick={handleSave} />
  </div>
);

<Dialog
  header="Edit User"
  visible={visible}
  onHide={() => setVisible(false)}
  footer={footer}
  style={{ width: '450px' }}
>
  <p>Dialog content here</p>
</Dialog>
```

**Docs**: https://primereact.org/dialog/

---

## ConfirmDialog

**Use Cases**:
- Confirm destructive actions
- Yes/No confirmation
- Delete confirmation

**Key Props**:
- `visible` - Show/hide
- `onHide` - Close handler
- `message` - Confirmation message
- `header` - Dialog title
- `icon` - Warning icon
- `accept` - Confirm handler
- `reject` - Cancel handler

**Example**:
```tsx
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

// Method 1: Declarative
<ConfirmDialog
  visible={showConfirm}
  onHide={() => setShowConfirm(false)}
  message="Are you sure you want to delete this item?"
  header="Confirm Delete"
  icon="pi pi-exclamation-triangle"
  accept={handleDelete}
  reject={() => setShowConfirm(false)}
/>

// Method 2: Programmatic
const confirmDelete = () => {
  confirmDialog({
    message: 'Are you sure you want to delete?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteItem(),
    reject: () => {}
  });
};
```

**Docs**: https://primereact.org/confirmdialog/

---

## Sidebar

**Use Cases**:
- Slide-out panel
- Navigation drawer
- Filter panel
- Detail view

**Key Props**:
- `visible` - Show/hide
- `onHide` - Close handler
- `position` - 'left'|'right'|'top'|'bottom'
- `fullScreen` - Full screen mode
- `modal` - Show overlay

**States**: hidden, visible

**Example**:
```tsx
import { Sidebar } from 'primereact/sidebar';

<Sidebar
  visible={visible}
  onHide={() => setVisible(false)}
  position="right"
>
  <h2>Sidebar Title</h2>
  <p>Sidebar content here</p>
</Sidebar>
```

**Docs**: https://primereact.org/sidebar/

---

## OverlayPanel

**Use Cases**:
- Popover content
- Quick actions
- Contextual information

**Key Props**:
- `ref` - Reference for show/hide
- `dismissable` - Click outside to close
- `showCloseIcon` - Show close button

**Example**:
```tsx
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react';

const op = useRef(null);

<Button
  label="Show Details"
  onClick={(e) => op.current.toggle(e)}
/>

<OverlayPanel ref={op}>
  <p>Popover content here</p>
</OverlayPanel>
```

**Docs**: https://primereact.org/overlaypanel/

---

## Tooltip

**Use Cases**:
- Hover hints
- Help text
- Abbreviation expansion

**Key Props**:
- `target` - CSS selector for target
- `content` - Tooltip text
- `position` - 'top'|'bottom'|'left'|'right'
- `event` - 'hover'|'focus'|'both'

**Example**:
```tsx
import { Tooltip } from 'primereact/tooltip';

// Method 1: Target selector
<Button id="save-btn" label="Save" />
<Tooltip target="#save-btn" content="Save your changes" />

// Method 2: data-pr-tooltip attribute
<Button
  label="Info"
  data-pr-tooltip="Click for more information"
/>
<Tooltip target=".p-button" />
```

**Docs**: https://primereact.org/tooltip/
