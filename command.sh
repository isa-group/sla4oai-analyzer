typescript-json-schema ".\model\tsconfig.json" SLA4OAI --titles  --required   > ".\model\SLA4OAI.schema.json"
bootprint json-schema ".\model\SLA4OAI.schema.json" ".\model\docs"
jsonschema2md -d '.\model\' -o '.\model\docs1'
npm test
node . ".\pricing-examples\synthetic\" -d > ".\pricing-examples\output\Analysis_synthetic.txt"
node . ".\pricing-examples\new-examples\" -d > ".\pricing-examples\output\Analysis_new-examples.txt"
node . ".\pricing-examples\old-examples\" -d > ".\pricing-examples\output\Analysis_old-examples.txt"
