typescript-json-schema ".\validator\model\tsconfig.json" SLA4OAI --titles  --required   > ".\validator\model\SLA4OAI.schema.json"
bootprint json-schema ".\validator\model\SLA4OAI.schema.json" ".\validator\model\docs"
jsonschema2md -d '.\validator\model\' -o '.\validator\model\docs1'
npm test
# node . ".\examples" -d -s > res.txt
# node . ".\examples\synthetic\" -d > .\output\Analysis_synthetic.txt
# node . ".\examples\new-examples\" -d > .\output\Analysis_new-examples.txt
# node . ".\examples\old-examples\" -d > .\output\Analysis_old-examples.txt

# typescript-json-schema ".\validator\oldModel\tsconfig.json" SLA4OAI --titles  --required   > ".\validator\oldModel\SLA4OAI.schema.json"
# bootprint json-schema ".\validator\oldModel\SLA4OAI.schema.json" ".\validator\oldModel\docs"
# jsonschema2md -d '.\validator\oldModel\' -o '\validator\oldModel\docs'