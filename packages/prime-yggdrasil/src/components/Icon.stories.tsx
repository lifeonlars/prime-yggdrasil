import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'

const meta = {
  title: 'Misc/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Icon name - PrimeIcons class (e.g., "pi pi-check") or custom SVG name',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Icon size - small (16px), medium (20px), large (24px)',
    },
    color: {
      control: 'color',
      description: 'Icon color - uses currentColor by default',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

/**
 * PrimeIcons examples - requires primeicons package to be installed
 */
export const WithPrimeIcons: Story = {
  render: () => (
    <div className="flex gap-3 align-items-center">
      <Icon name="pi pi-check" size="medium" />
      <Icon name="pi pi-times" size="medium" />
      <Icon name="pi pi-bell" size="medium" />
      <Icon name="pi pi-user" size="medium" />
      <Icon name="pi pi-cog" size="medium" />
      <Icon name="pi pi-home" size="medium" />
    </div>
  ),
}

/**
 * All size variations - small (16px), medium (20px), large (24px)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center gap-3">
        <Icon name="pi pi-check" size="small" />
        <span>Small (16px)</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Icon name="pi pi-check" size="medium" />
        <span>Medium (20px)</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Icon name="pi pi-check" size="large" />
        <span>Large (24px)</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Icon name="pi pi-check" size={32} />
        <span>Custom (32px)</span>
      </div>
    </div>
  ),
}

/**
 * Custom pixel size - you can pass any number for custom sizing
 */
export const CustomSize: Story = {
  args: {
    name: 'pi pi-bell',
    size: 48,
  },
}

/**
 * Colored icons using semantic tokens
 */
export const Colored: Story = {
  render: () => (
    <div className="flex gap-3 align-items-center">
      <Icon
        name="pi pi-check"
        size="large"
        color="var(--text-context-success)"
      />
      <Icon
        name="pi pi-exclamation-triangle"
        size="large"
        color="var(--text-context-warning)"
      />
      <Icon
        name="pi pi-times"
        size="large"
        color="var(--text-context-danger)"
      />
      <Icon
        name="pi pi-info-circle"
        size="large"
        color="var(--text-context-info)"
      />
      <Icon
        name="pi pi-star"
        size="large"
        color="var(--text-state-interactive)"
      />
    </div>
  ),
}

/**
 * Interactive icons with onClick handler
 */
export const Interactive: Story = {
  render: () => (
    <div className="flex gap-3 align-items-center">
      <Icon
        name="pi pi-bell"
        size="large"
        onClick={() => alert('Notification clicked!')}
        aria-label="Notifications"
        style={{ cursor: 'pointer' }}
      />
      <Icon
        name="pi pi-user"
        size="large"
        onClick={() => alert('User profile clicked!')}
        aria-label="User profile"
        style={{ cursor: 'pointer' }}
      />
      <Icon
        name="pi pi-cog"
        size="large"
        onClick={() => alert('Settings clicked!')}
        aria-label="Settings"
        style={{ cursor: 'pointer' }}
      />
    </div>
  ),
}

/**
 * Custom SVG icons - place SVG files in public/icons/ directory
 * Example: public/icons/custom-icon.svg
 *
 * Note: These examples will show broken images unless you add the SVG files
 */
export const WithCustomSVG: Story = {
  render: () => (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center gap-3">
        <Icon name="custom-icon" size="medium" />
        <span>Custom Icon (from /icons/custom-icon.svg)</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Icon name="another-icon" size="medium" />
        <span>Another Icon (from /icons/another-icon.svg)</span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-neutral-subdued)' }}>
        Add SVG files to public/icons/ directory to see custom icons
      </p>
    </div>
  ),
}

/**
 * Mixed usage - PrimeIcons and custom SVG icons together
 */
export const MixedIcons: Story = {
  render: () => (
    <div className="flex gap-3 align-items-center">
      <Icon name="pi pi-bell" size="large" />
      <Icon name="pi pi-user" size="large" />
      <Icon name="custom-icon" size="large" />
    </div>
  ),
}

/**
 * Common UI patterns using icons
 */
export const CommonPatterns: Story = {
  render: () => (
    <div className="flex flex-column gap-4">
      {/* Success message */}
      <div className="flex align-items-center gap-2">
        <Icon name="pi pi-check-circle" size="medium" color="var(--text-context-success)" />
        <span>Changes saved successfully</span>
      </div>

      {/* Error message */}
      <div className="flex align-items-center gap-2">
        <Icon name="pi pi-times-circle" size="medium" color="var(--text-context-danger)" />
        <span>Failed to save changes</span>
      </div>

      {/* Warning message */}
      <div className="flex align-items-center gap-2">
        <Icon name="pi pi-exclamation-triangle" size="medium" color="var(--text-context-warning)" />
        <span>Unsaved changes will be lost</span>
      </div>

      {/* Info message */}
      <div className="flex align-items-center gap-2">
        <Icon name="pi pi-info-circle" size="medium" color="var(--text-context-info)" />
        <span>This feature is in beta</span>
      </div>
    </div>
  ),
}

/**
 * Default story for testing
 */
export const Default: Story = {
  args: {
    name: 'pi pi-check',
    size: 'medium',
  },
}
