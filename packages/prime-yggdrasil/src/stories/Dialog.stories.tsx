import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useState } from 'react'

const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onHide: () => {},
  },
  render: (args) => {
    const [visible, setVisible] = useState(false)
    return (
      <div>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          {...args}
          header="Dialog Header"
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">
            This is the dialog content. Click outside or press escape to close.
          </p>
        </Dialog>
      </div>
    )
  },
}

export const WithFooter: Story = {
  args: {
    onHide: () => {},
  },
  render: (args) => {
    const [visible, setVisible] = useState(false)
    const footer = (
      <div>
        <Button label="Cancel" text onClick={() => setVisible(false)} />
        <Button label="Save" onClick={() => setVisible(false)} />
      </div>
    )
    return (
      <div>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          {...args}
          header="Confirm Action"
          visible={visible}
          style={{ width: '50vw' }}
          footer={footer}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">Are you sure you want to proceed?</p>
        </Dialog>
      </div>
    )
  },
}
