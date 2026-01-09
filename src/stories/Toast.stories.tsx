import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { useRef } from 'react'

const meta = {
  title: 'Messages/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const toast = useRef<Toast>(null)

    const showToast = (severity: 'success' | 'info' | 'warn' | 'error') => {
      toast.current?.show({
        severity,
        summary: severity.charAt(0).toUpperCase() + severity.slice(1),
        detail: `This is a ${severity} toast message`,
      })
    }

    return (
      <div>
        <Toast ref={toast} />
        <div className="flex flex-wrap gap-2">
          <Button
            label="Success"
            severity="success"
            onClick={() => showToast('success')}
          />
          <Button label="Info" severity="info" onClick={() => showToast('info')} />
          <Button
            label="Warning"
            severity="warning"
            onClick={() => showToast('warn')}
          />
          <Button
            label="Error"
            severity="danger"
            onClick={() => showToast('error')}
          />
        </div>
      </div>
    )
  },
}

export const Sticky: Story = {
  render: () => {
    const toast = useRef<Toast>(null)

    return (
      <div>
        <Toast ref={toast} />
        <Button
          label="Show Sticky"
          onClick={() =>
            toast.current?.show({
              severity: 'info',
              summary: 'Sticky Message',
              detail: 'This message will not auto-hide',
              sticky: true,
            })
          }
        />
      </div>
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const toast = useRef<Toast>(null)

    return (
      <div>
        <Toast ref={toast} />
        <Button
          label="Show Multiple"
          onClick={() => {
            toast.current?.show([
              {
                severity: 'success',
                summary: 'Message 1',
                detail: 'First message',
              },
              {
                severity: 'info',
                summary: 'Message 2',
                detail: 'Second message',
              },
              {
                severity: 'warn',
                summary: 'Message 3',
                detail: 'Third message',
              },
            ])
          }}
        />
      </div>
    )
  },
}
