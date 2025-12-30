import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Tag } from 'primereact/tag'
import { Badge } from 'primereact/badge'
import { Toast } from 'primereact/toast'

const meta = {
  title: 'Design System/Severity',
  component: Message,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => {
    const toastRef = useRef<Toast>(null)
    const showToast = (severity: 'info' | 'success' | 'warn' | 'error') => {
      toastRef.current?.show({
        severity,
        summary: severity.toUpperCase(),
        detail: `This is a ${severity} toast.`,
        life: 3000,
      })
    }

    return (
      <div className="flex flex-column gap-4">
        <Toast ref={toastRef} />

        <section className="flex flex-column gap-2">
          <h3 className="m-0 text-lg">Messages</h3>
          <Message severity="info" text="Info message" />
          <Message severity="success" text="Success message" />
          <Message severity="warn" text="Warning message" />
          <Message severity="error" text="Error message" />
        </section>

        <section className="flex flex-column gap-2">
          <h3 className="m-0 text-lg">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Tag value="Info" severity="info" />
            <Tag value="Success" severity="success" />
            <Tag value="Warning" severity="warning" />
            <Tag value="Danger" severity="danger" />
          </div>
        </section>

        <section className="flex flex-column gap-2">
          <h3 className="m-0 text-lg">Badges</h3>
          <div className="flex align-items-center gap-3">
            <Badge value="4" severity="info" />
            <Badge value="12" severity="success" />
            <Badge value="3" severity="warning" />
            <Badge value="9" severity="danger" />
          </div>
        </section>

        <section className="flex flex-column gap-2">
          <h3 className="m-0 text-lg">Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <Button label="Danger action" severity="danger" />
            <Button label="Outlined danger" severity="danger" outlined />
            <Button label="Text danger" severity="danger" text />
          </div>
        </section>

        <section className="flex flex-column gap-2">
          <h3 className="m-0 text-lg">Toasts</h3>
          <div className="flex flex-wrap gap-2">
            <Button label="Info toast" onClick={() => showToast('info')} />
            <Button label="Success toast" onClick={() => showToast('success')} />
            <Button label="Warning toast" onClick={() => showToast('warn')} />
            <Button label="Error toast" severity="danger" onClick={() => showToast('error')} />
          </div>
        </section>
      </div>
    )
  },
}
