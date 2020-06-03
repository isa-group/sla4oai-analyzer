/* eslint-disable no-fallthrough */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */

const config = require("./../configurations");
const logger = config.logger;

// ****************************** BEGIN P1 VALIDITY DETECTION ****************************** //
var capacity = { "max": Infinity, "period": { "amount": 1, "unit": "second" } };

// P1   [L4   Valid pricing] A {pricing} is valid if: 
function isValid_pricing(pricing) {

    logger.validation("   CHECKING PRICING VALIDITY...");

    // [P1 L4.1] All its {plans} are valid.
    let everyPlanIsValid = true;
    for (const planName in pricing.plans) {
        let plan = pricing.plans[planName];
        everyPlanIsValid = everyPlanIsValid && isValid_plan(plan, planName);
        // if (!everyPlanIsValid) break;
    }

    // [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans, that is, a {limitation} in one plan is less restrictive than the equivalent in another {plan} but the former {plan} is cheaper than the later.
    let existsCostConsistencyConflicts = false;
    firstPlanLoop:
    for (let [plan1Name, plan1] of Object.entries(pricing.plans)) {
        for (let [plan2Name, plan2] of Object.entries(pricing.plans)) {
            if (plan1Name == plan2Name) continue;
            existsCostConsistencyConflicts = existsCostConsistencyConflicts || existsCostConsistencyConflict(plan1, plan2);
            // if (existsCostConsistencyConflicts) break firstPlanLoop;
        }
    }


    // Merge conditions
    const condition = everyPlanIsValid && !existsCostConsistencyConflicts;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_pricing", condition, "\x1b[0m");
        // logger.info(`In isValid_pricing: ${condition}\n    everyPlanIsValid=${everyPlanIsValid} && !existsCostConsistencyConflicts=${!existsCostConsistencyConflicts}`);
        logger.validationWarning("     NOK PRICING VALIDITY NOK");
        logger.validationWarning(`       everyPlanIsValid=${everyPlanIsValid}`);
        logger.validationWarning(`       !existsCostConsistencyConflicts=${!existsCostConsistencyConflicts}`);
    } else {
        logger.validation("     PRICING VALIDITY OK");
    }

    return condition;
}

// P1   [L3   Valid plan] A {plan} is valid if: 
function isValid_plan(plan, planName) {
    logger.validation(`     CHECKING PLAN VALIDITY (${planName})...`);

    // [P1 L3.1] All its {limitations} are valid.
    let everyLimitationIsValid = true;

    for (let [planLimitationsName, planLimitations] of Object.entries(plan)) {
        if (planLimitationsName == "quotas" || planLimitationsName == "rates") {
            for (let [limitationsPathName, limitationsPath] of Object.entries(planLimitations)) {
                for (let [limitationsPathMethodName, limitationsPathMethod] of Object.entries(limitationsPath)) {
                    for (let [limitationsPathMethodMetricName, limitationsPathMethodMetric] of Object.entries(limitationsPathMethod)) {
                        everyLimitationIsValid = everyLimitationIsValid && isValid_limitation(limitationsPathMethodMetric, planName, limitationsPathName, limitationsPathMethodName, limitationsPathMethodMetricName)
                    }
                }
            }
        }
    }
    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.
    const existsConsistencyConflicts = existsPlanConsistencyConflict(plan, planName);

    // Merge conditions
    const condition = everyLimitationIsValid && !existsConsistencyConflicts;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_plan", condition, "\x1b[0m");
        // logger.info(`In isValid_plan: ${condition}\n    everyLimitationIsValid=${everyLimitationIsValid} && !existsConsistencyConflicts=${!existsConsistencyConflicts}`);
        logger.validationWarning(`       NOK PLAN VALIDITY in (${planName}) NOK`);
        logger.validationWarning(`         everyLimitationIsValid=${everyLimitationIsValid}`);
        logger.validationWarning(`         !existsConsistencyConflicts=${!existsConsistencyConflicts}`);
    } else {
        logger.validation(`       PLAN VALIDITY (${planName}) OK`);
    }

    return condition;
}

