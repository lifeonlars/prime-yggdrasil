import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from 'primereact/chip'
import { Chips } from 'primereact/chips'
import { useState } from 'react'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    label: 'Basic Chip',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'pi pi-user',
  },
}

export const Removable: Story = {
  args: {
    label: 'Removable',
    removable: true,
  },
}

export const WithImage: Story = {
  args: {
    label: 'John Doe',
    image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Primary" />
      <Chip label="Success" className="bg-green-500 text-white" />
      <Chip label="Info" className="bg-blue-500 text-white" />
      <Chip label="Warning" className="bg-yellow-500 text-white" />
      <Chip label="Danger" className="bg-red-500 text-white" />
    </div>
  ),
}

export const ChipsInput: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['Tag 1', 'Tag 2', 'Tag 3'])
    return (
      <div className="w-30rem">
        <Chips value={values} onChange={(e) => setValues(e.value ?? [])} />
      </div>
    )
  },
}
