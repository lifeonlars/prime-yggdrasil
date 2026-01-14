import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationTabs } from './NavigationTabs'
import { Button } from 'primereact/button'
import { useState } from 'react'

const meta = {
  title: 'Blocks/NavigationTabs',
  component: NavigationTabs,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Dashboard' },
      { label: 'Projects' },
      { label: 'Analytics' },
      { label: 'Settings' },
    ]

    return <NavigationTabs items={items} activeIndex={activeIndex} onTabChange={setActiveIndex} />
  },
}

export const WithIcons: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Projects', icon: 'pi pi-folder' },
      { label: 'Analytics', icon: 'pi pi-chart-line' },
      { label: 'Settings', icon: 'pi pi-cog' },
    ]

    return <NavigationTabs items={items} activeIndex={activeIndex} onTabChange={setActiveIndex} />
  },
}

export const WithLogo: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Home' },
      { label: 'Products' },
      { label: 'About' },
      { label: 'Contact' },
    ]

    const logo = {
      wide: (
        <div className="flex align-items-center gap-2">
          <i className="pi pi-globe text-2xl text-brand-primary"></i>
          <span className="font-bold text-brand-primary">Yggdrasil</span>
        </div>
      ),
      square: <i className="pi pi-globe text-2xl text-brand-primary"></i>,
    }

    return (
      <NavigationTabs items={items} activeIndex={activeIndex} onTabChange={setActiveIndex} logo={logo} />
    )
  },
}

export const WithElevation: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Overview', icon: 'pi pi-home' },
      { label: 'Reports', icon: 'pi pi-chart-bar' },
      { label: 'Team', icon: 'pi pi-users' },
      { label: 'Settings', icon: 'pi pi-cog' },
    ]

    const logo = {
      wide: (
        <div className="flex align-items-center gap-2">
          <i className="pi pi-globe text-2xl text-brand-primary"></i>
          <span className="font-bold text-brand-primary">Yggdrasil</span>
        </div>
      ),
      square: <i className="pi pi-globe text-2xl text-brand-primary"></i>,
    }

    return (
      <NavigationTabs
        items={items}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
        logo={logo}
        elevation={true}
      />
    )
  },
}

export const WithUserControls: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Workspace' },
      { label: 'Files' },
      { label: 'Activity' },
      { label: 'Help' },
    ]

    const endContent = (
      <div className="flex gap-2 align-items-center">
        <Button icon="pi pi-bell" rounded text aria-label="Notifications" />
        <Button icon="pi pi-user" rounded text aria-label="User profile" />
      </div>
    )

    return (
      <NavigationTabs items={items} activeIndex={activeIndex} onTabChange={setActiveIndex} endContent={endContent} />
    )
  },
}

export const FullExample: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Analytics', icon: 'pi pi-chart-line' },
      { label: 'Projects', icon: 'pi pi-folder' },
      { label: 'Team', icon: 'pi pi-users' },
      { label: 'Settings', icon: 'pi pi-cog' },
    ]

    const logo = {
      wide: (
        <div className="flex align-items-center gap-2">
          <i className="pi pi-globe text-2xl text-brand-primary"></i>
          <span className="font-bold text-brand-primary">Yggdrasil</span>
        </div>
      ),
      square: <i className="pi pi-globe text-2xl text-brand-primary"></i>,
    }

    const endContent = (
      <div className="flex gap-2 align-items-center">
        <Button icon="pi pi-bell" rounded text aria-label="Notifications" />
        <Button icon="pi pi-search" rounded text aria-label="Search" />
        <Button icon="pi pi-user" rounded text aria-label="User profile" />
      </div>
    )

    return (
      <NavigationTabs
        items={items}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
        logo={logo}
        endContent={endContent}
        elevation={true}
      />
    )
  },
}
