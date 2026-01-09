import type { Meta, StoryObj } from '@storybook/react-vite'
import { TabMenu } from 'primereact/tabmenu'
import { useState } from 'react'

const meta = {
  title: 'Menu/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Home', icon: 'pi pi-home' },
      { label: 'Calendar', icon: 'pi pi-calendar' },
      { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Profile', icon: 'pi pi-user' },
    ]

    return (
      <div style={{ width: '600px' }}>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </div>
    )
  },
}

export const WithoutIcons: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Dashboard' },
      { label: 'Projects' },
      { label: 'Team' },
      { label: 'Reports' },
    ]

    return (
      <div style={{ width: '600px' }}>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </div>
    )
  },
}

export const WithContent: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Overview', icon: 'pi pi-home' },
      { label: 'Details', icon: 'pi pi-list' },
      { label: 'Settings', icon: 'pi pi-cog' },
    ]

    const getContent = () => {
      switch (activeIndex) {
        case 0:
          return (
            <div className="p-4">
              <h3>Overview</h3>
              <p>Welcome to the overview section. Here you can see a summary of all your activities.</p>
            </div>
          )
        case 1:
          return (
            <div className="p-4">
              <h3>Details</h3>
              <p>This section contains detailed information about your items.</p>
            </div>
          )
        case 2:
          return (
            <div className="p-4">
              <h3>Settings</h3>
              <p>Configure your preferences and settings here.</p>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div style={{ width: '600px' }}>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        <div className="border-1 surface-border border-top-none p-3">
          {getContent()}
        </div>
      </div>
    )
  },
}

export const ManyTabs: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Tab 1', icon: 'pi pi-home' },
      { label: 'Tab 2', icon: 'pi pi-calendar' },
      { label: 'Tab 3', icon: 'pi pi-cog' },
      { label: 'Tab 4', icon: 'pi pi-user' },
      { label: 'Tab 5', icon: 'pi pi-inbox' },
      { label: 'Tab 6', icon: 'pi pi-chart-line' },
      { label: 'Tab 7', icon: 'pi pi-bell' },
    ]

    return (
      <div style={{ width: '600px' }}>
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
      </div>
    )
  },
}
