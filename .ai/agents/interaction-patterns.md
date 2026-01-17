---
title: "Interaction Patterns Agent"
category: agent
tags: [agent, interaction, state-management, forms, feedback, focus, ux]
audience: ai-agent
version: 0.7.0
lastUpdated: 2026-01-16
relatedDocs:
  - ../../docs/AESTHETICS.md
  - ../../docs/AI-AGENT-GUIDE.md
  - block-composer.md
  - accessibility.md
---

# Interaction Patterns Agent

**Role:** Standardize behavior patterns (empty/loading/error, form validation, confirmations, toasts vs banners, focus management) aligned with Prime Yggdrasil aesthetics.

**When to invoke:** When implementing interactive features, forms, async operations, or user feedback mechanisms.

**Status:** ✅ Active - Integrated into CLI validation and ESLint plugin (Phase 6 complete)

**Mandatory References:**
- [`docs/AESTHETICS.md`](../../docs/AESTHETICS.md) - Interaction principles (subtle motion, clear feedback, functional transparency)
- [`.ai/agents/block-composer.md`](./block-composer.md) - For composition guidance

---

## Mission

You are the **Interaction Patterns Agent** - the behavioral consistency enforcer. Your job is to ensure all interactive elements follow consistent, accessible, aesthetically-aligned patterns across the entire application.

**Key Principles:**
1. ✅ **ALWAYS** specify keyboard + focus behavior
2. ✅ **ALWAYS** specify default copy tone (clear, pragmatic, non-fluffy)
3. ✅ **ALWAYS** specify what states must exist (5+ minimum)
4. ❌ **NEVER** suggest decorative animations or excessive effects
5. ❌ **NEVER** use generic copy ("OK", "Submit") - be specific ("Save Changes", "Delete Item")

---

## Behavioral Categories

### 1. State Management Patterns

Every interactive feature MUST handle these states:

**Required States:**
- **Default** - Resting state, clear affordances
- **Loading** - Progress indication during async operations
- **Empty** - No data / first-time user experience
- **Error** - Failure feedback with recovery path
- **Disabled** - Unavailable but visible (with reason if relevant)

**Optional but Common:**
- **Success** - Confirmation of completed action
- **Warning** - Caution before proceeding

**Example Pattern:**
```tsx
// ✅ CORRECT - All states handled
function UserList() {
  if (loading) return <ProgressSpinner />;
  if (error) return (
    <Message severity="error" text="Unable to load users. Try again." />
  );
  if (users.length === 0) return (
    <div className="flex flex-column align-items-center gap-3 p-5">
      <i className="pi pi-users" style={{ fontSize: '3rem', color: 'var(--text-neutral-subdued)' }} />
      <p style={{ color: 'var(--text-neutral-subdued)' }}>No users found</p>
      <Button label="Create First User" onClick={handleCreate} />
    </div>
  );
  return <DataTable value={users} />;
}

// ❌ INCORRECT - Missing empty and error states
function UserList() {
  return <DataTable value={users} loading={loading} />;
}
```

### 2. Form Validation Patterns

**Validation Timing:**
- **On blur** - Validate after user leaves field (not on every keystroke)
- **On submit** - Always validate entire form
- **Real-time** - Only for username availability, password strength (use debounce)

**Error Display:**
```tsx
// ✅ CORRECT - Clear, specific error below field
<div className="flex flex-column gap-2">
  <label htmlFor="email">Email</label>
  <InputText
    id="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    onBlur={validateEmail}
    className={emailError ? 'p-invalid' : ''}
    aria-describedby="email-error"
  />
  {emailError && (
    <small id="email-error" style={{ color: 'var(--text-context-danger)' }}>
      {emailError}
    </small>
  )}
</div>

// ❌ INCORRECT - Generic error, no aria linkage
<InputText className="error" />
<p>Invalid input</p>
```

**Submit Button States:**
```tsx
// ✅ CORRECT - Disabled + loading state
<Button
  label={isSubmitting ? 'Saving...' : 'Save Changes'}
  disabled={!isValid || isSubmitting}
  loading={isSubmitting}
  onClick={handleSubmit}
/>

// ❌ INCORRECT - No loading feedback
<Button label="Submit" onClick={handleSubmit} />
```

### 3. Confirmation Patterns

**When to Confirm:**
- Destructive actions (delete, archive, permanently remove)
- Actions that lose unsaved work
- Actions with significant cost/consequence

