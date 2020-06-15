/* eslint-disable no-prototype-builtins */
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
        // if (everyPlanIsValid !== true) break;
    }

    // [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans, that is, a {limitation} in one plan is less restrictive than the equivalent in another {plan} but the former {plan} is cheaper than the later.
    let existsCostConsistencyConflicts = false;
    firstPlanLoop:
    for (let [plan1Name, plan1] of Object.entries(pricing.plans)) {
        for (let [plan2Name, plan2] of Object.entries(pricing.plans)) {
            if (plan1Name === plan2Name) continue;
            existsCostConsistencyConflicts = existsCostConsistencyConflicts || existsCostConsistencyConflict(plan1, plan2, plan1Name, plan2Name, pricing.pricing);
            // if (existsCostConsistencyConflicts === true) break firstPlanLoop;
        }
    }

    areMetricValid(pricing);

    // Merge conditions
    const condition = everyPlanIsValid && !existsCostConsistencyConflicts;

    if (condition !== true) {
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
        if (planLimitationsName === "quotas" || planLimitationsName === "rates") {
            for (let [limitationsPathName, limitationsPath] of Object.entries(planLimitations)) {
                for (let [limitationsPathMethodName, limitationsPathMethod] of Object.entries(limitationsPath)) {
                    for (let [limitationsPathMethodMetricName, limitationsPathMethodMetric] of Object.entries(limitationsPathMethod)) {
                        everyLimitationIsValid = everyLimitationIsValid && isValid_limitation(limitationsPathMethodMetric, planName, limitationsPathName, limitationsPathMethodName, limitationsPathMethodMetricName);
                    }
                }
            }
        }
    }
    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.
    const existsConsistencyConflicts = existsPlanConsistencyConflict(plan, planName);

    // Merge conditions
    const condition = everyLimitationIsValid && !existsConsistencyConflicts;

    if (condition !== true) {
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

    if (condition !== true) {
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
    const isNaturalNumber = limit.max >= 0 || limit.max === "unlimited";
    if (isNaturalNumber !== true) {
        logger.validationWarning(`             !isNaturalNumber in  ${planName}>${path}>${method}>${metric}`);
    }

    // [P1 L1.2] It is consistent with its associated {capacity}, that is, it does not surpases the associated {capacity}.
    const existsLimitsConsistencyConflictCapacity = existsLimitsConsistencyConflict_check(limit, capacity, planName, path, method, metric);

    const condition = isNaturalNumber && !existsLimitsConsistencyConflictCapacity;

    if (condition !== true) {
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
            if (i === j) continue;
            let limit2 = limits[j];
            existsConsistencyConflicts = existsConsistencyConflicts || existsLimitsConsistencyConflict_check(limit1, limit2, planName, path, method, metric);
            // if (existsConsistencyConflicts === true) break firstLimitLoop;
        }
    }
    return existsConsistencyConflicts;
}


function ssss(limitations1PathName, limitations2PathName, limitations1PathMethodName, limitations2PathMethodName, limitations1PathMethodMetricName, limitations2PathMethodMetricName, plan1, plan2) {

}


// [P1 L2.2] There are no {consistency conflicts} (aux function)
function existsLimitsConsistencyConflict_check(limit1, limit2, planName, path, method, metric) {

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}, that is, a possible situation allowed by one limit implies the violation of the other {limit}.
    let existsInconsistency;

    if (limit1.period && limit2.period) {

        let N1 = normalizedPeriod(limit1.period);
        let N2 = normalizedPeriod(limit2.period);

        let PU1 = PU(limit1, N1);
        let PU2 = PU(limit2, N2);


        if (PU1 !== Infinity && PU2 !== Infinity) {
            // inconsistentes si el porcentaje de utilización de la "capacidad de la limitación con periodo más largo" es menor que "el porcentaje de utilización de la capacidad del periodo más corto"
            if (N1 >= N2) {
                // logger.debug(`${PU1} => ${PU2}: ${PU1 >= PU2}`);
                existsInconsistency = PU1 > PU2;

            } else if (N1 === N2 && PU1 === PU2) {
                existsInconsistency = false;
            } else {
                // logger.debug(`${PU1} < ${PU2}: ${PU1 < PU2}`);
                existsInconsistency = PU1 < PU2;
            }
        } else {
            // logger.debug(`Skipping ${PU1} or ${PU2} due to max=unlimited`);
            existsInconsistency = false;
        }
    } else {
        existsInconsistency = false;
    }

    // Merge conditions
    const condition = existsInconsistency;

    if (condition === true) {
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
            if (i === j) continue;
            let limit2 = limits[j];
            existsAmbiguityConflicts = existsAmbiguityConflicts || existsAmbiguityConflict_check(limit1, limit2, planName, path, method, metric);
            // if (existsAmbiguityConflicts === true) break firstLimitLoop;
        }
    }

    // Merge conditions
    const condition = existsAmbiguityConflicts;
    return condition;

}

