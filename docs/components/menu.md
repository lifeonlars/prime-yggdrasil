---
title: "Menu Components"
category: reference
tags: [components, primereact, menu, navigation, breadcrumb]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
  - yggdrasil-blocks.md
---

# Menu Components

Components for navigation and menus.

**Quick Links**: [Menu](#menu) | [Menubar](#menubar) | [MegaMenu](#megamenu) | [PanelMenu](#panelmenu) | [BreadCrumb](#breadcrumb) | [ContextMenu](#contextmenu) | [TieredMenu](#tieredmenu) | [SlideMenu](#slidemenu) | [Dock](#dock)

**Note**: For navigation tabs with extra controls (notifications, account menu), use Yggdrasil's [NavigationTabs](./yggdrasil-blocks.md#navigationtabs).

---

## Menu

**Use Cases**:
- Simple vertical menu
- Dropdown menu content
- Action list

**Key Props**:
- `model` - MenuItem array
- `popup` - Show as popup
- `ref` - Reference for toggle

**Example**:
```tsx
import { Menu } from 'primereact/menu';

const items = [
  { label: 'New', icon: 'pi pi-plus' },
  { label: 'Open', icon: 'pi pi-folder-open' },
  { separator: true },
  { label: 'Quit', icon: 'pi pi-power-off' }
];

// Inline menu
<Menu model={items} />

// Popup menu
const menuRef = useRef(null);
<Button label="Show" onClick={(e) => menuRef.current.toggle(e)} />
<Menu model={items} popup ref={menuRef} />
```

**Docs**: https://primereact.org/menu/

---

## Menubar

**Use Cases**:
- Top navigation bar
- Horizontal menu with dropdowns
- Main application navigation

**Key Props**:
- `model` - MenuItem array (nested for dropdowns)
- `start` - Left content (logo)
- `end` - Right content (buttons)

**Example**:
```tsx
import { Menubar } from 'primereact/menubar';

const items = [
  { label: 'Home', icon: 'pi pi-home' },
  {
    label: 'Products',
    icon: 'pi pi-box',
    items: [
      { label: 'Category A', items: [...] },
      { label: 'Category B' }
    ]
  },
  { label: 'Contact', icon: 'pi pi-envelope' }
];

<Menubar
  model={items}
  start={<img src="/logo.png" alt="Logo" />}
  end={<Button label="Login" />}
/>
```

**Docs**: https://primereact.org/menubar/

---

## MegaMenu

**Use Cases**:
- Large navigation with columns
- E-commerce category navigation
- Complex site navigation

**Key Props**:
- `model` - MegaMenuItem array
- `orientation` - 'horizontal'|'vertical'

**Example**:
```tsx
import { MegaMenu } from 'primereact/megamenu';

const items = [
  {
    label: 'Products',
    items: [
      [
        { label: 'Electronics', items: [{ label: 'Phones' }, { label: 'Tablets' }] }
      ],
      [
        { label: 'Clothing', items: [{ label: 'Shirts' }, { label: 'Pants' }] }
      ]
    ]
  }
];

<MegaMenu model={items} />
```

**Docs**: https://primereact.org/megamenu/

---

## PanelMenu

**Use Cases**:
- Vertical accordion menu
- Sidebar navigation
- Nested menu sections

**Key Props**:
- `model` - MenuItem array (nested)
- `multiple` - Allow multiple expanded

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
      { label: 'Security' }
    ]
  }
];

<PanelMenu model={items} />
```

**Docs**: https://primereact.org/panelmenu/

---

## BreadCrumb

**Use Cases**:
- Navigation path
- Page hierarchy
- Back navigation trail

**Key Props**:
- `model` - MenuItem array (path items)
- `home` - Home item

**Example**:
```tsx
import { BreadCrumb } from 'primereact/breadcrumb';

const items = [
  { label: 'Products' },
  { label: 'Electronics' },
  { label: 'Phones' }
];

const home = { icon: 'pi pi-home', url: '/' };

<BreadCrumb model={items} home={home} />
```

**Docs**: https://primereact.org/breadcrumb/

---

## ContextMenu

**Use Cases**:
- Right-click menu
- Context actions
- Row actions in tables

**Key Props**:
- `model` - MenuItem array
- `ref` - Reference for show
- `global` - Show on document right-click

**Example**:
```tsx
import { ContextMenu } from 'primereact/contextmenu';

const items = [
  { label: 'Copy', icon: 'pi pi-copy' },
  { label: 'Delete', icon: 'pi pi-trash' }
];

const cm = useRef(null);

<div onContextMenu={(e) => cm.current.show(e)}>
  Right-click here
</div>

<ContextMenu model={items} ref={cm} />
```

**Docs**: https://primereact.org/contextmenu/

---

## TieredMenu

**Use Cases**:
- Nested dropdown menu
- Multi-level navigation
- Category browsing

**Key Props**:
- `model` - MenuItem array (nested)
- `popup` - Popup mode
- `ref` - Reference for toggle

**Example**:
```tsx
import { TieredMenu } from 'primereact/tieredmenu';

const items = [
  {
    label: 'File',
    items: [
      { label: 'New', items: [{ label: 'Project' }, { label: 'Document' }] },
      { label: 'Open' }
    ]
  }
];

<TieredMenu model={items} />
```

**Docs**: https://primereact.org/tieredmenu/

---

## SlideMenu

**Use Cases**:
- Mobile-style nested menu
- Slide-in submenus
- Space-efficient navigation

**Key Props**:
- `model` - MenuItem array (nested)
- `viewportHeight` - Menu height
- `menuWidth` - Slide width

**Example**:
```tsx
import { SlideMenu } from 'primereact/slidemenu';

<SlideMenu model={items} viewportHeight={300} />
```

**Docs**: https://primereact.org/slidemenu/

---

## Dock

**Use Cases**:
- macOS-style dock
- Quick launch bar
- Floating action bar

**Key Props**:
- `model` - DockItem array
- `position` - 'top'|'bottom'|'left'|'right'

**Example**:
```tsx
import { Dock } from 'primereact/dock';

const items = [
  { label: 'Finder', icon: '/images/finder.png', command: () => {} },
  { label: 'Safari', icon: '/images/safari.png' }
];

<Dock model={items} position="bottom" />
```

**Docs**: https://primereact.org/dock/
