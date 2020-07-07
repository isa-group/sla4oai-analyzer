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
        expect(effectiveLimitation.get('QuotaWithTwoLimitsMod').get('requests')).equals(100);

        expect(effectiveLimitation.get('QuotaWithTwoLimits')).to.include.all.keys('requests');
        expect(effectiveLimitation.get('QuotaWithTwoLimits').get('requests')).equals(715);

        expect(effectiveLimitation.get('QuotasRateWithOneLimit')).to.include.all.keys('requests');
        expect(effectiveLimitation.get('QuotasRateWithOneLimit').get('requests')).equals(715);
    });

    it('should calculate effective limitation burst/uniform', () => {
        const sla4oaiFile = fs.readFileSync(path.join('', EFFECTIVE_CAP_PAB), 'utf8');
        const sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);

        const effectiveLimitationMillisecondUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'millisecond' }, 'uniform');
        const effectiveLimitationSecondUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'second' }, 'uniform');
        const effectiveLimitationMinuteUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'minute' }, 'uniform');
        const effectiveLimitationHourUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'hour' }, 'uniform');
        const effectiveLimitationDayUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'day' }, 'uniform');
        const effectiveLimitationWeekUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'week' }, 'uniform');
        const effectiveLimitationMonthUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'month' }, 'uniform');
        const effectiveLimitationYearUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'year' }, 'uniform');
        const effectiveLimitationDecadeUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'decade' }, 'uniform');
        const effectiveLimitationCenturyUniform = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'century' }, 'uniform');

        const effectiveLimitationMillisecondBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'millisecond' }, 'burst');
        const effectiveLimitationSecondBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'second' }, 'burst');
        const effectiveLimitationMinuteBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'minute' }, 'burst');
        const effectiveLimitationHourBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'hour' }, 'burst');
        const effectiveLimitationDayBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'day' }, 'burst');
        const effectiveLimitationWeekBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'week' }, 'burst');
        const effectiveLimitationMonthBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'month' }, 'burst');
        const effectiveLimitationYearBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'year' }, 'burst');
        const effectiveLimitationDecadeBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'decade' }, 'burst');
        const effectiveLimitationCenturyBurst = operations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: 'century' }, 'burst');

        // UNIFORM
        expect(effectiveLimitationMillisecondUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMillisecondUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMillisecondUniform.get('plan1').get('requests')).equals(1);

        expect(effectiveLimitationSecondUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationSecondUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationSecondUniform.get('plan1').get('requests')).equals(6);

        expect(effectiveLimitationMinuteUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMinuteUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMinuteUniform.get('plan1').get('requests')).equals(6);

        expect(effectiveLimitationHourUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationHourUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationHourUniform.get('plan1').get('requests')).equals(298);

        expect(effectiveLimitationDayUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationDayUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationDayUniform.get('plan1').get('requests')).equals(7143);

        expect(effectiveLimitationWeekUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationWeekUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationWeekUniform.get('plan1').get('requests')).equals(50000);

        expect(effectiveLimitationMonthUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMonthUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMonthUniform.get('plan1').get('requests')).equals(50000);

        expect(effectiveLimitationYearUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationYearUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationYearUniform.get('plan1').get('requests')).equals(50000);

        expect(effectiveLimitationDecadeUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationDecadeUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationDecadeUniform.get('plan1').get('requests')).equals(50000);

        expect(effectiveLimitationCenturyUniform).to.include.all.keys(['plan1']);
        expect(effectiveLimitationCenturyUniform.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationCenturyUniform.get('plan1').get('requests')).equals(50000);

        // BURST
        expect(effectiveLimitationMillisecondBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMillisecondBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMillisecondBurst.get('plan1').get('requests')).equals(6);

        expect(effectiveLimitationSecondBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationSecondBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationSecondBurst.get('plan1').get('requests')).equals(6);

        expect(effectiveLimitationMinuteBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMinuteBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMinuteBurst.get('plan1').get('requests')).equals(360);

        expect(effectiveLimitationHourBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationHourBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationHourBurst.get('plan1').get('requests')).equals(21600);

        expect(effectiveLimitationDayBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationDayBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationDayBurst.get('plan1').get('requests')).equals(50000);

        expect(effectiveLimitationWeekBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationWeekBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationWeekBurst.get('plan1').get('requests')).equals(50000);

        expect(effectiveLimitationMonthBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationMonthBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationMonthBurst.get('plan1').get('requests')).equals(250000);

        expect(effectiveLimitationYearBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationYearBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationYearBurst.get('plan1').get('requests')).equals(2650000);

        expect(effectiveLimitationDecadeBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationDecadeBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationDecadeBurst.get('plan1').get('requests')).equals(26100000);

        expect(effectiveLimitationCenturyBurst).to.include.all.keys(['plan1']);
        expect(effectiveLimitationCenturyBurst.get('plan1')).to.include.all.keys('requests');
        expect(effectiveLimitationCenturyBurst.get('plan1').get('requests')).equals(260900000);
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
