import { useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from '../components/blocks/Card'
import { PageHeader } from '../components/blocks/PageHeader'
import { SectionTitle } from '../components/blocks/SectionTitle'
import { FormField } from '../components/blocks/FormField'

interface Product {
  id: string
  name: string
  category: string
  price: number
}

export default function DesignSystemPlayground() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Tokyo', code: 'TYO' },
  ]

  const products: Product[] = [
    { id: '1', name: 'Product A', category: 'Electronics', price: 299 },
    { id: '2', name: 'Product B', category: 'Clothing', price: 49 },
    { id: '3', name: 'Product C', category: 'Books', price: 19 },
  ]

  return (
    <div className="p-3 md:p-4">
      <PageHeader
        title="Design System Playground"
        description="A showcase of PrimeReact components with the Lara Light Blue theme"
      />

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Buttons</SectionTitle>
            <div className="flex flex-wrap gap-2">
              <Button label="Primary" />
              <Button label="Secondary" severity="secondary" />
              <Button label="Success" severity="success" />
              <Button label="Info" severity="info" />
              <Button label="Warning" severity="warning" />
              <Button label="Danger" severity="danger" />
              <Button icon="pi pi-check" rounded />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Input</SectionTitle>
            <div className="flex flex-column gap-3">
              <FormField label="Text Input" htmlFor="input-text">
                <InputText
                  id="input-text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter text"
                  className="w-full"
                />
              </FormField>
              <FormField label="Dropdown" htmlFor="dropdown">
                <Dropdown
                  id="dropdown"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                  className="w-full"
                />
              </FormField>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Tags</SectionTitle>
            <div className="flex flex-wrap gap-2">
              <Tag value="Primary" />
              <Tag value="Success" severity="success" />
              <Tag value="Info" severity="info" />
              <Tag value="Warning" severity="warning" />
              <Tag value="Danger" severity="danger" />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Dialog</SectionTitle>
            <Button label="Show Dialog" onClick={() => setDialogVisible(true)} />
            <Dialog
              header="Dialog Header"
              visible={dialogVisible}
              style={{ width: '50vw' }}
              onHide={() => setDialogVisible(false)}
            >
              <p className="m-0">
                This is a sample dialog. Click outside or press escape to close.
              </p>
            </Dialog>
          </Card>
        </div>

        <div className="col-12 lg:col-8">
          <Card>
            <SectionTitle>DataTable</SectionTitle>
            <DataTable value={products} stripedRows>
              <Column field="id" header="ID" />
              <Column field="name" header="Name" />
              <Column field="category" header="Category" />
              <Column
                field="price"
                header="Price"
                body={(rowData) => `$${rowData.price}`}
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  )
}
