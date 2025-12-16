import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitButton } from 'primereact/splitbutton'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help', 'contrast'],
    },
  },
} satisfies Meta<typeof SplitButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const toast = useRef<Toast>(null)

    const items = [
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
      {
        label: 'React Website',
        icon: 'pi pi-external-link',
        command: () => {
          window.open('https://react.dev', '_blank')
        },
      },
    ]

    return (
      <div>
        <Toast ref={toast} />
        <SplitButton
          label="Save"
          icon="pi pi-check"
          onClick={() =>
            toast.current?.show({
              severity: 'success',
              summary: 'Success',
              detail: 'Data Saved',
            })
          }
          model={items}
        />
      </div>
    )
  },
}

export const Severities: Story = {
  render: () => {
    const toast = useRef<Toast>(null)

    const items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ]

    return (
      <div>
        <Toast ref={toast} />
        <div className="flex flex-wrap gap-2">
          <SplitButton label="Primary" model={items} />
          <SplitButton label="Secondary" severity="secondary" model={items} />
          <SplitButton label="Success" severity="success" model={items} />
          <SplitButton label="Info" severity="info" model={items} />
          <SplitButton label="Warning" severity="warning" model={items} />
          <SplitButton label="Danger" severity="danger" model={items} />
        </div>
      </div>
    )
  },
}

export const Outlined: Story = {
  render: () => {
    const items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ]

    return (
      <div className="flex flex-wrap gap-2">
        <SplitButton label="Primary" outlined model={items} />
        <SplitButton label="Success" outlined severity="success" model={items} />
        <SplitButton label="Info" outlined severity="info" model={items} />
        <SplitButton label="Warning" outlined severity="warning" model={items} />
        <SplitButton label="Danger" outlined severity="danger" model={items} />
      </div>
    )
  },
}