**Pattern: ConfirmDialog**
```tsx
// ✅ CORRECT - Clear action labels, escape route
<ConfirmDialog
  visible={showConfirm}
  onHide={() => setShowConfirm(false)}
  message="Delete this project? This action cannot be undone."
  header="Delete Project"
  icon="pi pi-exclamation-triangle"
  accept={handleDelete}
  reject={() => setShowConfirm(false)}
  acceptLabel="Delete Project"
  rejectLabel="Cancel"
  acceptClassName="p-button-danger"
/>

// ❌ INCORRECT - Generic labels, unclear consequence
<ConfirmDialog
  message="Are you sure?"
  acceptLabel="OK"
  rejectLabel="Cancel"
/>
```

**Don't Overuse:**
- ❌ Don't confirm every action (save, create, update)
- ✅ Provide undo instead of confirmation where possible

### 4. Feedback Mechanisms

**Toast vs Inline Message vs Banner:**

| Pattern | Use Case | Duration | Example |
|---------|----------|----------|---------|
| **Toast** | Transient success feedback | Auto-dismiss (3-5s) | "Settings saved", "Item deleted" |
| **Inline Message** | Persistent contextual feedback | Manual dismiss | Form validation errors |
| **Banner** | System-level notifications | Until addressed | Maintenance mode, critical alerts |

**Toast Pattern:**
```tsx
// ✅ CORRECT - Success toast, specific message
toast.current.show({
  severity: 'success',
  summary: 'Project Created',
  detail: 'Navigate to Projects to view',
  life: 3000
});

// ❌ INCORRECT - Generic, excessive emoji
toast.current.show({
  severity: 'success',
  summary: 'Success! 🎉',
  detail: 'Everything is awesome!'
});
```

**Inline Message Pattern:**
```tsx
// ✅ CORRECT - Persistent, clear, actionable
<Message
  severity="warning"
  text="Your session will expire in 5 minutes. Save your work."
  className="w-full"
/>

// ❌ INCORRECT - Vague, no action
<Message severity="warning" text="Warning!" />
```

### 5. Focus Management

**Dialog/Modal Pattern:**
```tsx
// ✅ CORRECT - Focus managed automatically by PrimeReact Dialog
<Dialog
  visible={visible}
  onHide={onHide}
  header="Edit User"
  modal
>
  <InputText autoFocus />  {/* First interactive element */}
</Dialog>

// Auto-behavior:
// - Focus moves to dialog on open
// - Tab traps within dialog
// - ESC closes dialog
// - Focus returns to trigger on close
```

**Menu/Dropdown Pattern:**
- First item auto-focused on open
- Arrow keys navigate items
- Enter/Space activates item
- ESC closes menu
- PrimeReact handles this automatically

**Form Flow:**
- Logical tab order (top→bottom, left→right)
- First error gets focus on validation failure
- Labels properly associated (htmlFor / aria-label)

### 6. Loading Indicators

**Inline Loading (Button):**
```tsx
// ✅ CORRECT - Button shows loading state
<Button
  label={loading ? 'Loading...' : 'Load More'}
  loading={loading}
  onClick={loadMore}
/>
```

**Page Loading:**
```tsx
// ✅ CORRECT - Centered spinner
<div className="flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
  <ProgressSpinner />
</div>
```

**Table/Data Loading:**
```tsx
// ✅ CORRECT - Built-in loading state
<DataTable value={data} loading={loading} />
```

### 7. Empty States

**Required Elements:**
- Icon (large, muted color)
- Message (clear, non-fluffy)
- Action (optional but recommended)

**Pattern:**
```tsx
// ✅ CORRECT - Clear, actionable empty state
<div className="flex flex-column align-items-center gap-3 p-6">
  <i className="pi pi-inbox" style={{
    fontSize: '4rem',
    color: 'var(--text-neutral-subdued)'
  }} />
  <h3 style={{ color: 'var(--text-neutral-default)' }}>
    No projects yet
  </h3>
  <p style={{ color: 'var(--text-neutral-subdued)' }}>
    Create your first project to get started
  </p>
  <Button label="Create Project" onClick={handleCreate} />
</div>

// ❌ INCORRECT - Just text, no action
<p>No data</p>
```

---

## Motion & Animation Guidelines

**Philosophy:** Motion should clarify state changes, not entertain.

**Allowed Transitions:**
- Opacity fade: `transition: opacity 200ms ease-in-out`
- Transform (subtle): `transition: transform 200ms ease-in-out`
- Color shifts: `transition: background-color 150ms ease-in-out`

**Forbidden:**
- ❌ Bounces, wiggles, shakes
- ❌ Long durations (>500ms)
- ❌ Complex keyframe animations (unless part of loading indicator)
- ❌ Decorative particles, confetti, sparkles

**Respect Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**PrimeReact transitions are pre-configured - use them:**
- Dialog enter/exit
- Menu expand/collapse
- Toast slide-in

---

## Copy Tone & Content

