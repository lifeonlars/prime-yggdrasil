import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionTab } from 'primereact/accordion'

const meta = {
  title: 'Panel/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion style={{ width: '400px' }}>
      <AccordionTab header="Header I">
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionTab>
      <AccordionTab header="Header II">
        <p className="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p className="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.
        </p>
      </AccordionTab>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion multiple style={{ width: '400px' }}>
      <AccordionTab header="Header I">
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </AccordionTab>
      <AccordionTab header="Header II">
        <p className="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
        </p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p className="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus.
        </p>
      </AccordionTab>
    </Accordion>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Accordion style={{ width: '400px' }}>
      <AccordionTab header="Header I">
        <p className="m-0">
          This tab is enabled.
        </p>
      </AccordionTab>
      <AccordionTab header="Header II (Disabled)" disabled>
        <p className="m-0">
          This tab is disabled.
        </p>
      </AccordionTab>
      <AccordionTab header="Header III">
        <p className="m-0">
          This tab is enabled.
        </p>
      </AccordionTab>
    </Accordion>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Accordion style={{ width: '400px' }}>
      <AccordionTab header={<span><i className="pi pi-calendar mr-2"></i>Header I</span>}>
        <p className="m-0">
          Content for the first tab with an icon.
        </p>
      </AccordionTab>
      <AccordionTab header={<span><i className="pi pi-user mr-2"></i>Header II</span>}>
        <p className="m-0">
          Content for the second tab with an icon.
        </p>
      </AccordionTab>
      <AccordionTab header={<span><i className="pi pi-cog mr-2"></i>Header III</span>}>
        <p className="m-0">
          Content for the third tab with an icon.
        </p>
      </AccordionTab>
    </Accordion>
  ),
}
