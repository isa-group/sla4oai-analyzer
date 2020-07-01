/* eslint-disable no-undef */
/* eslint-disable indent */

const validityOperations = require("../validator/operations/validity");
var expect = require("chai").expect;

const fs = require("fs");
const path = require("path");
const jsyaml = require("js-yaml");

var VALID_FILE = "examples/synthetic/V-03-consistent-limitations.yaml";
var INVALID_FILE = "examples/synthetic/I-03-inconsistent-limitations.yaml";
var EFFECTIVE_CAP = "examples/synthetic/E-listing13.yaml";
var EFFECTIVE_CAP_pab = "examples/synthetic/E-pablo.yaml";
var USERNEEDS_OK = "examples/synthetic/S-listing14.yaml";
var USERNEEDS_NOK = "examples/synthetic/S-listing15.yaml";
var USERNEEDS_pab = "examples/synthetic/S-pablo.yaml";

describe("operation test: validity", function () {

    it("should be valid", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", VALID_FILE), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var isValid = validityOperations.isValid(sla4oaiObject);
        expect(isValid).to.be.true;
    });

    it("should not be valid", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", INVALID_FILE), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var isValid = validityOperations.isValid(sla4oaiObject);
        expect(isValid).to.be.false;
    });
});

describe("operation test: effective limitation", function () {

    it("should calculate effective limitation", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", EFFECTIVE_CAP), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var effectiveLimitation = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "day" });
        expect(effectiveLimitation).to.include.all.keys(["QuotaWithTwoLimitsMod", "QuotaWithTwoLimits", "QuotasRateWithOneLimit"]);
        expect(effectiveLimitation.get("QuotaWithTwoLimitsMod")).to.include.all.keys("requests");
        expect(effectiveLimitation.get("QuotaWithTwoLimitsMod").get("requests")).to.be.an("array").that.includes(100);

        expect(effectiveLimitation.get("QuotaWithTwoLimits")).to.include.all.keys("requests");
        expect(effectiveLimitation.get("QuotaWithTwoLimits").get("requests")).to.be.an("array").that.includes(715);

        expect(effectiveLimitation.get("QuotasRateWithOneLimit")).to.include.all.keys("requests");
        expect(effectiveLimitation.get("QuotasRateWithOneLimit").get("requests")).to.be.an("array").that.includes(715);
    });

    it("should calculate effective limitation burst/uniform", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", EFFECTIVE_CAP_pab), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);

        var effectiveLimitation_min_uniform = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "minute" }, "uniform");
        var effectiveLimitation_hour_uniform = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "hour" }, "uniform");
        var effectiveLimitation_day_uniform = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "day" }, "uniform");

        var effectiveLimitation_min_burst = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "minute" }, "burst");
        var effectiveLimitation_hour_burst = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "hour" }, "burst");
        var effectiveLimitation_day_burst = validityOperations.effectiveLimitation(sla4oaiObject, { amount: 1, unit: "day" }, "burst");

        expect(effectiveLimitation_min_uniform).to.include.all.keys(["plan1"]);
        expect(effectiveLimitation_min_uniform.get("plan1")).to.include.all.keys("requests");
        expect(effectiveLimitation_min_uniform.get("plan1").get("requests")).to.be.an("array").that.includes(6);

        expect(effectiveLimitation_hour_uniform).to.include.all.keys(["plan1"]);
        expect(effectiveLimitation_hour_uniform.get("plan1")).to.include.all.keys("requests");
        expect(effectiveLimitation_hour_uniform.get("plan1").get("requests")).to.be.an("array").that.includes(298);

        expect(effectiveLimitation_day_uniform).to.include.all.keys(["plan1"]);
        expect(effectiveLimitation_day_uniform.get("plan1")).to.include.all.keys("requests");
        expect(effectiveLimitation_day_uniform.get("plan1").get("requests")).to.be.an("array").that.includes(7143);

        expect(effectiveLimitation_min_burst).to.include.all.keys(["plan1"]);
        expect(effectiveLimitation_min_burst.get("plan1")).to.include.all.keys("requests");
        expect(effectiveLimitation_min_burst.get("plan1").get("requests")).to.be.an("array").that.includes(360);

        expect(effectiveLimitation_hour_burst).to.include.all.keys(["plan1"]);
        expect(effectiveLimitation_hour_burst.get("plan1")).to.include.all.keys("requests");
        expect(effectiveLimitation_hour_burst.get("plan1").get("requests")).to.be.an("array").that.includes(21600);

        expect(effectiveLimitation_day_burst).to.include.all.keys(["plan1"]);
        expect(effectiveLimitation_day_burst.get("plan1")).to.include.all.keys("requests");
        expect(effectiveLimitation_day_burst.get("plan1").get("requests")).to.be.an("array").that.includes(50000);
    });
});

describe("operation test: userneeds", function () {

    it("should be compliant with user needs", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", USERNEEDS_OK), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var everyUserNeedIsSatisfied = validityOperations.satisfactionUserNeeds(sla4oaiObject, [
            { requests: { max: 50, period: { amount: "1", unit: "day" } } },
            { requests: { max: 1, period: { amount: "1", unit: "second" } } }
        ]);
        expect(everyUserNeedIsSatisfied).to.be.true;
    });

    it("should not be compliant with user needs", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", USERNEEDS_NOK), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var everyUserNeedIsSatisfied = validityOperations.satisfactionUserNeeds(sla4oaiObject, [
            { requests: { max: 200, period: { amount: "1", unit: "day" } } },
            { requests: { max: 4, period: { amount: "1", unit: "second" } } }
        ]);
        expect(everyUserNeedIsSatisfied).to.be.false;
    });
    
    it("should be compliant with user needs pab", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", USERNEEDS_pab), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var everyUserNeedIsSatisfied = validityOperations.satisfactionUserNeeds(sla4oaiObject, [
            { requests: { max: 5, period: { amount: "1", unit: "second" } } }
        ]);
        expect(everyUserNeedIsSatisfied).to.be.true;
    });

    it("should not be compliant with user needs pab", function () {
        var sla4oaiFile = fs.readFileSync(path.join("", USERNEEDS_pab), "utf8");
        var sla4oaiObject = jsyaml.safeLoad(sla4oaiFile);
        var everyUserNeedIsSatisfied = validityOperations.satisfactionUserNeeds(sla4oaiObject, [
            { requests: { max: 20, period: { amount: "1", unit: "second" } } }
        ]);
        expect(everyUserNeedIsSatisfied).to.be.false;
    });
});
