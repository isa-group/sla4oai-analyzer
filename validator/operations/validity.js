/* eslint disable no fallthrough */
/* eslint disable indent */
/* eslint disable no unused vars */

var config = require("./../configurations");
const logger = config.logger;

// ****************************** BEGIN P1 VALIDITY DETECTION ****************************** //
var capacity = { "max": 1000000, "period": { "amount": 1, "unit": "second" } };

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
    for (let i = 0; i < pricing.plans.length; i++) {
        let plan1 = pricing.plans[i];
        for (let j = 0; j < pricing.plans.length; j++) {
            if (i == j) continue;
            let plan2 = pricing.plans[j];
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

    return 
    ;
}

// P1   [L3   Valid plan] A {plan} is valid if: 
function isValid_plan(plan, planName) {
    logger.validation(`     CHECKING PLAN VALIDITY (${planName})...`);

    // [P1 L3.1] All its {limitations} are valid.
    const everyLimitationIsValid = [plan.rates || [], plan.quotas || []].every(path =>
        Object.values(path).every(method =>
            Object.values(method).every(metric =>
                Object.values(metric).every(limitation =>
                    isValid_limitation(limitation, path, method, metric)
                ))));

    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.
    const existsConsistencyConflicts = existsPlanConsistencyConflict(plan);

    // Merge conditions
    const condition = everyLimitationIsValid && !existsConsistencyConflicts;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_plan", condition, "\x1b[0m");
        // logger.info(`In isValid_plan: ${condition}\n    everyLimitationIsValid=${everyLimitationIsValid} && !existsConsistencyConflicts=${!existsConsistencyConflicts}`);
        logger.validationWarning(`       NOK PLAN VALIDITY (${planName}) NOK`);
        logger.validationWarning(`         everyLimitationIsValid=${everyLimitationIsValid}`);
        logger.validationWarning(`         !existsConsistencyConflicts=${!existsConsistencyConflicts}`);
    } else {
        logger.validation(`       PLAN VALIDITY (${planName}) OK`);
    }

    return condition;
}

// P1   [L2   Valid limitation] A {limitation} is valid if: 
function isValid_limitation(limitation, path, method, metric) {

    logger.validation(`       CHECKING LIMITATION VALIDITY (${printLimitatation(limitation)})...`);

    // [P1 L2.1] All its {limits} are valid.
    const everyLimitIsValid = limitation.every((limit) => isValid_limit(limit));

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}, that is, a possible situation allowed by one limit implies the violation of the other {limit}.
    const existsConsistencyConflicts = existsLimitsConsistencyConflict(limitation);


    // [P1 L2.3] There are no {ambiguity conflict} between any pair of its {limits}, that is, two limits use the same period.
    const existsAmbiguityConflicts = existsAmbiguityConflict(limitation);


    // Merge conditions
    const condition = everyLimitIsValid && !existsConsistencyConflicts && !existsAmbiguityConflicts;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_limitation", condition, "\x1b[0m");
        // logger.info(`In isValid_limitation: ${condition}\n    everyLimitIsValid=${everyLimitIsValid} && !existsConsistencyConflicts=${!existsConsistencyConflicts} && !existsAmbiguityConflicts=${!existsAmbiguityConflicts}`);
        logger.validationWarning(`         NOK LIMITATION VALIDITY (${printLimitatation(limitation)}) NOK`);
        logger.validationWarning(`           everyLimitIsValid=${everyLimitIsValid}`);
        logger.validationWarning(`           !existsConsistencyConflicts=${!existsConsistencyConflicts}`);
        logger.validationWarning(`           !existsAmbiguityConflicts=${!existsAmbiguityConflicts}`);
    } else {
        logger.validation(`         LIMITATION VALIDITY (${printLimitatation(limitation)}) OK`);
    }

    return condition;
}

