import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from '../blocks/PageHeader'
import { Button } from 'primereact/button'

const meta = {
  title: 'Blocks/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Page Title',
    description: 'A brief description of what this page is about.',
  },
}

export const WithoutDescription: Story = {
  args: {
    title: 'Simple Page Title',
  },
}

export const WithActions: Story = {
  args: {
    title: 'Page with Actions',
    description: (
      <div className="flex align-items-center justify-content-between">
        <span>Description with action buttons</span>
        <div className="flex gap-2">
          <Button label="Secondary" severity="secondary" size="small" />
          <Button label="Primary" size="small" />
        </div>
      </div>
    ),
  },
}

export const LongContent: Story = {
  args: {
    title: 'Dashboard Analytics and Reporting',
    description: 'This is a longer description that demonstrates how the PageHeader handles multiple lines of text. It provides context and guidance for the user about what they can do on this page.',
  },
}
