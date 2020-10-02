const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const semver = require('semver');
const config = require('./configurations');
// const sintaxVerbose = require('./operations/aux-checkElements');
const operations = require('./operations/index');

const { logger } = config;

function analyzeFile(file, cmd) {
    const argOperation = cmd.operation;
    const argMode = cmd.mode;
    // const argFile = cmd.file;
    // const argDirectory = cmd.directory;
    const argConfigFile = cmd.config;
    const argNeedsFile = cmd.needs;
    const argPeriod = { amount: null, unit: null };

    let sla4oaiFile;
    let sla4oaiObject;
    let configFile;
    let configObject;
    let needsFile;
    let needsObject;

    logger.info(`Input oas-doc ${file}`);
    try {
        if (path.extname(file) === '.json') {
            sla4oaiFile = fs.readFileSync(path.join('', file), 'utf8');
            sla4oaiObject = JSON.parse(sla4oaiFile);
        } else if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
            sla4oaiFile = fs.readFileSync(path.join('', file), 'utf8');
            sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        } else {
            logger.error(`Unrecognized file extension ${path.extname(file)}. Aborting.`);
            return -1;
        }
    } catch (err) {
        logger.error(err);
        return -1;
    }

    if (argConfigFile) {
        try {
            logger.info(`Using config file ${argConfigFile}`);
            if (path.extname(argConfigFile) === '.json') {
                configFile = fs.readFileSync(path.join('', argConfigFile), 'utf8');
                configObject = JSON.parse(configFile);
            } else if (path.extname(argConfigFile) === '.yaml' || path.extname(argConfigFile) === '.yml') {
                configFile = fs.readFileSync(path.join('', argConfigFile), 'utf8');
                configObject = jsyaml.safeLoad(configFile);
            } else {
                logger.error(`Unrecognized file extension ${path.extname(argConfigFile)}. Aborting.`);
                return -1;
            }
        } catch (err) {
            logger.error(err);
            return -1;
        }
    }

    if (cmd.period) {
        const split = cmd.period.split(' ');
        if (split.length === 2) {
            const amount = split[0];
            const unit = split[1];
            argPeriod.amount = amount;
            argPeriod.unit = unit;
        } else {
            logger.error(`Invalid period ${cmd.period}`);
            return -1;
        }
    }

    if (argNeedsFile) {
        try {
            logger.info(`Using needs file ${argNeedsFile}`);
            if (path.extname(argNeedsFile) === '.json') {
                needsFile = fs.readFileSync(path.join('', argNeedsFile), 'utf8');
                needsObject = JSON.parse(needsFile);
            } else if (path.extname(argNeedsFile) === '.yaml' || path.extname(argNeedsFile) === '.yml') {
                needsFile = fs.readFileSync(path.join('', argNeedsFile), 'utf8');
                needsObject = jsyaml.safeLoad(needsFile);
            } else {
                logger.error(`Unrecognized file extension ${path.extname(argNeedsFile)}. Aborting.`);
                return -1;
            }
        } catch (err) {
            logger.error(err);
            return -1;
        }
    }

    // BEGIN PARSE OPERATION HANDLER
    if (argOperation === 'parse') {
        logger.validationProcess('CHECKING SYNTAX...');
        const parseErrors = operations.parse(sla4oaiObject);
        if (parseErrors && Object.keys(parseErrors).length > 0) {
            logger.validationProcess(`SYNTAX ERRORS in ${file}`);
            Object.keys(parseErrors).forEach((key) => {
                logger.validationProcess(`  SYNTAX ERROR: (${key.code}) in path "${key.path}": ${key.message}`);
            });
            return false;
        }
        logger.validationProcess('SYNTAX OK');
        return true;
        // END PARSE OPERATION HANDLER

        // BEGIN VALIDITY OPERATION HANDLER
    } if (argOperation === 'validity') {
        logger.validationProcess('CHECKING SYNTAX...');
        const parseErrors = operations.parse(sla4oaiObject);
        if (parseErrors && Object.keys(parseErrors).length > 0) {
            // Has syntax errors; abort operation
            logger.validationProcess(`SYNTAX ERRORS in ${file}`);
            return false;
        }
        // No syntax errors; continue with operation
        logger.validationProcess('SYNTAX OK');
        logger.validationProcess('CHECKING VALIDITY...');
        const isValid = operations.validity(sla4oaiObject, configObject);
        if (isValid !== true) {
            logger.validationProcess(`VALIDITY ERROR in ${file}`);
            return false;
        }
        logger.validationProcess(`VALIDITY OK in ${file}`);
        return true;
        // END VALIDITY OPERATION HANDLER

        // BEGIN EFFECTIVELIMITATION OPERATION HANDLER
    } if (argOperation === 'effectiveLimitation') {
        logger.validationProcess('CHECKING SYNTAX...');
        const parseErrors = operations.parse(sla4oaiObject);
        if (parseErrors && Object.keys(parseErrors).length > 0) {
            // Has syntax errors; abort operation
            logger.validationProcess(`SYNTAX ERRORS in ${file}`);
            return false;
        }

        // No syntax errors; continue with operation
        logger.validationProcess('SYNTAX OK');
        logger.validationProcess('CHECKING EFFECTIVE LIMITATION...');
        const effectiveLimitationsPerPlan = operations.effectiveLimitation(sla4oaiObject, argPeriod, argMode);
        logger.validationProcess(`EFFECTIVE LIMITATION CALCULATED (mode: ${argMode}) IN ${effectiveLimitationsPerPlan.size} PLANS IN '${file}`);

        effectiveLimitationsPerPlan.forEach((value, planName) => {
            value.forEach((effectiveLimitation, metricName) => {
                logger.validationWarning(`  IN ${planName}': '${effectiveLimitation} ${metricName}' PER '${argPeriod.amount} ${argPeriod.unit}'`);
            });
        });
        return effectiveLimitationsPerPlan;
        // END EFFECTIVELIMITATION OPERATION HANDLER

        // BEGIN COMPLIANCE OPERATION HANDLER
    } if (argOperation === 'compliance') {
        logger.validationProcess('CHECKING SYNTAX...');
        const parseErrors = operations.parse(sla4oaiObject);
        if (parseErrors && Object.keys(parseErrors).length > 0) {
            // Has syntax errors; abort operation
            logger.validationProcess(`SYNTAX ERRORS in ${file}`);
            return false;
        }
        // No syntax errors; continue with operation
        logger.validationProcess('SYNTAX OK');
        logger.validationProcess('CHECKING COMPLIANCE...');
        const everyUserNeedIsSatisfied = operations.compliance(sla4oaiObject, needsObject);
        logger.validationProcess(`COMPLIANCE ${everyUserNeedIsSatisfied} IN ${file}`);
        return everyUserNeedIsSatisfied;
    }
    // END COMPLIANCE OPERATION HANDLER
    logger.error(`Operation ${argOperation} not supported`);
    return -1;
}

