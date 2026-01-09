import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { SplitButton } from 'primereact/splitbutton'

const meta = {
  title: 'Panel/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const startContent = (
      <Button label="New" icon="pi pi-plus" />
    )

    const endContent = (
      <Button label="Save" icon="pi pi-check" />
    )

    return (
      <div style={{ width: '600px' }}>
        <Toolbar start={startContent} end={endContent} />
      </div>
    )
  },
}

export const WithMultipleButtons: Story = {
  render: () => {
    const startContent = (
      <div className="flex gap-2">
        <Button label="New" icon="pi pi-plus" />
        <Button label="Upload" icon="pi pi-upload" />
      </div>
    )

    const centerContent = (
      <span className="font-semibold">Document Actions</span>
    )

    const endContent = (
      <div className="flex gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" severity="secondary" />
      </div>
    )

    return (
      <div style={{ width: '700px' }}>
        <Toolbar start={startContent} center={centerContent} end={endContent} />
      </div>
    )
  },
}

export const WithSplitButton: Story = {
  render: () => {
    const items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ]

    const startContent = (
      <div className="flex gap-2">
        <Button label="New" icon="pi pi-plus" />
        <SplitButton label="Save" icon="pi pi-check" model={items} />
      </div>
    )

    const endContent = (
      <Button icon="pi pi-cog" />
    )

    return (
      <div style={{ width: '600px' }}>
        <Toolbar start={startContent} end={endContent} />
      </div>
    )
  },
}

export const IconsOnly: Story = {
  render: () => {
    const startContent = (
      <div className="flex gap-2">
        <Button icon="pi pi-plus" />
        <Button icon="pi pi-pencil" />
        <Button icon="pi pi-trash" />
      </div>
    )

    const endContent = (
      <div className="flex gap-2">
        <Button icon="pi pi-search" />
        <Button icon="pi pi-cog" />
      </div>
    )

    return (
      <div style={{ width: '600px' }}>
        <Toolbar start={startContent} end={endContent} />
      </div>
    )
  },
}

export const WithCustomContent: Story = {
  render: () => {
    const startContent = (
      <div className="flex align-items-center gap-2">
        <i className="pi pi-file text-2xl"></i>
        <span className="font-bold">My Application</span>
      </div>
    )

    const endContent = (
      <div className="flex align-items-center gap-2">
        <span className="text-sm">John Doe</span>
        <Button icon="pi pi-user" rounded />
      </div>
    )

    return (
      <div style={{ width: '600px' }}>
        <Toolbar start={startContent} end={endContent} />
      </div>
    )
  },
}
