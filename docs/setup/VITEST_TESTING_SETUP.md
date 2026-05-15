# Vitest Testing Framework Setup - WAVE 2

## Overview

Vitest has been successfully integrated into both the frontend (TanStack Start) and admin panel applications. This document provides comprehensive setup details and guidelines for writing and running tests.

## Installed Dependencies

### Frontend (root directory)
```json
{
  "devDependencies": {
    "vitest": "^2.2.0",
    "@vitest/ui": "^2.2.0",
    "@testing-library/react": "^14.3.1",
    "@testing-library/dom": "^11.4.0"
  }
}
```

### Admin Panel (`admin/`)
```json
{
  "devDependencies": {
    "vitest": "^2.2.0",
    "@vitest/ui": "^2.2.0",
    "@testing-library/react": "^14.3.1",
    "@testing-library/dom": "^11.4.0"
  }
}
```

## Configuration Files Created

### 1. **vite.config.ts** (Updated in both projects)

#### Frontend (`vite.config.ts`)
Added test configuration:
```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./vitest.setup.ts'],
  css: true,
}
```

#### Admin Panel (`admin/vite.config.ts`)
Added test configuration:
```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./vitest.setup.ts'],
  css: true,
}
```

### 2. **vitest.setup.ts** (Created in both projects)

Setup files configure:
- **Test cleanup**: Automatic DOM cleanup after each test via `afterEach(() => cleanup())`
- **Window.matchMedia mock**: Mocks CSS media queries for responsive testing
- **IntersectionObserver mock**: Mocks intersection API for visibility testing
- **Environment isolation**: jsdom environment for DOM testing

Located at:
- Frontend: `./vitest.setup.ts`
- Admin: `./admin/vitest.setup.ts`

## Test Scripts

### Frontend (root)
```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with Vitest UI dashboard
```

### Admin Panel
```bash
cd admin
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with Vitest UI dashboard
```

## Example Tests Created

### 1. **Utility Test** (`src/__tests__/utils.test.ts` - Frontend)
```typescript
import { describe, it, expect } from 'vitest';

const add = (a: number, b: number): number => a + b;

describe('Math utilities', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
  // ... more tests
});
```

### 2. **Component Test** (`admin/src/__tests__/Button.test.tsx` - Admin)
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Button Component', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" onClick={mockClick} />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

## Package.json Updates

### Frontend
Added scripts:
```json
"test": "vitest",
"test:ui": "vitest --ui"
```

### Admin Panel
Added scripts:
```json
"test": "vitest",
"test:ui": "vitest --ui"
```

## Writing Tests

### Test File Conventions
- Test files should end with `.test.ts` or `.test.tsx`
- Place tests in `__tests__` directory next to source files
- Use descriptive test names

