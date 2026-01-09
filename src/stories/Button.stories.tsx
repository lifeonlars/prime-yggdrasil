import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from 'primereact/button'

const meta = {
  title: 'Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'danger'],
      description: 'Severity level of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: 'Size of the button',
    },
    outlined: {
      control: 'boolean',
      description: 'Outlined button style',
    },
    text: {
      control: 'boolean',
      description: 'Text-only button style',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Primary',
  },
}

export const Danger: Story = {
  args: {
    label: 'Danger',
    severity: 'danger',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'pi pi-check',
  },
}

export const IconOnly: Story = {
  args: {
    icon: 'pi pi-check',
  },
}

export const Outlined: Story = {
  args: {
    label: 'Outlined',
    outlined: true,
  },
}

export const OutlinedDanger: Story = {
  args: {
    label: 'Outlined Danger',
    outlined: true,
    severity: 'danger',
  },
}

export const Text: Story = {
  args: {
    label: 'Text',
    text: true,
  },
}

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'large',
  },
}

export const LargeWithIcon: Story = {
  args: {
    label: 'Large',
    icon: 'pi pi-check',
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'small',
  },
}

export const SmallWithIcon: Story = {
  args: {
    label: 'Small',
    icon: 'pi pi-check',
    size: 'small',
  },
}