// P1   [L1   Valid limit] A {limit} is valid if: 
function isValid_limit(limit) {

    logger.validation(`         CHECKING LIMIT VALIDITY (${printLimit(limit)})...`);
    // [P1 L1.1] Its {threshold} is a natural number.
    const isNaturalNumber = limit.max >= 0;

    // [P1 L1.2] It is consistent with its associated {capacity}, that is, it does not surpases the associated {capacity}.
    const existsLimitsConsistencyConflictCapacity = existsLimitsConsistencyConflict_check(limit, capacity);

    const condition = isNaturalNumber && !existsLimitsConsistencyConflictCapacity;

    if (!condition) {
        // logger.info("\x1b[31m", "isValid_limit", condition, "\x1b[0m");
        // logger.info(`In isValid_limit: ${condition}\n    isNaturalNumber=${isNaturalNumber} && !existsLimitsConsistencyConflictCapacity=${!existsLimitsConsistencyConflictCapacity}`);
        logger.validationWarning(`           NOK LIMIT VALIDITY (${printLimit(limit)}) NOK`);
        logger.validationWarning(`             isNaturalNumber=${isNaturalNumber}`);
        logger.validationWarning(`             !existsLimitsConsistencyConflictCapacity=${!existsLimitsConsistencyConflictCapacity}`);
    } else {
        logger.validation(`           LIMIT VALIDITY (${printLimit(limit)}) OK`);
    }

    return condition;

}


// ************************************* BEGIN CONFLICT DETECTION ************************************* //


// [P1 L2.2] There are no {consistency conflicts} 
function existsLimitsConsistencyConflict(limits) {

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}
    let existsConsistencyConflicts = false;
    firstLimitLoop:
    for (let i = 0; i < limits.length; i++) {
        let limit1 = limits[i];
        for (let j = 0; j < limits.length; j++) {
            if (i == j) continue;
            let limit2 = limits[j];
            existsConsistencyConflicts = existsConsistencyConflicts || existsLimitsConsistencyConflict_check(limit1, limit2);
            // if (existsConsistencyConflicts) break firstLimitLoop;
        }
    }
    return existsConsistencyConflicts;
}

// [P1 L2.2] There are no {consistency conflicts} (aux function)
function existsLimitsConsistencyConflict_check(limit1, limit2) {

    // [P1 L2.2] There are no {consistency conflicts} between any pair of its {limits}, that is, a possible situation allowed by one limit implies the violation of the other {limit}.
    let N1 = normalizedPeriod(limit1.period);
    let N2 = normalizedPeriod(limit2.period);

    let PU1 = PU(limit1);
    let PU2 = PU(limit2);

    let existsInconsistency;

    // inconsistentes si el porcentaje de utilización de la "capacidad de la limitación con periodo más largo" es menor que "el porcentaje de utilización de la capacidad del periodo más corto"
    if (N1 > N2) {
        // logger.debug(`${PU1} => ${PU2}: ${PU1 >= PU2}`);
        existsInconsistency = PU1 > PU2;

    } else {
        // logger.debug(`${PU1} < ${PU2}: ${PU1 < PU2}`);
        existsInconsistency = PU1 < PU2;
    }


    // Merge conditions
    const condition = existsInconsistency;

    if (condition) {
        // logger.info("\x1b[31m", `Limit "${limit1.max} per ${limit1.period.amount}/${limit1.period.unit}" and "Limit ${limit2.max} per ${limit2.period.amount}/${limit2.period.unit}" are inconsistent`, "\x1b[0m");
        logger.validationWarning(`             L2.2 LIMIT CONSISTENCY CONFLICT: (${printLimit(limit1)} and ${printLimit(limit1)})`);
    } else {
        // logger.validation(`             L2.2 NO LIMIT CONSISTENCY CONFLICT (${printLimit(limit1)} and ${printLimit(limit1)}) OK`);
    }


    return existsInconsistency;
}


// [P1 L2.3] There are no {ambiguity conflict}
function existsAmbiguityConflict(limits) {

    // [P1 L2.3] There are no {ambiguity conflict} between any pair of its {limits}, that is, two limits use the same period.
    let existsAmbiguityConflicts = false;
    firstLimitLoop:
    for (let i = 0; i < limits.length; i++) {
        let limit1 = limits[i];
        for (let j = 0; j < limits.length; j++) {
            if (i == j) continue;
            let limit2 = limits[j];
            existsAmbiguityConflicts = existsAmbiguityConflicts || existsAmbiguityConflict_check(limit1, limit2);
            // if (existsAmbiguityConflicts) break firstLimitLoop;
        }
    }

    // Merge conditions
    const condition = existsAmbiguityConflicts;
    return condition;

}

// [P1 L2.3] There are no {ambiguity conflict}} (aux function)
function existsAmbiguityConflict_check(limit1, limit2) {
    const condition = limit1.period.unit == limit2.period.unit;

    if (condition) {
        // logger.info("\x1b[31m", `Limit "${limit1.max} per ${limit1.period.amount}/${limit1.period.unit}" and "Limit ${limit2.max} per ${limit2.period.amount}/${limit2.period.unit}" are inconsistent`, "\x1b[0m");
        logger.validationWarning(`             L2.3 AMBIGUITY CONFLICT: (${printLimit(limit1)} and ${printLimit(limit1)})`);
    } else {
        // logger.validation(`             L2.3 NO AMBIGUITY CONFLICT (${printLimit(limit1)} and ${printLimit(limit1)})`);
    }

    return condition;
}


