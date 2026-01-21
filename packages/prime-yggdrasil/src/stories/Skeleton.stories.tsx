import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from 'primereact/skeleton'

const meta = {
  title: 'Misc/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-column gap-3" style={{ width: '400px' }}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-3">
      <Skeleton shape="square" size="4rem" />
      <Skeleton shape="circle" size="4rem" />
      <Skeleton width="10rem" height="4rem" borderRadius="16px" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-column gap-3" style={{ width: '400px' }}>
      <Skeleton width="100%" height="2rem" />
      <Skeleton width="75%" height="1.5rem" />
      <Skeleton width="50%" height="1rem" />
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="border-round border-1 surface-border p-4" style={{ width: '400px' }}>
      <div className="flex mb-3">
        <Skeleton shape="circle" size="4rem" className="mr-2" />
        <div style={{ flex: '1' }}>
          <Skeleton width="100%" className="mb-2" />
          <Skeleton width="75%" />
        </div>
      </div>
      <Skeleton width="100%" height="150px" />
      <div className="flex justify-content-between mt-3">
        <Skeleton width="4rem" height="2rem" />
        <Skeleton width="4rem" height="2rem" />
      </div>
    </div>
  ),
}

export const DataTable: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <div className="border-round border-1 surface-border p-4">
        <Skeleton width="100%" height="2.5rem" className="mb-2" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Skeleton width="20%" height="2rem" />
            <Skeleton width="30%" height="2rem" />
            <Skeleton width="25%" height="2rem" />
            <Skeleton width="25%" height="2rem" />
          </div>
        ))}
      </div>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex align-items-center border-bottom-1 surface-border p-3">
          <Skeleton shape="circle" size="3rem" className="mr-3" />
          <div style={{ flex: '1' }}>
            <Skeleton width="100%" className="mb-2" />
            <Skeleton width="75%" />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const CustomAnimation: Story = {
  render: () => (
    <div className="flex flex-column gap-3" style={{ width: '400px' }}>
      <Skeleton animation="wave" />
      <Skeleton animation="none" />
      <Skeleton />
    </div>
  ),
}
