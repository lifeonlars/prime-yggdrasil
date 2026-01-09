import type { Meta, StoryObj } from '@storybook/react-vite'
import { Message } from 'primereact/message'
import { Messages } from 'primereact/messages'
import { Button } from 'primereact/button'
import { useRef } from 'react'

const meta = {
  title: 'Messages/Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warn', 'error'],
    },
  },
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    severity: 'success',
    text: 'Success Message',
  },
}

export const Info: Story = {
  args: {
    severity: 'info',
    text: 'Info Message',
  },
}

export const Warning: Story = {
  args: {
    severity: 'warn',
    text: 'Warning Message',
  },
}

export const Error: Story = {
  args: {
    severity: 'error',
    text: 'Error Message',
  },
}

export const AllSeverities: Story = {
  render: () => (
    <div className="flex flex-column gap-2" style={{ width: '30rem' }}>
      <Message severity="success" text="Success Message" />
      <Message severity="info" text="Info Message" />
      <Message severity="warn" text="Warning Message" />
      <Message severity="error" text="Error Message" />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const msgs = useRef<Messages>(null)

    return (
      <div className="flex flex-column gap-3" style={{ width: '30rem' }}>
        <Messages ref={msgs} />
        <div className="flex flex-wrap gap-2">
          <Button
            label="Success"
            severity="success"
            onClick={() =>
              msgs.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Message Content',
                sticky: true,
              })
            }
          />
          <Button
            label="Info"
            severity="info"
            onClick={() =>
              msgs.current?.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Message Content',
                sticky: true,
              })
            }
          />
          <Button
            label="Warn"
            severity="warning"
            onClick={() =>
              msgs.current?.show({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Message Content',
                sticky: true,
              })
            }
          />
          <Button
            label="Error"
            severity="danger"
            onClick={() =>
              msgs.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Message Content',
                sticky: true,
              })
            }
          />
          <Button
            label="Clear"
            text
            onClick={() => msgs.current?.clear()}
          />
        </div>
      </div>
    )
  },
}
