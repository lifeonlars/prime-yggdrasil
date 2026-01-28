import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '../blocks/Card'

const meta = {
  title: 'Blocks/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is card content. Cards use PrimeReact surface styling.',
  },
}

export const WithContent: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-color font-bold mb-2">Card Title</h3>
        <p className="text-color-secondary mb-0">
          This card demonstrates how visual styling is handled by PrimeReact classes
          while layout composition uses Yggdrasil utilities.
        </p>
      </div>
    ),
  },
}

export const Loading: Story = {
  args: {
    children: (
      <div className="flex align-items-center justify-content-center" style={{ minHeight: '120px' }}>
        <i className="pi pi-spin pi-spinner text-4xl text-primary"></i>
      </div>
    ),
  },
}

export const Empty: Story = {
  args: {
    children: (
      <div className="text-center p-4 text-color-secondary">
        <i className="pi pi-inbox text-4xl mb-3 block"></i>
        <p className="mb-0">No content available</p>
      </div>
    ),
  },
}

export const WithPrimeCard: Story = {
  args: {
    usePrimeCard: true,
    children: (
      <div>
        <h3 className="text-color font-bold mb-2">Using PrimeReact Card</h3>
        <p className="text-color-secondary mb-0">
          This uses the native PrimeReact Card component with .p-card styling,
          which includes elevation tokens for proper dark mode shadows.
        </p>
      </div>
    ),
  },
}
