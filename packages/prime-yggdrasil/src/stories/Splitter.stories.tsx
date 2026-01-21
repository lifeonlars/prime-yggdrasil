import type { Meta, StoryObj } from '@storybook/react-vite'
import { Splitter, SplitterPanel } from 'primereact/splitter'

const meta = {
  title: 'Panel/Splitter',
  component: Splitter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Splitter>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '600px', height: '300px' }}>
      <Splitter style={{ height: '100%' }}>
        <SplitterPanel className="flex align-items-center justify-content-center">
          Panel 1
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center">
          Panel 2
        </SplitterPanel>
      </Splitter>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ width: '600px', height: '300px' }}>
      <Splitter layout="vertical" style={{ height: '100%' }}>
        <SplitterPanel className="flex align-items-center justify-content-center">
          Panel 1
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center">
          Panel 2
        </SplitterPanel>
      </Splitter>
    </div>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <div style={{ width: '600px', height: '300px' }}>
      <Splitter style={{ height: '100%' }}>
        <SplitterPanel className="flex align-items-center justify-content-center" size={20}>
          Panel 1
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center" size={50}>
          Panel 2
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center" size={30}>
          Panel 3
        </SplitterPanel>
      </Splitter>
    </div>
  ),
}

export const Nested: Story = {
  render: () => (
    <div style={{ width: '600px', height: '400px' }}>
      <Splitter style={{ height: '100%' }}>
        <SplitterPanel className="flex align-items-center justify-content-center" size={30}>
          Panel 1
        </SplitterPanel>
        <SplitterPanel size={70}>
          <Splitter layout="vertical">
            <SplitterPanel className="flex align-items-center justify-content-center">
              Panel 2
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center">
              Panel 3
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </div>
  ),
}
