---
title: "Messages Components"
category: reference
tags: [components, primereact, messages, toast, notification]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
---

# Messages Components

Components for displaying notifications and messages.

**Quick Links**: [Toast](#toast) | [Message](#message) | [InlineMessage](#inlinemessage) | [Messages](#messages)

---

## Toast

**Use Cases**:
- Success/error notifications
- Action confirmations
- Auto-dismissing alerts

**Key Props**:
- `ref` - Reference for show method
- `position` - 'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'|'bottom-center'|'center'
- `life` - Auto-dismiss duration (ms)

**Show Method Options**:
- `severity` - 'success'|'info'|'warn'|'error'
- `summary` - Title text
- `detail` - Message text
- `life` - Duration for this message
- `sticky` - Don't auto-dismiss

**Example**:
```tsx
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const toast = useRef(null);

// Show success
const showSuccess = () => {
  toast.current.show({
    severity: 'success',
    summary: 'Success',
    detail: 'Item saved successfully',
    life: 3000
  });
};

// Show error
const showError = () => {
  toast.current.show({
    severity: 'error',
    summary: 'Error',
    detail: 'Failed to save item',
    life: 5000
  });
};

// Multiple messages
const showMultiple = () => {
  toast.current.show([
    { severity: 'info', summary: 'Info', detail: 'Message 1' },
    { severity: 'warn', summary: 'Warning', detail: 'Message 2' }
  ]);
};

<Toast ref={toast} position="top-right" />
```

**Docs**: https://primereact.org/toast/

---

## Message

**Use Cases**:
- Inline status message
- Form validation summary
- Page-level alert

**Key Props**:
- `severity` - 'success'|'info'|'warn'|'error'
- `text` - Message text
- `icon` - Custom icon
- `closable` - Show close button

**Example**:
```tsx
import { Message } from 'primereact/message';

// Success message
<Message severity="success" text="Form submitted successfully" />

// Error message
<Message severity="error" text="Please correct the errors below" />

// Warning message
<Message severity="warn" text="This action cannot be undone" />

// Info message
<Message severity="info" text="New updates available" />
```

**Docs**: https://primereact.org/message/

---

## InlineMessage

**Use Cases**:
- Field-level validation error
- Inline hint/warning
- Compact status indicator

**Key Props**:
- `severity` - 'success'|'info'|'warn'|'error'
- `children` - Message text

**Example**:
```tsx
import { InlineMessage } from 'primereact/inlinemessage';

<div>
  <InputText className="p-invalid" />
  <InlineMessage severity="error">Username is required</InlineMessage>
</div>

<InlineMessage severity="info">Enter a valid email address</InlineMessage>
```

**Docs**: https://primereact.org/inlinemessage/

---

## Messages

**Use Cases**:
- Multiple inline messages
- Form error list
- Alert group

**Key Props**:
- `ref` - Reference for show/clear methods
- Messages added via `show()` method

**Example**:
```tsx
import { Messages } from 'primereact/messages';
import { useRef } from 'react';

const msgs = useRef(null);

// Show messages
const showMessages = () => {
  msgs.current.show([
    { severity: 'success', summary: 'Success', detail: 'Item created', sticky: true },
    { severity: 'warn', summary: 'Warning', detail: 'Low disk space', sticky: true }
  ]);
};

// Clear all
const clearMessages = () => {
  msgs.current.clear();
};

<Messages ref={msgs} />
```

**Docs**: https://primereact.org/messages/
