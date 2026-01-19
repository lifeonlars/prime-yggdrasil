# Testing Guide for Prime Yggdrasil

This guide helps you write effective tests for Yggdrasil components using our test templates.

## 🎯 Testing Philosophy

**Goal**: Ensure components work correctly, are accessible, and maintain design system consistency.

**Principles**:
1. Test behavior, not implementation
2. Write tests that catch regressions
3. Prioritize accessibility testing
4. Use templates for consistency
5. Keep tests maintainable

## 📁 Test Structure

```
tests/
├── templates/           # Test templates (copy & adapt)
│   ├── interaction.test.tsx      # Interactive components (buttons, tabs, menus)
│   ├── form.test.tsx             # Form inputs, validation
│   ├── accessibility.test.tsx    # ARIA, keyboard, screen readers
│   ├── state.test.tsx            # State management, effects
│   └── composition.test.tsx      # Children, slots, render props
├── components/          # Actual component tests
│   ├── Icon.test.tsx
│   ├── Flag.test.tsx
│   └── ...
└── blocks/             # Block component tests
    ├── Card.test.tsx
    ├── NavigationTabs.test.tsx
    └── ...
```

## 🚀 Quick Start

### 1. Choose the Right Template

| Component Type | Use Template |
|---------------|--------------|
| Buttons, tabs, menus, accordions | `interaction.test.tsx` |
| Inputs, dropdowns, forms | `form.test.tsx` |
| Any interactive component | `accessibility.test.tsx` (combine with above) |
| Stateful components, hooks | `state.test.tsx` |
| Containers, slots, render props | `composition.test.tsx` |

**Tip**: Most components need 2-3 templates combined.

### 2. Copy Template to Your Test File

```bash
# Example: Testing NavigationTabs (interactive component)
cp tests/templates/interaction.test.tsx tests/blocks/NavigationTabs.test.tsx
```

### 3. Replace Placeholders

```tsx
// In NavigationTabs.test.tsx

// ❌ Template placeholder
import { YourComponent } from '@/path/to/component';

// ✅ Replace with actual import
import { NavigationTabs } from '@/blocks/NavigationTabs';
```

### 4. Adapt Tests to Your Component

- Update prop names (`activeIndex`, `items`, `onChange`)
- Remove irrelevant tests
- Add component-specific tests
- Verify ARIA roles match component

### 5. Run Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test NavigationTabs.test.tsx

# Run in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## 📚 Template Usage Guide

### Template 1: Interaction Tests (`interaction.test.tsx`)

**Use for**: Buttons, tabs, menus, accordions, dialogs - anything users click/navigate.

**Coverage**:
- ✅ Props render correctly
- ✅ Click handlers called
- ✅ Keyboard navigation (Arrow keys, Enter, Space, Escape)
- ✅ Active/selected state styling
- ✅ Disabled state prevents interaction
- ✅ Focus management

**Example**:
```tsx
import { NavigationTabs } from '@/blocks/NavigationTabs';

it('calls onChange when tab clicked', () => {
  const handleChange = vi.fn();
  render(<NavigationTabs items={mockItems} activeIndex={0} onTabChange={handleChange} />);

  fireEvent.click(screen.getByText('Profile'));

  expect(handleChange).toHaveBeenCalledWith(1);
});
```

---

### Template 2: Form Tests (`form.test.tsx`)

**Use for**: InputText, Dropdown, Calendar, FileUpload, checkboxes, radios.

**Coverage**:
- ✅ Label associated with input (`htmlFor`/`id`)
- ✅ Value prop controls input (controlled)
- ✅ onChange called with correct value
- ✅ Validation states (error, `p-invalid` class)
- ✅ Error message linked via `aria-describedby`
- ✅ Disabled state prevents input
- ✅ Required field indicators

**Example**:
```tsx
import { FormField } from '@/blocks/FormField';

it('displays error message when error prop provided', () => {
  render(
    <FormField
      id="email"
      label="Email"
      value=""
      error="Invalid email address"
      onChange={() => {}}
    />
  );

  expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  const input = screen.getByLabelText('Email');
  expect(input).toHaveClass('p-invalid');
  expect(input).toHaveAttribute('aria-invalid', 'true');
});
```

