const path = require('path');
const winston = require('winston');

const logDir = path.join(__dirname, '..');
const logFile = (filename) => path.join(logDir, filename);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'venkatraman-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
          const details = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return `${timestamp} ${level}: ${stack || message}${details}`;
        })
      ),
    }),
    new winston.transports.File({ filename: logFile('error.log'), level: 'error' }),
    new winston.transports.File({ filename: logFile('combined.log') }),
  ],
});

logger.stream = {
  write(message) {
    logger.http(message.trim());
  },
};

module.exports = logger;