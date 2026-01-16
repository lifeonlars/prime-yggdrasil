import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeToggle, type Theme } from './ThemeToggle'
import { useState } from 'react'

const meta = {
  title: 'Blocks/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [theme, setTheme] = useState<Theme>('light')

    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    return <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
  },
}

export const WithLabel: Story = {
  render: () => {
    const [theme, setTheme] = useState<Theme>('light')

    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    return <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} showLabel={true} />
  },
}

export const DarkMode: Story = {
  render: () => {
    const [theme, setTheme] = useState<Theme>('dark')

    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    return <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
  },
}