// P1   [L2   Valid limitation] A {limitation} is valid if: 
function isValid_limitation(limitation, planName, path, method, metric) {

    logger.validation(`       CHECKING LIMITATION VALIDITY (${printLimitatation(limitation)})...`);

    // [P1 L2.1] All its {limits} are valid.
    const everyLimitIsValid = limitation.every((limit) => isValid_limit(limit, planName, path, method, metric));

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}, that is, a possible situation allowed by one limit implies the violation of the other {limit}.
    const existsConsistencyConflicts = existsLimitsConsistencyConflict(limitation, planName, path, method, metric);


    // [P1 L2.3] There are no {ambiguity conflict} between any pair of its {limits}, that is, two limits use the same period.
    const existsAmbiguityConflicts = existsAmbiguityConflict(limitation, planName, path, method, metric);


    // Merge conditions
    const condition = everyLimitIsValid && !existsConsistencyConflicts && !existsAmbiguityConflicts;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_limitation", condition, "\x1b[0m");
        // logger.info(`In isValid_limitation: ${condition}\n    everyLimitIsValid=${everyLimitIsValid} && !existsConsistencyConflicts=${!existsConsistencyConflicts} && !existsAmbiguityConflicts=${!existsAmbiguityConflicts}`);
        logger.validationWarning(`         NOK LIMITATION VALIDITY in ${planName}>${path}>${method}>${metric} (${printLimitatation(limitation)}) NOK`);
        logger.validationWarning(`           everyLimitIsValid=${everyLimitIsValid}`);
        logger.validationWarning(`           !existsConsistencyConflicts=${!existsConsistencyConflicts}`);
        logger.validationWarning(`           !existsAmbiguityConflicts=${!existsAmbiguityConflicts}`);
    } else {
        logger.validation(`         LIMITATION VALIDITY (${printLimitatation(limitation)}) OK`);
    }
    return condition;
}

// P1   [L1   Valid limit] A {limit} is valid if: 
function isValid_limit(limit, planName, path, method, metric) {

    logger.validation(`         CHECKING LIMIT VALIDITY (${printLimit(limit)})...`);
    // [P1 L1.1] Its {threshold} is a natural number.
    const isNaturalNumber = limit.max >= 0;
    if (!isNaturalNumber) {
        logger.validationWarning(`             !isNaturalNumber in  ${planName}>${path}>${method}>${metric}`);
    }

    // [P1 L1.2] It is consistent with its associated {capacity}, that is, it does not surpases the associated {capacity}.
    const existsLimitsConsistencyConflictCapacity = existsLimitsConsistencyConflict_check(limit, capacity, planName, path, method, metric);

    const condition = isNaturalNumber && !existsLimitsConsistencyConflictCapacity;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_limit", condition, "\x1b[0m");
        // logger.info(`In isValid_limit: ${condition}\n    isNaturalNumber=${isNaturalNumber} && !existsLimitsConsistencyConflictCapacity=${!existsLimitsConsistencyConflictCapacity}`);
        logger.validationWarning(`           NOK LIMIT VALIDITY in ${planName}>${path}>${method}>${metric} (${printLimit(limit)}) NOK`);
        logger.validationWarning(`             isNaturalNumber=${isNaturalNumber}`);
        logger.validationWarning(`             !existsLimitsConsistencyConflictCapacity=${!existsLimitsConsistencyConflictCapacity}`);
    } else {
        // logger.validation(`           LIMIT VALIDITY (${printLimit(limit)}) OK`);
    }

    return condition;

}

// ************************************* BEGIN CONFLICT DETECTION ************************************* //


// [P1 L2.2] There are no {consistency conflicts} 
function existsLimitsConsistencyConflict(limits, planName, path, method, metric) {

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}
    let existsConsistencyConflicts = false;
    firstLimitLoop:
    for (let i = 0; i < limits.length; i++) {
        let limit1 = limits[i];
        for (let j = 0; j < limits.length; j++) {
            if (i == j) continue;
            let limit2 = limits[j];
            existsConsistencyConflicts = existsConsistencyConflicts || existsLimitsConsistencyConflict_check(limit1, limit2, planName, path, method, metric);
            // if (existsConsistencyConflicts) break firstLimitLoop;
        }
    }
    return existsConsistencyConflicts;
}

