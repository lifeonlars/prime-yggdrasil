import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from 'primereact/tooltip'
import { Button } from 'primereact/button'

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Tooltip target=".custom-tooltip-btn" />
        <Button
          className="custom-tooltip-btn"
          label="Hover Me"
          data-pr-tooltip="This is a tooltip"
        />
      </div>
    )
  },
}

export const Positions: Story = {
  render: () => {
    return (
      <div className="flex flex-column gap-3 align-items-center" style={{ padding: '2rem' }}>
        <Tooltip target=".tooltip-top" position="top" />
        <Button
          className="tooltip-top"
          label="Top"
          data-pr-tooltip="Tooltip on top"
        />

        <div className="flex gap-3">
          <div>
            <Tooltip target=".tooltip-left" position="left" />
            <Button
              className="tooltip-left"
              label="Left"
              data-pr-tooltip="Tooltip on left"
            />
          </div>

          <div>
            <Tooltip target=".tooltip-right" position="right" />
            <Button
              className="tooltip-right"
              label="Right"
              data-pr-tooltip="Tooltip on right"
            />
          </div>
        </div>

        <Tooltip target=".tooltip-bottom" position="bottom" />
        <Button
          className="tooltip-bottom"
          label="Bottom"
          data-pr-tooltip="Tooltip on bottom"
        />
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Tooltip target=".icon-btn-1" />
        <Button
          className="icon-btn-1"
          icon="pi pi-save"
          data-pr-tooltip="Save"
          rounded
        />

        <Tooltip target=".icon-btn-2" />
        <Button
          className="icon-btn-2"
          icon="pi pi-pencil"
          data-pr-tooltip="Edit"
          rounded
        />

        <Tooltip target=".icon-btn-3" />
        <Button
          className="icon-btn-3"
          icon="pi pi-trash"
          data-pr-tooltip="Delete"
          rounded
        />

        <Tooltip target=".icon-btn-4" />
        <Button
          className="icon-btn-4"
          icon="pi pi-download"
          data-pr-tooltip="Download"
          rounded
        />
      </div>
    )
  },
}

export const MouseTrack: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Tooltip target=".mouse-track-btn" mouseTrack mouseTrackLeft={10} />
        <Button
          className="mouse-track-btn"
          label="Hover Me"
          data-pr-tooltip="Tooltip follows mouse"
        />
      </div>
    )
  },
}

export const CustomContent: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Tooltip target=".custom-content-btn">
          <div className="flex align-items-center">
            <i className="pi pi-info-circle mr-2"></i>
            <span>This is a custom tooltip with HTML content</span>
          </div>
        </Tooltip>
        <Button
          className="custom-content-btn"
          label="Hover Me"
        />
      </div>
    )
  },
}

export const DisabledButton: Story = {
  render: () => {
    return (
      <div className="flex gap-3">
        <Tooltip target=".disabled-btn-tooltip" />
        <span
          className="disabled-btn-tooltip"
          data-pr-tooltip="This button is disabled"
        >
          <Button label="Disabled" disabled />
        </span>
      </div>
    )
  },
}
