/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

"use strict";

const program = require("commander");
const validator = require("./validator");

program
  .name("sla4oai-validator")
  .usage("<sla4oai file in YAML")
  .arguments("<file>")
  .version("1.0.0", "-v, --vers", "output the current version")
  .option("-d, --directory", "if it is a directory instead of a single file")
  .option("-s, --syntax", "only checks syntax errors")
  // .option('-n, --projectName <projectName>', 'Name for the generated folder')
  .action(function (file, cmd) {
    validator.validate(file,cmd);
  })
  .parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}