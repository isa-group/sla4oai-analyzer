npm run generate-schema
npm run generate-docs
npm run generate-docs1 
npm test

node . -o validity -d ".\pricing-examples\synthetic\" > ".\pricing-examples\output\Analysis_synthetic.txt"
node . -o validity -d ".\pricing-examples\new-examples\" > ".\pricing-examples\output\Analysis_new-examples.txt"
node . -o validity -d ".\pricing-examples\old-examples\" > ".\pricing-examples\output\Analysis_old-examples.txt"

node . -o compliance -f ".\pricing-examples/synthetic/S-listing14.yaml" -n "./pricing-examples/synthetic/needs/S-listing14.needs_OK.yaml"

node . -o effectiveLimitation -f "./pricing-examples/synthetic/E-listing13.yaml" -p "1 month"
