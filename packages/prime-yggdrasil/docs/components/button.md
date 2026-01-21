---
title: "Button Components"
category: reference
tags: [components, primereact, button, actions]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
---

# Button Components

Components for user actions and interactions.

**Quick Links**: [Button](#button) | [SplitButton](#splitbutton) | [SpeedDial](#speeddial)

---

## Button

**Use Cases**:
- Primary/secondary actions
- Icon buttons
- Link-style buttons
- Loading states

**Key Props**:
- `label` - Button text
- `icon` - PrimeIcons class
- `severity` - 'primary'|'secondary'|'success'|'info'|'warning'|'danger'|'help'
- `outlined` - Outlined variant
- `text` - Text-only variant
- `rounded` - Rounded style
- `loading` - Loading state
- `disabled` - Disabled state
- `onClick` - Click handler

**States**: default, hover, active, loading, disabled

**Example**:
```tsx
import { Button } from 'primereact/button';

// Primary button
<Button label="Save" onClick={handleSave} />

// Secondary button
<Button label="Cancel" severity="secondary" onClick={handleCancel} />

// Icon button
<Button icon="pi pi-check" rounded />

// Outlined button
<Button label="Export" icon="pi pi-download" outlined />

// Text/link button
<Button label="Learn more" text />

// Danger button
<Button label="Delete" severity="danger" />

// Loading state
<Button label="Saving..." loading={isSaving} />

// With icon
<Button label="Add User" icon="pi pi-plus" />
```

**Docs**: https://primereact.org/button/

---

## SplitButton

**Use Cases**:
- Primary action + dropdown menu
- Save/Save As pattern
- Multiple related actions

**Key Props**:
- `label` - Main button text
- `icon` - Button icon
- `model` - MenuItem array for dropdown
- `onClick` - Main action handler
- `severity` - Button severity

**States**: default, dropdown open

**Example**:
```tsx
import { SplitButton } from 'primereact/splitbutton';

const items = [
  { label: 'Save as Draft', icon: 'pi pi-file', command: () => saveDraft() },
  { label: 'Save as Template', icon: 'pi pi-copy', command: () => saveTemplate() },
  { separator: true },
  { label: 'Export', icon: 'pi pi-download', command: () => exportDoc() }
];

<SplitButton
  label="Save"
  icon="pi pi-save"
  model={items}
  onClick={handleSave}
/>
```

**Docs**: https://primereact.org/splitbutton/

---

## SpeedDial

**Use Cases**:
- Floating action button (FAB)
- Quick access menu
- Multiple related actions

**Key Props**:
- `model` - MenuItem array
- `direction` - 'up'|'down'|'left'|'right'
- `type` - 'linear'|'circle'|'semi-circle'|'quarter-circle'
- `radius` - Distance from button
- `showIcon` - Main button icon

**States**: closed, open

**Example**:
```tsx
import { SpeedDial } from 'primereact/speeddial';

const items = [
  { label: 'Add', icon: 'pi pi-plus', command: () => add() },
  { label: 'Edit', icon: 'pi pi-pencil', command: () => edit() },
  { label: 'Delete', icon: 'pi pi-trash', command: () => remove() }
];

<SpeedDial
  model={items}
  direction="up"
  style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
/>
```

**Docs**: https://primereact.org/speeddial/
