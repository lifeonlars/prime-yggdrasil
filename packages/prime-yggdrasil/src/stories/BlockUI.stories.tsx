import type { Meta, StoryObj } from '@storybook/react-vite'
import { BlockUI } from 'primereact/blockui'
import { Button } from 'primereact/button'
import { useState } from 'react'

const meta = {
  title: 'Misc/BlockUI',
  component: BlockUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlockUI>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [blocked, setBlocked] = useState(false)

    return (
      <div>
        <Button
          label={blocked ? 'Unblock' : 'Block'}
          onClick={() => setBlocked(!blocked)}
          className="mb-3"
        />
        <BlockUI blocked={blocked}>
          <div className="border-round border-1 surface-border p-4" style={{ width: '400px' }}>
            <h3>Content</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <Button label="Action" />
          </div>
        </BlockUI>
      </div>
    )
  },
}

export const Document: Story = {
  render: () => {
    const [blocked, setBlocked] = useState(false)

    return (
      <div>
        <BlockUI blocked={blocked} fullScreen />
        <Button
          label={blocked ? 'Unblock Document' : 'Block Document'}
          onClick={() => setBlocked(!blocked)}
        />
        <div className="mt-3">
          <p>
            Click the button to block the entire document. This demonstrates fullScreen mode.
          </p>
        </div>
      </div>
    )
  },
}

export const CustomTemplate: Story = {
  render: () => {
    const [blocked, setBlocked] = useState(false)

    return (
      <div>
        <Button
          label={blocked ? 'Unblock' : 'Block'}
          onClick={() => setBlocked(!blocked)}
          className="mb-3"
        />
        <BlockUI
          blocked={blocked}
          template={
            <i
              className="pi pi-lock"
              style={{ fontSize: '3rem', color: 'var(--primary-color)' }}
            />
          }
        >
          <div className="border-round border-1 surface-border p-4" style={{ width: '400px' }}>
            <h3>Secured Content</h3>
            <p>
              This content is protected. Click the block button to see a custom lock icon overlay.
            </p>
            <Button label="Secure Action" />
          </div>
        </BlockUI>
      </div>
    )
  },
}

export const Panel: Story = {
  render: () => {
    const [blockedPanel, setBlockedPanel] = useState(false)

    return (
      <div style={{ width: '500px' }}>
        <div className="flex gap-3 mb-3">
          <Button
            label={blockedPanel ? 'Unblock Panel' : 'Block Panel'}
            onClick={() => setBlockedPanel(!blockedPanel)}
          />
        </div>

        <BlockUI blocked={blockedPanel}>
          <div className="border-round border-1 surface-border p-4">
            <h4>Panel Content</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex gap-2">
              <Button label="Save" size="small" />
              <Button label="Cancel" size="small" severity="secondary" />
            </div>
          </div>
        </BlockUI>
      </div>
    )
  },
}

export const MultipleSections: Story = {
  render: () => {
    const [blockedSection1, setBlockedSection1] = useState(false)
    const [blockedSection2, setBlockedSection2] = useState(false)

    return (
      <div style={{ width: '600px' }}>
        <div className="flex gap-3 mb-3">
          <Button
            label={blockedSection1 ? 'Unblock Section 1' : 'Block Section 1'}
            onClick={() => setBlockedSection1(!blockedSection1)}
            size="small"
          />
          <Button
            label={blockedSection2 ? 'Unblock Section 2' : 'Block Section 2'}
            onClick={() => setBlockedSection2(!blockedSection2)}
            size="small"
          />
        </div>

        <div className="flex gap-3">
          <BlockUI blocked={blockedSection1} style={{ flex: 1 }}>
            <div className="border-round border-1 surface-border p-4">
              <h4>Section 1</h4>
              <p>Independent blocking for this section.</p>
              <Button label="Action 1" size="small" />
            </div>
          </BlockUI>

          <BlockUI blocked={blockedSection2} style={{ flex: 1 }}>
            <div className="border-round border-1 surface-border p-4">
              <h4>Section 2</h4>
              <p>Independent blocking for this section.</p>
              <Button label="Action 2" size="small" />
            </div>
          </BlockUI>
        </div>
      </div>
    )
  },
}

export const AutoBlock: Story = {
  render: () => {
    const [blocked, setBlocked] = useState(false)

    const handleAction = () => {
      setBlocked(true)
      setTimeout(() => {
        setBlocked(false)
      }, 3000)
    }

    return (
      <div>
        <Button label="Trigger 3s Block" onClick={handleAction} className="mb-3" />
        <BlockUI blocked={blocked}>
          <div className="border-round border-1 surface-border p-4" style={{ width: '400px' }}>
            <h3>Auto-unblock Demo</h3>
            <p>Click the button above. This content will be blocked for 3 seconds.</p>
            <Button label="Action" />
          </div>
        </BlockUI>
      </div>
    )
  },
}
