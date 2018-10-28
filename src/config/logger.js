const winston = require('winston');

const tsFormat = () => (new Date()).toLocaleTimeString();


const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp: tsFormat,

    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: tsFormat,
    }),
    new winston.transports.Http({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: tsFormat,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  },
};