// [P1 L2.2] There are no {consistency conflicts} (aux function)
function existsLimitsConsistencyConflict_check(limit1, limit2, planName, path, method, metric) {

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}, that is, a possible situation allowed by one limit implies the violation of the other {limit}.
    let N1 = normalizedPeriod(limit1.period);
    let N2 = normalizedPeriod(limit2.period);

    let PU1 = PU(limit1);
    let PU2 = PU(limit2);

    let existsInconsistency;

    // inconsistentes si el porcentaje de utilización de la "capacidad de la limitación con periodo más largo" es menor que "el porcentaje de utilización de la capacidad del periodo más corto"
    if (N1 >= N2) {
        // logger.debug(`${PU1} => ${PU2}: ${PU1 >= PU2}`);
        existsInconsistency = PU1 > PU2;

    } else if (N1 == N2 && PU1 == PU2) {
        existsInconsistency = false;
    } else {
        // logger.debug(`${PU1} < ${PU2}: ${PU1 < PU2}`);
        existsInconsistency = PU1 < PU2;
    }


    // Merge conditions
    const condition = existsInconsistency;

    if (condition) {
        // logger.info("\x1b[31m", `Limit "${limit1.max} per ${limit1.period.amount}/${limit1.period.unit}" and "Limit ${limit2.max} per ${limit2.period.amount}/${limit2.period.unit}" are inconsistent`, "\x1b[0m");
        // logger.validationWarning(`             L2.2 LIMIT CONSISTENCY CONFLICT: in ${planName}>${path}>${method}>${metric} (${printLimit(limit1)} and ${printLimit(limit2)})`);
    } else {
        // logger.validation(`             L2.2 NO LIMIT CONSISTENCY CONFLICT (${printLimit(limit1)} and ${printLimit(limit2)}) OK`);
    }

    return condition;
}

// [P1 L2.3] There are no {ambiguity conflict}
function existsAmbiguityConflict(limits, planName, path, method, metric) {

    // [P1 L2.3] There are no {ambiguity conflict} between any pair of its {limits}, that is, two limits use the same period.
    let existsAmbiguityConflicts = false;
    firstLimitLoop:
    for (let i = 0; i < limits.length; i++) {
        let limit1 = limits[i];
        for (let j = 0; j < limits.length; j++) {
            if (i == j) continue;
            let limit2 = limits[j];
            existsAmbiguityConflicts = existsAmbiguityConflicts || existsAmbiguityConflict_check(limit1, limit2, planName, path, method, metric);
            // if (existsAmbiguityConflicts) break firstLimitLoop;
        }
    }

    // Merge conditions
    const condition = existsAmbiguityConflicts;
    return condition;

}

// [P1 L2.3] There are no {ambiguity conflict}} (aux function)
function existsAmbiguityConflict_check(limit1, limit2, planName, path, method, metric) {
    const condition = limit1.period.unit == limit2.period.unit;

    if (condition) {
        // logger.info("\x1b[31m", `Limit "${limit1.max} per ${limit1.period.amount}/${limit1.period.unit}" and "Limit ${limit2.max} per ${limit2.period.amount}/${limit2.period.unit}" are inconsistent`, "\x1b[0m");
        logger.validationWarning(`             existsAmbiguityConflict_check in  ${planName}>${path}>${method}>${metric}`);
        logger.validationWarning(`             L2.3 AMBIGUITY CONFLICT: (${printLimit(limit1)} and ${printLimit(limit2)})`);
    } else {
        // logger.validation(`             L2.3 NO AMBIGUITY CONFLICT (${printLimit(limit1)} and ${printLimit(limit1)})`);
    }

    return condition;
}

