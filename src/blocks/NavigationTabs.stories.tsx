import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationTabs } from './NavigationTabs'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { AccountMenu } from './AccountMenu'
import { ThemeToggle, type Theme } from './ThemeToggle'
import { LanguageMenu, LANGUAGES, type Language } from './LanguageMenu'

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
    const [theme, setTheme] = useState<Theme>('light')
    const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0])

    const items = [
      { label: 'Workspace' },
      { label: 'Files' },
      { label: 'Activity' },
      { label: 'Help' },
    ]

    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    const handleLanguageChange = (lang: Language) => {
      setCurrentLanguage(lang)
      console.log('Language changed to:', lang.name)
    }

    const user = {
      firstName: 'Leeloo',
      lastName: 'Dallas',
      email: 'leeloo.dallas@example.com',
    }

    const endContent = (
      <div className="flex gap-2 align-items-center">
        <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
        <LanguageMenu
          currentLanguage={currentLanguage}
          availableLanguages={LANGUAGES}
          onLanguageChange={handleLanguageChange}
        />
        <AccountMenu
          user={user}
          onProfileClick={() => console.log('Profile clicked')}
          onPreferencesClick={() => console.log('Preferences clicked')}
          onLogout={() => console.log('Logout clicked')}
        />
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
    const [theme, setTheme] = useState<Theme>('light')
    const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0])

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

    const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }

    const handleLanguageChange = (lang: Language) => {
      setCurrentLanguage(lang)
      console.log('Language changed to:', lang.name)
    }

    const user = {
      firstName: 'Leeloo',
      lastName: 'Dallas',
      email: 'leeloo.dallas@example.com',
    }

    const endContent = (
      <div className="flex gap-2 align-items-center">
        <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
        <LanguageMenu
          currentLanguage={currentLanguage}
          availableLanguages={LANGUAGES}
          onLanguageChange={handleLanguageChange}
        />
        <AccountMenu
          user={user}
          onProfileClick={() => console.log('Profile clicked')}
          onPreferencesClick={() => console.log('Preferences clicked')}
          onLogout={() => console.log('Logout clicked')}
        />
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
