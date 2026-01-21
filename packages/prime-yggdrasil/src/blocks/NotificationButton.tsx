import { Button } from 'primereact/button'

interface NotificationButtonProps {
  unreadCount?: number
  onClick?: () => void
  maxCount?: number
}

export function NotificationButton({ unreadCount = 0, onClick, maxCount = 99 }: NotificationButtonProps) {
  const displayCount = unreadCount > maxCount ? `${maxCount}+` : unreadCount.toString()
  const hasUnread = unreadCount > 0

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        icon="pi pi-bell"
        rounded
        text
        onClick={onClick}
        aria-label={hasUnread ? `Notifications: ${unreadCount} unread` : 'Notifications'}
        tooltip="Notifications"
        tooltipOptions={{ position: 'bottom' }}
      />
      {hasUnread && (
        <span
          className="p-badge p-badge-danger"
          style={{ position: 'absolute', top: '4px', right: '4px', minWidth: '1.25rem' }}
        >
          {displayCount}
        </span>
      )}
    </div>
  )
}
