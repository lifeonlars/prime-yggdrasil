import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { Button } from 'primereact/button'
import { useRef } from 'react'

const meta = {
  title: 'Panel/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const stepperRef = useRef(null)

    return (
      <div style={{ width: '600px' }}>
        <Stepper ref={stepperRef}>
          <StepperPanel header="Header I">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content I
              </div>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Header II">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content II
              </div>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Header III">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content III
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    )
  },
}

export const Linear: Story = {
  render: () => {
    const stepperRef = useRef(null)

    return (
      <div style={{ width: '600px' }}>
        <Stepper ref={stepperRef} linear>
          <StepperPanel header="Personal Info">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Enter your personal information
              </div>
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Address">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Enter your address
              </div>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Review">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Review and confirm
              </div>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
              <Button label="Submit" icon="pi pi-check" iconPos="right" />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    )
  },
}

export const Vertical: Story = {
  render: () => {
    const stepperRef = useRef(null)

    return (
      <div style={{ width: '600px' }}>
        <Stepper ref={stepperRef} orientation="vertical">
          <StepperPanel header="Header I">
            <div className="flex flex-column">
              <div className="border-2 border-dashed surface-border border-round surface-ground p-4 mb-4">
                Content I
              </div>
            </div>
            <div className="flex justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Header II">
            <div className="flex flex-column">
              <div className="border-2 border-dashed surface-border border-round surface-ground p-4 mb-4">
                Content II
              </div>
            </div>
            <div className="flex justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Header III">
            <div className="flex flex-column">
              <div className="border-2 border-dashed surface-border border-round surface-ground p-4 mb-4">
                Content III
              </div>
            </div>
            <div className="flex justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    )
  },
}
