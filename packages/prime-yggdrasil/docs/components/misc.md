---
title: "Misc Components"
category: reference
tags: [components, primereact, misc, avatar, badge, progress, skeleton]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
---

# Misc Components

Utility components for various UI needs.

**Quick Links**: [Avatar](#avatar) | [AvatarGroup](#avatargroup) | [Badge](#badge) | [Tag](#tag) | [Chip](#chip) | [ProgressBar](#progressbar) | [ProgressSpinner](#progressspinner) | [Skeleton](#skeleton) | [BlockUI](#blockui) | [Divider](#divider) | [Paginator](#paginator) | [Toolbar](#toolbar) | [Terminal](#terminal)

---

## Avatar

**Use Cases**:
- User profile picture
- Contact thumbnail
- Initials display

**Key Props**:
- `image` - Image URL
- `label` - Text/initials
- `icon` - Icon class
- `size` - 'normal'|'large'|'xlarge'
- `shape` - 'square'|'circle'

**Example**:
```tsx
import { Avatar } from 'primereact/avatar';

// Image avatar
<Avatar image="/images/user.jpg" shape="circle" />

// Initials
<Avatar label="JD" size="large" shape="circle" />

// Icon
<Avatar icon="pi pi-user" size="xlarge" />
```

**Docs**: https://primereact.org/avatar/

---

## AvatarGroup

**Use Cases**:
- Display multiple avatars
- Team members list
- Participant list

**Example**:
```tsx
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';

<AvatarGroup>
  <Avatar image="/images/user1.jpg" shape="circle" />
  <Avatar image="/images/user2.jpg" shape="circle" />
  <Avatar image="/images/user3.jpg" shape="circle" />
  <Avatar label="+5" shape="circle" />
</AvatarGroup>
```

**Docs**: https://primereact.org/avatargroup/

---

## Badge

**Use Cases**:
- Notification count
- Status indicator
- Counter overlay

**Key Props**:
- `value` - Badge text/number
- `severity` - 'success'|'info'|'warning'|'danger'
- `size` - 'normal'|'large'|'xlarge'

**Example**:
```tsx
import { Badge } from 'primereact/badge';

// Standalone badge
<Badge value="5" severity="danger" />

// On icon (using CSS class)
<i className="pi pi-bell p-overlay-badge">
  <Badge value="3" severity="danger" />
</i>

// On button
<Button label="Messages">
  <Badge value="8" />
</Button>
```

**Docs**: https://primereact.org/badge/

---

## Tag

**Use Cases**:
- Status labels
- Category tags
- Metadata display

**Key Props**:
- `value` - Tag text
- `severity` - 'success'|'info'|'warning'|'danger'
- `icon` - Icon class
- `rounded` - Rounded style

**Example**:
```tsx
import { Tag } from 'primereact/tag';

<Tag value="New" severity="success" />
<Tag value="Pending" severity="warning" />
<Tag value="Rejected" severity="danger" />
<Tag value="Info" icon="pi pi-info-circle" />
```

**Docs**: https://primereact.org/tag/

---

## Chip

**Use Cases**:
- Removable tags
- Selected items display
- Filter chips

**Key Props**:
- `label` - Chip text
- `icon` - Icon class
- `image` - Image URL
- `removable` - Show remove button
- `onRemove` - Remove handler

**Example**:
```tsx
import { Chip } from 'primereact/chip';

// Basic chip
<Chip label="React" />

// With icon
<Chip label="Active" icon="pi pi-check" />

// Removable
<Chip label="Typescript" removable onRemove={() => handleRemove()} />

// With image
<Chip label="John Doe" image="/images/user.jpg" />
```

**Docs**: https://primereact.org/chip/

---

## ProgressBar

**Use Cases**:
- File upload progress
- Task completion
- Loading indicator with progress

**Key Props**:
- `value` - Progress percentage (0-100)
- `showValue` - Show percentage text
- `mode` - 'determinate'|'indeterminate'
- `color` - Custom color

**Example**:
```tsx
import { ProgressBar } from 'primereact/progressbar';

// Determinate (known progress)
<ProgressBar value={uploadProgress} />

// Indeterminate (unknown duration)
<ProgressBar mode="indeterminate" style={{ height: '6px' }} />

// Custom display
<ProgressBar value={75} displayValueTemplate={(value) => `${value}% complete`} />
```

**Docs**: https://primereact.org/progressbar/

---

## ProgressSpinner

**Use Cases**:
- Loading indicator
- Async operation in progress
- Page loading

**Key Props**:
- `style` - Custom size (width/height)
- `strokeWidth` - Line thickness
- `animationDuration` - Speed

**Example**:
```tsx
import { ProgressSpinner } from 'primereact/progressspinner';

// Default spinner
<ProgressSpinner />

// Custom size
<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
```

**Docs**: https://primereact.org/progressspinner/

---

## Skeleton

**Use Cases**:
- Loading placeholder
- Content shimmer
- Layout preview

**Key Props**:
- `shape` - 'rectangle'|'circle'
- `size` - Quick size for circle
- `width`, `height` - Dimensions
- `animation` - 'wave'|'none'

**Example**:
```tsx
import { Skeleton } from 'primereact/skeleton';

// Text skeleton
<Skeleton width="100%" height="1rem" />
<Skeleton width="75%" height="1rem" />

// Circle (avatar placeholder)
<Skeleton shape="circle" size="4rem" />

// Card skeleton
<div style={{ display: 'flex', gap: '1rem' }}>
  <Skeleton shape="circle" size="4rem" />
  <div>
    <Skeleton width="10rem" height="1rem" />
    <Skeleton width="6rem" height="1rem" />
  </div>
</div>
```

**Docs**: https://primereact.org/skeleton/

---

## BlockUI

**Use Cases**:
- Block section during operation
- Disable form while submitting
- Loading overlay

**Key Props**:
- `blocked` - Enable/disable blocking
- `fullScreen` - Block entire screen
- `template` - Custom overlay content

**Example**:
```tsx
import { BlockUI } from 'primereact/blockui';

<BlockUI blocked={isSubmitting}>
  <form>
    {/* Form content */}
  </form>
</BlockUI>

// With custom template
<BlockUI blocked={loading} template={<ProgressSpinner />}>
  <DataTable value={data} />
</BlockUI>
```

**Docs**: https://primereact.org/blockui/

---

## Divider

**Use Cases**:
- Section separator
- Content divider
- Text divider

**Key Props**:
- `layout` - 'horizontal'|'vertical'
- `align` - 'left'|'center'|'right'|'top'|'bottom'
- `type` - 'solid'|'dashed'|'dotted'

**Example**:
```tsx
import { Divider } from 'primereact/divider';

// Simple divider
<Divider />

// With text
<Divider align="center">
  <span>OR</span>
</Divider>

// Vertical divider
<div style={{ display: 'flex' }}>
  <span>Left</span>
  <Divider layout="vertical" />
  <span>Right</span>
</div>
```

**Docs**: https://primereact.org/divider/

---

## Paginator

**Use Cases**:
- Data table pagination (standalone)
- Custom list pagination
- Page navigation

**Key Props**:
- `first` - First row index
- `rows` - Rows per page
- `totalRecords` - Total item count
- `onPageChange` - Page change handler
- `rowsPerPageOptions` - Page size options

**Example**:
```tsx
import { Paginator } from 'primereact/paginator';

<Paginator
  first={first}
  rows={rows}
  totalRecords={120}
  rowsPerPageOptions={[10, 20, 30]}
  onPageChange={(e) => {
    setFirst(e.first);
    setRows(e.rows);
  }}
/>
```

**Docs**: https://primereact.org/paginator/

---

## Toolbar

**Use Cases**:
- Action bar
- Button group container
- Form toolbar

**Key Props**:
- `start` - Left content
- `center` - Center content
- `end` - Right content

**Example**:
```tsx
import { Toolbar } from 'primereact/toolbar';

const leftContent = (
  <>
    <Button label="New" icon="pi pi-plus" />
    <Button label="Edit" icon="pi pi-pencil" />
  </>
);

const rightContent = (
  <Button label="Export" icon="pi pi-download" />
);

<Toolbar start={leftContent} end={rightContent} />
```

**Docs**: https://primereact.org/toolbar/

---

## Terminal

**Use Cases**:
- Command line interface
- Log viewer
- Interactive console

**Key Props**:
- `welcomeMessage` - Initial message
- `prompt` - Command prompt text
- `commandHandler` - Process commands

**Example**:
```tsx
import { Terminal } from 'primereact/terminal';

const commandHandler = (text) => {
  // Process command, return response
  return `Executed: ${text}`;
};

<Terminal
  welcomeMessage="Welcome to PrimeReact terminal"
  prompt="primereact $"
  commandHandler={commandHandler}
/>
```

**Docs**: https://primereact.org/terminal/
