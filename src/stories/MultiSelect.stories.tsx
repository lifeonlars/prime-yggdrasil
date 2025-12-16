import type { Meta, StoryObj } from '@storybook/react-vite'
import { MultiSelect } from 'primereact/multiselect'
import { useState } from 'react'

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'London', code: 'LDN' },
  { name: 'Tokyo', code: 'TYO' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Berlin', code: 'BRL' },
  { name: 'Sydney', code: 'SYD' },
]

export const Default: Story = {
  render: () => {
    const [selectedCities, setSelectedCities] = useState(null)
    return (
      <div className="w-30rem">
        <MultiSelect
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select Cities"
          className="w-full"
        />
      </div>
    )
  },
}

export const WithChips: Story = {
  render: () => {
    const [selectedCities, setSelectedCities] = useState(null)
    return (
      <div className="w-30rem">
        <MultiSelect
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select Cities"
          className="w-full"
          display="chip"
        />
      </div>
    )
  },
}

export const WithFilter: Story = {
  render: () => {
    const [selectedCities, setSelectedCities] = useState(null)
    return (
      <div className="w-30rem">
        <MultiSelect
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select Cities"
          className="w-full"
          filter
          display="chip"
        />
      </div>
    )
  },
}

export const MaxSelectedLabels: Story = {
  render: () => {
    const [selectedCities, setSelectedCities] = useState(null)
    return (
      <div className="w-30rem">
        <MultiSelect
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select Cities"
          className="w-full"
          maxSelectedLabels={2}
        />
      </div>
    )
  },
}
