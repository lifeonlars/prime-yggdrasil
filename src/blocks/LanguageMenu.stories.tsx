import type { Meta, StoryObj } from '@storybook/react-vite'
import { LanguageMenu, LANGUAGES, type Language } from './LanguageMenu'
import { useState } from 'react'

const meta = {
  title: 'Blocks/LanguageMenu',
  component: LanguageMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0])

    const handleLanguageChange = (lang: Language) => {
      setCurrentLanguage(lang)
      console.log('Language changed to:', lang.name)
    }

    return (
      <LanguageMenu
        currentLanguage={currentLanguage}
        availableLanguages={LANGUAGES}
        onLanguageChange={handleLanguageChange}
      />
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0])

    const handleLanguageChange = (lang: Language) => {
      setCurrentLanguage(lang)
      console.log('Language changed to:', lang.name)
    }

    return (
      <LanguageMenu
        currentLanguage={currentLanguage}
        availableLanguages={LANGUAGES}
        onLanguageChange={handleLanguageChange}
        showLabel={true}
      />
    )
  },
}

export const DanishSelected: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[1]) // Danish

    const handleLanguageChange = (lang: Language) => {
      setCurrentLanguage(lang)
      console.log('Language changed to:', lang.name)
    }

    return (
      <LanguageMenu
        currentLanguage={currentLanguage}
        availableLanguages={LANGUAGES}
        onLanguageChange={handleLanguageChange}
      />
    )
  },
}

export const LimitedLanguages: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0])
    const limitedLanguages = [LANGUAGES[0], LANGUAGES[1], LANGUAGES[4]] // English, Danish, Swedish

    const handleLanguageChange = (lang: Language) => {
      setCurrentLanguage(lang)
      console.log('Language changed to:', lang.name)
    }

    return (
      <LanguageMenu
        currentLanguage={currentLanguage}
        availableLanguages={limitedLanguages}
        onLanguageChange={handleLanguageChange}
      />
    )
  },
}
