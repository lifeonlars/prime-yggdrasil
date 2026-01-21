import type { StatusOption } from '../columns/statusColumn'

export interface ExampleEntityRow {
  id: string
  name: string
  email: string
  status: string
  role: string
}

export const exampleStatusOptions: StatusOption[] = [
  { label: 'Active', value: 'Active', severity: 'success' },
  { label: 'Invited', value: 'Invited', severity: 'info' },
  { label: 'Pending', value: 'Pending', severity: 'info' },
  { label: 'Paused', value: 'Paused', severity: 'warning' },
  { label: 'Suspended', value: 'Suspended', severity: 'danger' },
]

export const exampleEntityRows: ExampleEntityRow[] = [
  { id: '1', name: 'Aria Birch', email: 'aria.birch@example.com', status: 'Active', role: 'Owner' },
  { id: '2', name: 'Nico Hale', email: 'nico.hale@example.com', status: 'Invited', role: 'Viewer' },
  { id: '3', name: 'Sage Lin', email: 'sage.lin@example.com', status: 'Pending', role: 'Editor' },
  { id: '4', name: 'Cora Vale', email: 'cora.vale@example.com', status: 'Active', role: 'Admin' },
  { id: '5', name: 'Mina Frost', email: 'mina.frost@example.com', status: 'Paused', role: 'Viewer' },
  { id: '6', name: 'Owen Pike', email: 'owen.pike@example.com', status: 'Active', role: 'Editor' },
  { id: '7', name: 'Isla Dove', email: 'isla.dove@example.com', status: 'Suspended', role: 'Viewer' },
  { id: '8', name: 'Reed Shaw', email: 'reed.shaw@example.com', status: 'Active', role: 'Owner' },
  { id: '9', name: 'Lena Hart', email: 'lena.hart@example.com', status: 'Invited', role: 'Editor' },
  { id: '10', name: 'Ezra Bloom', email: 'ezra.bloom@example.com', status: 'Pending', role: 'Viewer' },
]
