const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const semver = require('semver');
const config = require('./configurations');
const sintaxVerbose = require('./operations/aux-checkElements');
const operations = require('./operations/index');

const { logger } = config;

function validateFile(file, cmd) {
    const sla4oaiFile = fs.readFileSync(path.join('', file), 'utf8');
    const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
    logger.info(`Input oas-doc ${file}`);
    // logger.debug("Input oas-doc %s: %s", file, sla4oaiObject);

    logger.validationProcess('CHECKING SYNTAX...');
    const parseErrors = operations.parse(sla4oaiObject);
    if (cmd.verbose) {
        sintaxVerbose.listProperties(sla4oaiObject);
    }
    if (parseErrors && Object.keys(parseErrors).length > 0) {
        logger.validationProcess(`SYNTAX ERRORS in ${file}`);
        Object.keys(parseErrors).forEach((key) => {
            logger.validationProcess(`  SYNTAX ERROR: (${key.code}) in path "${key.path}": ${key.message}`);
        });
        return false;
    }
    logger.validationProcess('SYNTAX OK');
    logger.validationProcess('CHECKING VALIDITY...');
    const isValid = operations.validity(sla4oaiObject);
    if (isValid === true) {
        logger.validationProcess(`VALIDITY OK in ${file}`);
        return true;
    }
    logger.validationProcess(`VALIDITY ERROR in ${file}`);
    return false;
}

function analyze(argPath, cmd) {
    if (!argPath) {
        logger.error('You must select an input sla4oaiFileification file!');
        return 0;
    } if (semver.lt(process.version, 'v8.0.0')) {
        logger.error(`This program is not compatible with Node.js versions lower than v8.0.0 (current: ${process.version})`);
        return 0;
    }
    const validFiles = [];
    const invalidFiles = [];
    try {
        if (cmd.directory && fs.lstatSync(argPath).isDirectory()) {
            fs.readdir(argPath, (err, files) => {
                files.forEach((fileRaw) => {
                    const file = path.resolve(argPath, fileRaw);
                    if (fs.lstatSync(file).isFile()) {
                        logger.validationProcess(`------ BEGIN CHECKING FILE: ${file} ------`);
                        const res = validateFile(file, cmd);
                        if (res === true) { validFiles.push(file); } else { invalidFiles.push(file); }
                        logger.validationProcess(`------ END CHECKING FILE: ${file} ------`);
                    } else {
                        logger.warning(`Skipping folder '${file}', recursive mode is not yet supported`);
                    }
                });
                logger.validationProcess(`\nVALID FILES: ${JSON.stringify(validFiles, null, 2)}`);
                logger.validationProcess(`\nINVALID FILES: ${JSON.stringify(invalidFiles, null, 2)}`);
            });
            return 1;
        } if (!cmd.directory && fs.lstatSync(argPath).isFile()) {
            const file = argPath;
            logger.validationProcess(`------ BEGIN CHECKING FILE: ${file} ------`);
            const res = validateFile(file, cmd);
            if (res === true) { validFiles.push(file); } else { invalidFiles.push(file); }
            logger.validationProcess(`------ END CHECKING FILE: ${file} ------`);
            return res;
        }
        logger.error('ERROR');
        return 0;
    } catch (err) {
        logger.error(err);
        return 0;
    }
}

module.exports = {
    analyze,
};
