import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

interface Product {
  id: string
  name: string
  category: string
  price: number
  quantity: number
}

const products: Product[] = [
  { id: '1', name: 'Laptop', category: 'Electronics', price: 999, quantity: 5 },
  { id: '2', name: 'Shirt', category: 'Clothing', price: 49, quantity: 20 },
  { id: '3', name: 'Book', category: 'Books', price: 19, quantity: 50 },
  { id: '4', name: 'Phone', category: 'Electronics', price: 699, quantity: 10 },
  { id: '5', name: 'Jeans', category: 'Clothing', price: 79, quantity: 15 },
]

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <DataTable {...args} value={products}>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(rowData) => `$${rowData.price}`} />
      <Column field="quantity" header="Quantity" />
    </DataTable>
  ),
}

export const Striped: Story = {
  render: (args) => (
    <DataTable {...args} value={products} stripedRows>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(rowData) => `$${rowData.price}`} />
      <Column field="quantity" header="Quantity" />
    </DataTable>
  ),
}

export const Paginated: Story = {
  render: (args) => (
    <DataTable {...args} value={products} paginator rows={3}>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(rowData) => `$${rowData.price}`} />
      <Column field="quantity" header="Quantity" />
    </DataTable>
  ),
}

export const Sortable: Story = {
  render: (args) => (
    <DataTable {...args} value={products}>
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="category" header="Category" sortable />
      <Column field="price" header="Price" sortable body={(rowData) => `$${rowData.price}`} />
      <Column field="quantity" header="Quantity" sortable />
    </DataTable>
  ),
}
