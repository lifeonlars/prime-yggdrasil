import type { Meta, StoryObj } from '@storybook/react-vite'
import { AccountMenu } from './AccountMenu'

const meta = {
  title: 'Blocks/AccountMenu',
  component: AccountMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AccountMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      firstName: 'Leeloo',
      lastName: 'Dallas',
      email: 'leeloo.dallas@example.com',
    },
    onProfileClick: () => console.log('Profile clicked'),
    onPreferencesClick: () => console.log('Preferences clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
}

export const WithAvatar: Story = {
  args: {
    user: {
      firstName: 'Leeloo',
      lastName: 'Dallas',
      email: 'leeloo.dallas@example.com',
      avatarUrl: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
    },
    onProfileClick: () => console.log('Profile clicked'),
    onPreferencesClick: () => console.log('Preferences clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
}

export const WithAdditionalMenuItems: Story = {
  args: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    additionalMenuItems: [
      { separator: true },
      {
        label: 'Billing',
        icon: 'pi pi-credit-card',
        command: () => console.log('Billing clicked'),
      },
      {
        label: 'Help & Support',
        icon: 'pi pi-question-circle',
        command: () => console.log('Help clicked'),
      },
    ],
    onProfileClick: () => console.log('Profile clicked'),
    onPreferencesClick: () => console.log('Preferences clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
}
