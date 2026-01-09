import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'

const meta = {
  title: 'Menu/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const items = [
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
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
            label: 'Quit',
            icon: 'pi pi-times',
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
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
      {
        label: 'View',
        icon: 'pi pi-eye',
        items: [
          {
            label: 'Zoom In',
            icon: 'pi pi-search-plus',
          },
          {
            label: 'Zoom Out',
            icon: 'pi pi-search-minus',
          },
        ],
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
        items: [
          {
            label: 'Documentation',
            icon: 'pi pi-book',
          },
          {
            label: 'About',
            icon: 'pi pi-info-circle',
          },
        ],
      },
    ]

    return (
      <div style={{ width: '700px' }}>
        <Menubar model={items} />
      </div>
    )
  },
}

export const WithEndContent: Story = {
  render: () => {
    const items = [
      {
        label: 'File',
        icon: 'pi pi-file',
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
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Copy',
            icon: 'pi pi-copy',
          },
          {
            label: 'Paste',
            icon: 'pi pi-file',
          },
        ],
      },
    ]

    const end = (
      <div className="flex gap-2">
        <Button icon="pi pi-search" rounded text />
        <Button icon="pi pi-user" rounded text />
      </div>
    )

    return (
      <div style={{ width: '700px' }}>
        <Menubar model={items} end={end} />
      </div>
    )
  },
}

export const WithStartContent: Story = {
  render: () => {
    const items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
      },
      {
        label: 'Projects',
        icon: 'pi pi-folder',
        items: [
          {
            label: 'All Projects',
            icon: 'pi pi-list',
          },
          {
            label: 'New Project',
            icon: 'pi pi-plus',
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
    ]

    const start = (
      <div className="flex align-items-center gap-2">
        <i className="pi pi-box text-2xl"></i>
        <span className="font-bold">MyApp</span>
      </div>
    )

    return (
      <div style={{ width: '700px' }}>
        <Menubar model={items} start={start} />
      </div>
    )
  },
}

export const WithBothEnds: Story = {
  render: () => {
    const items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Pricing',
        icon: 'pi pi-dollar',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ]

    const start = (
      <div className="flex align-items-center gap-2">
        <i className="pi pi-globe text-2xl"></i>
        <span className="font-bold">Website</span>
      </div>
    )

    const end = (
      <div className="flex gap-2">
        <Button label="Login" text />
        <Button label="Sign Up" />
      </div>
    )

    return (
      <div style={{ width: '700px' }}>
        <Menubar model={items} start={start} end={end} />
      </div>
    )
  },
}
