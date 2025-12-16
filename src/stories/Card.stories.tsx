import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '../components/blocks/Card'

const meta = {
  title: 'Blocks/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
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
        <h3 className="text-900 font-bold mb-2">Card Title</h3>
        <p className="text-600 mb-0">
          This card demonstrates how visual styling is handled by PrimeReact classes
          while layout composition uses Tailwind.
        </p>
      </div>
    ),
  },
}