// [P1 L2.3] There are no {ambiguity conflict}} (aux function)
function existsAmbiguityConflict_check(limit1, limit2, planName, path, method, metric) {
    const condition = limit1.period.unit === limit2.period.unit;

    if (condition === true) {
        // logger.info("\x1b[31m", `Limit "${limit1.max} per ${limit1.period.amount}/${limit1.period.unit}" and "Limit ${limit2.max} per ${limit2.period.amount}/${limit2.period.unit}" are inconsistent`, "\x1b[0m");
        logger.validationWarning(`             L2.3 AMBIGUITY CONFLICT: in  ${planName}>${path}>${method}>${metric} (${printLimit(limit1)} and ${printLimit(limit2)})`);
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

    for (let [planLimitationsName1, planLimitations1] of Object.entries(plan)) {
        if (planLimitationsName1 === "quotas" || planLimitationsName1 === "rates") {
            for (let [limitationsPathName1, limitationsPath1] of Object.entries(planLimitations1)) {
                for (let [limitationsPathMethodName1, limitationsPathMethod1] of Object.entries(limitationsPath1)) {
                    for (let [limitationsPathMethodMetricName1, limitationsPathMethodMetric1] of Object.entries(limitationsPathMethod1)) {
                        for (let [limit1Name, limit1] of Object.entries(limitationsPathMethodMetric1)) {
                            for (let [planLimitationsName2, planLimitations2] of Object.entries(plan)) {
                                if (planLimitationsName2 === "quotas" || planLimitationsName2 === "rates") {
                                    for (let [limitationsPathName2, limitationsPath2] of Object.entries(planLimitations2)) {
                                        for (let [limitationsPathMethodName2, limitationsPathMethod2] of Object.entries(limitationsPath2)) {
                                            for (let [limitationsPathMethodMetricName2, limitationsPathMethodMetric2] of Object.entries(limitationsPathMethod2)) {
                                                for (let [limit2Name, limit2] of Object.entries(limitationsPathMethodMetric2)) {
                                                    if (planLimitationsName1 !== planLimitationsName2 && limitationsPathName1 === limitationsPathName2 && limitationsPathMethodName1 === limitationsPathMethodName2 && limitationsPathMethodMetricName1 === limitationsPathMethodMetricName2) {
                                                        let isLimitsConsistencyConflict = existsLimitsConsistencyConflict_check(limit1, limit2, planName, limitationsPathName2, limitationsPathMethodName2, limitationsPathMethodMetricName2);
                                                        if (isLimitsConsistencyConflict === true) {
                                                            logger.validationWarning(`                L3.2 CONSISTENCY CONFLICT in >${planName}>${planLimitationsName1}>${limitationsPathName1}>${limitationsPathMethodName1}>${limitationsPathMethodMetricName1} (${printLimit(limit1)}) AND ${planName}>${planLimitationsName2}>${limitationsPathName2}>${limitationsPathMethodName2}>${limitationsPathMethodMetricName2} (${printLimit(limit2)})`);
                                                        }
                                                        existsConsistencyConflict = existsConsistencyConflict || isLimitsConsistencyConflict;
                                                        //TODO: implement related metrics
                                                        if (limitationsPathMethodMetric2.relatedMetrics) {
                                                            logger.error("Not implemented yet");
                                                            //     for (let entry of limitationsPathMethodMetric2.relatedMetrics.entries()) {
                                                            //         logger.info(entry[0], entry[1]);
                                                            //         let cuerrentMetric1RelatedMetric = entry[0];
                                                            //         let cuerrentMetric1RelatedMetricConversionFactor = entry[1];

                                                            //         for (let j = 0; j < planLimitations2.length; j++) {
                                                            //             let currentLimitation2 = planLimitations[i];
                                                            //             let currentMetric2 = currentLimitation2.metric;
                                                            //             if (i === j || limitationsPathMethodMetricName===currentMetric2.name || cuerrentMetric1RelatedMetric.name != currentMetric2.name) continue;
                                                            //             existsConsistencyRelatedMetricsConflict = existsConsistencyRelatedMetricsConflict || existsConsistencyConflict_check(limitationsPathMethodMetricName, currentLimitation2, cuerrentMetric1RelatedMetricConversionFactor);
                                                            //             if (existsConsistencyRelatedMetricsConflict === true) {
                                                            //                 logger.validationWarning(`                L3.2 CONSISTENCY CONFLICT REL-METRICS in ${planName}>${planLimitationsName}>${limitationsPathName}>${limitationsPathMethodName}(${printLimit(limit1)} AND ${printLimit(cuerrentMetric1RelatedMetric.name)})`);
                                                            //             }
                                                            //         }
                                                            //     }
                                                            // }
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
    const condition = existsConsistencyConflict || existsConsistencyRelatedMetricsConflict;

    if (condition === true) {
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
function existsCostConsistencyConflict(plan1, plan2, plan1Name, plan2Name, pricing) {

    // [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans, that is, a {limitation} in one plan is less restrictive than the equivalent in another {plan} but the former {plan} is cheaper than the later.

    // let limitations1 = plan1.rates || [];
    // let quotas1 = plan1.quotas || [];
    // let limitations2 = plan1.rates || [];
    // let quotas2 = plan1.quotas || [];
    // let planLimitations1 = [...(Object.values(quotas1) || []), ...(Object.values(limitations1) || [])];
    // let planLimitations2 = [...(Object.values(quotas2) || []), ...(Object.values(limitations2) || [])];
    // let planPaths1 = [...(Object.values(planLimitations1) || [])];
    // let planPaths2 = [...(Object.values(planLimitations2) || [])];
    let existsCostConsistencyConflicts = false;
    firstLimitationLoop:

    for (let [plan1LimitationsName, plan1Limitations] of Object.entries(plan1)) {
        if (plan1LimitationsName === "quotas" || plan1LimitationsName === "rates") {
            for (let [plan2LimitationsName, plan2Limitations] of Object.entries(plan2)) {
                if (plan1LimitationsName === plan2LimitationsName) {
                    for (let [limitations1PathName, limitations1Path] of Object.entries(plan1Limitations)) {
                        for (let [limitations1PathMethodName, limitations1PathMethod] of Object.entries(limitations1Path)) {
                            for (let [limitations1PathMethodMetricName, limitations1PathMethodMetric] of Object.entries(limitations1PathMethod)) {
                                for (let limitations1PathMethodMetricLimit of limitations1PathMethodMetric) {
                                    let isCostConsistencyConflict_1 = false; // the conflict should exist in every limit of the limitation
                                    // let conflictText = "";
                                    for (let [limitations2PathName, limitations2Path] of Object.entries(plan2Limitations)) {
                                        for (let [limitations2PathMethodName, limitations2PathMethod] of Object.entries(limitations2Path)) {
                                            for (let [limitations2PathMethodMetricName, limitations2PathMethodMetric] of Object.entries(limitations2PathMethod)) {
                                                let isCostConsistencyConflict_2 = true; // the conflict should exist in every limit of the limitation
                                                for (let limitations2PathMethodMetricLimit of limitations2PathMethodMetric) {

                                                    // same (path, method, metric)
                                                    if (limitations1PathName === limitations2PathName && limitations1PathMethodName === limitations2PathMethodName && limitations1PathMethodMetricName === limitations2PathMethodMetricName) {
                                                        if (plan1.pricing && plan2.pricing) {
                                                            // If no cost, cost defaults to 0
                                                            plan1.pricing.cost = plan1.pricing.cost ?? 0;
                                                            plan2.pricing.cost = plan2.pricing.cost ?? 0;
                                                            if (!isNaN(plan1.pricing.cost) && !isNaN(plan2.pricing.cost)) {
                                                                if (limitations1PathMethodMetricLimit.period && limitations2PathMethodMetricLimit.period) {
                                                                    let existsCostConsistencyConflict = existsCostConsistencyConflict_check(pricing, plan1, plan2, limitations1PathMethodMetricLimit, limitations2PathMethodMetricLimit, plan1Name, plan2Name, plan1LimitationsName, limitations1PathName, limitations1PathMethodName, limitations1PathMethodMetricName);
                                                                    isCostConsistencyConflict_2 = isCostConsistencyConflict_2 && existsCostConsistencyConflict;
                                                                    isCostConsistencyConflict_1 = isCostConsistencyConflict_1 || isCostConsistencyConflict_2;
                                                                    // conflictText = `>${plan1LimitationsName}>${limitations1PathName}>${limitations1PathMethodName}>${limitations1PathMethodMetricName} ('${printLimit(limitations1PathMethodMetricLimit)}' > '${printLimit(limitations2PathMethodMetricLimit)}' AND NOT '${plan1.pricing.cost} >= ${plan2.pricing.cost}')`;
                                                                    if (isCostConsistencyConflict_1 === true && isCostConsistencyConflict_2 === true) {
                                                                        logger.validationWarning(`             L4.2 COST CONSISTENCY CONFLICT in plan '${plan1Name}'|'${plan2Name}' in >${plan1LimitationsName}>${limitations1PathName}>${limitations1PathMethodName}>${limitations1PathMethodMetricName} ('${printLimit(limitations1PathMethodMetricLimit)}' > '${printLimit(limitations2PathMethodMetricLimit)}' AND NOT '${plan1.pricing.cost} >= ${plan2.pricing.cost}')`);
                                                                    }
                                                                } else {
                                                                    continue;
                                                                    // logger.warning(`existsCostConsistencyConflict - Cannot compare non-period pricings cost in (${JSON.stringify(plan1.pricing)} and ${JSON.stringify(plan2.pricing)})`);
                                                                }
                                                            } else {
                                                                continue;
                                                                // logger.warning(`existsCostConsistencyConflict - Cannot compare NaN pricings cost in (${JSON.stringify(plan1.pricing)} and ${JSON.stringify(plan2.pricing)})`);
                                                            }
                                                        } else { //FIXME: simple cost is the only supported cost so far
                                                            // logger.warning(`existsCostConsistencyConflict - Cannot compare pricings in (${JSON.stringify(plan1.pricing)} and ${JSON.stringify(plan2.pricing)})`);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    existsCostConsistencyConflicts = existsCostConsistencyConflicts || isCostConsistencyConflict_1;
                                    // if (existsCostConsistencyConflicts === true) {
                                    //     logger.validationWarning(`             L4.2 COST CONSISTENCY CONFLICT in plan ${plan1Name}|${plan2Name} in ${conflictText}`);
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Merge conditions
    const condition = existsCostConsistencyConflicts;

    if (condition === true) {
        // logger.validationWarning(`             L4.2 COST CONSISTENCY CONFLICT: (${plan1} and ${plan2})`);
    } else {
        // logger.validation(`             L4.2 NO COST CONSISTENCY CONFLICT: (${plan1} and ${plan2}) OK`);
    }

    return condition;

}

function existsCostConsistencyConflict_check(pricing, plan1, plan2, limitations1PathMethodMetricLimit, limitations2PathMethodMetricLimit, plan1Name, plan2Name, plan1LimitationsName, limitations1PathName, limitations1PathMethodName, limitations1PathMethodMetricName) {
    for (let prop1 in pricing) {
        if (pricing.hasOwnProperty(prop1) && !plan1.pricing.hasOwnProperty(prop1)) {
            plan1.pricing[prop1] = pricing[prop1];
        }
    }
    for (let prop2 in pricing) {
        if (pricing.hasOwnProperty(prop2) && !plan2.pricing.hasOwnProperty(prop2)) {
            plan2.pricing[prop2] = pricing[prop2];
        }
    }

    if (plan1.pricing.period && plan2.pricing.period) {

        let PL1 = normalizedPeriod(plan1.pricing.period);
        let PL2 = normalizedPeriod(plan2.pricing.period);

        // if PU_1 > PU_2 --> cost1 > cost2
        let N1 = normalizedPeriod(limitations1PathMethodMetricLimit.period);
        let N2 = normalizedPeriod(limitations2PathMethodMetricLimit.period);

        let PU1 = PU(limitations1PathMethodMetricLimit, N1);
        let PU2 = PU(limitations2PathMethodMetricLimit, N2);

        let aHasMorePUThanB = PU1 > PU2;
        let aIsMoreExpensiveThanB = (plan1.pricing.cost / PL1) >= (plan2.pricing.cost / PL2);
        let isCostConsistencyConflict = aHasMorePUThanB && !aIsMoreExpensiveThanB;
        // if (isCostConsistencyConflict === true) {
        //     logger.validationWarning(`             L4.2 COST CONSISTENCY CONFLICT in plan ${plan1Name}|${plan2Name} in >${plan1LimitationsName}>${limitations1PathName}>${limitations1PathMethodName}>${limitations1PathMethodMetricName} ('${printLimit(limitations1PathMethodMetricLimit)}' > '${printLimit(limitations2PathMethodMetricLimit)}' AND NOT '${plan1.pricing.cost} >= ${plan2.pricing.cost}')`);
        // }
        return isCostConsistencyConflict;
    } else {
        logger.warning(`existsCostConsistencyConflict - Cannot compare non-period pricings (pricing should exist: global or per plan) cost in (${JSON.stringify(plan1.pricing)} and ${JSON.stringify(plan2.pricing)})`);
    }
}

// ************************************* END CONFLICT DETECTION ************************************* //

// ****************************** END P1 VALIDITY DETECTION ****************************** //


// ****************************** BEGIN AUX FUNCTIONS ****************************** //
// Normalize period
function normalizedPeriod(p) {
    switch (capacity.period.unit) {
        case "millisecond":
            logger.error("normalizedPeriod - from millisecond to whatever is not supported");
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
                    logger.error(`normalizedPeriod - from millisecond to ${p.unit} is not supported`);
                    break;
            }
        case "minute":
            logger.error("normalizedPeriod - from minute to whatever is not supported");
            break;
        case "hour":
            logger.error("normalizedPeriod - from hour to whatever is not supported");
            break;
        case "day":
            logger.error("normalizedPeriod - from day to whatever is not supported");
            break;
        case "week":
            logger.error("normalizedPeriod - from week to whatever is not supported");
            break;
        case "month":
            logger.error("normalizedPeriod - from month to whatever is not supported");
            break;
        case "year":
            logger.error("normalizedPeriod - from year to whatever is not supported");
            break;
        case "decade":
            logger.error("normalizedPeriod - from decade to whatever is not supported");
            break;
        case "century":
            logger.error("normalizedPeriod - from century to whatever is not supported");
            break;
        case "forever":
            logger.error("normalizedPeriod - from forever to whatever is not supported");
            break;
        default:
            logger.error(`normalizedPeriod - from ${capacity.period.unit} to whatever is not supported`);
            break;
    }
}

// percentage of Usage
function PU(limit, normalizedPeriod) {
    const limitMax = !isNaN(limit.max) ? limit.max : Infinity;
    if (normalizedPeriod) {
        return limitMax / normalizedPeriod;
    } else if (capacity.max) {
        return limitMax / capacity.max;
    } else {
        logger.error("Cannot calculate PU, missing capacity or normalized period");
        return null;
    }
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
    if (limit.max >= 0 && limit.period && limit.period.amount >= 0 && limit.period.unit) {
        return `${limit.max} per ${limit.period.amount}/${limit.period.unit}`;
    } else if (limit.max >= 0 && !limit.period) {
        return `${limit.max} per request (no period)`;
    } else {
        return `Non formateable limit: ${JSON.stringify(limit)}`;
    }
}

function areMetricValid(pricing) {

    const metricNames = Object.keys(pricing.metrics);
    let hasUndefinedMetrics = false;

    for (let [metricName, metric] of Object.entries(pricing.metrics)) {
        let isUsed = false;
        for (let [planName, plan] of Object.entries(pricing.plans)) {
            for (let [planLimitationsName, planLimitations] of Object.entries(plan)) {
                if (planLimitationsName === "quotas" || planLimitationsName === "rates") {
                    for (let [limitationsPathName, limitationsPath] of Object.entries(planLimitations)) {
                        for (let [limitationsPathMethodName, limitationsPathMethod] of Object.entries(limitationsPath)) {
                            for (let [limitationsPathMethodMetricName, limitationsPathMethodMetric] of Object.entries(limitationsPathMethod)) {
                                isUsed = isUsed || limitationsPathMethodMetricName === metricName;
                                let isUndefinedMetric = !metricNames.includes(limitationsPathMethodMetricName);
                                if (isUndefinedMetric === true) {
                                    logger.validationWarning(`  UNDEFINED METRIC ${limitationsPathMethodMetricName} in ${planName}>${limitationsPathName}>${limitationsPathMethodName}>${limitationsPathMethodMetricName} `);
                                }
                                hasUndefinedMetrics = hasUndefinedMetrics || isUndefinedMetric;
                            }
                        }
                    }
                }
            }
        }
        if (isUsed !== true) {
            logger.validationWarning(`  UNUSED METRIC '${metricName}'`);
        }
    }
}


// ****************************** END AUX FUNCTIONS ****************************** //

module.exports = {
    isValid: isValid_pricing,
};

