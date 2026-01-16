import { Button } from 'primereact/button'

export type Theme = 'light' | 'dark'

interface ThemeToggleProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
  showLabel?: boolean
}

export function ThemeToggle({ currentTheme, onThemeChange, showLabel = false }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    onThemeChange(newTheme)
  }

  const icon = currentTheme === 'light' ? 'pi pi-moon' : 'pi pi-sun'
  const label = currentTheme === 'light' ? 'Dark' : 'Light'

  return (
    <Button
      icon={icon}
      label={showLabel ? label : undefined}
      rounded={!showLabel}
      text
      onClick={toggleTheme}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      tooltip={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      tooltipOptions={{ position: 'bottom' }}
      pt={{
        root: {
          className: 'hover:surface-neutral-secondary',
        },
      }}
    />
  )
}