// [P1   L3.2] There are no { consistency conflicts }
function existsPlanConsistencyConflict(plan, planName) {
    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.
    let existsConsistencyConflict = false;
    let existsConsistencyRelatedMetricsConflict = false;

    for (let [planLimitationsName, planLimitations] of Object.entries(plan)) {
        if (planLimitationsName == "quotas" || planLimitationsName == "rates") {
            for (let [limitationsPathName, limitationsPath] of Object.entries(planLimitations)) {
                for (let [limitationsPathMethodName, limitationsPathMethod] of Object.entries(limitationsPath)) {
                    for (let [limitationsPathMethodMetricName, limitationsPathMethodMetric] of Object.entries(limitationsPathMethod)) {

                        for (let i = 0; i < limitationsPathMethodMetric.length; i++) {
                            let limit1 = limitationsPathMethodMetric[i];
                            for (let j = 0; j < limitationsPathMethodMetric.length; j++) {
                                if (i == j) continue;
                                let limit2 = limitationsPathMethodMetric[j];
                                existsConsistencyConflict = existsConsistencyConflict || existsLimitsConsistencyConflict_check(limit1, limit2, planName, limitationsPathName, limitationsPathMethodName, limitationsPathMethodMetricName);
                                if (existsConsistencyConflict) {
                                    logger.validationWarning(`                L3.2 CONSISTENCY CONFLICT in ${planName}>${planLimitationsName}>${limitationsPathName}>${limitationsPathMethodName}>${limitationsPathMethodMetricName} (${printLimit(limit1)} AND ${printLimit(limit2)})`);
                                }
                            }
                            //TODO: 
                            if (limitationsPathMethodMetric.relatedMetrics) {
                                logger.error("Not implemented yet");

                                for (let entry of limitationsPathMethodMetric.relatedMetrics.entries()) {
                                    logger.info(entry[0], entry[1]);
                                    let cuerrentMetric1RelatedMetric = entry[0];
                                    let cuerrentMetric1RelatedMetricConversionFactor = entry[1];

                                    for (let j = 0; j < planLimitations.length; j++) {
                                        let currentLimitation2 = planLimitations[i];
                                        let currentMetric2 = currentLimitation2.metric;
                                        if (i == j || limitationsPathMethodMetricName == currentMetric2.name || cuerrentMetric1RelatedMetric.name != currentMetric2.name) continue;
                                        existsConsistencyRelatedMetricsConflict = existsConsistencyRelatedMetricsConflict || existsConsistencyConflict_check(limitationsPathMethodMetricName, currentLimitation2, cuerrentMetric1RelatedMetricConversionFactor);
                                        if (existsConsistencyRelatedMetricsConflict) {
                                            logger.validationWarning(`                L3.2 CONSISTENCY CONFLICT in ${planName}>${planLimitationsName}>${limitationsPathName}>${limitationsPathMethodName}(${printLimit(limit1)} AND ${printLimit(cuerrentMetric1RelatedMetric.name)})`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Merge conditions
    const condition = existsConsistencyConflict || existsConsistencyRelatedMetricsConflict;

    if (condition) {
        // logger.validationWarning(`             L3.2 CONSISTENCY CONFLICT (${planName})`);
    } else {
        // logger.validation(`             L3.2 NO CONSISTENCY CONFLICT: (${planName}) OK`);
    }

    return condition;
}

// [P1   L3.2] There are no { consistency conflicts } (aux function)
function existsConsistencyConflict_check(limitation1, limitation2, conversionFactor) {
    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.

    const limits1 = limitation1.limits;
    const limits2 = limitation2.limits;

    //FIXME: this implementation is not checked
    return limits1.some(limit1 => { limits2.some(limit2 => { return (((limit1.value) * (conversionFactor)) > limit2.value); }); });
}

// [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans
function existsCostConsistencyConflict(plan1, plan2) {

    // [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans, that is, a {limitation} in one plan is less restrictive than the equivalent in another {plan} but the former {plan} is cheaper than the later.

    // let limitations1 = plan1.rates || [];
    // let quotas1 = plan1.quotas || [];
    // let limitations2 = plan1.rates || [];
    // let quotas2 = plan1.quotas || [];
    // let planLimitations1 = [...(Object.values(quotas1) || []), ...(Object.values(limitations1) || [])];
    // let planLimitations2 = [...(Object.values(quotas2) || []), ...(Object.values(limitations2) || [])];
    // let planPaths1 = [...(Object.values(planLimitations1) || [])];
    // let planPaths2 = [...(Object.values(planLimitations2) || [])];
    let existsCostConsistencyConflict = false;
    firstLimitationLoop:

    for (let [plan1LimitationsName, plan1Limitations] of Object.entries(plan1)) {
        if (plan1LimitationsName == "quotas" || plan1LimitationsName == "rates") {
            for (let [plan2LimitationsName, plan2Limitations] of Object.entries(plan2)) {
                if (plan1LimitationsName == plan2LimitationsName) {
                    for (let [limitations1PathName, limitations1Path] of Object.entries(plan1Limitations)) {
                        for (let [limitations1PathMethodName, limitations1PathMethod] of Object.entries(limitations1Path)) {
                            for (let [limitations1PathMethodMetricName, limitations1PathMethodMetric] of Object.entries(limitations1PathMethod)) {
                                for (let limitations1PathMethodMetricLimit of limitations1PathMethodMetric) {
                                    for (let [limitations2PathName, limitations2Path] of Object.entries(plan2Limitations)) {
                                        for (let [limitations2PathMethodName, limitations2PathMethod] of Object.entries(limitations2Path)) {
                                            for (let [limitations2PathMethodMetricName, limitations2PathMethodMetric] of Object.entries(limitations2PathMethod)) {
                                                for (let limitations2PathMethodMetricLimit of limitations2PathMethodMetric) {
                                                    // same (path, method, metric)
                                                    if (limitations1PathName === limitations2PathName && limitations1PathMethodName === limitations2PathMethodName && limitations1PathMethodMetricName === limitations2PathMethodMetricName) {
                                                        if (plan1.pricing && plan2.pricing) {
                                                            if (!isNaN(plan1.pricing.cost) && !isNaN(plan2.pricing.cost)) {
                                                                // if PU_1 > PU_2 --> cost1 > cost2
                                                                let N1 = normalizedPeriod(limitations1PathMethodMetricLimit.period);
                                                                let N2 = normalizedPeriod(limitations2PathMethodMetricLimit.period);

                                                                let PU1 = PU(limitations1PathMethodMetricLimit);
                                                                let PU2 = PU(limitations2PathMethodMetricLimit);

                                                                let aHasMorePUThanB = (limitations1PathMethodMetricLimit.max / N1 > limitations2PathMethodMetricLimit.max / N2);
                                                                let aIsMoreExpensiveThanB = (plan1.pricing.cost >= plan2.pricing.cost);
                                                                existsCostConsistencyConflict = existsCostConsistencyConflict || aHasMorePUThanB && !aIsMoreExpensiveThanB; //FIXME: expand to multiple limits
                                                                if (existsCostConsistencyConflict) {
                                                                    logger.validationWarning(`             L4.2 COST CONSISTENCY CONFLICT in ${limitations1PathName}>${limitations1PathMethodName}>${limitations1PathMethodMetricName} ('${printLimit(limitations1PathMethodMetricLimit)}' > '${printLimit(limitations2PathMethodMetricLimit)}' AND NOT '${plan1.pricing.cost} >= ${plan2.pricing.cost}')`);
                                                                }
                                                                // if (existsCostConsistencyConflict) break firstLimitationLoop;
                                                            } else {
                                                                // logger.validation(`Cannot compare pricing in (${plan1} and ${plan2})`);
                                                            }
                                                        } else { //FIXME: simple cost is the only supported cost so far
                                                            // logger.warning(`existsCostConsistencyConflict - Cannot compare pricings in (${plan1} and ${plan2})`);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Merge conditions
    const condition = existsCostConsistencyConflict;

    if (condition) {
        // logger.validationWarning(`             L4.2 COST CONSISTENCY CONFLICT: (${plan1} and ${plan2})`);
    } else {
        // logger.validation(`             L4.2 NO COST CONSISTENCY CONFLICT: (${plan1} and ${plan2}) OK`);
    }

    return condition;

}
// ************************************* END CONFLICT DETECTION ************************************* //

// ****************************** END P1 VALIDITY DETECTION ****************************** //


// ****************************** BEGIN AUX FUNCTIONS ****************************** //
// Normalize period
function normalizedPeriod(p) {
    switch (capacity.period.unit) {
        case "millisecond":
            logger.error("Not supported");
            break;
        case "second":
            switch (p.unit) {
                case "millisecond":
                    return capacity.period.amount / 1000;
                case "second":
                    return capacity.period.amount;
                case "minute":
                    return capacity.period.amount * 60;
                case "hour":
                    return (capacity.period.amount * 60 * 60);
                case "day":
                    return (capacity.period.amount * 60 * 60 * 24);
                case "week":
                    return (capacity.period.amount * 60 * 60 * 24 * 7);
                case "month":
                    return (capacity.period.amount * 60 * 60 * 24 * 7 * 4);
                case "year":
                    return (capacity.period.amount * 60 * 60 * 24 * 7 * 4 * 12);
                case "decade":
                    return (capacity.period.amount * 60 * 60 * 24 * 7 * 4 * 12 * 10);
                case "century":
                    return (capacity.period.amount * 60 * 60 * 24 * 7 * 4 * 12 * 10 * 10);
                case "forever":
                    return Infinity;
                default:
                    logger.error("Not supported");
                    break;
            }
        case "minute":
            logger.error("Not supported");
            break;
        case "hour":
            logger.error("Not supported");
            break;
        case "day":
            logger.error("Not supported");
            break;
        case "week":
            logger.error("Not supported");
            break;
        case "month":
            logger.error("Not supported");
            break;
        case "year":
            logger.error("Not supported");
            break;
        case "decade":
            logger.error("Not supported");
            break;
        case "century":
            logger.error("Not supported");
            break;
        case "forever":
            logger.error("Not supported");
            break;
        default:
            logger.error("Not supported");
            break;
    }
}

// ercentage of Usage
function PU(limit) {
    return limit.max / capacity.max;
}

function printLimitatation(limitation) {
    let i = 0;
    let res = "";
    limitation.forEach(limit => {
        res += `l${i}=${printLimit(limit)}; `;
        i++;
    });
    return res;
}

function printLimit(limit) {
    return `${limit.max} per ${limit.period.amount}/${limit.period.unit}`;
}
// ****************************** END AUX FUNCTIONS ****************************** //



module.exports = {
    isValid: isValid_pricing,
};
