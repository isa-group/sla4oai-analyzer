/* eslint-disable indent */
/* eslint-disable no-undef */

const validator = require("../validator");
var expect = require("chai").expect;


describe("Validating folder (-d)", function () {
    it("should validate the entire folder", function () {
        var cmd = { directory: true };
        var res = validator.validate("examples-new/synthetic", cmd);
        assert.ok(res);
    });
});

describe("Negative validation", function () {
    it("should detect a 'consistency conflict in limits'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-listing04.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict in limitations'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-03-inconsistent-limitations.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'capacity conflict'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-listing06.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'ambiguity conflict'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-listing08.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'consistency conflict between related metrics'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-listing10.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
    it("should detect a 'cost consistency conflict'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-listing12.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.false;
    });
});

describe("Positive validation", function () {
    it("should detect NO 'consistency conflict in limits'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/I-listing03.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict in limitations'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/V-03-consistent-limitations.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'capacity conflict'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/V-listing05.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'ambiguity conflict'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/V-listing07.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'consistency conflict between related metrics'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/V-listing09.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
    it("should detect NO 'cost consistency conflict'", function () {
        var cmd = { directory: false };
        var res = validator.validate("examples-new/synthetic/V-listing11.yaml", cmd);
        expect(res).to.not.equal(0);
        expect(res).to.be.true;
    });
});
