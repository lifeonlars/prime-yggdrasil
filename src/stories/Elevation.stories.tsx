import type { Meta, StoryObj } from '@storybook/react-vite'

const ElevationShowcase = () => (
  <div className="p-4">
    <h2 className="text-color mb-2">Elevation</h2>
    <p className="text-color-secondary mb-4">
      Yggdrasil uses a semantic elevation system with 4 levels that automatically adapt to both light and dark themes.
      Dark mode uses white rim shadows combined with stronger shadows for better visibility.
    </p>

    <div className="grid">
      <div className="col-12">
        <h3 className="text-color mb-3">Elevation Levels</h3>
      </div>

      <div className="col-12 md:col-6 lg:col-3 mb-4">
        <div className="surface-card shadow-1 p-4 border-round">
          <div className="text-color font-bold mb-2">Subtle</div>
          <div className="text-color-secondary text-sm mb-3">shadow-1 / --elevation-subtle</div>
          <div className="text-color-secondary text-xs">
            For static content like cards, panels, and list items
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3 mb-4">
        <div className="surface-card shadow-2 p-4 border-round">
          <div className="text-color font-bold mb-2">Moderate</div>
          <div className="text-color-secondary text-sm mb-3">shadow-2 / --elevation-moderate</div>
          <div className="text-color-secondary text-xs">
            For temporary overlays like dropdowns and menus
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3 mb-4">
        <div className="surface-card shadow-3 p-4 border-round">
          <div className="text-color font-bold mb-2">Elevated</div>
          <div className="text-color-secondary text-sm mb-3">shadow-3 / --elevation-elevated</div>
          <div className="text-color-secondary text-xs">
            For important overlays like dialogs and modals
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3 mb-4">
        <div className="surface-card shadow-4 p-4 border-round">
          <div className="text-color font-bold mb-2">High</div>
          <div className="text-color-secondary text-sm mb-3">shadow-4 / --elevation-high</div>
          <div className="text-color-secondary text-xs">
            For highest layers like tooltips and toasts
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        <h3 className="text-color mb-3">Usage</h3>
      </div>

      <div className="col-12 md:col-6">
        <div className="surface-card p-3 border-round mb-3">
          <div className="text-color font-semibold mb-2">CSS</div>
          <pre className="bg-gray-900 text-white p-3 border-round text-sm overflow-x-auto">
            <code>{`.my-component {
  box-shadow: var(--elevation-moderate);
}`}</code>
          </pre>
        </div>
      </div>

      <div className="col-12 md:col-6">
        <div className="surface-card p-3 border-round mb-3">
          <div className="text-color font-semibold mb-2">JSX</div>
          <pre className="bg-gray-900 text-white p-3 border-round text-sm overflow-x-auto">
            <code>{`<div className="surface-card shadow-2">
  Content
</div>`}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
)

const meta = {
  title: 'Design System/Elevation',
  component: ElevationShowcase,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElevationShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => <ElevationShowcase />,
}
