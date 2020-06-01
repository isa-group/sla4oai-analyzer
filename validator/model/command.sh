typescript-json-schema ".\validator\model\tsconfig.json" SLA4OAI --titles  --required   > ".\validator\model\SLA4OAI.schema.json"
bootprint json-schema ".\validator\model\SLA4OAI.schema.json" ".\validator\model\docs"
node . ".\examples" -d -s > res.txt
# jsonschema2md -d '.\validator\model\' -o '\validator\model\docs'

# typescript-json-schema ".\validator\oldModel\tsconfig.json" SLA4OAI --titles  --required   > ".\validator\oldModel\SLA4OAI.schema.json"
# bootprint json-schema ".\validator\oldModel\SLA4OAI.schema.json" ".\validator\oldModel\docs"
# jsonschema2md -d '.\validator\oldModel\' -o '\validator\oldModel\docs'