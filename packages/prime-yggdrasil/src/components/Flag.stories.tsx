import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flag } from './Flag'

const meta = {
  title: 'Misc/Flag',
  component: Flag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    country: {
      control: 'select',
      options: ['denmark', 'finland', 'norway', 'sweden', 'uk'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Flag>

export default meta
type Story = StoryObj<typeof meta>

export const Denmark: Story = {
  args: {
    country: 'denmark',
    size: 'medium',
  },
}

export const Finland: Story = {
  args: {
    country: 'finland',
    size: 'medium',
  },
}

export const Norway: Story = {
  args: {
    country: 'norway',
    size: 'medium',
  },
}

export const Sweden: Story = {
  args: {
    country: 'sweden',
    size: 'medium',
  },
}

export const UK: Story = {
  args: {
    country: 'uk',
    size: 'medium',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center gap-3">
        <Flag country="denmark" size="small" />
        <span>Small (16px)</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Flag country="denmark" size="medium" />
        <span>Medium (20px)</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Flag country="denmark" size="large" />
        <span>Large (24px)</span>
      </div>
    </div>
  ),
}

export const AllFlags: Story = {
  render: () => (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center gap-3">
        <Flag country="denmark" size="medium" />
        <span>Denmark</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Flag country="finland" size="medium" />
        <span>Finland</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Flag country="norway" size="medium" />
        <span>Norway</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Flag country="sweden" size="medium" />
        <span>Sweden</span>
      </div>
      <div className="flex align-items-center gap-3">
        <Flag country="uk" size="medium" />
        <span>United Kingdom</span>
      </div>
    </div>
  ),
}
