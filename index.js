const program = require('commander');
const analyzer = require('./analyzer');

program
    .name('sla4oai-analyzer')
    .usage('-o validity -f <SLA4OAI file in YAML or JSON>')
    .version('1.0.0', '-v, --version', 'output the current version')
    //.requiredOption('-o, --operation <operation>', 'allowed operations ["parse", "validity", "effectiveLimitation", "compliance"]')
    .requiredOption('-o, --operation <operation>', 'allowed operations ["validity"]')
    .option('-f, --file <file>', 'path to the yaml/json file')
    /*.option('-d, --directory <directory>', 'path to the directory with the yaml/json files')
    .option('-c, --config <config>', 'path to the yaml/json configuration file')
    .option('-p, --period <period>', 'period, for example "1 month"')
    .option('-n, --needs <needs>', 'path to the yaml/json needs file')
    .option('-m, --mode <mode>', 'mode for the effective limitation (either burst/uniform)')*/
    .action((cmd) => {
        analyzer.exec(cmd);
    })
    .parse(process.argv);

if (process.argv.length < 3) {
    program.help();
}
