import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'

const meta = {
  title: 'Form/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('Option 1')
    return (
      <div className="flex flex-column gap-3">
        <div className="flex align-items-center">
          <RadioButton
            inputId="radio1"
            name="radio"
            value="Option 1"
            onChange={(e) => setSelectedValue(e.value)}
            checked={selectedValue === 'Option 1'}
          />
          <label htmlFor="radio1" className="ml-2">
            Option 1
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="radio2"
            name="radio"
            value="Option 2"
            onChange={(e) => setSelectedValue(e.value)}
            checked={selectedValue === 'Option 2'}
          />
          <label htmlFor="radio2" className="ml-2">
            Option 2
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="radio3"
            name="radio"
            value="Option 3"
            onChange={(e) => setSelectedValue(e.value)}
            checked={selectedValue === 'Option 3'}
          />
          <label htmlFor="radio3" className="ml-2">
            Option 3
          </label>
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center">
        <RadioButton inputId="disabled1" name="disabled" disabled checked />
        <label htmlFor="disabled1" className="ml-2">
          Disabled Checked
        </label>
      </div>
      <div className="flex align-items-center">
        <RadioButton inputId="disabled2" name="disabled2" disabled />
        <label htmlFor="disabled2" className="ml-2">
          Disabled Unchecked
        </label>
      </div>
    </div>
  ),
}
