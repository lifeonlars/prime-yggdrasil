/**
 * Test Template: Component Composition
 *
 * Use this template for testing composite components:
 * - Components that render children
 * - Compound components (e.g., Accordion + AccordionTab)
 * - Components with multiple slots (header, footer, content)
 * - Higher-order components (HOCs)
 * - Render props patterns
 *
 * Coverage Requirements:
 * - Children rendered correctly
 * - Multiple children handled
 * - Slot content rendered in correct position
 * - Props passed through to children
 * - Context provided to children
 * - Nested composition works
 * - Custom render functions called with correct args
 *
 * Example Component: Card, Dialog, Accordion, DataTable with templates
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { YourComponent } from '@/path/to/component';

/**
 * TEMPLATE USAGE:
 * 1. Replace YourComponent with actual component import
 * 2. Identify slots (header, footer, content, actions, etc.)
 * 3. Test render props or template functions
 * 4. Verify context values passed to children
 * 5. Test nested composition scenarios
 */

describe('YourComponent (Composition)', () => {
  // ============================================================================
  // Children Rendering Tests
  // ============================================================================

  describe('Children Rendering', () => {
    it('renders children correctly', () => {
      render(
        <YourComponent>
          <div>Child Content</div>
        </YourComponent>
      );

      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <YourComponent>
          <div>First Child</div>
          <div>Second Child</div>
          <div>Third Child</div>
        </YourComponent>
      );

      expect(screen.getByText('First Child')).toBeInTheDocument();
      expect(screen.getByText('Second Child')).toBeInTheDocument();
      expect(screen.getByText('Third Child')).toBeInTheDocument();
    });

    it('renders text children', () => {
      render(<YourComponent>Plain text content</YourComponent>);

      expect(screen.getByText('Plain text content')).toBeInTheDocument();
    });

    it('renders complex nested children', () => {
      render(
        <YourComponent>
          <div>
            <h2>Heading</h2>
            <p>Paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </YourComponent>
      );

      expect(screen.getByRole('heading', { name: /heading/i })).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('handles no children gracefully', () => {
      render(<YourComponent />);

      // Should render without crashing
      const container = screen.getByTestId('component-container');
      expect(container).toBeInTheDocument();
    });

    it('handles null/undefined children', () => {
      render(
        <YourComponent>
          {null}
          {undefined}
          <div>Valid Child</div>
        </YourComponent>
      );

      expect(screen.getByText('Valid Child')).toBeInTheDocument();
    });

    it('handles conditional children', () => {
      const showOptional = false;

      render(
        <YourComponent>
          <div>Always Visible</div>
          {showOptional && <div>Optional</div>}
        </YourComponent>
      );

      expect(screen.getByText('Always Visible')).toBeInTheDocument();
      expect(screen.queryByText('Optional')).not.toBeInTheDocument();
    });
  });

  // ============================================================================
  // Slot/Named Content Tests
  // ============================================================================

  describe('Slots & Named Content', () => {
    it('renders header slot content', () => {
      render(
        <YourComponent
          header={<div>Custom Header</div>}
        >
          <div>Body Content</div>
        </YourComponent>
      );

      expect(screen.getByText('Custom Header')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('renders footer slot content', () => {
      render(
        <YourComponent
          footer={<div>Custom Footer</div>}
        >
          <div>Body Content</div>
        </YourComponent>
      );

      expect(screen.getByText('Custom Footer')).toBeInTheDocument();
    });

    it('renders multiple slots in correct order', () => {
      render(
        <YourComponent
          header={<div>Header</div>}
          footer={<div>Footer</div>}
        >
          <div>Body</div>
        </YourComponent>
      );

      const container = screen.getByTestId('component-container');
      const elements = container.querySelectorAll('div');

      expect(elements[0]).toHaveTextContent('Header');
      expect(elements[1]).toHaveTextContent('Body');
      expect(elements[2]).toHaveTextContent('Footer');
    });

    it('renders actions slot with buttons', () => {
      render(
        <YourComponent
          actions={
            <>
              <button>Cancel</button>
              <button>Save</button>
            </>
          }
        >
          <div>Form Content</div>
        </YourComponent>
      );

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    it('handles missing optional slots', () => {
      render(
        <YourComponent>
          <div>Body Content</div>
        </YourComponent>
      );

      expect(screen.getByText('Body Content')).toBeInTheDocument();
      expect(screen.queryByTestId('header-slot')).not.toBeInTheDocument();
      expect(screen.queryByTestId('footer-slot')).not.toBeInTheDocument();
    });

    it('applies correct styling to slotted content', () => {
      render(
        <YourComponent
          header={<div data-testid="header">Header</div>}
        >
          <div>Body</div>
        </YourComponent>
      );

      const header = screen.getByTestId('header');
      const styles = window.getComputedStyle(header.parentElement!);

      // Header slot should have specific styling
      expect(styles.borderBottom).toBeTruthy();
    });
  });

  // ============================================================================
  // Render Props / Templates Tests
  // ============================================================================

  describe('Render Props & Templates', () => {
    it('calls render function with correct data', () => {
      const mockRenderItem = vi.fn((item) => <div>{item.name}</div>);

      const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ];

      render(
        <YourComponent
          items={items}
          itemTemplate={mockRenderItem}
        />
      );

      expect(mockRenderItem).toHaveBeenCalledTimes(2);
      expect(mockRenderItem).toHaveBeenCalledWith(items[0], 0);
      expect(mockRenderItem).toHaveBeenCalledWith(items[1], 1);
    });

    it('renders custom item templates', () => {
      const items = [
        { id: 1, name: 'Apple', price: 1.99 },
        { id: 2, name: 'Banana', price: 0.99 }
      ];

      render(
        <YourComponent
          items={items}
          itemTemplate={(item) => (
            <div>
              <strong>{item.name}</strong>
              <span>${item.price}</span>
            </div>
          )}
        />
      );

      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('$1.99')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('$0.99')).toBeInTheDocument();
    });

    it('passes index to render function', () => {
      const mockRenderItem = vi.fn((item, index) => (
        <div>Item {index + 1}: {item.name}</div>
      ));

      const items = [{ name: 'First' }, { name: 'Second' }];

      render(
        <YourComponent
          items={items}
          itemTemplate={mockRenderItem}
        />
      );

      expect(screen.getByText('Item 1: First')).toBeInTheDocument();
      expect(screen.getByText('Item 2: Second')).toBeInTheDocument();
    });

    it('passes additional metadata to render function', () => {
      const mockRenderItem = vi.fn((item, options) => (
        <div>
          {item.name}
          {options.isFirst && <span> (First)</span>}
          {options.isLast && <span> (Last)</span>}
        </div>
      ));

      const items = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];

      render(
        <YourComponent
          items={items}
          itemTemplate={mockRenderItem}
        />
      );

      expect(screen.getByText('A (First)')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C (Last)')).toBeInTheDocument();
    });

    it('uses default template when custom template not provided', () => {
      const items = [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' }
      ];

      render(<YourComponent items={items} />);

      // Default template should render item.label
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('allows interactive elements in custom templates', async () => {
      const user = userEvent.setup();
      const mockEdit = vi.fn();

      const items = [{ id: 1, name: 'Item 1' }];

      render(
        <YourComponent
          items={items}
          itemTemplate={(item) => (
            <div>
              {item.name}
              <button onClick={() => mockEdit(item.id)}>Edit</button>
            </div>
          )}
        />
      );

      const editButton = screen.getByRole('button', { name: /edit/i });
      await user.click(editButton);

      expect(mockEdit).toHaveBeenCalledWith(1);
    });
  });

  // ============================================================================
  // Compound Components Tests
  // ============================================================================

  describe('Compound Components', () => {
    it('renders compound component children', () => {
      render(
        <YourComponent>
          <YourComponent.Tab label="Tab 1">
            <div>Tab 1 Content</div>
          </YourComponent.Tab>
          <YourComponent.Tab label="Tab 2">
            <div>Tab 2 Content</div>
          </YourComponent.Tab>
        </YourComponent>
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
    });

    it('shares state between compound components', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent activeIndex={0}>
          <YourComponent.Tab label="Tab 1">
            <div>Content 1</div>
          </YourComponent.Tab>
          <YourComponent.Tab label="Tab 2">
            <div>Content 2</div>
          </YourComponent.Tab>
        </YourComponent>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

      await user.click(screen.getByText('Tab 2'));

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('passes context to compound children', () => {
      render(
        <YourComponent theme="dark">
          <YourComponent.Header>
            <div data-testid="header">Header</div>
          </YourComponent.Header>
          <YourComponent.Content>
            <div data-testid="content">Content</div>
          </YourComponent.Content>
        </YourComponent>
      );

      const header = screen.getByTestId('header').parentElement;
      const content = screen.getByTestId('content').parentElement;

      expect(header).toHaveClass('dark-theme');
      expect(content).toHaveClass('dark-theme');
    });

    it('validates compound component children', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <YourComponent>
            <div>Invalid child</div>
          </YourComponent>
        );
      }).toThrow(/only accepts YourComponent.Tab children/i);

      consoleError.mockRestore();
    });

    it('allows nested compound components', () => {
      render(
        <YourComponent>
          <YourComponent.Section>
            <YourComponent.Header>Section 1</YourComponent.Header>
            <YourComponent.Content>
              <YourComponent.Item>Item 1</YourComponent.Item>
              <YourComponent.Item>Item 2</YourComponent.Item>
            </YourComponent.Content>
          </YourComponent.Section>
        </YourComponent>
      );

      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // Context Provider Tests
  // ============================================================================

  describe('Context Provider', () => {
    it('provides context to children', () => {
      const ChildComponent = () => {
        const context = useYourComponentContext();
        return <div>{context.value}</div>;
      };

      render(
        <YourComponent value="Test Value">
          <ChildComponent />
        </YourComponent>
      );

      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    it('updates context when props change', () => {
      const ChildComponent = () => {
        const context = useYourComponentContext();
        return <div>{context.value}</div>;
      };

      const { rerender } = render(
        <YourComponent value="Initial">
          <ChildComponent />
        </YourComponent>
      );

      expect(screen.getByText('Initial')).toBeInTheDocument();

      rerender(
        <YourComponent value="Updated">
          <ChildComponent />
        </YourComponent>
      );

      expect(screen.getByText('Updated')).toBeInTheDocument();
    });

    it('provides methods to children via context', async () => {
      const user = userEvent.setup();

      const ChildComponent = () => {
        const { close } = useYourComponentContext();
        return <button onClick={close}>Close</button>;
      };

      const mockOnClose = vi.fn();

      render(
        <YourComponent onClose={mockOnClose}>
          <ChildComponent />
        </YourComponent>
      );

      await user.click(screen.getByRole('button', { name: /close/i }));

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('throws error when context used outside provider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      const ChildComponent = () => {
        const context = useYourComponentContext();
        return <div>{context.value}</div>;
      };

      expect(() => {
        render(<ChildComponent />);
      }).toThrow(/useYourComponentContext must be used within YourComponent/i);

      consoleError.mockRestore();
    });
  });

  // ============================================================================
  // Props Pass-Through Tests
  // ============================================================================

  describe('Props Pass-Through', () => {
    it('passes className to root element', () => {
      render(
        <YourComponent className="custom-class">
          <div>Content</div>
        </YourComponent>
      );

      const container = screen.getByTestId('component-container');
      expect(container).toHaveClass('custom-class');
    });

    it('passes style prop to root element', () => {
      render(
        <YourComponent style={{ backgroundColor: 'red' }}>
          <div>Content</div>
        </YourComponent>
      );

      const container = screen.getByTestId('component-container');
      expect(container).toHaveStyle({ backgroundColor: 'red' });
    });

    it('passes data attributes through', () => {
      render(
        <YourComponent data-testid="custom-id" data-tracking="event">
          <div>Content</div>
        </YourComponent>
      );

      const container = screen.getByTestId('custom-id');
      expect(container).toHaveAttribute('data-tracking', 'event');
    });

    it('passes aria attributes through', () => {
      render(
        <YourComponent
          aria-label="Custom Label"
          aria-describedby="description"
        >
          <div>Content</div>
        </YourComponent>
      );

      const container = screen.getByTestId('component-container');
      expect(container).toHaveAttribute('aria-label', 'Custom Label');
      expect(container).toHaveAttribute('aria-describedby', 'description');
    });

    it('forwards ref to root element', () => {
      const ref = React.createRef<HTMLDivElement>();

      render(
        <YourComponent ref={ref}>
          <div>Content</div>
        </YourComponent>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveTextContent('Content');
    });

    it('spreads remaining props to root element', () => {
      render(
        <YourComponent
          id="unique-id"
          role="region"
          tabIndex={0}
        >
          <div>Content</div>
        </YourComponent>
      );

      const container = screen.getByTestId('component-container');
      expect(container).toHaveAttribute('id', 'unique-id');
      expect(container).toHaveAttribute('role', 'region');
      expect(container).toHaveAttribute('tabIndex', '0');
    });
  });

  // ============================================================================
  // Nested Composition Tests
  // ============================================================================

  describe('Nested Composition', () => {
    it('handles deeply nested children', () => {
      render(
        <YourComponent>
          <div>
            <div>
              <div>
                <div>Deeply Nested Content</div>
              </div>
            </div>
          </div>
        </YourComponent>
      );

      expect(screen.getByText('Deeply Nested Content')).toBeInTheDocument();
    });

    it('composes with other components', () => {
      render(
        <YourComponent>
          <OtherComponent>
            <div>Nested Component Content</div>
          </OtherComponent>
        </YourComponent>
      );

      expect(screen.getByText('Nested Component Content')).toBeInTheDocument();
    });

    it('maintains prop drilling through composition', () => {
      const Level1 = ({ theme, children }) => (
        <div data-theme={theme}>{children}</div>
      );

      const Level2 = ({ theme, children }) => (
        <div data-theme={theme}>{children}</div>
      );

      render(
        <YourComponent theme="dark">
          <Level1 theme="dark">
            <Level2 theme="dark">
              <div data-testid="deep-child">Content</div>
            </Level2>
          </Level1>
        </YourComponent>
      );

      const child = screen.getByTestId('deep-child');
      const level2 = child.parentElement;
      const level1 = level2?.parentElement;

      expect(level1).toHaveAttribute('data-theme', 'dark');
      expect(level2).toHaveAttribute('data-theme', 'dark');
    });
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('handles empty array of children', () => {
      render(<YourComponent>{[]}</YourComponent>);

      const container = screen.getByTestId('component-container');
      expect(container).toBeInTheDocument();
    });

    it('handles boolean children (true/false)', () => {
      render(
        <YourComponent>
          {true}
          {false}
          <div>Valid Child</div>
        </YourComponent>
      );

      expect(screen.getByText('Valid Child')).toBeInTheDocument();
    });

    it('handles Fragment children', () => {
      render(
        <YourComponent>
          <>
            <div>First</div>
            <div>Second</div>
          </>
        </YourComponent>
      );

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('handles children as function', () => {
      render(
        <YourComponent>
          {(props) => <div>Function child: {props.value}</div>}
        </YourComponent>
      );

      expect(screen.getByText(/function child/i)).toBeInTheDocument();
    });

    it('handles mixed children types', () => {
      render(
        <YourComponent>
          Plain text
          <div>Element</div>
          {null}
          {undefined}
          {false}
          <span>Another element</span>
        </YourComponent>
      );

      expect(screen.getByText('Plain text')).toBeInTheDocument();
      expect(screen.getByText('Element')).toBeInTheDocument();
      expect(screen.getByText('Another element')).toBeInTheDocument();
    });

    it('re-renders when children change', () => {
      const { rerender } = render(
        <YourComponent>
          <div>Original Child</div>
        </YourComponent>
      );

      expect(screen.getByText('Original Child')).toBeInTheDocument();

      rerender(
        <YourComponent>
          <div>Updated Child</div>
        </YourComponent>
      );

      expect(screen.queryByText('Original Child')).not.toBeInTheDocument();
      expect(screen.getByText('Updated Child')).toBeInTheDocument();
    });

    it('preserves child component state during parent re-render', () => {
      const StatefulChild = () => {
        const [count, setCount] = React.useState(0);
        return (
          <div>
            <span>Count: {count}</span>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
          </div>
        );
      };

      const Parent = ({ parentProp }) => (
        <YourComponent>
          <StatefulChild />
          <div>{parentProp}</div>
        </YourComponent>
      );

      const { rerender } = render(<Parent parentProp="Initial" />);

      const button = screen.getByRole('button', { name: /increment/i });
      fireEvent.click(button);

      expect(screen.getByText('Count: 1')).toBeInTheDocument();

      // Parent re-renders with different prop
      rerender(<Parent parentProp="Updated" />);

      // Child state should persist
      expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });
  });
});
