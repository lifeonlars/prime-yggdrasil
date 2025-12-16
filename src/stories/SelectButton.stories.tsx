import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectButton } from 'primereact/selectbutton'
import { useState } from 'react'

const meta = {
  title: 'Components/SelectButton',
  component: SelectButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectButton>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

const paymentOptions = [
  { label: 'Credit Card', value: 'cc' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bank Transfer', value: 'bank' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('left')
    return (
      <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <SelectButton
        value={value}
        onChange={(e) => setValue(e.value)}
        options={options}
        multiple
      />
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('left')
    const iconOptions = [
      { icon: 'pi pi-align-left', value: 'left' },
      { icon: 'pi pi-align-center', value: 'center' },
      { icon: 'pi pi-align-right', value: 'right' },
      { icon: 'pi pi-align-justify', value: 'justify' },
    ]
    return (
      <SelectButton
        value={value}
        onChange={(e) => setValue(e.value)}
        options={iconOptions}
        optionLabel="icon"
        itemTemplate={(option) => <i className={option.icon}></i>}
      />
    )
  },
}

export const PaymentMethod: Story = {
  render: () => {
    const [value, setValue] = useState('cc')
    return (
      <div className="flex flex-column gap-2">
        <label>Select Payment Method</label>
        <SelectButton
          value={value}
          onChange={(e) => setValue(e.value)}
          options={paymentOptions}
        />
      </div>
    )
  },
}
