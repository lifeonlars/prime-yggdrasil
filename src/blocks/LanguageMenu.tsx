import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import type { MenuItem } from 'primereact/menuitem'
import { useRef, useState } from 'react'
import { Flag, type FlagCountry } from '../components/Flag'

export interface Language {
  code: string
  name: string
  flag: FlagCountry
}

interface LanguageMenuProps {
  currentLanguage: Language
  availableLanguages: Language[]
  onLanguageChange: (language: Language) => void
  showLabel?: boolean
}

export function LanguageMenu({
  currentLanguage,
  availableLanguages,
  onLanguageChange,
  showLabel = false,
}: LanguageMenuProps) {
  const menuRef = useRef<Menu>(null)
  const [isOpen, setIsOpen] = useState(false)

  const menuItems: MenuItem[] = availableLanguages.map((lang) => ({
    label: lang.name,
    icon: () => <Flag country={lang.flag} size="small" className="mr-2" />,
    command: () => onLanguageChange(lang),
    template: () => (
      <div className="flex align-items-center px-3 py-2 cursor-pointer hover:surface-hover">
        <Flag country={lang.flag} size="small" className="mr-2" />
        <span>{lang.name}</span>
        {lang.code === currentLanguage.code && <i className="pi pi-check ml-auto text-brand-primary" />}
      </div>
    ),
  }))

  const handleToggle = (e: React.MouseEvent) => {
    menuRef.current?.toggle(e)
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Menu
        model={menuItems}
        popup
        ref={menuRef}
        className="w-12rem"
        appendTo="self"
        pt={{
          root: { style: { backgroundColor: 'var(--surface-neutral-secondary)' } },
        }}
        onHide={() => setIsOpen(false)}
      />
      <Button
        icon={() => <Flag country={currentLanguage.flag} size="small" />}
        label={showLabel ? currentLanguage.name : undefined}
        rounded={!showLabel}
        text
        onClick={handleToggle}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
        tooltip="Change language"
        tooltipOptions={{ position: 'bottom' }}
        pt={{
          root: {
            style: {
              backgroundColor: isOpen ? 'var(--surface-neutral-secondary)' : 'transparent',
              transition: 'background-color 0.2s',
            },
          },
        }}
      />
    </>
  )
}

// Predefined languages for convenience
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: 'uk' },
  { code: 'da', name: 'Danish', flag: 'denmark' },
  { code: 'fi', name: 'Finnish', flag: 'finland' },
  { code: 'no', name: 'Norwegian', flag: 'norway' },
  { code: 'sv', name: 'Swedish', flag: 'sweden' },
]
