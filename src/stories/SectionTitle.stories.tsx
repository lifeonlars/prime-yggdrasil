import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionTitle } from '../blocks/SectionTitle'

const meta = {
  title: 'Blocks/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Section Title',
  },
}

export const InContext: Story = {
  render: () => (
    <div>
      <SectionTitle>Personal Information</SectionTitle>
      <p className="text-600 mb-0">
        This section demonstrates how SectionTitle divides content into logical groups.
      </p>
    </div>
  ),
}
