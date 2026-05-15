const logger = require('../config/logger');

function parseSchema(schema, value, label) {
  const result = schema.safeParse(value);
  if (result.success) return result.data;

  logger.warn('[validation] rejected request', {
    label,
    issues: result.error.issues,
  });

  const fieldErrors = result.error.flatten();
  const message = fieldErrors.formErrors[0] || 'Validation failed';

  const error = new Error(message);
  error.status = 400;
  error.issues = fieldErrors;
  throw error;
}

function validate(part, schema) {
  return (req, _res, next) => {
    try {
      req[part] = parseSchema(schema, req[part], part);
      next();
    } catch (err) {
      next(err);
    }
  };
}

function validateBody(schema) {
  return validate('body', schema);
}

function validateQuery(schema) {
  return validate('query', schema);
}

function validateParams(schema) {
  return validate('params', schema);
}

module.exports = { validateBody, validateQuery, validateParams };