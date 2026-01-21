import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationButton } from './NotificationButton'

const meta = {
  title: 'Blocks/NotificationButton',
  component: NotificationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationButton>

export default meta
type Story = StoryObj<typeof meta>

export const NoNotifications: Story = {
  args: {
    unreadCount: 0,
    onClick: () => console.log('Notifications clicked'),
  },
}

export const WithNotifications: Story = {
  args: {
    unreadCount: 3,
    onClick: () => console.log('Notifications clicked'),
  },
}

export const ManyNotifications: Story = {
  args: {
    unreadCount: 42,
    onClick: () => console.log('Notifications clicked'),
  },
}

export const MaxCount: Story = {
  args: {
    unreadCount: 150,
    maxCount: 99,
    onClick: () => console.log('Notifications clicked'),
  },
}
