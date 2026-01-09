import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'

const meta = {
  title: 'Overlay/ConfirmPopup',
  component: ConfirmPopup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmPopup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const toast = useRef(null)

    const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          toast.current?.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
          })
        },
        reject: () => {
          toast.current?.show({
            severity: 'warn',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          })
        },
      })
    }

    return (
      <div>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button onClick={confirm} icon="pi pi-check" label="Confirm" />
      </div>
    )
  },
}

export const DeleteAction: Story = {
  render: () => {
    const toast = useRef(null)

    const confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept: () => {
          toast.current?.show({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Record deleted successfully',
            life: 3000,
          })
        },
      })
    }

    return (
      <div>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button
          onClick={confirmDelete}
          icon="pi pi-trash"
          label="Delete"
          severity="danger"
        />
      </div>
    )
  },
}

export const CustomLabels: Story = {
  render: () => {
    const toast = useRef(null)

    const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to save changes?',
        icon: 'pi pi-save',
        acceptLabel: 'Yes, Save',
        rejectLabel: 'No, Cancel',
        accept: () => {
          toast.current?.show({
            severity: 'success',
            summary: 'Saved',
            detail: 'Changes saved successfully',
            life: 3000,
          })
        },
      })
    }

    return (
      <div>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button onClick={confirm} icon="pi pi-save" label="Save" />
      </div>
    )
  },
}

export const WithoutIcon: Story = {
  render: () => {
    const toast = useRef(null)

    const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'This is a simple confirmation without an icon.',
        accept: () => {
          toast.current?.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Action confirmed',
            life: 3000,
          })
        },
      })
    }

    return (
      <div>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button onClick={confirm} label="Confirm" />
      </div>
    )
  },
}

export const MultipleButtons: Story = {
  render: () => {
    const toast = useRef(null)

    const confirmSave = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Do you want to save this document?',
        icon: 'pi pi-save',
        accept: () => {
          toast.current?.show({
            severity: 'success',
            summary: 'Saved',
            detail: 'Document saved',
            life: 3000,
          })
        },
      })
    }

    const confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Do you want to delete this document?',
        icon: 'pi pi-trash',
        acceptClassName: 'p-button-danger',
        accept: () => {
          toast.current?.show({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Document deleted',
            life: 3000,
          })
        },
      })
    }

    return (
      <div className="flex gap-3">
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button onClick={confirmSave} icon="pi pi-save" label="Save" />
        <Button
          onClick={confirmDelete}
          icon="pi pi-trash"
          label="Delete"
          severity="danger"
        />
      </div>
    )
  },
}
