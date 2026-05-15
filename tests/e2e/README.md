# End-to-End Tests

Place end-to-end tests here for testing complete user flows.

## Structure

```
e2e/
├── user-flows/
│   ├── submit-enquiry.test.ts
│   ├── view-gallery.test.ts
│   └── navigate-pages.test.ts
└── admin/
    ├── login.test.ts
    └── manage-images.test.ts
```

## Running Tests

```bash
bun test:e2e
# or
npm run test:e2e
```

## Tools

Consider using:
- Playwright
- Cypress
- Puppeteer
