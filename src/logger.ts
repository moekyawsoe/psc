import winston from 'winston';

// Define custom colors for log levels
const colors = {
  info: 'green',
  error: 'red',
  warn: 'yellow',
};

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    winston.format.colorize({ all: true }), // Apply colors
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`; // Custom log format
    })
  ),
  transports: [
    new winston.transports.Console(), // Output to console
  ],
});

// Apply colors to log levels
winston.addColors(colors);

export default logger;