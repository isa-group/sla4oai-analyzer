/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { assert } = require('chai');
const analyzer = require('../analyzer');

describe('P1 - Negative validation', () => {
    it("should detect a 'consistency conflict in limits'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/I-listing04.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict in limitations'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/I-03-inconsistent-limitations.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict with capacity'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/I-listing06.yaml',
            config: 'pricing-examples/synthetic/config/I-listing06.config.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'ambiguity conflict'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/I-listing08.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict between related metrics'", () => { /// /
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/I-listing10.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'cost consistency conflict'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/I-listing12.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
});

describe('P1 - Positive validation', () => {
    it("should detect NO 'consistency conflict in limits'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/V-listing03.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict in limitations'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/V-03-consistent-limitations.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict with capacity'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/V-listing05.yaml',
            config: 'pricing-examples/synthetic/config/V-listing05.config.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'ambiguity conflict'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/V-listing07.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict between related metrics'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/V-listing09.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'cost consistency conflict'", () => {
        const cmd = {
            operation: 'validity',
            file: 'pricing-examples/synthetic/V-listing11.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
});

describe('P1 - Validating folder (-d)', () => {
    it('should validate the entire synthetic folder', () => {
        const cmd = {
            operation: 'validity',
            directory: 'pricing-examples/synthetic',
        };
        const res = analyzer.exec(cmd);
        assert.ok(res);
    });
    it('should validate the entire old-examples folder', () => {
        const cmd = {
            operation: 'validity',
            directory: 'pricing-examples/old-examples',
        };
        const res = analyzer.exec(cmd);
        assert.ok(res);
    });
    it('should validate the entire new-examples folder', () => {
        const cmd = {
            operation: 'validity',
            directory: 'pricing-examples/new-examples',
        };
        const res = analyzer.exec(cmd);
        assert.ok(res);
    });
});

describe('P2 - Effective capacity', () => {
    it('should calculate effective limitation 1 day', () => {
        const cmd = {
            operation: 'effectiveLimitation',
            file: 'pricing-examples/synthetic/E-listing13.yaml',
            period: '1 day',
        };
        const res = analyzer.exec(cmd);
        assert.ok(res);
        expect(res).to.include.all.keys(['QuotaWithTwoLimitsMod', 'QuotaWithTwoLimits', 'QuotasRateWithOneLimit']);
        expect(res.get('QuotaWithTwoLimitsMod')).to.include.all.keys('requests');
        expect(res.get('QuotaWithTwoLimitsMod').get('requests')).equals(100);

        expect(res.get('QuotaWithTwoLimits')).to.include.all.keys('requests');
        expect(res.get('QuotaWithTwoLimits').get('requests')).equals(715);

        expect(res.get('QuotasRateWithOneLimit')).to.include.all.keys('requests');
        expect(res.get('QuotasRateWithOneLimit').get('requests')).equals(715);
    });
    it('should calculate effective limitation 1 second', () => {
        const cmd = {
            operation: 'effectiveLimitation',
            file: 'pricing-examples/synthetic/E-listing13.yaml',
            period: '1 second',
        };
        const res = analyzer.exec(cmd);
        assert.ok(res);
        expect(res).to.include.all.keys(['QuotaWithTwoLimitsMod', 'QuotaWithTwoLimits', 'QuotasRateWithOneLimit']);
        expect(res.get('QuotaWithTwoLimitsMod')).to.include.all.keys('requests');
        expect(res.get('QuotaWithTwoLimitsMod').get('requests')).equals(1);

        expect(res.get('QuotaWithTwoLimits')).to.include.all.keys('requests');
        expect(res.get('QuotaWithTwoLimits').get('requests')).equals(6);

        expect(res.get('QuotasRateWithOneLimit')).to.include.all.keys('requests');
        expect(res.get('QuotasRateWithOneLimit').get('requests')).equals(6);
    });
    it('should calculate effective limitation 1 month', () => {
        const cmd = {
            operation: 'effectiveLimitation',
            file: 'pricing-examples/synthetic/E-listing13.yaml',
            period: '1 month',
        };
        const res = analyzer.exec(cmd);
        assert.ok(res);
        expect(res).to.include.all.keys(['QuotaWithTwoLimitsMod', 'QuotaWithTwoLimits', 'QuotasRateWithOneLimit']);
        expect(res.get('QuotaWithTwoLimitsMod')).to.include.all.keys('requests');
        expect(res.get('QuotaWithTwoLimitsMod').get('requests')).equals(700);

        expect(res.get('QuotaWithTwoLimits')).to.include.all.keys('requests');
        expect(res.get('QuotaWithTwoLimits').get('requests')).equals(5000);

        expect(res.get('QuotasRateWithOneLimit')).to.include.all.keys('requests');
        expect(res.get('QuotasRateWithOneLimit').get('requests')).equals(5000);
    });
});

describe('P3 - Compliance', () => {
    it('should calculate compliance of user needs', () => {
        const cmd = {
            operation: 'compliance',
            file: 'pricing-examples/synthetic/S-listing14.yaml',
            needs: 'pricing-examples/synthetic/needs/S-listing14.needs_OK.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.be.true;
    });
    it('should calculate not compliance of user needs', () => {
        const cmd = {
            operation: 'compliance',
            file: 'pricing-examples/synthetic/S-listing14.yaml',
            needs: 'pricing-examples/synthetic/needs/S-listing14.needs_NOK.yaml',
        };
        const res = analyzer.exec(cmd);
        expect(res).to.be.false;
    });
});
