# PrimeReact Design System

A minimal, clean React design system built with Vite, PrimeReact, and Storybook.

## Stack

- **React 19** + **TypeScript** + **Vite** - Fast development environment
- **PrimeReact** - Comprehensive component library
- **PrimeIcons** - Icon library
- **Tailwind CSS** - Utility-first CSS (constrained usage for layout only)
- **Storybook** - Component development and documentation
- **Chromatic** - Visual testing and publishing

## Getting Started

```bash
# Install dependencies
npm install

# Run the app
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build

# Build Storybook
npm run build-storybook

# Publish to Chromatic
npm run chromatic
```

## Project Structure

```
src/
├── components/
│   └── blocks/                      # Reusable UI blocks
│       ├── Card.tsx
│       ├── PageHeader.tsx
│       ├── SectionTitle.tsx
│       └── FormField.tsx
├── pages/
│   └── DesignSystemPlayground.tsx  # Main demo page
├── stories/                         # Storybook stories
│   ├── Button.stories.tsx          # Primitives
│   ├── InputText.stories.tsx
│   ├── Dropdown.stories.tsx
│   ├── Tag.stories.tsx
│   ├── Dialog.stories.tsx
│   ├── DataTable.stories.tsx
│   └── Card.stories.tsx            # Blocks
└── styles/
    └── app.css                      # Tailwind imports + minimal custom styles
```

## Theme Configuration

The project uses the **Lara Light Blue** theme from PrimeReact. Theme imports are centralized in:
- [src/main.tsx](src/main.tsx) - For the app
- [.storybook/preview.ts](.storybook/preview.ts) - For Storybook

To change themes, update the theme import in both files:
```typescript
import 'primereact/resources/themes/lara-light-blue/theme.css'
```

## Sample Components

The playground includes examples of:
- **Button** - Various button styles and severities
- **InputText** - Text input with validation states
- **Dropdown** - Select component with options
- **Tag** - Status tags and chips
- **Dialog** - Modal dialogs
- **DataTable** - Data tables with sorting and pagination

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build Storybook for deployment
- `npm run chromatic` - Publish Storybook to Chromatic

## Chromatic Setup

To publish to Chromatic:

1. Sign up at [chromatic.com](https://www.chromatic.com/)
2. Create a new project and get your project token
3. Run: `npm run chromatic -- --project-token=<your-token>`

## Architecture & Styling Policy

This project follows a **design-system-first, component-driven architecture**. See [agentic_ui_architecture_tailwind_policy.md](agentic_ui_architecture_tailwind_policy.md) for full details.

### Key Principles

1. **Primitives (PrimeReact)** - Base UI components (buttons, inputs, tables, etc.)
2. **Blocks** - Reusable UI compositions built on primitives
3. **Views** - Screens that compose blocks with minimal styling

### Tailwind Usage Policy

**Tailwind is allowed ONLY for layout in views**, not visual styling:

**Allowed in views:**
- Layout: `flex`, `grid`, `gap-*`, `grid-cols-*`
- Alignment: `items-*`, `justify-*`
- Responsiveness: `sm:*`, `md:*`, `lg:*`
- Sizing: `w-full`, `min-h-*`, `max-w-*`
- Page padding: `p-3`, `p-4` (outer page spacing only)

**Forbidden in views:**
- Colors: `bg-*`, `text-*`, `border-*`
- Typography: `text-sm`, `font-*`, `leading-*`
- Visual styling: `rounded-*`, `shadow-*`, `ring-*`
- Ad-hoc spacing: `px-*`, `py-*`, `mt-*`, `mb-*` (belongs in blocks)
- Arbitrary values: `w-[123px]`, `text-[#abc]`

**Visual styling belongs in:**
- PrimeReact components and their props
- Block components (in `src/components/blocks/`)
- PrimeReact theme configuration

### Example: Correct Usage

```tsx
// View - Layout only
export function MyView() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>Content</Card>
      </div>
    </div>
  )
}

// Block - Visual styling allowed
export function Card({ children }: CardProps) {
  return (
    <div className="surface-card p-4 shadow-2 border-round">
      {children}
    </div>
  )
}
```
