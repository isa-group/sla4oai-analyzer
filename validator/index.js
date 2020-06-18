/* eslint-disable indent */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

"use strict";


const fs = require("fs");
const path = require("path");
const jsyaml = require("js-yaml");
const ZSchema = require("z-schema");
const semver = require("semver");

var config = require("./configurations");
var validityOperations = require("./operations/validity");
var sintaxVerbose = require("./operations/checkElements");

const syntax = new ZSchema({
    ignoreUnresolvableReferences: true,
    ignoreUnknownFormats: false,
    // strictMode: true,
    // forceAdditional: true,
    forceItems: true,
    // forceMaxLength: true,
    // forceProperties: true,
    // noExtraKeywords: true,
    // noTypeless: true,
    noEmptyStrings: true,
    noEmptyArrays: true,
});
const logger = config.logger;


try {
    var schemaPath = path.join(__dirname, "./model/SLA4OAI.schema.json");
    var sla4oaiSchema = fs.readFileSync(schemaPath, "utf8");
    sla4oaiSchema = jsyaml.safeLoad(sla4oaiSchema);
} catch (err) {
    logger.error(`Error reading file ${schemaPath}: ${err}`);
}


function validate(argPath, cmd) {
    if (!argPath) {
        logger.error("You must select an input sla4oaiFileification file!");
        return 0;
    } else if (semver.lt(process.version, "v8.0.0")) {
        logger.error("This program is not compatible with Node.js versions lower than v8.0.0 (current: " + process.version + ")");
        return 0;
    } else {
        let validFiles = [];
        let invalidFiles = [];
        try {
            if (cmd.directory && fs.lstatSync(argPath).isDirectory()) {
                fs.readdir(argPath, (err, files) => {
                    files.forEach(file => {
                        file = path.resolve(argPath, file);
                        if (fs.lstatSync(file).isFile()) {
                            logger.validationProcess(`------ BEGIN CHECKING FILE: ${file} ------`);
                            let res = validateFile(file, cmd);
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
            } else if (!cmd.directory && fs.lstatSync(argPath).isFile()) {
                let file = argPath;
                logger.validationProcess(`------ BEGIN CHECKING FILE: ${file} ------`);
                let res = validateFile(file, cmd);
                if (res === true) { validFiles.push(file); } else { invalidFiles.push(file); }
                logger.validationProcess(`------ END CHECKING FILE: ${file} ------`);
                return res;
            } else {
                logger.error("ERROR");
                return 0;
            }
        } catch (err) {
            logger.error(err);
            return 0;
        }
    }
}

function validateFile(file, cmd) {
    var sla4oaiFile = fs.readFileSync(path.join("", file), "utf8");
    var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
    logger.info(`Input oas-doc ${file}`);
    // logger.debug("Input oas-doc %s: %s", file, sla4oaiObject);

    logger.validationProcess("CHECKING SYNTAX...");
    var err = syntax.validate(sla4oaiObject, sla4oaiSchema);
    if (cmd.verbose) {
        sintaxVerbose.listProperties(sla4oaiObject);
    }
    if (err == false) {
        logger.validationProcess(`SYNTAX ERRORS in ${file}`);
        for (const key of validator.getLastErrors()) {
            logger.validationProcess(`  SYNTAX ERROR: (${key.code}) in path "${key.path}": ${key.message}`);
        }
        return false;
    } else if (!cmd.onlysyntax) {
        logger.validationProcess("SYNTAX OK");
        logger.validationProcess("CHECKING VALIDITY...");
        const isValid = validityOperations.isValid(sla4oaiObject);
        if (isValid === true) {
            logger.validationProcess(`VALIDITY OK in ${file}`);
            return true;
        } else {
            logger.validationProcess(`VALIDITY ERROR in ${file}`);
            return false;
        }
    }
}

module.exports = {
    validate: validate,
};