---

### Template 3: Accessibility Tests (`accessibility.test.tsx`)

**Use for**: ALL components (combine with other templates).

**Coverage**:
- ✅ ARIA roles correct (`role="button"`, `role="tab"`, etc.)
- ✅ ARIA attributes (`aria-label`, `aria-expanded`, `aria-selected`)
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Screen reader announcements (`role="alert"`, `aria-live`)
- ✅ Semantic HTML (`<button>`, `<nav>`, `<label>`)
- ✅ Color contrast uses semantic tokens

**Example**:
```tsx
it('has correct ARIA role', () => {
  render(<NavigationTabs items={mockItems} activeIndex={0} />);

  expect(screen.getByRole('tablist')).toBeInTheDocument();
  expect(screen.getAllByRole('tab')).toHaveLength(3);
});

it('sets aria-selected on active tab', () => {
  render(<NavigationTabs items={mockItems} activeIndex={1} />);

  const tabs = screen.getAllByRole('tab');
  expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
});
```

---

### Template 4: State Management Tests (`state.test.tsx`)

**Use for**: Components with internal state, hooks, controlled/uncontrolled modes.

**Coverage**:
- ✅ Initial state set correctly
- ✅ Controlled mode: state follows props
- ✅ Uncontrolled mode: internal state works
- ✅ State updates trigger re-renders
- ✅ Side effects (useEffect) run correctly
- ✅ Cleanup functions called on unmount
- ✅ Derived state computed correctly

**Example**:
```tsx
it('updates UI when prop changes (controlled mode)', () => {
  const { rerender } = render(
    <Accordion expanded={false} onToggle={() => {}} />
  );

  expect(screen.queryByText('Content')).not.toBeInTheDocument();

  rerender(<Accordion expanded={true} onToggle={() => {}} />);

  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

---

### Template 5: Composition Tests (`composition.test.tsx`)

**Use for**: Components with children, slots (header/footer), render props, compound components.

**Coverage**:
- ✅ Children rendered correctly
- ✅ Slots render in correct positions
- ✅ Render props/templates called with correct data
- ✅ Context provided to children
- ✅ Props passed through to root element
- ✅ Compound components share state

**Example**:
```tsx
it('renders header slot content', () => {
  render(
    <Card
      header={<div>Custom Header</div>}
    >
      <div>Body Content</div>
    </Card>
  );

  expect(screen.getByText('Custom Header')).toBeInTheDocument();
  expect(screen.getByText('Body Content')).toBeInTheDocument();
});
```

---

## 🧪 Testing Best Practices

### 1. Use Testing Library Queries (Priority Order)

**Prefer accessible queries** (what users/screen readers see):
```tsx
// ✅ BEST: Accessible to everyone
screen.getByRole('button', { name: /save/i })
screen.getByLabelText('Email Address')
screen.getByText('Submit')

// ⚠️ OK: Fallback for non-semantic elements
screen.getByTestId('custom-component')

// ❌ AVOID: Tied to implementation
screen.getByClassName('p-button')
container.querySelector('.p-inputtext')
```

**Query Reference**:
- `getByRole` - Preferred for semantic elements
- `getByLabelText` - For form inputs
- `getByText` - For visible text
- `getByPlaceholderText` - For inputs with placeholder
- `getByTestId` - Last resort

**Query Variants**:
- `getBy*` - Throws error if not found (use for assertions)
- `queryBy*` - Returns null if not found (use for checking absence)
- `findBy*` - Async, waits for element (use for delayed rendering)

### 2. Test User Behavior, Not Implementation

```tsx
// ❌ BAD: Tests internal state
expect(component.state.isOpen).toBe(true);

// ✅ GOOD: Tests visible behavior
expect(screen.getByText('Expanded Content')).toBeInTheDocument();
```

```tsx
// ❌ BAD: Tests class names
expect(button).toHaveClass('p-button-primary');

// ✅ GOOD: Tests visual result
const styles = window.getComputedStyle(button);
expect(styles.backgroundColor).toMatch(/var\(--surface-brand-primary\)/);
```

### 3. Use userEvent for Realistic Interactions

```tsx
import userEvent from '@testing-library/user-event';

