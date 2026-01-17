/**
 * Test Template: State Management
 *
 * Use this template for components with complex state:
 * - Internal state changes
 * - Controlled vs uncontrolled modes
 * - State synchronization with props
 * - Side effects (useEffect)
 * - State derived from props
 *
 * Coverage Requirements:
 * - Initial state set correctly
 * - State updates trigger re-renders
 * - Controlled mode: state follows prop changes
 * - Uncontrolled mode: internal state works independently
 * - Prop changes trigger state synchronization
 * - Side effects run at correct times
 * - Cleanup functions called on unmount
 *
 * Example Component: Accordion, Dialog, Dropdown, any stateful component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { YourComponent } from '@/path/to/component';

/**
 * TEMPLATE USAGE:
 * 1. Replace YourComponent with actual component import
 * 2. Identify whether component supports controlled/uncontrolled modes
 * 3. Update state property names (open, visible, expanded, etc.)
 * 4. Add tests for component-specific state behavior
 * 5. Test side effects (API calls, timers, subscriptions)
 */

describe('YourComponent (State Management)', () => {
  // ============================================================================
  // Test Setup
  // ============================================================================

  const mockOnChange = vi.fn();
  const mockOnStateChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnStateChange.mockClear();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ============================================================================
  // Initial State Tests
  // ============================================================================

  describe('Initial State', () => {
    it('sets default state when no prop provided', () => {
      render(<YourComponent />);

      // Component should have default closed/collapsed state
      expect(screen.queryByText('Expanded Content')).not.toBeInTheDocument();
    });

    it('respects initial state from prop', () => {
      render(<YourComponent defaultOpen={true} />);

      expect(screen.getByText('Expanded Content')).toBeInTheDocument();
    });

    it('uses prop value as initial state in controlled mode', () => {
      render(<YourComponent open={true} onOpenChange={mockOnChange} />);

      expect(screen.getByText('Expanded Content')).toBeInTheDocument();
    });

    it('initializes derived state correctly', () => {
      const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ];

      render(<YourComponent items={items} />);

      // Derived state (e.g., selected count) should be calculated
      expect(screen.getByText('0 selected')).toBeInTheDocument();
    });

    it('handles undefined initial prop gracefully', () => {
      render(<YourComponent value={undefined} />);

      // Should default to empty or initial state
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('handles null initial prop gracefully', () => {
      render(<YourComponent value={null} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });

  // ============================================================================
  // Controlled Mode Tests
  // ============================================================================

  describe('Controlled Mode', () => {
    it('updates UI when prop changes', () => {
      const { rerender } = render(
        <YourComponent open={false} onOpenChange={mockOnChange} />
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      rerender(<YourComponent open={true} onOpenChange={mockOnChange} />);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('does not update state internally when controlled', async () => {
      const user = userEvent.setup();

      render(<YourComponent open={false} onOpenChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // Should call callback but not change state internally
      expect(mockOnChange).toHaveBeenCalledWith(true);
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('synchronizes state with prop changes', () => {
      const { rerender } = render(
        <YourComponent value="" onChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');

      rerender(<YourComponent value="New Value" onChange={mockOnChange} />);

      expect(input.value).toBe('New Value');
    });

    it('calls onChange with new state', async () => {
      const user = userEvent.setup();

      render(<YourComponent value="" onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Test');

      expect(mockOnChange).toHaveBeenCalledTimes(4); // T, e, s, t
      expect(mockOnChange).toHaveBeenLastCalledWith('Test');
    });

    it('ignores defaultValue when value prop provided', () => {
      render(
        <YourComponent
          defaultValue="Default"
          value="Controlled"
          onChange={mockOnChange}
        />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Controlled');
    });

    it('maintains controlled state across re-renders', () => {
      const { rerender } = render(
        <YourComponent value="Initial" onChange={mockOnChange} />
      );

      let input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Initial');

      // Re-render with same value
      rerender(<YourComponent value="Initial" onChange={mockOnChange} />);

      input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Initial');
    });
  });

  // ============================================================================
  // Uncontrolled Mode Tests
  // ============================================================================

  describe('Uncontrolled Mode', () => {
    it('manages state internally', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultOpen={false} />);

      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('updates UI when internal state changes', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultValue="" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');

      await user.type(input, 'Test');

      expect(input.value).toBe('Test');
    });

    it('calls onChange callback in uncontrolled mode', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultValue="" onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'A');

      expect(mockOnChange).toHaveBeenCalledWith('A');
    });

    it('respects defaultValue on initial render only', () => {
      const { rerender } = render(<YourComponent defaultValue="Initial" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Initial');

      // Changing defaultValue should have no effect in uncontrolled mode
      rerender(<YourComponent defaultValue="Changed" />);

      expect(input.value).toBe('Initial');
    });

    it('maintains state across parent re-renders', () => {
      const Parent = ({ count }: { count: number }) => (
        <div>
          <span>Count: {count}</span>
          <YourComponent defaultValue="Test" />
        </div>
      );

      const { rerender } = render(<Parent count={0} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Test');

      // Parent re-renders with different prop
      rerender(<Parent count={1} />);

      // Component state should persist
      expect(input.value).toBe('Test');
    });
  });

  // ============================================================================
  // State Transitions Tests
  // ============================================================================

  describe('State Transitions', () => {
    it('transitions from closed to open', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultOpen={false} onStateChange={mockOnStateChange} />);

      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(mockOnStateChange).toHaveBeenCalledWith({ open: true });
    });

    it('transitions from open to closed', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultOpen={true} onStateChange={mockOnStateChange} />);

      expect(screen.getByText('Content')).toBeInTheDocument();

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      expect(mockOnStateChange).toHaveBeenCalledWith({ open: false });
    });

    it('handles rapid state changes', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultOpen={false} />);

      const trigger = screen.getByRole('button');

      // Rapidly toggle state
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // Final state should be open
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('batches multiple state updates', async () => {
      const user = userEvent.setup();

      render(<YourComponent onStateChange={mockOnStateChange} />);

      const button = screen.getByRole('button', { name: /update multiple/i });
      await user.click(button);

      // Multiple setState calls should batch into single render
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith({
        field1: 'value1',
        field2: 'value2',
        field3: 'value3'
      });
    });

    it('prevents state updates during transition animation', async () => {
      const user = userEvent.setup();

      render(<YourComponent animationDuration={300} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // Immediately click again during animation
      await user.click(trigger);

      // Should prevent second click during animation
      // or queue it until animation completes
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      }, { timeout: 500 });
    });
  });

  // ============================================================================
  // Side Effects Tests
  // ============================================================================

  describe('Side Effects (useEffect)', () => {
    it('runs effect on mount', () => {
      const mockEffect = vi.fn();

      const ComponentWithEffect = () => {
        React.useEffect(() => {
          mockEffect();
        }, []);

        return <YourComponent />;
      };

      render(<ComponentWithEffect />);

      expect(mockEffect).toHaveBeenCalledTimes(1);
    });

    it('runs effect when dependency changes', () => {
      const mockEffect = vi.fn();

      const ComponentWithEffect = ({ count }: { count: number }) => {
        React.useEffect(() => {
          mockEffect(count);
        }, [count]);

        return <YourComponent />;
      };

      const { rerender } = render(<ComponentWithEffect count={0} />);

      expect(mockEffect).toHaveBeenCalledWith(0);

      rerender(<ComponentWithEffect count={1} />);

      expect(mockEffect).toHaveBeenCalledTimes(2);
      expect(mockEffect).toHaveBeenCalledWith(1);
    });

    it('runs cleanup on unmount', () => {
      const mockCleanup = vi.fn();

      const ComponentWithCleanup = () => {
        React.useEffect(() => {
          return () => {
            mockCleanup();
          };
        }, []);

        return <YourComponent />;
      };

      const { unmount } = render(<ComponentWithCleanup />);

      expect(mockCleanup).not.toHaveBeenCalled();

      unmount();

      expect(mockCleanup).toHaveBeenCalledTimes(1);
    });

    it('runs cleanup before re-running effect', () => {
      const mockCleanup = vi.fn();
      const mockEffect = vi.fn(() => mockCleanup);

      const ComponentWithEffect = ({ value }: { value: string }) => {
        React.useEffect(() => {
          return mockEffect(value);
        }, [value]);

        return <YourComponent />;
      };

      const { rerender } = render(<ComponentWithEffect value="a" />);

      expect(mockEffect).toHaveBeenCalledWith('a');
      expect(mockCleanup).not.toHaveBeenCalled();

      rerender(<ComponentWithEffect value="b" />);

      expect(mockCleanup).toHaveBeenCalledTimes(1);
      expect(mockEffect).toHaveBeenCalledWith('b');
      expect(mockEffect).toHaveBeenCalledTimes(2);
    });

    it('handles async effects correctly', async () => {
      const mockAsyncEffect = vi.fn();

      const ComponentWithAsync = () => {
        React.useEffect(() => {
          const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            mockAsyncEffect();
          };

          fetchData();
        }, []);

        return <YourComponent />;
      };

      render(<ComponentWithAsync />);

      expect(mockAsyncEffect).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(mockAsyncEffect).toHaveBeenCalledTimes(1);
      });
    });

    it('cancels ongoing async operations on unmount', async () => {
      let cancelled = false;

      const ComponentWithCancellable = () => {
        React.useEffect(() => {
          const controller = new AbortController();

          const fetchData = async () => {
            try {
              await fetch('/api/data', { signal: controller.signal });
            } catch (error) {
              if (error.name === 'AbortError') {
                cancelled = true;
              }
            }
          };

          fetchData();

          return () => {
            controller.abort();
          };
        }, []);

        return <YourComponent />;
      };

      const { unmount } = render(<ComponentWithCancellable />);

      unmount();

      await waitFor(() => {
        expect(cancelled).toBe(true);
      });
    });
  });

  // ============================================================================
  // Derived State Tests
  // ============================================================================

  describe('Derived State', () => {
    it('computes derived state from props', () => {
      const items = [
        { id: 1, selected: true },
        { id: 2, selected: false },
        { id: 3, selected: true }
      ];

      render(<YourComponent items={items} />);

      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('updates derived state when props change', () => {
      const { rerender } = render(
        <YourComponent items={[{ id: 1, selected: true }]} />
      );

      expect(screen.getByText('1 selected')).toBeInTheDocument();

      rerender(
        <YourComponent items={[
          { id: 1, selected: true },
          { id: 2, selected: true }
        ]} />
      );

      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('memoizes expensive derived calculations', () => {
      const mockCalculation = vi.fn((items) => {
        return items.filter(item => item.active).length;
      });

      const ComponentWithMemo = ({ items }) => {
        const activeCount = React.useMemo(
          () => mockCalculation(items),
          [items]
        );

        return <div>{activeCount} active</div>;
      };

      const items = [{ active: true }, { active: false }];

      const { rerender } = render(<ComponentWithMemo items={items} />);

      expect(mockCalculation).toHaveBeenCalledTimes(1);

      // Re-render with same items (referentially equal)
      rerender(<ComponentWithMemo items={items} />);

      // Should not recalculate
      expect(mockCalculation).toHaveBeenCalledTimes(1);

      // Re-render with different items
      rerender(<ComponentWithMemo items={[{ active: true }]} />);

      expect(mockCalculation).toHaveBeenCalledTimes(2);
    });
  });

  // ============================================================================
  // State Persistence Tests
  // ============================================================================

  describe('State Persistence', () => {
    it('persists state to localStorage', async () => {
      const user = userEvent.setup();
      const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      };

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      render(<YourComponent persistState storageKey="test-component" />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Test');

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'test-component',
          JSON.stringify({ value: 'Test' })
        );
      });
    });

    it('restores state from localStorage on mount', () => {
      const localStorageMock = {
        getItem: vi.fn(() => JSON.stringify({ value: 'Restored' })),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      };

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      render(<YourComponent persistState storageKey="test-component" />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-component');

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Restored');
    });

    it('clears persisted state on reset', async () => {
      const user = userEvent.setup();
      const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      };

      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      render(<YourComponent persistState storageKey="test-component" />);

      const resetButton = screen.getByRole('button', { name: /reset/i });
      await user.click(resetButton);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-component');
    });
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('handles switching from uncontrolled to controlled', () => {
      const { rerender } = render(<YourComponent defaultValue="Uncontrolled" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Uncontrolled');

      // Switch to controlled (warning expected in dev mode)
      rerender(<YourComponent value="Controlled" onChange={mockOnChange} />);

      expect(input.value).toBe('Controlled');
    });

    it('handles switching from controlled to uncontrolled', () => {
      const { rerender } = render(
        <YourComponent value="Controlled" onChange={mockOnChange} />
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Controlled');

      // Switch to uncontrolled (warning expected in dev mode)
      rerender(<YourComponent defaultValue="Uncontrolled" />);

      // Behavior may vary - document expected behavior
      expect(input.value).toBeTruthy();
    });

    it('handles undefined callback props', async () => {
      const user = userEvent.setup();

      render(<YourComponent defaultOpen={false} />);

      const trigger = screen.getByRole('button');

      // Should not crash when clicking
      expect(async () => {
        await user.click(trigger);
      }).not.toThrow();
    });

    it('prevents state updates after unmount', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      const ComponentWithDelay = () => {
        const [value, setValue] = React.useState('');

        React.useEffect(() => {
          const timer = setTimeout(() => {
            setValue('Updated');
          }, 100);

          return () => clearTimeout(timer);
        }, []);

        return <div>{value}</div>;
      };

      const { unmount } = render(<ComponentWithDelay />);

      unmount();

      await new Promise(resolve => setTimeout(resolve, 150));

      // Should not log React warning about setState on unmounted component
      expect(consoleError).not.toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('handles state updates during render (getDerivedStateFromProps pattern)', () => {
      const ComponentWithDerivedState = ({ externalValue }: { externalValue: number }) => {
        const [internalValue, setInternalValue] = React.useState(externalValue);

        // Sync internal state with prop (if needed)
        React.useEffect(() => {
          if (externalValue !== internalValue) {
            setInternalValue(externalValue);
          }
        }, [externalValue]);

        return <div>{internalValue}</div>;
      };

      const { rerender } = render(<ComponentWithDerivedState externalValue={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();

      rerender(<ComponentWithDerivedState externalValue={5} />);

      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
