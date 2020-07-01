/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { assert } = require('chai');
const validator = require('../analyzer');

describe('Negative validation', () => {
    it("should detect a 'consistency conflict in limits'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/I-listing04.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict in limitations'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/I-03-inconsistent-limitations.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict with capacity'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/I-listing06.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'ambiguity conflict'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/I-listing08.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict between related metrics'", () => { /// /
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/I-listing10.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'cost consistency conflict'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/I-listing12.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
});

describe('Positive validation', () => {
    it("should detect NO 'consistency conflict in limits'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/V-listing03.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict in limitations'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/V-03-consistent-limitations.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict with capacity'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/V-listing05.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'ambiguity conflict'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/V-listing07.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict between related metrics'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/V-listing09.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'cost consistency conflict'", () => {
        const cmd = { directory: false };
        const res = validator.analyze('pricing-examples/synthetic/V-listing11.yaml', cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
});

describe('Validating folder (-d)', () => {
    it('should validate the entire synthetic folder', () => {
        const cmd = { directory: true };
        const res = validator.analyze('pricing-examples/synthetic', cmd);
        assert.ok(res);
    });
    it('should validate the entire old-examples folder', () => {
        const cmd = { directory: true };
        const res = validator.analyze('pricing-examples/old-examples', cmd);
        assert.ok(res);
    });
    it('should validate the entire new-examples folder', () => {
        const cmd = { directory: true };
        const res = validator.analyze('pricing-examples/new-examples', cmd);
        assert.ok(res);
    });
});