// ❌ AVOID: fireEvent (low-level, doesn't simulate real users)
fireEvent.click(button);

// ✅ PREFER: userEvent (realistic user interactions)
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'Hello');
await user.tab();
await user.keyboard('{Enter}');
```

### 4. Wait for Async Updates

```tsx
import { waitFor } from '@testing-library/react';

it('updates after async operation', async () => {
  render(<Component />);

  fireEvent.click(screen.getByText('Load Data'));

  // ✅ Wait for element to appear
  await waitFor(() => {
    expect(screen.getByText('Data Loaded')).toBeInTheDocument();
  });
});
```

### 5. Clean Up After Tests

```tsx
beforeEach(() => {
  mockOnChange.mockClear();
  vi.clearAllTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.setAttribute('data-theme', 'light'); // Reset theme
});
```

### 6. Group Related Tests

```tsx
describe('NavigationTabs', () => {
  describe('Rendering', () => {
    it('renders all tab items', () => { /* ... */ });
    it('renders icons when provided', () => { /* ... */ });
  });

  describe('Interactions', () => {
    it('calls onTabChange when clicked', () => { /* ... */ });
    it('supports keyboard navigation', () => { /* ... */ });
  });

  describe('Accessibility', () => {
    it('has correct ARIA roles', () => { /* ... */ });
    it('announces tab selection to screen readers', () => { /* ... */ });
  });
});
```

### 7. Test Edge Cases

```tsx
describe('Edge Cases', () => {
  it('handles empty items array', () => { /* ... */ });
  it('handles undefined value prop', () => { /* ... */ });
  it('handles disabled state', () => { /* ... */ });
  it('handles very long text', () => { /* ... */ });
  it('handles special characters', () => { /* ... */ });
});
```

---

## 🎨 Testing with Yggdrasil Design System

### Test Semantic Tokens (Not Hardcoded Colors)

```tsx
it('uses semantic tokens for colors', () => {
  render(<Button label="Click" />);

  const button = screen.getByRole('button');
  const styles = window.getComputedStyle(button);

  // ✅ Should use CSS variable
  expect(styles.backgroundColor).toMatch(/var\(--surface-brand-primary\)/);

  // ❌ Should NOT be hardcoded
  expect(styles.backgroundColor).not.toBe('#3B82F6');
});
```

### Test Dark Mode Support

```tsx
it('maintains contrast in dark mode', () => {
  // Set dark theme
  document.documentElement.setAttribute('data-theme', 'dark');

  render(<Component />);

  const element = screen.getByRole('button');
  const styles = window.getComputedStyle(element);

  // Semantic tokens ensure contrast in both themes
  expect(styles.color).toMatch(/var\(--text-/);

  // Clean up
  document.documentElement.setAttribute('data-theme', 'light');
});
```

### Test PrimeReact Component Usage

```tsx
it('uses PrimeReact Button (not custom)', () => {
  render(<MyComponent />);

  const button = screen.getByRole('button');

  // Should have PrimeReact class
  expect(button).toHaveClass('p-button');
});
```

---

## 🔍 Debugging Tests

### View Rendered Output

```tsx
import { screen } from '@testing-library/react';

// Print entire DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));
```

### Check What Queries Are Available

```tsx
import { logRoles } from '@testing-library/react';

const { container } = render(<Component />);
logRoles(container);
// Outputs: button: accessible name "Submit"
```

### Inspect Computed Styles

```tsx
const button = screen.getByRole('button');
const styles = window.getComputedStyle(button);
console.log(styles.backgroundColor);
console.log(styles.color);
```

---

## 📊 Coverage Goals

**Target Coverage**:
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

**Priority**:
1. 100% coverage for critical paths (form submission, data validation)
2. 100% accessibility coverage (ARIA, keyboard)
3. Edge cases and error states
4. Happy paths

**Check Coverage**:
```bash
npm test -- --coverage
```

**Coverage Report**:
```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
blocks/Card.tsx     |   92.5  |   87.5   |   100   |   92.5
blocks/FormField.tsx|   88.2  |   80.0   |   90.0  |   88.2
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't Test Implementation Details

```tsx
// ❌ BAD: Testing internal state
expect(wrapper.find('Button').prop('onClick')).toBeDefined();

// ✅ GOOD: Testing behavior
const button = screen.getByRole('button');
fireEvent.click(button);
expect(mockOnClick).toHaveBeenCalled();
```

### ❌ Don't Use Async Without Waiting

```tsx
// ❌ BAD: Doesn't wait for async update
fireEvent.click(button);
expect(screen.getByText('Loaded')).toBeInTheDocument(); // Fails!

// ✅ GOOD: Waits for async
await user.click(button);
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### ❌ Don't Query by Class Names

```tsx
// ❌ BAD: Brittle, tied to CSS
container.querySelector('.p-button-primary');

// ✅ GOOD: Semantic, accessible
screen.getByRole('button', { name: /save/i });
```

### ❌ Don't Forget Accessibility

```tsx
// ❌ BAD: Only tests visual
it('renders button', () => {
  render(<Button />);
  expect(screen.getByText('Click')).toBeInTheDocument();
});

// ✅ GOOD: Tests accessibility too
it('renders accessible button', () => {
  render(<Button label="Click" />);
  const button = screen.getByRole('button', { name: /click/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
});
```

---

## 📚 Additional Resources

**Testing Library Docs**:
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [User Event API](https://testing-library.com/docs/user-event/intro)
- [Query Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)

**Accessibility Testing**:
- [jest-axe](https://github.com/nickcolley/jest-axe) - Automated accessibility testing
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - ARIA patterns reference

**Yggdrasil Docs**:
- [AI-AGENT-GUIDE.md](../docs/AI-AGENT-GUIDE.md) - Component patterns
- [ACCESSIBILITY.md](../.ai/agents/accessibility.md) - Accessibility agent rules
- [Component Index](../docs/components/INDEX.md) - Component catalog

---

## 💡 Example: Complete Test File

Here's a real example combining multiple templates:

```tsx
// tests/blocks/NavigationTabs.test.tsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavigationTabs } from '@/blocks/NavigationTabs';

describe('NavigationTabs', () => {
  const mockItems = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' }
  ];

  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  // ==============================
  // Rendering Tests
  // ==============================

  describe('Rendering', () => {
    it('renders all tab items', () => {
      render(<NavigationTabs items={mockItems} activeIndex={0} onTabChange={mockOnChange} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('highlights active tab', () => {
      render(<NavigationTabs items={mockItems} activeIndex={1} onTabChange={mockOnChange} />);

      const profileTab = screen.getByText('Profile').closest('li');
      expect(profileTab).toHaveClass('p-highlight');
    });
  });

  // ==============================
  // Interaction Tests
  // ==============================

  describe('Interactions', () => {
    it('calls onTabChange when tab clicked', async () => {
      const user = userEvent.setup();

      render(<NavigationTabs items={mockItems} activeIndex={0} onTabChange={mockOnChange} />);

      await user.click(screen.getByText('Profile'));

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('supports keyboard navigation with Arrow keys', async () => {
      const user = userEvent.setup();

      render(<NavigationTabs items={mockItems} activeIndex={0} onTabChange={mockOnChange} />);

      const firstTab = screen.getByText('Home');
      firstTab.focus();

      await user.keyboard('{ArrowRight}');

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });
  });

  // ==============================
  // Accessibility Tests
  // ==============================

  describe('Accessibility', () => {
    it('has correct ARIA roles', () => {
      render(<NavigationTabs items={mockItems} activeIndex={0} onTabChange={mockOnChange} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('sets aria-selected on active tab', () => {
      render(<NavigationTabs items={mockItems} activeIndex={1} onTabChange={mockOnChange} />);

      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
    });
  });
});
```

---

## 🎯 Next Steps

1. **Choose a component to test**
2. **Copy relevant template(s)** from `tests/templates/`
3. **Replace placeholders** with your component
4. **Run tests** and fix failures
5. **Check coverage** with `npm test -- --coverage`
6. **Repeat** for all components

Happy testing! 🚀
