/**
 * Test Template: Interactive Components
 *
 * Use this template for components with user interactions:
 * - Buttons, menus, tabs, accordions, dialogs
 * - Click, hover, keyboard navigation
 * - State changes from user input
 *
 * Coverage Requirements:
 * - Props render correctly
 * - Click/interaction handlers called
 * - Keyboard accessibility (Enter, Space, Arrow keys, ESC)
 * - State updates reflected in UI
 * - ARIA attributes present and correct
 * - Focus management works
 *
 * Example Component: NavigationTabs, Button, Dialog, Menu
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { YourComponent } from '@/path/to/component';

/**
 * TEMPLATE USAGE:
 * 1. Replace YourComponent with actual component import
 * 2. Update test data (mockItems, mockProps)
 * 3. Add/remove tests based on component features
 * 4. Update selectors (screen.getBy*, role queries)
 * 5. Verify ARIA attributes match component implementation
 */

describe('YourComponent (Interactive)', () => {
  // ============================================================================
  // Test Data Setup
  // ============================================================================

  const mockItems = [
    { label: 'Item 1', icon: 'pi pi-home', value: 'item1' },
    { label: 'Item 2', icon: 'pi pi-user', value: 'item2' },
    { label: 'Item 3', icon: 'pi pi-cog', value: 'item3' }
  ];

  const mockOnChange = vi.fn();
  const mockOnClick = vi.fn();

  // Reset mocks before each test
  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnClick.mockClear();
  });

  // ============================================================================
  // Rendering Tests
  // ============================================================================

  describe('Rendering', () => {
    it('renders all items correctly', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders with icons when provided', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const item1 = screen.getByText('Item 1').closest('li');
      expect(item1?.querySelector('.pi-home')).toBeInTheDocument();
    });

    it('applies active class to selected item', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={1}
          onChange={mockOnChange}
        />
      );

      const item2 = screen.getByText('Item 2').closest('li');
      expect(item2).toHaveClass('p-highlight');
    });

    it('renders disabled state correctly', () => {
      const disabledItems = [
        { label: 'Item 1', disabled: true },
        { label: 'Item 2' }
      ];

      render(
        <YourComponent
          items={disabledItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const item1 = screen.getByText('Item 1').closest('li');
      expect(item1).toHaveClass('p-disabled');
    });
  });

  // ============================================================================
  // Interaction Tests - Mouse/Click
  // ============================================================================

  describe('Mouse Interactions', () => {
    it('calls onChange when item clicked', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByText('Item 2'));

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('does not call onChange when disabled item clicked', () => {
      const disabledItems = [
        { label: 'Item 1' },
        { label: 'Item 2', disabled: true }
      ];

      render(
        <YourComponent
          items={disabledItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByText('Item 2'));

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when clicking already active item', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      fireEvent.click(screen.getByText('Item 1'));

      // Behavior depends on component - adjust as needed
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  // ============================================================================
  // Keyboard Accessibility Tests
  // ============================================================================

  describe('Keyboard Navigation', () => {
    it('navigates to next item with ArrowRight', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const firstItem = screen.getByText('Item 1');
      firstItem.focus();

      await user.keyboard('{ArrowRight}');

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('navigates to previous item with ArrowLeft', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent
          items={mockItems}
          activeIndex={1}
          onChange={mockOnChange}
        />
      );

      const secondItem = screen.getByText('Item 2');
      secondItem.focus();

      await user.keyboard('{ArrowLeft}');

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('activates item with Enter key', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const secondItem = screen.getByText('Item 2');
      secondItem.focus();

      await user.keyboard('{Enter}');

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('activates item with Space key', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const secondItem = screen.getByText('Item 2');
      secondItem.focus();

      await user.keyboard(' ');

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('wraps to first item when at end and ArrowRight pressed', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent
          items={mockItems}
          activeIndex={2}
          onChange={mockOnChange}
        />
      );

      const lastItem = screen.getByText('Item 3');
      lastItem.focus();

      await user.keyboard('{ArrowRight}');

      // Behavior: wrap to first item
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('wraps to last item when at start and ArrowLeft pressed', async () => {
      const user = userEvent.setup();

      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const firstItem = screen.getByText('Item 1');
      firstItem.focus();

      await user.keyboard('{ArrowLeft}');

      // Behavior: wrap to last item
      expect(mockOnChange).toHaveBeenCalledWith(2);
    });

    it('skips disabled items during keyboard navigation', async () => {
      const user = userEvent.setup();
      const itemsWithDisabled = [
        { label: 'Item 1' },
        { label: 'Item 2', disabled: true },
        { label: 'Item 3' }
      ];

      render(
        <YourComponent
          items={itemsWithDisabled}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const firstItem = screen.getByText('Item 1');
      firstItem.focus();

      await user.keyboard('{ArrowRight}');

      // Should skip Item 2 (disabled) and go to Item 3
      expect(mockOnChange).toHaveBeenCalledWith(2);
    });
  });

  // ============================================================================
  // Focus Management Tests
  // ============================================================================

  describe('Focus Management', () => {
    it('sets focus to active item on mount', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={1}
          onChange={mockOnChange}
        />
      );

      const activeItem = screen.getByText('Item 2');
      expect(activeItem).toHaveFocus();
    });

    it('maintains focus after state change', async () => {
      const { rerender } = render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const firstItem = screen.getByText('Item 1');
      firstItem.focus();

      // Simulate state change
      rerender(
        <YourComponent
          items={mockItems}
          activeIndex={1}
          onChange={mockOnChange}
        />
      );

      await waitFor(() => {
        const secondItem = screen.getByText('Item 2');
        expect(secondItem).toHaveFocus();
      });
    });

    it('allows manual Tab navigation to move focus away', async () => {
      const user = userEvent.setup();

      render(
        <>
          <YourComponent
            items={mockItems}
            activeIndex={0}
            onChange={mockOnChange}
          />
          <button>Next Element</button>
        </>
      );

      const firstItem = screen.getByText('Item 1');
      firstItem.focus();

      await user.tab();

      const nextButton = screen.getByText('Next Element');
      expect(nextButton).toHaveFocus();
    });
  });

  // ============================================================================
  // ARIA Attributes Tests
  // ============================================================================

  describe('ARIA Attributes', () => {
    it('has correct role attributes', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      // Adjust role based on component (tablist, menu, listbox, etc.)
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('sets aria-selected on active item', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={1}
          onChange={mockOnChange}
        />
      );

      const items = screen.getAllByRole('tab');
      expect(items[0]).toHaveAttribute('aria-selected', 'false');
      expect(items[1]).toHaveAttribute('aria-selected', 'true');
      expect(items[2]).toHaveAttribute('aria-selected', 'false');
    });

    it('sets aria-disabled on disabled items', () => {
      const disabledItems = [
        { label: 'Item 1' },
        { label: 'Item 2', disabled: true }
      ];

      render(
        <YourComponent
          items={disabledItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      const items = screen.getAllByRole('tab');
      expect(items[0]).not.toHaveAttribute('aria-disabled');
      expect(items[1]).toHaveAttribute('aria-disabled', 'true');
    });

    it('has aria-label or aria-labelledby for screen readers', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
          aria-label="Navigation tabs"
        />
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Navigation tabs');
    });
  });

  // ============================================================================
  // State Updates Tests
  // ============================================================================

  describe('State Updates', () => {
    it('updates UI when activeIndex prop changes', () => {
      const { rerender } = render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      let item1 = screen.getByText('Item 1').closest('li');
      expect(item1).toHaveClass('p-highlight');

      rerender(
        <YourComponent
          items={mockItems}
          activeIndex={1}
          onChange={mockOnChange}
        />
      );

      item1 = screen.getByText('Item 1').closest('li');
      const item2 = screen.getByText('Item 2').closest('li');

      expect(item1).not.toHaveClass('p-highlight');
      expect(item2).toHaveClass('p-highlight');
    });

    it('updates when items array changes', () => {
      const { rerender } = render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      expect(screen.getAllByRole('tab')).toHaveLength(3);

      const newItems = [...mockItems, { label: 'Item 4', value: 'item4' }];

      rerender(
        <YourComponent
          items={newItems}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      expect(screen.getAllByRole('tab')).toHaveLength(4);
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      render(
        <YourComponent
          items={[]}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    });

    it('handles single item', () => {
      render(
        <YourComponent
          items={[mockItems[0]]}
          activeIndex={0}
          onChange={mockOnChange}
        />
      );

      expect(screen.getAllByRole('tab')).toHaveLength(1);
    });

    it('handles invalid activeIndex (negative)', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={-1}
          onChange={mockOnChange}
        />
      );

      // Should not crash, might default to 0 or have no selection
      const items = screen.getAllByRole('tab');
      items.forEach(item => {
        expect(item).not.toHaveClass('p-highlight');
      });
    });

    it('handles invalid activeIndex (out of bounds)', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={99}
          onChange={mockOnChange}
        />
      );

      // Should not crash
      const items = screen.getAllByRole('tab');
      items.forEach(item => {
        expect(item).not.toHaveClass('p-highlight');
      });
    });

    it('handles missing onChange handler gracefully', () => {
      render(
        <YourComponent
          items={mockItems}
          activeIndex={0}
        />
      );

      // Should not crash when clicking
      expect(() => {
        fireEvent.click(screen.getByText('Item 2'));
      }).not.toThrow();
    });
  });
});
