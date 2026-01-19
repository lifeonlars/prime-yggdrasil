---
title: "Panel Components"
category: reference
tags: [components, primereact, panel, card, tabs, accordion]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
  - yggdrasil-blocks.md
---

# Panel Components

Components for organizing and containing content.

**Quick Links**: [Card](#card) | [TabView](#tabview) | [Accordion](#accordion) | [Steps](#steps) | [Fieldset](#fieldset) | [Panel](#panel) | [ScrollPanel](#scrollpanel) | [Splitter](#splitter)

**Note**: For themed cards, use Yggdrasil's [Card](./yggdrasil-blocks.md#card) block. For navigation tabs with controls, use [NavigationTabs](./yggdrasil-blocks.md#navigationtabs).

---

## Card

**Use Cases**:
- Content container with header/footer
- Product card, user card
- Dashboard widget

**Key Props**:
- `title` - Card title
- `subTitle` - Subtitle
- `header` - Custom header JSX
- `footer` - Custom footer JSX

**Example**:
```tsx
import { Card } from 'primereact/card';

<Card
  title="User Profile"
  subTitle="Personal Information"
  footer={<Button label="Edit" />}
>
  <p>John Doe - john@example.com</p>
</Card>
```

**Docs**: https://primereact.org/card/

---

## TabView

**Use Cases**:
- Organize content into tabs
- Multi-step content (non-linear)
- Settings pages

**Key Props**:
- `activeIndex` - Active tab index
- `onTabChange` - Tab change handler
- Children: `<TabPanel header="Tab Name">`

**States**: tab selected, tab disabled

**Example**:
```tsx
import { TabView, TabPanel } from 'primereact/tabview';

<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
  <TabPanel header="General">
    <p>General settings content</p>
  </TabPanel>
  <TabPanel header="Security">
    <p>Security settings content</p>
  </TabPanel>
  <TabPanel header="Notifications" disabled>
    <p>Notification settings</p>
  </TabPanel>
</TabView>
```

**Docs**: https://primereact.org/tabview/

---

## Accordion

**Use Cases**:
- Collapsible sections
- FAQ page
- Settings groups

**Key Props**:
- `activeIndex` - Open panel(s)
- `onTabChange` - Toggle handler
- `multiple` - Allow multiple open
- Children: `<AccordionTab header="Section">`

**States**: expanded, collapsed

**Example**:
```tsx
import { Accordion, AccordionTab } from 'primereact/accordion';

<Accordion multiple activeIndex={[0]}>
  <AccordionTab header="General Information">
    <p>General content here</p>
  </AccordionTab>
  <AccordionTab header="Advanced Settings">
    <p>Advanced content here</p>
  </AccordionTab>
</Accordion>
```

**Docs**: https://primereact.org/accordion/

---

## Steps

**Use Cases**:
- Multi-step wizard
- Checkout process
- Onboarding flow

**Key Props**:
- `model` - Step items array
- `activeIndex` - Current step
- `onSelect` - Step select handler
- `readOnly` - Prevent clicking steps

**States**: current, completed, upcoming

**Example**:
```tsx
import { Steps } from 'primereact/steps';

const items = [
  { label: 'Personal Info' },
  { label: 'Account Details' },
  { label: 'Confirmation' }
];

<Steps
  model={items}
  activeIndex={activeIndex}
  onSelect={(e) => setActiveIndex(e.index)}
/>
```

**Docs**: https://primereact.org/steps/

---

## Fieldset

**Use Cases**:
- Group related form fields
- Section with border
- Collapsible section

**Key Props**:
- `legend` - Section title
- `toggleable` - Enable collapse
- `collapsed` - Collapsed state
- `onToggle` - Toggle handler

**Example**:
```tsx
import { Fieldset } from 'primereact/fieldset';

<Fieldset legend="Personal Information" toggleable>
  <InputText placeholder="Name" />
  <InputText placeholder="Email" />
</Fieldset>
```

**Docs**: https://primereact.org/fieldset/

---

## Panel

**Use Cases**:
- Content panel with header
- Collapsible content section

**Key Props**:
- `header` - Panel title
- `toggleable` - Enable collapse
- `collapsed` - Collapsed state
- `onToggle` - Toggle handler

**Example**:
```tsx
import { Panel } from 'primereact/panel';

<Panel header="Details" toggleable>
  <p>Panel content here</p>
</Panel>
```

**Docs**: https://primereact.org/panel/

---

## ScrollPanel

**Use Cases**:
- Custom scrollbar area
- Fixed-height scrollable content

**Key Props**:
- `style` - Container style (set height)

**Example**:
```tsx
import { ScrollPanel } from 'primereact/scrollpanel';

<ScrollPanel style={{ width: '100%', height: '300px' }}>
  <p>Long scrollable content...</p>
</ScrollPanel>
```

**Docs**: https://primereact.org/scrollpanel/

---

## Splitter

**Use Cases**:
- Resizable panels
- Split view layouts
- Code editor + preview

**Key Props**:
- `layout` - 'horizontal'|'vertical'
- Children: `<SplitterPanel size={50}>`

**Example**:
```tsx
import { Splitter, SplitterPanel } from 'primereact/splitter';

<Splitter style={{ height: '400px' }}>
  <SplitterPanel size={30}>
    <p>Left panel</p>
  </SplitterPanel>
  <SplitterPanel size={70}>
    <p>Right panel</p>
  </SplitterPanel>
</Splitter>
```

**Docs**: https://primereact.org/splitter/
