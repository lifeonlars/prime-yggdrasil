import { TabMenu } from 'primereact/tabmenu'
import type { MenuItem } from 'primereact/menuitem'
import type { ReactNode } from 'react'

interface NavigationTabsProps {
  items: MenuItem[]
  activeIndex: number
  onTabChange: (index: number) => void
  logo?: {
    wide: ReactNode
    square: ReactNode
  }
  startContent?: ReactNode
  endContent?: ReactNode
  elevation?: boolean
}

export function NavigationTabs({
  items,
  activeIndex,
  onTabChange,
  logo,
  startContent,
  endContent,
  elevation = false,
}: NavigationTabsProps) {
  const elevationStyle = elevation ? { boxShadow: 'var(--elevation-elevated)' } : { boxShadow: 'var(--elevation-moderate)' }

  return (
    <div className="surface-card" style={elevationStyle}>
      <div className="flex align-items-center px-4">
        {/* Logo - responsive: wide on desktop, square on tablet/mobile */}
        {logo && (
          <div className="flex-none mr-4">
            <div className="hidden md:block">{logo.wide}</div>
            <div className="block md:hidden">{logo.square}</div>
          </div>
        )}

        {/* Additional start content */}
        {startContent && <div className="flex-none mr-4">{startContent}</div>}

        {/* Navigation tabs - flexes to fill available space */}
        <div className="flex-1">
          <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => onTabChange(e.index)} />
        </div>

        {/* End content (user profile, notifications, etc.) */}
        {endContent && <div className="flex-none ml-4">{endContent}</div>}
      </div>
    </div>
  )
}
