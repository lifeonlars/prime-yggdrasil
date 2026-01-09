import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { useRef } from 'react'

const meta = {
  title: 'Menu/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
      },
      {
        label: 'Open',
        icon: 'pi pi-folder-open',
      },
      {
        separator: true,
      },
      {
        label: 'Save',
        icon: 'pi pi-save',
      },
      {
        label: 'Save As',
        icon: 'pi pi-save',
      },
      {
        separator: true,
      },
      {
        label: 'Exit',
        icon: 'pi pi-times',
      },
    ]

    return <Menu model={items} style={{ width: '250px' }} />
  },
}

export const Grouped: Story = {
  render: () => {
    const items = [
      {
        label: 'File',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
          },
          {
            label: 'Open',
            icon: 'pi pi-folder-open',
          },
        ],
      },
      {
        label: 'Edit',
        items: [
          {
            label: 'Copy',
            icon: 'pi pi-copy',
          },
          {
            label: 'Cut',
            icon: 'pi pi-times',
          },
          {
            label: 'Paste',
            icon: 'pi pi-file',
          },
        ],
      },
    ]

    return <Menu model={items} style={{ width: '250px' }} />
  },
}

export const Popup: Story = {
  render: () => {
    const menuRef = useRef(null)

    const items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },
        ],
      },
    ]

    return (
      <div>
        <Menu model={items} popup ref={menuRef} />
        <Button
          label="Show Menu"
          icon="pi pi-bars"
          onClick={(e) => menuRef.current?.toggle(e)}
        />
      </div>
    )
  },
}

export const WithCommands: Story = {
  render: () => {
    const items = [
      {
        label: 'File',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            command: () => {
              alert('New file clicked')
            },
          },
          {
            label: 'Open',
            icon: 'pi pi-folder-open',
            command: () => {
              alert('Open file clicked')
            },
          },
        ],
      },
      {
        label: 'Edit',
        items: [
          {
            label: 'Copy',
            icon: 'pi pi-copy',
            command: () => {
              alert('Copy clicked')
            },
          },
          {
            label: 'Paste',
            icon: 'pi pi-file',
            command: () => {
              alert('Paste clicked')
            },
          },
        ],
      },
    ]

    return <Menu model={items} style={{ width: '250px' }} />
  },
}
