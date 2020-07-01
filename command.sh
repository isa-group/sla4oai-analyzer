npm run generate-schema
npm run generate-docs
npm run generate-docs1 
npm test
node . ".\pricing-examples\synthetic\" -d > ".\pricing-examples\output\Analysis_synthetic.txt"
node . ".\pricing-examples\new-examples\" -d > ".\pricing-examples\output\Analysis_new-examples.txt"
node . ".\pricing-examples\old-examples\" -d > ".\pricing-examples\output\Analysis_old-examples.txt"
