/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const program = require('commander');
const analyzer = require('./analyzer');

program
  .name('sla4oai-analyzer')
  .usage('<sla4oai file in YAML')
  .arguments('<file>')
  .version('1.0.0', '-v, --vers', 'output the current version')
  .option('-d, --directory', 'if it is a directory instead of a single file')
  .option('-s, --onlysyntax', 'only checks syntax errors')
  .option('-V, --verbose', 'verbose syntax')
  // .option('-n, --projectName <projectName>', 'Name for the generated folder')
  .action((file, cmd) => {
    analyzer.analyze(file, cmd);
  })
  .parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}
