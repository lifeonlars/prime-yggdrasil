import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'

const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'London', code: 'LDN' },
  { name: 'Tokyo', code: 'TYO' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Berlin', code: 'BER' },
]

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [selectedCity, setSelectedCity] = useState(null)
    return (
      <Dropdown
        {...args}
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
        style={{ width: '200px' }}
      />
    )
  },
}

export const WithValue: Story = {
  render: (args) => {
    const [selectedCity, setSelectedCity] = useState(cities[0])
    return (
      <Dropdown
        {...args}
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
        style={{ width: '200px' }}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    options: cities,
    optionLabel: 'name',
    placeholder: 'Disabled',
    disabled: true,
    style: { width: '200px' },
  },
}