function exec(cmd) {
    const argOperation = cmd.operation;
    const argFile = cmd.file;
    const argDirectory = cmd.directory;
    const argConfigFile = cmd.config;
    const argNeedsFile = cmd.needs;
    const argPeriod = cmd.period;

    // const resolvedFilePath = (argFile && argFile.length > 0) ? path.join('', argFile) : '';

    if (!argOperation) {
        logger.error('You must select an input operation file!');
        return -1;
    }
    if (!argFile && !argDirectory) {
        logger.error('You must enter either a file or directory');
        return -1;
    }
    if (argFile && argDirectory) {
        logger.error('You must enter only a file or a directory');
        return -1;
    }
    if (argFile && !fs.lstatSync(argFile).isFile()) {
        logger.error('You must enter a valid file');
        return -1;
    }
    if (argDirectory && !fs.lstatSync(argDirectory).isDirectory()) {
        logger.error('You must enter a valid directory');
        return -1;
    }
    if (argOperation && (argOperation !== 'parse' && argOperation !== 'validity' && argOperation !== 'effectiveLimitation' && argOperation !== 'compliance')) {
        logger.error('Allowed operations are ["parse", "validity", "effectiveLimitation", "compliance"]');
        return -1;
    }
    if ((argOperation && argOperation === 'effectiveLimitation') && !argPeriod) {
        logger.error('Operation "effectiveLimitation" requires --period argument]');
        return -1;
    }
    if (argConfigFile && !fs.lstatSync(argConfigFile).isFile()) {
        logger.error('You must enter a valid config');
        return -1;
    }
    if (argNeedsFile && !fs.lstatSync(argNeedsFile).isFile()) {
        logger.error('You must enter a valid needs file');
        return -1;
    }
    if (semver.lt(process.version, 'v8.0.0')) {
        logger.error(`This program is not compatible with Node.js versions lower than v8.0.0 (current: ${process.version})`);
        return -1;
    }
    const positiveResults = [];
    const negativeResults = [];

    // CASE: DIRECTORY
    if (argDirectory) {
        fs.readdir(path.join('', argDirectory), (err, files) => {
            files.forEach((fileRaw) => {
                const file = path.resolve(argDirectory, fileRaw);
                if (fs.lstatSync(file).isFile()) {
                    logger.validationProcess(`------ BEGIN CHECKING FILE: ${file} ------`);
                    const analysisResult = analyzeFile(file, cmd);
                    if (analysisResult === true) { positiveResults.push(file); } else { negativeResults.push(file); }
                    logger.validationProcess(`------ END CHECKING FILE: ${file} ------`);
                } else {
                    logger.warning(`Skipping folder '${file}', recursive mode is not yet supported`);
                }
            });
            logger.validationProcess(`\nVALID FILES: ${JSON.stringify(positiveResults, null, 2)}`);
            logger.validationProcess(`\nINVALID FILES: ${JSON.stringify(negativeResults, null, 2)}`);
        });
        return negativeResults.length === 0;
    }

    // CASE: FILE
    if (argFile) {
        logger.validationProcess(`------ BEGIN CHECKING FILE: ${argFile} ------`);
        // const resolvedFile = fs.readFileSync(argFile, 'utf8');
        const analysisResult = analyzeFile(argFile, cmd);
        if (analysisResult === true) { positiveResults.push(argFile); } else { negativeResults.push(argFile); }
        logger.validationProcess(`------ END CHECKING FILE: ${argFile} ------`);
        return analysisResult;
    }
    logger.error('ERROR');
    return -1;
}

module.exports = {
    exec,
};
