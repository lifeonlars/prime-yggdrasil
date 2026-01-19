---
title: "Form Components"
category: reference
tags: [components, primereact, form, input, dropdown, calendar]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
  - yggdrasil-blocks.md
---

# Form Components

Components for user input and data entry.

**Quick Links**: [InputText](#inputtext) | [InputTextarea](#inputtextarea) | [InputNumber](#inputnumber) | [Dropdown](#dropdown) | [MultiSelect](#multiselect) | [Calendar](#calendar) | [AutoComplete](#autocomplete) | [Password](#password) | [Checkbox](#checkbox) | [RadioButton](#radiobutton) | [InputSwitch](#inputswitch) | [Slider](#slider) | [ColorPicker](#colorpicker) | [Editor](#editor) | [Rating](#rating) | [Chips](#chips) | [InputMask](#inputmask) | [FileUpload](#fileupload)

**Note**: For form fields with labels and error handling, use Yggdrasil's [FormField](./yggdrasil-blocks.md#formfield) block.

---

## InputText

**Use Cases**: Single-line text input - username, email, search

**Key Props**:
- `value`, `onChange` - Controlled input
- `placeholder` - Placeholder text
- `className` - Add 'p-invalid' for errors

**States**: default, focus, error, disabled

```tsx
import { InputText } from 'primereact/inputtext';

<InputText
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Enter username"
  className={errors.username ? 'p-invalid' : ''}
/>
```

**Docs**: https://primereact.org/inputtext/

---

## InputTextarea

**Use Cases**: Multi-line text - comments, descriptions

**Key Props**: `value`, `onChange`, `rows`, `autoResize`

```tsx
import { InputTextarea } from 'primereact/inputtextarea';

<InputTextarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={5}
  autoResize
/>
```

**Docs**: https://primereact.org/inputtextarea/

---

## InputNumber

**Use Cases**: Numeric input - quantity, price, currency

**Key Props**: `value`, `onValueChange`, `min`, `max`, `mode` ('decimal'|'currency'), `currency`

```tsx
import { InputNumber } from 'primereact/inputnumber';

<InputNumber
  value={price}
  onValueChange={(e) => setPrice(e.value)}
  mode="currency"
  currency="USD"
  locale="en-US"
/>
```

**Docs**: https://primereact.org/inputnumber/

---

## Dropdown

**Use Cases**: Select single option from list

**Key Props**: `value`, `options`, `onChange`, `placeholder`, `filter`, `showClear`

**States**: default, open, selected, disabled, error

```tsx
import { Dropdown } from 'primereact/dropdown';

const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' }
];

<Dropdown
  value={selectedCountry}
  options={countries}
  onChange={(e) => setSelectedCountry(e.value)}
  placeholder="Select a country"
  filter
/>
```

**Docs**: https://primereact.org/dropdown/

---

## MultiSelect

**Use Cases**: Select multiple options - tags, skills, categories

**Key Props**: `value`, `options`, `onChange`, `display` ('comma'|'chip'), `filter`, `maxSelectedLabels`

```tsx
import { MultiSelect } from 'primereact/multiselect';

<MultiSelect
  value={selectedSkills}
  options={skills}
  onChange={(e) => setSelectedSkills(e.value)}
  display="chip"
  filter
/>
```

**Docs**: https://primereact.org/multiselect/

---

## Calendar

**Use Cases**: Date picker, date range, datetime

**Key Props**: `value`, `onChange`, `selectionMode` ('single'|'multiple'|'range'), `showTime`, `dateFormat`

```tsx
import { Calendar } from 'primereact/calendar';

// Single date
<Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="mm/dd/yy" />

// Date range
<Calendar value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" />

// Date + time
<Calendar value={datetime} onChange={(e) => setDatetime(e.value)} showTime hourFormat="12" />
```

**Docs**: https://primereact.org/calendar/

---

## AutoComplete

**Use Cases**: Search with suggestions, type-ahead

**Key Props**: `value`, `suggestions`, `completeMethod`, `onChange`, `field`, `multiple`

```tsx
import { AutoComplete } from 'primereact/autocomplete';

const searchUsers = (event) => {
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(event.query.toLowerCase())
  );
  setSuggestions(filtered);
};

<AutoComplete
  value={selectedUser}
  suggestions={suggestions}
  completeMethod={searchUsers}
  onChange={(e) => setSelectedUser(e.value)}
  field="name"
/>
```

**Docs**: https://primereact.org/autocomplete/

---

## Password

**Use Cases**: Password input with toggle and strength meter

**Key Props**: `value`, `onChange`, `toggleMask`, `feedback`

```tsx
import { Password } from 'primereact/password';

<Password
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  toggleMask
  feedback
/>
```

**Docs**: https://primereact.org/password/

---

## Checkbox

**Use Cases**: Boolean toggle, terms agreement

**Key Props**: `checked`, `onChange` (e.checked), `inputId`

```tsx
import { Checkbox } from 'primereact/checkbox';

<div className="flex align-items-center gap-2">
  <Checkbox
    inputId="terms"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.checked)}
  />
  <label htmlFor="terms">I agree to terms</label>
</div>
```

**Docs**: https://primereact.org/checkbox/

---

## RadioButton

**Use Cases**: Select one option from small set (2-5 options)

**Key Props**: `checked`, `onChange`, `value`, `inputId`

```tsx
import { RadioButton } from 'primereact/radiobutton';

{options.map((option) => (
  <div key={option} className="flex align-items-center gap-2">
    <RadioButton
      inputId={option}
      value={option}
      checked={selectedOption === option}
      onChange={(e) => setSelectedOption(e.value)}
    />
    <label htmlFor={option}>{option}</label>
  </div>
))}
```

**Docs**: https://primereact.org/radiobutton/

---

## InputSwitch

**Use Cases**: Toggle switch for settings

**Key Props**: `checked`, `onChange` (e.value)

```tsx
import { InputSwitch } from 'primereact/inputswitch';

<InputSwitch
  checked={notificationsEnabled}
  onChange={(e) => setNotificationsEnabled(e.value)}
/>
```

**Docs**: https://primereact.org/inputswitch/

---

## Slider

**Use Cases**: Select value from range - volume, price range

**Key Props**: `value`, `onChange`, `min`, `max`, `step`, `range`

```tsx
import { Slider } from 'primereact/slider';

// Single value
<Slider value={volume} onChange={(e) => setVolume(e.value)} min={0} max={100} />

// Range
<Slider value={priceRange} onChange={(e) => setPriceRange(e.value)} range min={0} max={1000} />
```

**Docs**: https://primereact.org/slider/

---

## ColorPicker

**Use Cases**: Color selection

**Key Props**: `value`, `onChange`, `format` ('hex'|'rgb'|'hsb')

```tsx
import { ColorPicker } from 'primereact/colorpicker';

<ColorPicker value={color} onChange={(e) => setColor(e.value)} />
```

**Docs**: https://primereact.org/colorpicker/

---

## Editor

**Use Cases**: Rich text editor - blog posts, emails

**Key Props**: `value`, `onTextChange` (e.htmlValue), `style`

```tsx
import { Editor } from 'primereact/editor';

<Editor
  value={content}
  onTextChange={(e) => setContent(e.htmlValue)}
  style={{ height: '320px' }}
/>
```

**Docs**: https://primereact.org/editor/

---

## Rating

**Use Cases**: Star rating input

**Key Props**: `value`, `onChange`, `stars`, `cancel`

```tsx
import { Rating } from 'primereact/rating';

<Rating value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
```

**Docs**: https://primereact.org/rating/

---

## Chips

**Use Cases**: Tag input, email recipients

**Key Props**: `value`, `onChange`, `separator`, `max`

```tsx
import { Chips } from 'primereact/chips';

<Chips value={tags} onChange={(e) => setTags(e.value)} separator="," />
```

**Docs**: https://primereact.org/chips/

---

## InputMask

**Use Cases**: Formatted input - phone, credit card, SSN

**Key Props**: `value`, `onChange`, `mask`

```tsx
import { InputMask } from 'primereact/inputmask';

<InputMask
  value={phone}
  onChange={(e) => setPhone(e.value)}
  mask="(999) 999-9999"
/>
```

**Docs**: https://primereact.org/inputmask/

---

## FileUpload

**Use Cases**: File upload - documents, images

**Key Props**: `name`, `url`, `mode` ('basic'|'advanced'), `accept`, `maxFileSize`, `onUpload`

**States**: default, uploading, uploaded, error

```tsx
import { FileUpload } from 'primereact/fileupload';

<FileUpload
  name="demo[]"
  url="/api/upload"
  accept="image/*"
  maxFileSize={1000000}
  onUpload={onUpload}
  multiple
/>
```

**Docs**: https://primereact.org/fileupload/
