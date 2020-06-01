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

const validator = new ZSchema({
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
    } else if (semver.lt(process.version, "v8.0.0")) {
        logger.error("This program is not compatible with Node.js versions lower than v8.0.0 (current: " + process.version + ")");
    } else {
        if (cmd.directory && fs.lstatSync(argPath).isDirectory()) {
            fs.readdir(argPath, (err, files) => {
                files.forEach(file => {
                    file = path.resolve(argPath, file);
                    logger.validation(`------ BEGIN CHECKING FILE: ${file} ------`);
                    validateFile(file, cmd);
                    logger.validation(`------ END CHECKING FILE: ${file} ------`);
                });
                process.exit();
            });
        } else {
            logger.validation(`------ BEGIN CHECKING FILE: ${argPath} ------`);
            validateFile(argPath, cmd);
            logger.validation(`------ END CHECKING FILE: ${argPath} ------`);
            process.exit();
        }
    }
}

function validateFile(file, cmd) {
    var sla4oaiFile = fs.readFileSync(path.join("", file), "utf8");
    var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
    logger.info(`Input oas-doc ${file}`);
    // logger.debug("Input oas-doc %s: %s", file, sla4oaiObject);

    var err = validator.validate(sla4oaiObject, sla4oaiSchema);
    logger.validation("CHECKING SYNTAX...");
    if (err == false) {
        logger.validationWarning(`SYNTAX ERRORS in ${file}`);
        for (const key of validator.getLastErrors()) {
            logger.validationWarning(`  SYNTAX ERROR: (${key.code}) in path "${key.path}": ${key.message}`);
        }
    } else if(!cmd.syntax) {
        logger.validation("SYNTAX OK");
        logger.validation("CHECKING VALIDITY...");
        const isValid = validityOperations.isValid(sla4oaiObject);
        if (isValid) {
            logger.validation("VALIDITY OK");
        } else {
            logger.validation("VALIDITY ERROR");
        }
    }
}

module.exports = {
    validate: validate,
};