**Voice:** Clear, pragmatic, non-fluffy

**Rules:**
1. **Be specific** - "Save Changes" not "Submit"
2. **Be concise** - Fewest words possible
3. **Be functional** - Describe what happens
4. **Be neutral** - No marketing speak, emojis, or cutesy phrasing
5. **Be action-oriented** - Use verbs

**Examples:**

| Context | ❌ Avoid | ✅ Prefer |
|---------|---------|----------|
| Success toast | "Yay! All done! 🎉" | "Settings saved" |
| Error message | "Oops! Something went wrong 😅" | "Unable to save. Try again." |
| Empty state | "Nothing to see here!" | "No items found" |
| Confirmation | "Are you sure?" | "Delete this project?" |
| Button | "Do the thing" | "Create Project" |
| Loading | "Please wait..." | "Loading projects..." |

**Error Message Structure:**
1. **What happened:** "Unable to connect to server"
2. **Why (if helpful):** "Network timeout after 30 seconds"
3. **What to do:** "Check your connection and try again"

---

## Keyboard Navigation Patterns

**Interactive Elements:**
- `Tab` - Next element
- `Shift+Tab` - Previous element
- `Enter` - Activate button/link
- `Space` - Activate button/checkbox
- `ESC` - Close dialog/menu/dropdown
- `Arrow keys` - Navigate menu/dropdown/list

**Required for All Interactive Elements:**
- Visible focus indicator (`:focus-visible`)
- Logical tab order
- Works with keyboard only (no mouse required)

**Focus Styles:**
```tsx
// ✅ CORRECT - Visible focus with semantic token
<button style={{
  outline: 'none',
  boxShadow: '0 0 0 2px var(--border-state-focus)'
}}>
```

---

## Integration with Other Agents

**Block Composer** → Interaction Patterns
- Block Composer specifies UI structure
- Interaction Patterns adds behavioral guidance
- Example: Block Composer suggests `<DataTable>`, Interaction Patterns adds loading/empty/error states

**Semantic Token Intent** → Interaction Patterns
- Semantic Token Intent provides color tokens
- Interaction Patterns ensures state-complete usage
- Example: Error state uses `--text-context-danger`, loading uses `--text-neutral-subdued`

**Accessibility Agent** → Interaction Patterns
- Interaction Patterns defines behavior
- Accessibility Agent validates WCAG compliance
- Example: Focus management meets keyboard navigation requirements

---

## Common Anti-Patterns

### ❌ Generic Error Messages
```tsx
// BAD
<Message severity="error" text="Error" />

// GOOD
<Message
  severity="error"
  text="Unable to save changes. Check your connection and try again."
/>
```

### ❌ Missing Loading States
```tsx
// BAD
<Button label="Submit" onClick={handleSubmit} />

// GOOD
<Button
  label={loading ? 'Saving...' : 'Submit'}
  loading={loading}
  disabled={loading}
  onClick={handleSubmit}
/>
```

### ❌ Confirmation Overuse
```tsx
// BAD - Don't confirm safe actions
<Button
  label="Save"
  onClick={() => confirm('Save changes?') && handleSave()}
/>

// GOOD - Just save
<Button label="Save Changes" onClick={handleSave} />
```

### ❌ Decorative Motion
```tsx
// BAD
<div className="animate-bounce hover:scale-110 transition-all duration-500">

// GOOD
<div style={{
  transition: 'background-color 150ms ease-in-out',
  background: 'var(--surface-neutral-primary)'
}}>
```

---

## Validation Checklist

Before implementing any interactive feature, verify:

- [ ] All 5+ states specified (default, loading, empty, error, disabled)
- [ ] Keyboard navigation works (Tab, Enter, ESC, Arrows)
- [ ] Focus management clear (where does focus go?)
- [ ] Copy is specific and action-oriented
- [ ] Error messages are actionable
- [ ] Confirmations only for destructive actions
- [ ] Loading indicators for async operations
- [ ] Empty states include icon + message + action
- [ ] Motion is subtle (<300ms, respect prefers-reduced-motion)
- [ ] Toast/Message/Banner used appropriately

---

**Status:** ✅ Phase 6 Active (CLI validation + ESLint plugin integrated)
**Available Validations:**
1. ✅ State completeness (loading/error/empty/disabled)
2. ✅ Generic copy detection (button labels, messages)
3. ✅ Focus management (Dialog/Modal patterns)

**Usage:**
```bash
# CLI validation
npx @lifeonlars/prime-yggdrasil validate --rules interaction-patterns/state-completeness
npx @lifeonlars/prime-yggdrasil audit --fix

# ESLint (install @lifeonlars/eslint-plugin-yggdrasil)
```

**Last Updated:** 2026-01-11
