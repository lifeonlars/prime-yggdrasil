import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { useState } from 'react'

const meta = {
  title: 'Misc/Paginator',
  component: Paginator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paginator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
      setFirst(event.first)
      setRows(event.rows)
    }

    return (
      <div style={{ width: '600px' }}>
        <Paginator first={first} rows={rows} totalRecords={120} onPageChange={onPageChange} />
      </div>
    )
  },
}

export const WithRowsPerPage: Story = {
  render: () => {
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
      setFirst(event.first)
      setRows(event.rows)
    }

    return (
      <div style={{ width: '600px' }}>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={120}
          rowsPerPageOptions={[10, 20, 30, 50]}
          onPageChange={onPageChange}
        />
      </div>
    )
  },
}

export const Template: Story = {
  render: () => {
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
      setFirst(event.first)
      setRows(event.rows)
    }

    const template = {
      layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
      PrevPageLink: (options: any) => {
        return (
          <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
            <span className="p-3">Previous</span>
          </button>
        )
      },
      NextPageLink: (options: any) => {
        return (
          <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
            <span className="p-3">Next</span>
          </button>
        )
      },
      CurrentPageReport: (options: any) => {
        return (
          <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
            {options.first} - {options.last} of {options.totalRecords}
          </span>
        )
      },
    }

    return (
      <div style={{ width: '700px' }}>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={120}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
          template={template}
        />
      </div>
    )
  },
}

export const Simple: Story = {
  render: () => {
    const [first, setFirst] = useState(0)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
      setFirst(event.first)
    }

    return (
      <div style={{ width: '400px' }}>
        <Paginator
          first={first}
          rows={10}
          totalRecords={120}
          onPageChange={onPageChange}
          template="PrevPageLink CurrentPageReport NextPageLink"
        />
      </div>
    )
  },
}

export const LargeDataset: Story = {
  render: () => {
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(50)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
      setFirst(event.first)
      setRows(event.rows)
    }

    return (
      <div style={{ width: '600px' }}>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={10000}
          rowsPerPageOptions={[50, 100, 200, 500]}
          onPageChange={onPageChange}
        />
      </div>
    )
  },
}
