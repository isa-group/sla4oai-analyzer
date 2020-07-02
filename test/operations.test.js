/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');

const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const operations = require('../analyzer/operations');

const VALID_FILE = 'pricing-examples/synthetic/V-03-consistent-limitations.yaml';
const INVALID_FILE = 'pricing-examples/synthetic/I-03-inconsistent-limitations.yaml';
const EFFECTIVE_CAP = 'pricing-examples/synthetic/E-listing13.yaml';
const EFFECTIVE_CAP_PAB = 'pricing-examples/synthetic/E-pablo.yaml';
const USERNEEDS_OK = 'pricing-examples/synthetic/S-listing14.yaml';
const USERNEEDS_NOK = 'pricing-examples/synthetic/S-listing15.yaml';
const USERNEEDS_PAB = 'pricing-examples/synthetic/S-pablo.yaml';

describe('operation test: validity', () => {
    it('should be valid', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', VALID_FILE), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const isValid = operations.validity(sla4oaiObject);
        expect(isValid).to.be.true;
    });

    it('should not be valid', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', INVALID_FILE), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const isValid = operations.validity(sla4oaiObject);
        expect(isValid).to.be.false;
    });
});

describe('operation test: effective limitation', () => {
    it('should calculate effective limitation', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', EFFECTIVE_CAP), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const effectiveLimitation = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'day' });
        expect(effectiveLimitation).to.include.all.keys(['QuotaWithTwoLimitsMod', 'QuotaWithTwoLimits', 'QuotasRateWithOneLimit']);
        expect(effectiveLimitation.get('QuotaWithTwoLimitsMod')).to.include.all.keys('requests');
        expect(effectiveLimitation.get('QuotaWithTwoLimitsMod').get('requests')).to.be.an('array').that.includes(100);

        expect(effectiveLimitation.get('QuotaWithTwoLimits')).to.include.all.keys('requests');
        expect(effectiveLimitation.get('QuotaWithTwoLimits').get('requests')).to.be.an('array').that.includes(715);

        expect(effectiveLimitation.get('QuotasRateWithOneLimit')).to.include.all.keys('requests');
        expect(effectiveLimitation.get('QuotasRateWithOneLimit').get('requests')).to.be.an('array').that.includes(715);
    });

    it('should calculate effective limitation burst/uniform', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', EFFECTIVE_CAP_PAB), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);

        const effectiveLimitationMinUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'minute' }, 'uniform');
        const effectiveLimitationHourUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'hour' }, 'uniform');
        const effectiveLimitationDayUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'day' }, 'uniform');

        const effectiveLimitationMinBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'minute' }, 'burst');
        const effectiveLimitationHourBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'hour' }, 'burst');
        const effectiveLimitationDayBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'day' }, 'burst');

        expect(effectiveLimitationMinUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMinUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMinUniform.get('plan1').get('requests')).to.be.an('array').that.includes(6);

        expect(effectiveLimitationHourUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationHourUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationHourUniform.get('plan1').get('requests')).to.be.an('array').that.includes(298);

        expect(effectiveLimitationDayUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationDayUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationDayUniform.get('plan1').get('requests')).to.be.an('array').that.includes(7143);

        expect(effectiveLimitationMinBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMinBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMinBurst.get('plan1').get('requests')).to.be.an('array').that.includes(360);

        expect(effectiveLimitationHourBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationHourBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationHourBurst.get('plan1').get('requests')).to.be.an('array').that.includes(21600);

        expect(effectiveLimitationDayBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationDayBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationDayBurst.get('plan1').get('requests')).to.be.an('array').that.includes(50000);
    });
});

describe('operation test: userneeds', () => {
    it('should be compliant with user needs', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', USERNEEDS_OK), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const everyUserNeedIsSatisfied = operations.compliance(sla4oaiObject, [
            { requests: { max: 50, period: { amount: '1', unit: 'day' } } },
            { requests: { max: 1, period: { amount: '1', unit: 'second' } } },
        ]);
        expect(everyUserNeedIsSatisfied).to.be.true;
    });

    it('should not be compliant with user needs', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', USERNEEDS_NOK), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const everyUserNeedIsSatisfied = operations.compliance(sla4oaiObject, [
            { requests: { max: 200, period: { amount: '1', unit: 'day' } } },
            { requests: { max: 4, period: { amount: '1', unit: 'second' } } },
        ]);
        expect(everyUserNeedIsSatisfied).to.be.false;
    });

    it('should be compliant with user needs pab', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', USERNEEDS_PAB), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const everyUserNeedIsSatisfied = operations.compliance(sla4oaiObject, [
            { requests: { max: 5, period: { amount: '1', unit: 'second' } } },
        ]);
        expect(everyUserNeedIsSatisfied).to.be.true;
    });

    it('should not be compliant with user needs pab', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', USERNEEDS_PAB), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        const everyUserNeedIsSatisfied = operations.compliance(sla4oaiObject, [
            { requests: { max: 20, period: { amount: '1', unit: 'second' } } },
        ]);
        expect(everyUserNeedIsSatisfied).to.be.false;
    });
});
