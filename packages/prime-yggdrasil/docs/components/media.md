---
title: "Media Components"
category: reference
tags: [components, primereact, media, image, carousel, galleria]
audience: ai-agent
version: 0.7.4
lastUpdated: 2026-01-18
relatedDocs:
  - INDEX.md
  - ../DECISION-MATRIX.md
---

# Media Components

Components for displaying images and media content.

**Quick Links**: [Image](#image) | [Carousel](#carousel) | [Galleria](#galleria)

---

## Image

**Use Cases**:
- Image display with preview
- Clickable image zoom
- Image with loading placeholder

**Key Props**:
- `src` - Image source URL
- `alt` - Alt text (required for accessibility)
- `preview` - Enable click-to-preview
- `width`, `height` - Dimensions
- `imageStyle` - Custom image styles

**States**: loading, loaded, preview open

**Example**:
```tsx
import { Image } from 'primereact/image';

// Basic image
<Image src="/images/product.jpg" alt="Product" width="250" />

// With preview (click to enlarge)
<Image src="/images/product.jpg" alt="Product" preview width="250" />

// With custom preview image
<Image
  src="/images/thumbnail.jpg"
  alt="Product"
  preview
  zoomSrc="/images/full-size.jpg"
  width="100"
/>
```

**Docs**: https://primereact.org/image/

---

## Carousel

**Use Cases**:
- Image slider
- Product carousel
- Featured content rotation
- Testimonials slider

**Key Props**:
- `value` - Array of items
- `itemTemplate` - Render function
- `numVisible` - Items visible at once
- `numScroll` - Items to scroll
- `circular` - Infinite loop
- `autoplayInterval` - Auto-advance (ms)
- `orientation` - 'horizontal'|'vertical'

**States**: default, autoplay, navigating

**Example**:
```tsx
import { Carousel } from 'primereact/carousel';

const products = [...];

const itemTemplate = (product) => (
  <div style={{ padding: '1rem' }}>
    <img src={product.image} alt={product.name} />
    <h4>{product.name}</h4>
    <p>${product.price}</p>
  </div>
);

<Carousel
  value={products}
  itemTemplate={itemTemplate}
  numVisible={3}
  numScroll={1}
  circular
  autoplayInterval={3000}
/>
```

**Docs**: https://primereact.org/carousel/

---

## Galleria

**Use Cases**:
- Image gallery with thumbnails
- Photo viewer
- Full-screen gallery
- Product images

**Key Props**:
- `value` - Array of images
- `item` - Main image template
- `thumbnail` - Thumbnail template
- `numVisible` - Visible thumbnails
- `showThumbnails` - Show thumbnail strip
- `showIndicators` - Show dot indicators
- `showItemNavigators` - Show prev/next buttons
- `fullScreen` - Enable full-screen mode

**States**: default, thumbnail selected, full-screen

**Example**:
```tsx
import { Galleria } from 'primereact/galleria';

const images = [
  { itemImageSrc: '/images/1.jpg', thumbnailImageSrc: '/images/1-thumb.jpg', alt: 'Image 1' },
  { itemImageSrc: '/images/2.jpg', thumbnailImageSrc: '/images/2-thumb.jpg', alt: 'Image 2' }
];

const itemTemplate = (item) => (
  <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
);

const thumbnailTemplate = (item) => (
  <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100px' }} />
);

<Galleria
  value={images}
  item={itemTemplate}
  thumbnail={thumbnailTemplate}
  numVisible={5}
  showThumbnails
  showItemNavigators
/>
```

**Docs**: https://primereact.org/galleria/
