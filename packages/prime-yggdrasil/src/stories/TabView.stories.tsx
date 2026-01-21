import type { Meta, StoryObj } from '@storybook/react-vite'
import { TabView, TabPanel } from 'primereact/tabview'

const meta = {
  title: 'Panel/TabView',
  component: TabView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TabView style={{ width: '500px' }}>
      <TabPanel header="Header I">
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </TabPanel>
      <TabPanel header="Header II">
        <p className="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>
      </TabPanel>
      <TabPanel header="Header III">
        <p className="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.
        </p>
      </TabPanel>
    </TabView>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <TabView style={{ width: '500px' }}>
      <TabPanel header="Header I" leftIcon="pi pi-calendar mr-2">
        <p className="m-0">
          Tab 1 Content with calendar icon.
        </p>
      </TabPanel>
      <TabPanel header="Header II" leftIcon="pi pi-user mr-2">
        <p className="m-0">
          Tab 2 Content with user icon.
        </p>
      </TabPanel>
      <TabPanel header="Header III" leftIcon="pi pi-cog mr-2">
        <p className="m-0">
          Tab 3 Content with settings icon.
        </p>
      </TabPanel>
    </TabView>
  ),
}

export const Disabled: Story = {
  render: () => (
    <TabView style={{ width: '500px' }}>
      <TabPanel header="Header I">
        <p className="m-0">
          This tab is enabled.
        </p>
      </TabPanel>
      <TabPanel header="Header II (Disabled)" disabled>
        <p className="m-0">
          This tab is disabled.
        </p>
      </TabPanel>
      <TabPanel header="Header III">
        <p className="m-0">
          This tab is enabled.
        </p>
      </TabPanel>
    </TabView>
  ),
}

export const Scrollable: Story = {
  render: () => (
    <TabView style={{ width: '500px' }} scrollable>
      <TabPanel header="Tab 1">
        <p className="m-0">Content 1</p>
      </TabPanel>
      <TabPanel header="Tab 2">
        <p className="m-0">Content 2</p>
      </TabPanel>
      <TabPanel header="Tab 3">
        <p className="m-0">Content 3</p>
      </TabPanel>
      <TabPanel header="Tab 4">
        <p className="m-0">Content 4</p>
      </TabPanel>
      <TabPanel header="Tab 5">
        <p className="m-0">Content 5</p>
      </TabPanel>
      <TabPanel header="Tab 6">
        <p className="m-0">Content 6</p>
      </TabPanel>
      <TabPanel header="Tab 7">
        <p className="m-0">Content 7</p>
      </TabPanel>
    </TabView>
  ),
}
