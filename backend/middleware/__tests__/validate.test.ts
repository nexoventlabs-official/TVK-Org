import { createRequire } from 'module';

import { z } from 'zod';
import { afterEach, describe, expect, it, vi } from 'vitest';

process.env.LOG_LEVEL = 'error';

const require = createRequire(import.meta.url);
const { validateBody, validateParams, validateQuery } = require('../validate');

afterEach(() => {
  vi.restoreAllMocks();
});

describe('validate middleware', () => {
  it('rewrites req.body with parsed data on success', () => {
    const middleware = validateBody(
      z.object({
        name: z.string().trim().min(1),
      })
    );
    const req = { body: { name: '  Asha  ' } } as any;
    const next = vi.fn();

    middleware(req, {} as any, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).toEqual({ name: 'Asha' });
  });

  it('passes a 400 error to next when body validation fails', () => {
    const middleware = validateBody(
      z.object({
        name: z.string().trim().min(2),
      })
    );
    const req = { body: { name: '' } } as any;
    const next = vi.fn();

    middleware(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0] as Error & { status?: number };
    expect(err).toBeInstanceOf(Error);
    expect(err.status).toBe(400);
    expect(req.body).toEqual({ name: '' });
  });

  it('supports params and query validation helpers', () => {
    const paramsMiddleware = validateParams(
      z.object({
        id: z.string().regex(/^\d+$/),
      })
    );
    const queryMiddleware = validateQuery(
      z.object({
        page: z.coerce.number().int().min(1),
      })
    );

    const paramsReq = { params: { id: '123' } } as any;
    const queryReq = { query: { page: '3' } } as any;
    const next = vi.fn();

    paramsMiddleware(paramsReq, {} as any, next);
    queryMiddleware(queryReq, {} as any, next);

    expect(paramsReq.params).toEqual({ id: '123' });
    expect(queryReq.query).toEqual({ page: 3 });
  });
});