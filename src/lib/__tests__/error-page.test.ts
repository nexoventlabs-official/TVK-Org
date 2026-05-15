import { describe, expect, it } from 'vitest';

import { renderErrorPage } from '../error-page';

describe('renderErrorPage', () => {
  it('renders a recovery page with reload and home actions', () => {
    const html = renderErrorPage();

    expect(html).toContain("This page didn't load");
    expect(html).toContain('Try again');
    expect(html).toContain('Go home');
    expect(html).toContain('onclick="location.reload()"');
  });
});