import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressSpinner } from 'primereact/progressspinner'

const meta = {
  title: 'Misc/ProgressSpinner',
  component: ProgressSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ProgressSpinner />,
}

export const CustomSize: Story = {
  render: () => (
    <div className="flex gap-4 align-items-center">
      <ProgressSpinner style={{ width: '30px', height: '30px' }} />
      <ProgressSpinner style={{ width: '50px', height: '50px' }} />
      <ProgressSpinner style={{ width: '70px', height: '70px' }} />
    </div>
  ),
}

export const CustomStroke: Story = {
  render: () => (
    <div className="flex gap-4">
      <ProgressSpinner strokeWidth="2" />
      <ProgressSpinner strokeWidth="4" />
      <ProgressSpinner strokeWidth="8" />
    </div>
  ),
}

export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-4">
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="4"
        fill="var(--surface-ground)"
        animationDuration="1s"
      />
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="6"
        fill="var(--surface-ground)"
        animationDuration="2s"
      />
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration="3s"
      />
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div
      className="border-round border-1 surface-border p-4 flex flex-column align-items-center justify-content-center"
      style={{ width: '300px', height: '200px' }}
    >
      <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
      <p className="mt-3 text-center">Loading data...</p>
    </div>
  ),
}

export const WithOverlay: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '400px', height: '300px' }}>
      <div className="border-round border-1 surface-border p-4">
        <h3>Content Area</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <ProgressSpinner style={{ width: '60px', height: '60px' }} strokeWidth="4" />
      </div>
    </div>
  ),
}

export const InlineWithText: Story = {
  render: () => (
    <div className="flex align-items-center gap-3">
      <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" />
      <span>Loading content, please wait...</span>
    </div>
  ),
}
