import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import type { MenuItem } from 'primereact/menuitem'
import { useRef, useState } from 'react'

/**
 * AccountMenu component properties
 */
interface AccountMenuProps {
  /** User information to display in the menu */
  user: {
    /** User's first name */
    firstName: string
    /** User's last name */
    lastName: string
    /** User's email address */
    email: string
    /** Optional URL to user's avatar image */
    avatarUrl?: string
  }
  /** Callback when "User profile" menu item is clicked */
  onProfileClick?: () => void
  /** Callback when "Preferences" menu item is clicked */
  onPreferencesClick?: () => void
  /** Callback when "Log out" menu item is clicked */
  onLogout?: () => void
  /** Additional custom menu items to insert before the logout separator */
  additionalMenuItems?: MenuItem[]
}

/**
 * AccountMenu - User account menu with avatar trigger
 *
 * A dropdown menu triggered by clicking a user's avatar, displaying account
 * information and common actions (profile, preferences, logout). The avatar
 * shows either the user's uploaded photo or initials derived from their name.
 *
 * **Features:**
 * - Displays user's full name and email in menu header
 * - Shows user avatar image or initials fallback
 * - Built-in menu items: Profile, Preferences, Logout
 * - Support for additional custom menu items
 * - Visual feedback when menu is open (background highlight)
 * - Responsive popup positioning
 *
 * **When to use:**
 * - Application header/navbar for authenticated users
 * - User account management interfaces
 * - Any UI requiring quick access to account actions
 *
 * **Design tokens used:**
 * - `--surface-neutral-secondary`: Menu background and active state
 * - `--surface-brand-secondary`: Avatar background (when no image)
 * - `--text-neutral-emphasis`: User name text
 * - `--text-neutral-muted`: Email text
 *
 * @param props - Component properties
 * @param props.user - User information object with firstName, lastName, email, and optional avatarUrl
 * @param props.onProfileClick - Optional handler for profile menu item click
 * @param props.onPreferencesClick - Optional handler for preferences menu item click
 * @param props.onLogout - Optional handler for logout menu item click
 * @param props.additionalMenuItems - Optional array of custom PrimeReact MenuItem objects
 *
 * @returns React component
 *
 * @example
 * // Basic usage with required handlers
 * <AccountMenu
 *   user={{
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     email: 'john.doe@example.com'
 *   }}
 *   onProfileClick={() => navigate('/profile')}
 *   onPreferencesClick={() => navigate('/settings')}
 *   onLogout={() => handleLogout()}
 * />
 *
 * @example
 * // With avatar image
 * <AccountMenu
 *   user={{
 *     firstName: 'Jane',
 *     lastName: 'Smith',
 *     email: 'jane@example.com',
 *     avatarUrl: '/avatars/jane-smith.jpg'
 *   }}
 *   onProfileClick={handleProfile}
 *   onLogout={handleLogout}
 * />
 *
 * @example
 * // With additional custom menu items
 * <AccountMenu
 *   user={currentUser}
 *   onProfileClick={handleProfile}
 *   onLogout={handleLogout}
 *   additionalMenuItems={[
 *     { label: 'Billing', icon: 'pi pi-credit-card', command: () => navigate('/billing') },
 *     { label: 'Team Settings', icon: 'pi pi-users', command: () => navigate('/team') }
 *   ]}
 * />
 *
 * @see {@link https://primereact.org/menu/} for PrimeReact Menu documentation
 * @see {@link https://primereact.org/avatar/} for PrimeReact Avatar documentation
 */
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
