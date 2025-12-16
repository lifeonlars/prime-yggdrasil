import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
  },
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex align-items-center">
        <Checkbox
          inputId="checkbox"
          onChange={(e) => setChecked(e.checked ?? false)}
          checked={checked}
        />
        <label htmlFor="checkbox" className="ml-2">
          Accept Terms
        </label>
      </div>
    )
  },
}

export const Multiple: Story = {
  args: {
    checked: false,
  },
  render: () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([])
    return (
      <div className="flex flex-column gap-3">
        <div className="flex align-items-center">
          <Checkbox
            inputId="item1"
            value="Item 1"
            onChange={(e) => {
              const value = e.value as string
              if (e.checked) {
                setCheckedItems([...checkedItems, value])
              } else {
                setCheckedItems(checkedItems.filter((item) => item !== value))
              }
            }}
            checked={checkedItems.includes('Item 1')}
          />
          <label htmlFor="item1" className="ml-2">
            Item 1
          </label>
        </div>
        <div className="flex align-items-center">
          <Checkbox
            inputId="item2"
            value="Item 2"
            onChange={(e) => {
              const value = e.value as string
              if (e.checked) {
                setCheckedItems([...checkedItems, value])
              } else {
                setCheckedItems(checkedItems.filter((item) => item !== value))
              }
            }}
            checked={checkedItems.includes('Item 2')}
          />
          <label htmlFor="item2" className="ml-2">
            Item 2
          </label>
        </div>
        <div className="flex align-items-center">
          <Checkbox
            inputId="item3"
            value="Item 3"
            onChange={(e) => {
              const value = e.value as string
              if (e.checked) {
                setCheckedItems([...checkedItems, value])
              } else {
                setCheckedItems(checkedItems.filter((item) => item !== value))
              }
            }}
            checked={checkedItems.includes('Item 3')}
          />
          <label htmlFor="item3" className="ml-2">
            Item 3
          </label>
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
  },
  render: () => (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center">
        <Checkbox inputId="disabled1" disabled checked={true} />
        <label htmlFor="disabled1" className="ml-2">
          Disabled Checked
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox inputId="disabled2" disabled checked={false} />
        <label htmlFor="disabled2" className="ml-2">
          Disabled Unchecked
        </label>
      </div>
    </div>
  ),
}
