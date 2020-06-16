var jsyaml = require("js-yaml");
var fs = require("fs");


var yaml = fs.readFileSync("aa.yaml");
var oas = jsyaml.safeLoad(yaml);

// console.log(Object.values(oas.paths))

for (let [name, xx] of Object.entries(oas.paths)) {
    console.log(`      '${name}':`)
    for (let [name1, yy] of Object.entries(xx)) {
        console.log("        " + name1+":");
    }
}