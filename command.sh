npm run generate-schema
npm run generate-docs
npm run generate-docs1 
npm test
node . -o validity -d ".\pricing-examples\synthetic\" > ".\pricing-examples\output\Analysis_synthetic.txt"
node . -o validity -d ".\pricing-examples\new-examples\" > ".\pricing-examples\output\Analysis_new-examples.txt"
node . -o validity -d ".\pricing-examples\old-examples\" > ".\pricing-examples\output\Analysis_old-examples.txt"