// [P1   L3.2] There are no { consistency conflicts }
function existsPlanConsistencyConflict(plan) {
    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.

    //TODO: NOT YET IMPLEMENTED
    logger.warning("       related metrics are not currently supported");

    const everyLimitationIsValid = [plan.rates || [], plan.quotas || []].every(path =>
        Object.values(path).every(method =>
            Object.values(method).every(metric =>
                Object.values(metric).every(limitation =>
                    isValid_limitation(limitation, path, method, metric)
                ))));

    return everyLimitationIsValid; //Math.random() >= 0.9;

    // let rates = plan.rates || [];
    // let quotas = plan.quotas || [];
    // let planLimitations = [...(Object.values(quotas) || []), ...(Object.values(rates) || [])];
    // let planLimitations1 = [...(Object.values(planLimitations) || [])];
    // let existsConsistencyConflicts = false;
    // firstLimitationLoop:
    // for (let i = 0; i < planLimitations.length; i++) {
    //     let currentLimitation1 = planLimitations[i];
    //     let currentMetric1 = currentLimitation1.metric;
    //     let cuerrentMetric1RelatedMetrics = currentMetric1.relatedMetrics;
    //     for (let entry of cuerrentMetric1RelatedMetrics.entries()) {
    //         logger.info(entry[0], entry[1]);

    //         let cuerrentMetric1RelatedMetric = entry[0];
    //         let cuerrentMetric1RelatedMetricConversionFactor = entry[1];

    //         for (let j = 0; j < planLimitations.length; j++) {
    //             let currentLimitation2 = planLimitations[i];
    //             let currentMetric2 = currentLimitation2.metric;
    //             if (i == j || currentMetric1.name == currentMetric2.name || cuerrentMetric1RelatedMetric.name != currentMetric2.name) continue;

    //             existsConsistencyConflicts = existsConsistencyConflicts || existsConsistencyConflict_check(currentLimitation1, currentLimitation2, cuerrentMetric1RelatedMetricConversionFactor);
    //             if (existsConsistencyConflicts) break firstLimitationLoop;
    //         }
    //     }
    // }
    // return existsConsistencyConflicts;
}

// [P1   L3.2] There are no { consistency conflicts } (aux function)
function existsConsistencyConflict_check(limitation1, limitation2, conversionFactor) {
    // [P1   L3.2] There are no { consistency conflicts } between any pair of its { limitations }, that is, two { limitations } over two related { metrics } (by a certain factor) can not be met at the same time.

    const limits1 = limitation1.limits;
    const limits2 = limitation2.limits;

    //TODO: NOT YET IMPLEMENTED
    return limits1.some(limit1 => { limits2.some(limit2 => { return (((limit1.value) * (conversionFactor)) > limit2.value); }); });


}

// [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans
function existsCostConsistencyConflict(plan1, plan2) {

    // [P1 L4.2] There are no {cost consistency conflicts} between any pair of its plans, that is, a {limitation} in one plan is less restrictive than the equivalent in another {plan} but the former {plan} is cheaper than the later.

    //TODO: NOT YET IMPLEMENTED
    logger.error("existsCostConsistencyConflict NOT YET IMPLEMENTED");

    return false; //Math.random() >= 0.9;

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
                case "millisecond": capacity.period.amount / 1000;
                case "second": return capacity.period.amount;
                case "minute": return capacity.period.amount * 60;
                case "hour": return (capacity.period.amount * 60 * 60);
                case "day": return (capacity.period.amount * 60 * 60 * 24);
                case "week": return (capacity.period.amount * 60 * 60 * 24 * 7);
                case "month": return (capacity.period.amount * 60 * 60 * 24 * 7 * 4);
                case "year": return (capacity.period.amount * 60 * 60 * 24 * 7 * 4 * 12);
                case "decade": return (capacity.period.amount * 60 * 60 * 24 * 7 * 4 * 12 * 10);
                case "century": return (capacity.period.amount * 60 * 60 * 24 * 7 * 4 * 12 * 10 * 10);
                case "forever": return Infinity;
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

