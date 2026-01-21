import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'

const meta = {
  title: 'Misc/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Round: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar label="P" shape="circle" size="large" />
      <Avatar label="V" shape="circle" />
      <Avatar label="U" shape="circle" size="large" />
    </div>
  ),
}

export const RoundWithImage: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
        size="xlarge"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
        shape="circle"
        size="large"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
        shape="circle"
      />
    </div>
  ),
}

export const RoundWithIcon: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar icon="pi pi-user" shape="circle" size="xlarge" />
      <Avatar icon="pi pi-user" shape="circle" size="large" />
      <Avatar icon="pi pi-user" shape="circle" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 align-items-end">
      <Avatar label="XL" shape="circle" size="xlarge" />
      <Avatar label="L" shape="circle" size="large" />
      <Avatar label="N" shape="circle" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
        size="large"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
        shape="circle"
        size="large"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
        shape="circle"
        size="large"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png"
        shape="circle"
        size="large"
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png"
        shape="circle"
        size="large"
      />
      <Avatar label="+2" shape="circle" size="large" />
    </AvatarGroup>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar label="P" size="xlarge" />
      <Avatar label="V" />
      <Avatar label="U" size="large" />
    </div>
  ),
}

export const Labeled: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar label="JD" shape="circle" size="xlarge" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
      <Avatar label="AB" shape="circle" size="large" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />
      <Avatar label="XY" shape="circle" style={{ backgroundColor: '#ff9800', color: '#ffffff' }} />
    </div>
  ),
}
