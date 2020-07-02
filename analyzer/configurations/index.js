const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const configuration = {};

function setProperty(propertyName, newValue) {
    configuration[propertyName] = newValue;
}

function exportConsoleLogger(customLevels, customFormat) {
    module.exports.logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: configuration.loglevel,
                handleExceptions: true,
                json: false,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.splat(),
                    customFormat,
                ),
            }),
        ],
        exitOnError: false,
    });
}

function exportConsoleAndFileLogger(customLevels, customFormat) {
    module.exports.logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                level: configuration.loglevel,
                filename: configuration.logfile,
                handleExceptions: true,
                maxsize: 5242880, // 5MB
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.splat(),
                    customFormat,
                ),
            }),
            new winston.transports.Console({
                level: configuration.loglevel,
                handleExceptions: true,
                json: false,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.splat(),
                    customFormat,
                ),
            }),
        ],
        exitOnError: false,
    });
}

function createNewLogger() {
    // var customFormat = winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);
    const customFormat = winston.format.printf((info) => `${info.message}`);

    const customLevels = {
        levels: {
            error: 8,
            warning: 9,
            validationProcess: 9,
            validationWarning: 10,
            validation: 11,
            info: 12,
            debug: 13,
        },
        colors: {
            error: 'red',
            warning: 'yellow',
            validationProcess: 'white',
            validationWarning: 'yellow',
            validation: 'magenta',
            info: 'white',
            debug: 'blue',
        },
    };
    if (configuration.logfile !== undefined) {
        exportConsoleAndFileLogger(customLevels, customFormat);
    } else {
        exportConsoleLogger(customLevels, customFormat);
    }
    winston.addColors(customLevels.colors);
}

function setConfigurations(options, encoding) {
    let newConfigurations = null;
    if (!options) {
        throw new Error('Configurations parameter is required');
    } else if (typeof options === 'string') {
        try {
            const configString = fs.readFileSync(options, encoding);
            newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`The specified configuration file wasn't found at ${options}.  Default configurations will be set`);
            setConfigurations(path.join(__dirname, 'configs.yaml'), 'utf8');
        }
    } else {
        newConfigurations = options;
    }

    Object.keys(newConfigurations).forEach((c) => {
        setProperty(c, newConfigurations[c]);
        if (c === 'loglevel') {
            createNewLogger();
        }
    });
}

setConfigurations(path.join(__dirname, 'configs.yaml'), 'utf8');
