import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListBox } from 'primereact/listbox'
import { useState } from 'react'

const meta = {
  title: 'Form/ListBox',
  component: ListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListBox>

export default meta
type Story = StoryObj<typeof meta>

const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]

export const Default: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState(null)

    return (
      <ListBox
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        style={{ width: '250px' }}
      />
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [selectedCities, setSelectedCities] = useState(null)

    return (
      <ListBox
        value={selectedCities}
        onChange={(e) => setSelectedCities(e.value)}
        options={cities}
        optionLabel="name"
        multiple
        style={{ width: '250px' }}
      />
    )
  },
}

export const WithFilter: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState(null)

    const countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ]

    return (
      <ListBox
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={countries}
        optionLabel="name"
        filter
        style={{ width: '250px' }}
      />
    )
  },
}

export const Grouped: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState(null)

    const groupedCities = [
      {
        label: 'Germany',
        code: 'DE',
        items: [
          { label: 'Berlin', value: 'Berlin' },
          { label: 'Frankfurt', value: 'Frankfurt' },
          { label: 'Hamburg', value: 'Hamburg' },
          { label: 'Munich', value: 'Munich' },
        ],
      },
      {
        label: 'USA',
        code: 'US',
        items: [
          { label: 'Chicago', value: 'Chicago' },
          { label: 'Los Angeles', value: 'Los Angeles' },
          { label: 'New York', value: 'New York' },
          { label: 'San Francisco', value: 'San Francisco' },
        ],
      },
      {
        label: 'Japan',
        code: 'JP',
        items: [
          { label: 'Kyoto', value: 'Kyoto' },
          { label: 'Osaka', value: 'Osaka' },
          { label: 'Tokyo', value: 'Tokyo' },
          { label: 'Yokohama', value: 'Yokohama' },
        ],
      },
    ]

    return (
      <ListBox
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={groupedCities}
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        style={{ width: '250px' }}
      />
    )
  },
}

export const WithTemplate: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState(null)

    const countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ]

    const countryTemplate = (option: any) => {
      return (
        <div className="flex align-items-center gap-2">
          <span className={`flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
          <div>{option.name}</div>
        </div>
      )
    }

    return (
      <ListBox
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={countries}
        optionLabel="name"
        itemTemplate={countryTemplate}
        style={{ width: '250px' }}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState(cities[0])

    return (
      <ListBox
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        disabled
        style={{ width: '250px' }}
      />
    )
  },
}

export const VirtualScroll: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState(null)

    const items = Array.from({ length: 100000 }, (_, i) => ({ label: `Item ${i}`, value: i }))

    return (
      <ListBox
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.value)}
        options={items}
        virtualScrollerOptions={{ itemSize: 38 }}
        style={{ width: '250px', height: '250px' }}
        optionLabel="label"
        filter
      />
    )
  },
}
