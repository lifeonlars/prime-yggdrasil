import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import type { MenuItem } from 'primereact/menuitem'
import { useRef, useState } from 'react'

interface AccountMenuProps {
  user: {
    firstName: string
    lastName: string
    email: string
    avatarUrl?: string
  }
  onProfileClick?: () => void
  onPreferencesClick?: () => void
  onLogout?: () => void
  additionalMenuItems?: MenuItem[]
}

export function AccountMenu({
  user,
  onProfileClick,
  onPreferencesClick,
  onLogout,
  additionalMenuItems = [],
}: AccountMenuProps) {
  const menuRef = useRef<Menu>(null)
  const [isOpen, setIsOpen] = useState(false)

  const menuItems: MenuItem[] = [
    {
      template: () => (
        <div className="px-3 py-2">
          <div className="font-semibold text-neutral-emphasis">{`${user.firstName} ${user.lastName}`}</div>
          <div className="text-sm text-neutral-muted">{user.email}</div>
        </div>
      ),
    },
    { separator: true },
    {
      label: 'User profile',
      icon: 'pi pi-user',
      command: onProfileClick,
    },
    {
      label: 'Preferences',
      icon: 'pi pi-cog',
      command: onPreferencesClick,
    },
    ...additionalMenuItems,
    { separator: true },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: onLogout,
    },
  ]

  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }

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
        className="w-15rem"
        appendTo="self"
        pt={{
          root: { style: { backgroundColor: 'var(--surface-neutral-secondary)' } },
        }}
        onHide={() => setIsOpen(false)}
      />
      <div
        style={{
          borderRadius: '50%',
          padding: '0.25rem',
          backgroundColor: isOpen ? 'var(--surface-neutral-secondary)' : 'transparent',
          transition: 'background-color 0.2s',
        }}
      >
        {user.avatarUrl ? (
          <Avatar
            image={user.avatarUrl}
            shape="circle"
            size="normal"
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <Avatar
            label={getInitials()}
            shape="circle"
            size="normal"
            onClick={handleToggle}
            style={{ cursor: 'pointer', backgroundColor: 'var(--surface-brand-secondary)', color: 'white' }}
          />
        )}
      </div>
    </>
  )
}