### Recommended Test Structure
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Component Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test (automatic with setup file)
  });

  it('should do something', () => {
    // Arrange
    const component = render(<MyComponent />);
    
    // Act
    const button = screen.getByRole('button');
    button.click();
    
    // Assert
    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

## Testing Utilities Available

### From @testing-library/react
- `render()` - Render React components
- `screen` - Query DOM elements
- `userEvent` - Simulate user interactions
- `cleanup` - Clean up after tests (automatic)

### From vitest
- `describe()` - Group tests
- `it()` or `test()` - Define individual tests
- `expect()` - Make assertions
- `beforeEach()`, `afterEach()` - Setup/teardown hooks
- `vi.fn()` - Create mock functions
- `vi.mock()` - Mock modules

### From @testing-library/dom
- `fireEvent` - Trigger DOM events
- `waitFor()` - Wait for async operations
- Queries: `getBy*`, `queryBy*`, `findBy*`, `getAllBy*`, `queryAllBy*`, `findAllBy*`

## Common Testing Patterns

### Testing Components
```typescript
it('renders correctly', () => {
  render(<MyComponent prop="value" />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Testing User Interactions
```typescript
it('handles click events', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick} />);
  screen.getByRole('button').click();
  expect(handleClick).toHaveBeenCalled();
});
```

### Testing Async Operations
```typescript
it('handles async data', async () => {
  render(<AsyncComponent />);
  const element = await screen.findByText('Data Loaded');
  expect(element).toBeInTheDocument();
});
```

### Testing with Props
```typescript
it('renders with different props', () => {
  const { rerender } = render(<Component status="loading" />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  rerender(<Component status="success" />);
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

## Environment Setup

### jsdom Environment
- Provides browser-like DOM API
- Includes window, document, localStorage
- Mock implementations included (matchMedia, IntersectionObserver)

### CSS Support
- TailwindCSS classes available in tests via `css: true`
- Utility classes like `bg-blue-500` can be tested in rendered components

## Running Tests

### Watch Mode (Recommended for Development)
```bash
npm test
```
- Re-runs tests when files change
- Type 'q' to quit, 'p' to filter by filename, etc.

### UI Mode (Browser Dashboard)
```bash
npm run test:ui
```
- Opens interactive dashboard at `http://localhost:51204/__vitest__/`
- Real-time test results with detailed reporting
- Click on tests to re-run, view details, and debug

### Single Run (CI/CD)
```bash
npm test -- --run
```
- Runs tests once without watch mode
- Suitable for continuous integration pipelines

## Best Practices

1. **Descriptive Test Names**: Use clear, specific test descriptions
   ```typescript
   // ❌ Bad
   it('works', () => { ... });
   
   // ✅ Good
   it('should render user name when data is loaded', () => { ... });
   ```

2. **Arrange-Act-Assert Pattern**: Structure tests clearly
   ```typescript
   it('test name', () => {
     // Arrange: Setup test data
     const user = { name: 'John' };
     
     // Act: Perform action
     render(<UserCard user={user} />);
     
     // Assert: Verify results
     expect(screen.getByText('John')).toBeInTheDocument();
   });
   ```

3. **Test Behavior, Not Implementation**: Focus on what users see
   ```typescript
   // ❌ Poor: Testing implementation details
   expect(component.state.isOpen).toBe(true);
   
   // ✅ Good: Testing user behavior
   expect(screen.getByRole('dialog')).toBeInTheDocument();
   ```

4. **Use Semantic Queries**: Prefer accessibility-focused queries
   ```typescript
   // ❌ Avoid: brittle selectors
   screen.getByTestId('my-button');
   
   // ✅ Better: accessible queries
   screen.getByRole('button', { name: /submit/i });
   screen.getByLabelText('Username');
   ```

5. **Keep Tests Independent**: Each test should run in isolation
   ```typescript
   // ❌ Bad: tests depend on order
   let userId;
   it('creates user', () => { userId = 123; });
   it('uses user', () => { expect(userId).toBe(123); });
   
   // ✅ Good: independent tests
   it('creates user', () => { expect(createUser()).toBe(123); });
   it('fetches user', () => { expect(getUser(123)).toBeDefined(); });
   ```

## Verifying Setup

### Test Frontend
```bash
npm test -- src/__tests__/utils.test.ts
```
Expected output:
```
✓ src/__tests__/utils.test.ts (3)
  ✓ Math utilities (3)
    ✓ should add two numbers correctly
    ✓ should handle negative numbers
    ✓ should handle zero
```

### Test Admin Panel
```bash
cd admin
npm test -- src/__tests__/Button.test.tsx
```
Expected output:
```
✓ src/__tests__/Button.test.tsx (2)
  ✓ Button Component (2)
    ✓ should render with label text
    ✓ should call onClick handler when clicked
```

## Integration with CI/CD

For GitHub Actions integration, add to workflow:
```yaml
- name: Run tests
  run: |
    npm test -- --run
    cd admin && npm test -- --run
```

## Next Steps

1. Write tests for existing components and utilities
2. Aim for >80% code coverage for critical functionality
3. Run tests before each commit (`--run` flag)
4. Integrate tests into CI/CD pipeline (WAVE 3)
5. Consider test coverage reports (c8, codecov)

## Troubleshooting

### Tests not finding modules
- Ensure `globals: true` is set in vite.config.ts
- Check import paths match file structure
- Verify files are in `__tests__` directory

### React component render issues
- Ensure vitest.setup.ts is properly configured
- Check that jsdom environment is specified
- Verify @testing-library/react is installed

### Types not recognized
- Run `npm install` to ensure @types packages are installed
- Check tsconfig.json includes test files
- May need `/// <reference types="vitest" />` at top of test files

## Resources

- **Vitest Documentation**: https://vitest.dev
- **Testing Library**: https://testing-library.com
- **React Testing Best Practices**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

## WAVE 2 Completion

✅ Vitest + Testing Library framework successfully set up for:
- Frontend (TanStack Start)
- Admin Panel (React + Vite)

✅ Configuration files created:
- vite.config.ts updated with test settings
- vitest.setup.ts created for environment setup

✅ Example tests provided:
- Utility test (frontend)
- Component test (admin)

✅ Package.json scripts added:
- `npm test` - Watch mode testing
- `npm run test:ui` - Interactive dashboard

**Status: READY FOR TESTING**
