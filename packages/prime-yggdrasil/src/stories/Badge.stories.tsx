import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'

const meta = {
  title: 'Misc/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge value="2" />
      <Badge value="8" severity="success" />
      <Badge value="4" severity="info" />
      <Badge value="12" severity="warning" />
      <Badge value="3" severity="danger" />
    </div>
  ),
}

export const OnButton: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button type="button" label="Emails" badge="8" />
      <Button type="button" label="Messages" icon="pi pi-users" badge="8" badgeClassName="p-badge-danger" />
    </div>
  ),
}

export const OnIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '2rem' }}>
        <Badge value="2" />
      </i>
      <i className="pi pi-calendar p-overlay-badge" style={{ fontSize: '2rem' }}>
        <Badge value="5" severity="danger" />
      </i>
      <i className="pi pi-envelope p-overlay-badge" style={{ fontSize: '2rem' }}>
        <Badge value="10+" severity="warning" />
      </i>
    </div>
  ),
}

export const Severities: Story = {
  render: () => (
    <div className="flex flex-column gap-3">
      <div>
        <Badge value="Primary" />
      </div>
      <div>
        <Badge value="Success" severity="success" />
      </div>
      <div>
        <Badge value="Info" severity="info" />
      </div>
      <div>
        <Badge value="Warning" severity="warning" />
      </div>
      <div>
        <Badge value="Danger" severity="danger" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 align-items-center">
      <Badge value="2" size="xlarge" />
      <Badge value="4" size="large" />
      <Badge value="6" />
    </div>
  ),
}

export const Dot: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge severity="success" />
      <Badge severity="info" />
      <Badge severity="warning" />
      <Badge severity="danger" />
    </div>
  ),
}

export const DotOnIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '2rem' }}>
        <Badge severity="danger" />
      </i>
      <i className="pi pi-calendar p-overlay-badge" style={{ fontSize: '2rem' }}>
        <Badge severity="success" />
      </i>
      <i className="pi pi-envelope p-overlay-badge" style={{ fontSize: '2rem' }}>
        <Badge severity="warning" />
      </i>
    </div>
  ),
}

export const Combined: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button type="button" label="Notifications" outlined>
        <Badge value="8" severity="danger" />
      </Button>
      <Button type="button" icon="pi pi-shopping-cart" outlined>
        <Badge value="2" />
      </Button>
      <Button type="button" icon="pi pi-comment" outlined>
        <Badge severity="success" />
      </Button>
    </div>
  ),
}
