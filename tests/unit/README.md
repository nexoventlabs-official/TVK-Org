# Unit Tests

Place unit tests here for individual components and functions.

## Structure

```
unit/
├── components/
│   ├── Hero.test.tsx
│   ├── Gallery.test.tsx
│   └── EnquiryForm.test.tsx
├── utils/
│   ├── format.test.ts
│   └── validation.test.ts
└── hooks/
    └── useSiteImages.test.ts
```

## Running Tests

```bash
bun test
# or
npm test
```

## Example Test

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/format';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2026-05-15');
    expect(formatDate(date)).toBe('15 May 2026');
  });
});
```
