import { useState, useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'
import { Chip } from 'primereact/chip'
import { Chips } from 'primereact/chips'
import { Message } from 'primereact/message'
import { Toast } from 'primereact/toast'
import { MultiSelect } from 'primereact/multiselect'
import { SelectButton } from 'primereact/selectbutton'
import { SplitButton } from 'primereact/splitbutton'
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
  const [selectedOption, setSelectedOption] = useState('Option 1')
  const [checked, setChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [chipValues, setChipValues] = useState<string[]>(['Tag 1', 'Tag 2'])
  const [selectedCities, setSelectedCities] = useState(null)
  const [selectButtonValue, setSelectButtonValue] = useState('Left')
  const toast = useRef<Toast>(null)

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Tokyo', code: 'TYO' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Berlin', code: 'BRL' },
  ]

  const selectButtonOptions = [
    { label: 'Left', value: 'Left' },
    { label: 'Center', value: 'Center' },
    { label: 'Right', value: 'Right' },
  ]

  const splitButtonItems = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        toast.current?.show({
          severity: 'success',
          summary: 'Updated',
          detail: 'Data Updated',
        })
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        toast.current?.show({
          severity: 'warn',
          summary: 'Delete',
          detail: 'Data Deleted',
        })
      },
    },
  ]

  const products: Product[] = [
    { id: '1', name: 'Product A', category: 'Electronics', price: 299 },
    { id: '2', name: 'Product B', category: 'Clothing', price: 49 },
    { id: '3', name: 'Product C', category: 'Books', price: 19 },
  ]

  const showToast = (severity: 'success' | 'info' | 'warn' | 'error') => {
    toast.current?.show({
      severity,
      summary: severity.charAt(0).toUpperCase() + severity.slice(1),
      detail: `This is a ${severity} message`,
    })
  }

  return (
    <div className="p-3 md:p-4">
      <Toast ref={toast} />
      <PageHeader
        title="Design System Playground"
        description="A showcase of PrimeReact components with the Yggdrasil theme"
      />

      <div className="grid">
        <div className="col-12">
          <Card>
            <SectionTitle>Buttons</SectionTitle>

            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-2">Large Buttons</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" size="large" />
                <Button label="Primary" icon="pi pi-check" size="large" />
                <Button icon="pi pi-check" size="large" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" outlined size="large" />
                <Button label="Primary" icon="pi pi-check" outlined size="large" />
                <Button icon="pi pi-check" outlined size="large" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" text size="large" />
                <Button label="Primary" icon="pi pi-check" text size="large" />
                <Button icon="pi pi-check" text size="large" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Danger" severity="danger" size="large" />
                <Button label="Danger" icon="pi pi-times" severity="danger" size="large" />
                <Button icon="pi pi-times" severity="danger" size="large" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button label="Danger" outlined severity="danger" size="large" />
                <Button label="Danger" icon="pi pi-times" outlined severity="danger" size="large" />
                <Button icon="pi pi-times" outlined severity="danger" size="large" />
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-2">Normal Buttons</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" />
                <Button label="Primary" icon="pi pi-check" />
                <Button icon="pi pi-check" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" outlined />
                <Button label="Primary" icon="pi pi-check" outlined />
                <Button icon="pi pi-check" outlined />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" text />
                <Button label="Primary" icon="pi pi-check" text />
                <Button icon="pi pi-check" text />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Danger" severity="danger" />
                <Button label="Danger" icon="pi pi-times" severity="danger" />
                <Button icon="pi pi-times" severity="danger" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button label="Danger" outlined severity="danger" />
                <Button label="Danger" icon="pi pi-times" outlined severity="danger" />
                <Button icon="pi pi-times" outlined severity="danger" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Small Buttons</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" size="small" />
                <Button label="Primary" icon="pi pi-check" size="small" />
                <Button icon="pi pi-check" size="small" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" outlined size="small" />
                <Button label="Primary" icon="pi pi-check" outlined size="small" />
                <Button icon="pi pi-check" outlined size="small" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Primary" text size="small" />
                <Button label="Primary" icon="pi pi-check" text size="small" />
                <Button icon="pi pi-check" text size="small" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Button label="Danger" severity="danger" size="small" />
                <Button label="Danger" icon="pi pi-times" severity="danger" size="small" />
                <Button icon="pi pi-times" severity="danger" size="small" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button label="Danger" outlined severity="danger" size="small" />
                <Button label="Danger" icon="pi pi-times" outlined severity="danger" size="small" />
                <Button icon="pi pi-times" outlined severity="danger" size="small" />
              </div>
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

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Radio Buttons</SectionTitle>
            <div className="flex flex-column gap-3">
              <div className="flex align-items-center">
                <RadioButton
                  inputId="option1"
                  name="option"
                  value="Option 1"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'Option 1'}
                />
                <label htmlFor="option1" className="ml-2">
                  Option 1
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="option2"
                  name="option"
                  value="Option 2"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'Option 2'}
                />
                <label htmlFor="option2" className="ml-2">
                  Option 2
                </label>
              </div>
              <div className="flex align-items-center">
                <RadioButton
                  inputId="option3"
                  name="option"
                  value="Option 3"
                  onChange={(e) => setSelectedOption(e.value)}
                  checked={selectedOption === 'Option 3'}
                />
                <label htmlFor="option3" className="ml-2">
                  Option 3
                </label>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Checkboxes</SectionTitle>
            <div className="flex flex-column gap-3">
              <div className="flex align-items-center">
                <Checkbox
                  inputId="single"
                  onChange={(e) => setChecked(e.checked ?? false)}
                  checked={checked}
                />
                <label htmlFor="single" className="ml-2">
                  Single Checkbox
                </label>
              </div>
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
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Chips</SectionTitle>
            <div className="flex flex-column gap-3">
              <div className="flex flex-wrap gap-2">
                <Chip label="Basic Chip" />
                <Chip label="With Icon" icon="pi pi-user" />
                <Chip label="Removable" removable />
              </div>
              <FormField label="Chips Input" htmlFor="chips">
                <Chips
                  id="chips"
                  value={chipValues}
                  onChange={(e) => setChipValues(e.value ?? [])}
                  className="w-full"
                />
              </FormField>
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Messages</SectionTitle>
            <div className="flex flex-column gap-2">
              <Message severity="success" text="Success Message" />
              <Message severity="info" text="Info Message" />
              <Message severity="warn" text="Warning Message" />
              <Message severity="error" text="Error Message" />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>Toast Triggers</SectionTitle>
            <div className="flex flex-wrap gap-2">
              <Button
                label="Success"
                severity="success"
                onClick={() => showToast('success')}
              />
              <Button label="Info" severity="info" onClick={() => showToast('info')} />
              <Button
                label="Warning"
                severity="warning"
                onClick={() => showToast('warn')}
              />
              <Button
                label="Error"
                severity="danger"
                onClick={() => showToast('error')}
              />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>MultiSelect</SectionTitle>
            <FormField label="Select Cities" htmlFor="multiselect">
              <MultiSelect
                id="multiselect"
                value={selectedCities}
                onChange={(e) => setSelectedCities(e.value)}
                options={cities}
                optionLabel="name"
                placeholder="Select Cities"
                className="w-full"
                display="chip"
              />
            </FormField>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>SelectButton</SectionTitle>
            <FormField label="Alignment" htmlFor="selectbutton">
              <SelectButton
                id="selectbutton"
                value={selectButtonValue}
                onChange={(e) => setSelectButtonValue(e.value)}
                options={selectButtonOptions}
              />
            </FormField>
          </Card>
        </div>

        <div className="col-12 md:col-6 lg:col-4">
          <Card>
            <SectionTitle>SplitButton</SectionTitle>
            <div className="flex flex-wrap gap-2">
              <SplitButton
                label="Save"
                icon="pi pi-check"
                onClick={() => showToast('success')}
                model={splitButtonItems}
              />
              <SplitButton
                label="Actions"
                severity="info"
                model={splitButtonItems}
              />
            </div>
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
