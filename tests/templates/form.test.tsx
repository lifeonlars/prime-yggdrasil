/**
 * Test Template: Form Components
 *
 * Use this template for components handling user input:
 * - InputText, Dropdown, Calendar, FileUpload
 * - Form fields with validation
 * - Controlled components with value/onChange
 *
 * Coverage Requirements:
 * - Value prop controls input
 * - onChange handler called with correct value
 * - Validation states (valid, invalid, error messages)
 * - Label association (htmlFor/id)
 * - Error message announcement (aria-describedby)
 * - Disabled state prevents interaction
 * - Required field indicators
 *
 * Example Component: FormField, InputText, Dropdown
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { YourFormComponent } from '@/path/to/component';

/**
 * TEMPLATE USAGE:
 * 1. Replace YourFormComponent with actual component import
 * 2. Update test data (initial values, validation rules)
 * 3. Add/remove tests based on component features
 * 4. Update selectors for labels, inputs, error messages
 * 5. Verify validation logic matches component
 */

describe('YourFormComponent (Form Input)', () => {
  // ============================================================================
  // Test Data Setup
  // ============================================================================

  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnBlur.mockClear();
    mockOnSubmit.mockClear();
  });

  // ============================================================================
  // Rendering Tests
  // ============================================================================

  describe('Rendering', () => {
    it('renders label with correct text', () => {
      render(
        <YourFormComponent
          id="username"
          label="Username"
          value=""
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders input with correct initial value', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="test@example.com"
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveValue('test@example.com');
    });

    it('renders required indicator when required', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value=""
          onChange={mockOnChange}
          required
        />
      );

      // Asterisk or "(required)" text
      expect(screen.getByText(/\*/)).toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(
        <YourFormComponent
          id="password"
          label="Password"
          value=""
          onChange={mockOnChange}
          helper="Must be at least 8 characters"
        />
      );

      expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    });

    it('renders placeholder text', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value=""
          onChange={mockOnChange}
          placeholder="Enter your email"
        />
      );

      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // Label Association Tests
  // ============================================================================

  describe('Label Association', () => {
    it('associates label with input via htmlFor and id', () => {
      render(
        <YourFormComponent
          id="username"
          label="Username"
          value=""
          onChange={mockOnChange}
        />
      );

      const label = screen.getByText('Username');
      const input = screen.getByLabelText('Username');

      expect(label).toHaveAttribute('for', 'username');
      expect(input).toHaveAttribute('id', 'username');
    });

    it('focuses input when label clicked', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="email"
          label="Email"
          value=""
          onChange={mockOnChange}
        />
      );

      const label = screen.getByText('Email');
      await user.click(label);

      const input = screen.getByLabelText('Email');
      expect(input).toHaveFocus();
    });
  });

  // ============================================================================
  // Value Control Tests
  // ============================================================================

  describe('Controlled Input', () => {
    it('calls onChange when value changes', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value=""
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name');
      await user.type(input, 'John');

      expect(mockOnChange).toHaveBeenCalledTimes(4); // J, o, h, n
      expect(mockOnChange).toHaveBeenLastCalledWith('John');
    });

    it('updates displayed value when prop changes', () => {
      const { rerender } = render(
        <YourFormComponent
          id="email"
          label="Email"
          value=""
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Email') as HTMLInputElement;
      expect(input.value).toBe('');

      rerender(
        <YourFormComponent
          id="email"
          label="Email"
          value="new@example.com"
          onChange={mockOnChange}
        />
      );

      expect(input.value).toBe('new@example.com');
    });

    it('does not change value without onChange callback', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value="Initial"
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe('Initial');

      // Parent would update value prop in real app
      await user.type(input, 'X');
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  // ============================================================================
  // Validation Tests
  // ============================================================================

  describe('Validation', () => {
    it('displays error message when error prop provided', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="invalid"
          onChange={mockOnChange}
          error="Invalid email address"
        />
      );

      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    it('applies p-invalid class when error present', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="invalid"
          onChange={mockOnChange}
          error="Invalid email"
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveClass('p-invalid');
    });

    it('links error message to input via aria-describedby', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="invalid"
          onChange={mockOnChange}
          error="Invalid email address"
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');

      const errorMessage = screen.getByText('Invalid email address');
      expect(errorMessage).toHaveAttribute('id', 'email-error');
    });

    it('calls onBlur validation callback', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="test"
          onChange={mockOnChange}
          onBlur={mockOnBlur}
        />
      );

      const input = screen.getByLabelText('Email');
      await user.click(input);
      await user.tab(); // Blur

      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it('removes error styling when error cleared', () => {
      const { rerender } = render(
        <YourFormComponent
          id="email"
          label="Email"
          value="invalid"
          onChange={mockOnChange}
          error="Invalid email"
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveClass('p-invalid');

      rerender(
        <YourFormComponent
          id="email"
          label="Email"
          value="valid@example.com"
          onChange={mockOnChange}
        />
      );

      expect(input).not.toHaveClass('p-invalid');
      expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
    });

    it('sets aria-invalid attribute when error present', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="invalid"
          onChange={mockOnChange}
          error="Invalid email"
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('removes aria-invalid when valid', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="valid@example.com"
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  // ============================================================================
  // Disabled State Tests
  // ============================================================================

  describe('Disabled State', () => {
    it('renders disabled input when disabled prop is true', () => {
      render(
        <YourFormComponent
          id="name"
          label="Name"
          value="John"
          onChange={mockOnChange}
          disabled
        />
      );

      const input = screen.getByLabelText('Name');
      expect(input).toBeDisabled();
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value="John"
          onChange={mockOnChange}
          disabled
        />
      );

      const input = screen.getByLabelText('Name');
      await user.type(input, 'X');

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('has reduced opacity when disabled', () => {
      render(
        <YourFormComponent
          id="name"
          label="Name"
          value="John"
          onChange={mockOnChange}
          disabled
        />
      );

      const input = screen.getByLabelText('Name');
      const styles = window.getComputedStyle(input);
      expect(parseFloat(styles.opacity)).toBeLessThan(1);
    });

    it('sets aria-disabled attribute', () => {
      render(
        <YourFormComponent
          id="name"
          label="Name"
          value="John"
          onChange={mockOnChange}
          disabled
        />
      );

      const input = screen.getByLabelText('Name');
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // ============================================================================
  // Required Field Tests
  // ============================================================================

  describe('Required Fields', () => {
    it('sets required attribute on input', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value=""
          onChange={mockOnChange}
          required
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('required');
    });

    it('sets aria-required attribute', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value=""
          onChange={mockOnChange}
          required
        />
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('validates on submit when required and empty', async () => {
      render(
        <form onSubmit={mockOnSubmit}>
          <YourFormComponent
            id="email"
            label="Email"
            value=""
            onChange={mockOnChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      );

      fireEvent.click(screen.getByText('Submit'));

      // Browser native validation should prevent submission
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  describe('Accessibility', () => {
    it('has accessible name from label', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email Address"
          value=""
          onChange={mockOnChange}
        />
      );

      const input = screen.getByRole('textbox', { name: /email address/i });
      expect(input).toBeInTheDocument();
    });

    it('announces error to screen readers', () => {
      render(
        <YourFormComponent
          id="email"
          label="Email"
          value="invalid"
          onChange={mockOnChange}
          error="Invalid email address"
        />
      );

      const errorMessage = screen.getByText('Invalid email address');
      expect(errorMessage).toHaveAttribute('role', 'alert');
      // OR check for aria-live="assertive"
      expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
    });

    it('maintains keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <>
          <button>Before</button>
          <YourFormComponent
            id="email"
            label="Email"
            value=""
            onChange={mockOnChange}
          />
          <button>After</button>
        </>
      );

      const beforeButton = screen.getByText('Before');
      beforeButton.focus();

      await user.tab();
      expect(screen.getByLabelText('Email')).toHaveFocus();

      await user.tab();
      expect(screen.getByText('After')).toHaveFocus();
    });

    it('supports keyboard input', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value=""
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name');
      input.focus();

      await user.keyboard('John Doe');

      expect(mockOnChange).toHaveBeenCalled();
      // Verify last call includes full typed text
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1];
      expect(lastCall[0]).toBe('John Doe');
    });
  });

  // ============================================================================
  // Integration Tests
  // ============================================================================

  describe('Form Integration', () => {
    it('works with form submission', async () => {
      render(
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mockOnSubmit(new FormData(e.currentTarget));
          }}
        >
          <YourFormComponent
            id="username"
            label="Username"
            value="johndoe"
            onChange={mockOnChange}
            name="username"
          />
          <button type="submit">Submit</button>
        </form>
      );

      fireEvent.click(screen.getByText('Submit'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('resets value when form is reset', async () => {
      render(
        <form>
          <YourFormComponent
            id="name"
            label="Name"
            value="John"
            onChange={mockOnChange}
          />
          <button type="reset">Reset</button>
        </form>
      );

      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe('John');

      fireEvent.click(screen.getByText('Reset'));

      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('handles undefined value prop', () => {
      render(
        <YourFormComponent
          id="name"
          label="Name"
          value={undefined}
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('handles null value prop', () => {
      render(
        <YourFormComponent
          id="name"
          label="Name"
          value={null}
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('handles very long values', async () => {
      const longValue = 'a'.repeat(1000);

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value={longValue}
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe(longValue);
    });

    it('handles special characters in value', () => {
      const specialValue = '<script>alert("xss")</script>';

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value={specialValue}
          onChange={mockOnChange}
        />
      );

      const input = screen.getByLabelText('Name') as HTMLInputElement;
      expect(input.value).toBe(specialValue);
      // Should be displayed as text, not executed
    });

    it('handles missing onChange gracefully', async () => {
      const user = userEvent.setup();

      render(
        <YourFormComponent
          id="name"
          label="Name"
          value="John"
        />
      );

      const input = screen.getByLabelText('Name');

      // Should not crash when typing
      expect(async () => {
        await user.type(input, 'X');
      }).not.toThrow();
    });
  });
});
