import type { ReactNode } from 'react'

/**
 * FormField component properties
 */
interface FormFieldProps {
  /** Label text displayed above the form input */
  label: string
  /** ID of the input element this label is associated with (for accessibility) */
  htmlFor: string
  /** Form input component (InputText, Dropdown, Calendar, etc.) */
  children: ReactNode
}

/**
 * FormField - Accessible form field wrapper with label
 *
 * A lightweight wrapper that pairs a label with a form input control, ensuring
 * proper accessibility through `htmlFor` and `id` linkage. This component provides
 * consistent spacing and styling for all form fields.
 *
 * **Accessibility:**
 * - Links label to input via `htmlFor` attribute
 * - Allows screen readers to announce the label when input is focused
 * - Enables clicking the label to focus the input
 *
 * **When to use:**
 * - Wrapping any form input (text, dropdown, checkbox, etc.)
 * - Creating accessible forms
 * - Maintaining consistent label styling across the application
 *
 * **Design tokens used:**
 * - `--text-color`: Label text color
 * - `--font-medium`: Label font weight
 *
 * @param props - Component properties
 * @param props.label - Text to display in the label
 * @param props.htmlFor - ID of the input element (must match input's id attribute)
 * @param props.children - Form input component to render below the label
 *
 * @returns React component
 *
 * @example
 * // Basic text input with label
 * <FormField label="Email Address" htmlFor="email">
 *   <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
 * </FormField>
 *
 * @example
 * // Dropdown with label
 * <FormField label="Country" htmlFor="country">
 *   <Dropdown
 *     id="country"
 *     options={countries}
 *     value={selectedCountry}
 *     onChange={(e) => setSelectedCountry(e.value)}
 *   />
 * </FormField>
 *
 * @example
 * // Calendar input with label
 * <FormField label="Birth Date" htmlFor="birthdate">
 *   <Calendar id="birthdate" value={date} onChange={(e) => setDate(e.value)} />
 * </FormField>
 *
 * @see {@link https://www.w3.org/WAI/tutorials/forms/labels/} for label accessibility guidelines
 * @see {@link ../../docs/DECISION-MATRIX.md} for form input patterns
 */
export function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-color font-medium mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}
