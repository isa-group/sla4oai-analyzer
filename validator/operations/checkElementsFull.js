
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-fallthrough */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */

const config = require("./../configurations");
const logger = config.logger;

function list_properties(pricing) {
    logger.validationWarning("-- BEGIN VERBOSE LIST OF PROPERTIES --");
    // context: Context
    // infrastructure: Infrastructure
    // pricing?: Pricing
    // metrics: Metrics
    // plans?: Plans
    // quotas?: Quotas
    // rates?: Rates
    // guarantees?: Guarantees
    // configuration?: Configuration
    // availability?: string
    if (checkProperty(pricing, "context", "root/context")) {
        // id: string
        // sla: string
        // api: string
        // type: "plans" | "instance"
        // provider?: string
        // consumer?: string
        // validity?: Validity
        checkProperty(pricing.context, "id", "root/context/id");
        checkProperty(pricing.context, "sla", "root/context/sla");
        checkProperty(pricing.context, "api", "root/context/api");
        checkProperty(pricing.context, "type", "root/context/type");
        checkProperty(pricing.context, "provider", "root/context/provider");
        checkProperty(pricing.context, "consumer", "root/context/consumer");
        if (checkProperty(pricing.context, "validity", "root/context/validity")) {
            // effectiveDate: string
            // expirationDate ?: string
            checkProperty(pricing.context.validity, "effectiveDate", "root/context/validity/effectiveDate");
            checkProperty(pricing.context.validity, "expirationDate", "root/context/validity/expirationDate");
        }
    }
    if (checkProperty(pricing, "infrastructure", "root/infrastructure")) {
        // supervisor: string
        // monitor: string
        // [x: string]: string
        checkProperty(pricing.infrastructure, "supervisor", "root/infrastructure/supervisor");
        checkProperty(pricing.infrastructure, "monitor", "root/infrastructure/monitor");
        logger.validationWarning(`-- HAS ${Object.keys(pricing.infrastructure).filter(elem => { return ["supervisor,monitor"].includes(elem); }).length} THAN TWO INFRASTRUCTURE ENDPOINTS`);
    }
    if (checkProperty(pricing, "pricing", "root/pricing")) {
        // cost?: number | Cost | "custom"
        // currency?: string
        // billing?: "onepay" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
        // period?: Period
        if (checkProperty(pricing.pricing, "cost", "root/pricing/cost")) {
            // operation?: OperationCost
            // overage?: OverageCost
            logger.validationWarning(`-- HAS ${pricing.pricing.cost} COST`);
            if (checkProperty(pricing.pricing.cost, "operation", "root/pricing/cost/operation")) {
                // volume: number
                // cost: number
                checkProperty(pricing.pricing.cost.operation, "volume", "root/pricing/cost/operation/volume");
                checkProperty(pricing.pricing.cost.operation, "cost", "root/pricing/cost/operation/cost");
            }
            if (checkProperty(pricing.pricing.cost, "overage", "root/pricing/cost/overage")) {
                // excess: number
                // cost: number
                checkProperty(pricing.pricing.cost.overage, "excess", "root/pricing/cost/overage/excess");
                checkProperty(pricing.pricing.cost.overage, "cost", "root/pricing/cost/overage/cost");
            }
        }
        checkProperty(pricing.pricing, "currency", "root/pricing/currency");
        checkProperty(pricing.pricing, "billing", "root/pricing/billing");
        if (checkProperty(pricing.pricing, "period", "root/pricing/period")) {
            // amount: number
            // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
            checkProperty(pricing.pricing.period, "amount", "root/pricing/period/amount");
            checkProperty(pricing.pricing.period, "unit", "root/pricing/period/unit");
        }
    }
    if (checkProperty(pricing, "metrics", "root/metrics")) {
        logger.validationWarning(`-- HAS ${Object.keys(pricing.metrics).length} METRICS`);
        for (let [metricName, metric] of Object.entries(pricing.metrics)) {
            // type?: "integer" | "number" | "string" | "boolean"
            // format?: "int32" | "int64" | "float" | "double" | "string" | "byte" | "binary" | "date" | "date-time"
            // description?: string
            // unit?: string
            // resolution?: "check" | "consumption"
            // relatedMetrics?: Metric[]
            logger.validationWarning(`-- BEGIN ${metricName}`);
            checkProperty(pricing.metrics[metricName], "type", `root/metrics/${metricName}/type`);
            checkProperty(pricing.metrics[metricName], "format", `root/metrics/${metricName}/format`);
            checkProperty(pricing.metrics[metricName], "description", `root/metrics/${metricName}/description`);
            checkProperty(pricing.metrics[metricName], "unit", `root/metrics/${metricName}/unit`);
            checkProperty(pricing.metrics[metricName], "resolution", `root/metrics/${metricName}/resolution`);
            checkProperty(pricing.metrics[metricName], "relatedMetrics", `root/metrics/${metricName}/relatedMetrics`);
            logger.validationWarning(`-- END ${metricName}`);
        }
    }
    if (checkProperty(pricing, "plans", "root/plans")) {
        // [planName: string]: Plan
        logger.validationWarning(`-- HAS ${Object.keys(pricing.plans).length} PLANS`);
        for (let [planName, plan] of Object.entries(pricing.plans)) {
            // configuration?: Configuration
            // availability?: string
            // pricing?: Pricing
            // quotas?: Quotas
            // rates?: Rates
            // guarantees?: Guarantees
            logger.validationWarning(`-- BEGIN ${planName}`);
            if (checkProperty(pricing.plans[planName], "configuration", `root/plans/${planName}/configuration`)) {
                // [name: string]: string
                logger.validationWarning(`-- HAS ${Object.keys(pricing.configuration).length} CONFIGURATIONS`);
            }
            checkProperty(pricing.plans[planName], "availability", `root/plans/${planName}/availability`);
            if (checkProperty(pricing.plans[planName], "pricing", `root/plans/${planName}/pricing`)) {
                // cost?: number | Cost | "custom"
                // currency?: string
                // billing?: "onepay" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
                // period?: Period
                if (checkProperty(pricing.plans[planName].pricing, "cost", `root/plans/${planName}/pricing/cost`)) {
                    // operation?: OperationCost
                    // overage?: OverageCost
                    logger.validationWarning(`-- HAS ${pricing.plans[planName].pricing} COST`);
                    if (checkProperty(pricing.plans[planName].pricing, "operation", `root/plans/${planName}/pricing/cost/operation`)) {
                        // volume: number
                        // cost: number
                        checkProperty(pricing.plans[planName].pricing.operation, "volume", `root/plans/${planName}/pricing/cost/operation/volume`);
                        checkProperty(pricing.plans[planName].pricing.operation, "cost", `root/plans/${planName}/pricing/cost/operation/cost`);
                    }
                    if (checkProperty(pricing.plans[planName].pricing, "overage", `root/plans/${planName}/pricing/cost/overage`)) {
                        // excess: number
                        // cost: number
                        checkProperty(pricing.plans[planName].pricing.overage, "excess", `root/plans/${planName}/pricing/cost/overage/excess`);
                        checkProperty(pricing.plans[planName].pricing.overage, "cost", `root/plans/${planName}/pricing/cost/overage/cost`);
                    }
                }
                checkProperty(pricing.plans[planName].pricing, "currency", `root/plans/${planName}/pricing/currency`);
                checkProperty(pricing.plans[planName].pricing, "billing", `root/plans/${planName}/pricing/billing`);
                if (checkProperty(pricing.plans[planName].pricing, "period", `root/plans/${planName}/pricing/period`)) {
                    // amount: number
                    // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                    checkProperty(pricing.plans[planName].pricing.period, "amount", `root/plans/${planName}/pricing/period/amount`);
                    checkProperty(pricing.plans[planName].pricing.period, "unit", `root/plans/${planName}/pricing/period/unit`);
                }
            }
            if (checkProperty(pricing.plans[planName], "quotas", `root/plans/${planName}/quotas`)) {
                // [pathName: string]: Path
                logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].quotas).length} QUOTA PATHS`);
                for (let [pathName, path] of Object.entries(pricing.plans[planName].quotas)) {
                    logger.validationWarning(`-- BEGIN ${pathName}`);
                    // [methodName: string]: Operation
                    logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].quotas[pathName]).length} QUOTA METHODS`);
                    for (let [methodName, method] of Object.entries(pricing.plans[planName].quotas[pathName])) {
                        logger.validationWarning(`-- BEGIN ${methodName}`);
                        // [metricName: string]: Limit[]
                        logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].quotas[pathName][methodName]).length} QUOTA METRICS`);
                        for (let [metricName, limits] of Object.entries(pricing.plans[planName].quotas[pathName][methodName])) {
                            logger.validationWarning(`-- BEGIN ${metricName}`);
                            // [metricName: string]: Limit[]
                            logger.validationWarning(`-- HAS ${pricing.plans[planName].quotas[pathName][methodName][metricName].length} QUOTA LIMITS`);
                            for (let i in pricing.plans[planName].quotas[pathName][methodName][metricName]) {
                                logger.validationWarning(`-- BEGIN ${i}`);
                                // max: number | "unlimited"
                                // period?: Period
                                // scope?: string
                                // cost?: number | Cost
                                checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i], "max", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/max`);
                                if (checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i], "period", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/period`)) {
                                    // amount: number
                                    // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                                    checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].period, "amount", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/period/amount`);
                                    checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].period, "unit", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/period/unit`);
                                }
                                checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i], "scope", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/scope`);
                                if (checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i], "cost", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost`)) {
                                    // operation ?: OperationCost
                                    // overage?: OverageCost
                                    logger.validationWarning(`-- HAS ${pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost} COST`);
                                    if (checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost, "operation", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/operation`)) {
                                        // volume: number
                                        // cost: number
                                        checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost.operation, "volume", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/operation/volume`);
                                        checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost.operation, "cost", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/operation/cost`);
                                    }
                                    if (checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost, "overage", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/overage`)) {
                                        // excess: number
                                        // cost: number
                                        checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost.overage, "excess", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/overage/excess`);
                                        checkProperty(pricing.plans[planName].quotas[pathName][methodName][metricName][i].cost.overage, "cost", `root/plans/${planName}/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/overage/cost`);
                                    }
                                }
                                logger.validationWarning(`-- END ${i}`);
                            }
                            logger.validationWarning(`-- END ${metricName}`);
                        }
                        logger.validationWarning(`-- END ${methodName}`);
                    }
                    logger.validationWarning(`-- END ${pathName}`);
                }
            }
            if (checkProperty(pricing.plans[planName], "rates", `root/plans/${planName}/rates`)) {
                // [pathName: string]: Path
                logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].rates).length} RATE PATHS`);
                for (let [pathName, path] of Object.entries(pricing.plans[planName].rates)) {
                    logger.validationWarning(`-- BEGIN ${pathName}`);
                    // [methodName: string]: Operation
                    logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].rates[pathName]).length} RATE METHODS`);
                    for (let [methodName, method] of Object.entries(pricing.plans[planName].rates[pathName])) {
                        logger.validationWarning(`-- BEGIN ${methodName}`);
                        // [metricName: string]: Limit[]
                        logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].rates[pathName][methodName]).length} RATE METRICS`);
                        for (let [metricName, limits] of Object.entries(pricing.plans[planName].rates[pathName][methodName])) {
                            logger.validationWarning(`-- BEGIN ${metricName}`);
                            // [metricName: string]: Limit[]
                            logger.validationWarning(`-- HAS ${pricing.plans[planName].rates[pathName][methodName][metricName].length} RATE LIMITS`);
                            for (let i in pricing.plans[planName].rates[pathName][methodName][metricName]) {
                                logger.validationWarning(`-- BEGIN ${i}`);
                                // max: number | "unlimited"
                                // period?: Period
                                // scope?: string
                                // cost?: number | Cost
                                checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i], "max", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/max`);
                                if (checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i], "period", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/period`)) {
                                    // amount: number
                                    // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                                    checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].period, "amount", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/period/amount`);
                                    checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].period, "unit", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/period/unit`);
                                }
                                checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i], "scope", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/scope`);
                                if (checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i], "cost", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost`)) {
                                    // operation ?: OperationCost
                                    // overage?: OverageCost
                                    logger.validationWarning(`-- HAS ${pricing.plans[planName].rates[pathName][methodName][metricName][i].cost} COST`);
                                    if (checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].cost, "operation", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost/operation`)) {
                                        // volume: number
                                        // cost: number
                                        checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].cost.operation, "volume", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost/operation/volume`);
                                        checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].cost.operation, "cost", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost/operation/cost`);
                                    }
                                    if (checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].cost, "overage", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost/overage`)) {
                                        // excess: number
                                        // cost: number
                                        checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].cost.overage, "excess", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost/overage/excess`);
                                        checkProperty(pricing.plans[planName].rates[pathName][methodName][metricName][i].cost.overage, "cost", `root/plans/${planName}/rates/${pathName}/${methodName}/${metricName}/${i}/cost/overage/cost`);
                                    }
                                }
                                logger.validationWarning(`-- END ${i}`);
                            }
                            logger.validationWarning(`-- END ${metricName}`);
                        }
                        logger.validationWarning(`-- END ${methodName}`);
                    }
                    logger.validationWarning(`-- END ${pathName}`);
                }
            }
            if (checkProperty(pricing.plans[planName], "guarantees", `root/plans/${planName}/guarantees`)) {
                // [pathName: string]: Guarantee
                logger.validationWarning(`-- HAS ${Object.keys(pricing.plans[planName].guarantees).length} GUARANTEES`);
                for (let [guaranteeName, guarantee] of Object.entries(pricing.plans[planName].guarantees)) {
                    // [methodName: string]: GuaranteeObjective[]
                    logger.validationWarning(`-- BEGIN ${guaranteeName}`);
                    for (let i in pricing.plans[planName].guarantees[guaranteeName]) {
                        // objective: string
                        // period ?: Period
                        // window ?: "dynamic" | "static"
                        // scope ?: string
                        logger.validationWarning(`-- BEGIN ${i}`);
                        checkProperty(pricing.plans[planName].guarantees[guaranteeName], "objective", `root/plans/${planName}/guarantees/${guaranteeName}/${i}/objective`);
                        if (checkProperty(pricing.plans[planName].guarantees[guaranteeName], "period", `root/plans/${planName}/guarantees/${guaranteeName}/${i}/period`)) {
                            // amount: number
                            // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                            checkProperty(pricing.plans[planName].guarantees[guaranteeName].period, "amount", `root/plans/${planName}/guarantees/${guaranteeName}/${i}/period/amount`);
                            checkProperty(pricing.plans[planName].guarantees[guaranteeName].period, "unit", `root/plans/${planName}/guarantees/${guaranteeName}/${i}/period/unit`);
                        }
                        checkProperty(pricing.plans[planName].guarantees[guaranteeName], "window", `root/plans/${planName}/guarantees/${guaranteeName}/${i}/window`);
                        checkProperty(pricing.plans[planName].guarantees[guaranteeName], "scope", `root/plans/${planName}/guarantees/${guaranteeName}/${i}/scope`);
                        logger.validationWarning(`-- END ${i}`);
                    }
                    logger.validationWarning(`-- END ${guaranteeName}`);
                }
            }
            logger.validationWarning(`-- END ${planName}`);
        }
        if (checkProperty(pricing, "quotas", "root/quotas")) {
            // [pathName: string]: Path
            logger.validationWarning(`-- HAS ${Object.keys(pricing.quotas).length} QUOTA PATHS`);
            for (let [pathName, path] of Object.entries(pricing.quotas)) {
                logger.validationWarning(`-- BEGIN ${pathName}`);
                // [methodName: string]: Operation
                logger.validationWarning(`-- HAS ${Object.keys(pricing.quotas[pathName]).length} QUOTA METHODS`);
                for (let [methodName, method] of Object.entries(pricing.quotas[pathName])) {
                    logger.validationWarning(`-- BEGIN ${methodName}`);
                    // [metricName: string]: Limit[]
                    logger.validationWarning(`-- HAS ${Object.keys(pricing.quotas[pathName][methodName]).length} QUOTA METRICS`);
                    for (let [metricName, limits] of Object.entries(pricing.quotas[pathName][methodName])) {
                        logger.validationWarning(`-- BEGIN ${metricName}`);
                        // [metricName: string]: Limit[]
                        logger.validationWarning(`-- HAS ${pricing.quotas[pathName][methodName][metricName].length} QUOTA LIMITS`);
                        for (let i in pricing.quotas[pathName][methodName][metricName]) {
                            logger.validationWarning(`-- BEGIN ${i}`);
                            // max: number | "unlimited"
                            // period?: Period
                            // scope?: string
                            // cost?: number | Cost
                            checkProperty(pricing.quotas[pathName][methodName][metricName][i], "max", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/max`);
                            if (checkProperty(pricing.quotas[pathName][methodName][metricName][i], "period", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/period`)) {
                                // amount: number
                                // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                                checkProperty(pricing.quotas[pathName][methodName][metricName][i].period, "amount", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/period/amount`);
                                checkProperty(pricing.quotas[pathName][methodName][metricName][i].period, "unit", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/period/unit`);
                            }
                            checkProperty(pricing.quotas[pathName][methodName][metricName][i], "scope", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/scope`);
                            if (checkProperty(pricing.quotas[pathName][methodName][metricName][i], "cost", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost`)) {
                                // operation ?: OperationCost
                                // overage?: OverageCost
                                logger.validationWarning(`-- HAS ${pricing.quotas[pathName][methodName][metricName][i].cost} COST`);
                                if (checkProperty(pricing.quotas[pathName][methodName][metricName][i].cost, "operation", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/operation`)) {
                                    // volume: number
                                    // cost: number
                                    checkProperty(pricing.quotas[pathName][methodName][metricName][i].cost.operation, "volume", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/operation/volume`);
                                    checkProperty(pricing.quotas[pathName][methodName][metricName][i].cost.operation, "cost", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/operation/cost`);
                                }
                                if (checkProperty(pricing.quotas[pathName][methodName][metricName][i].cost, "overage", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/overage`)) {
                                    // excess: number
                                    // cost: number
                                    checkProperty(pricing.quotas[pathName][methodName][metricName][i].cost.overage, "excess", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/overage/excess`);
                                    checkProperty(pricing.quotas[pathName][methodName][metricName][i].cost.overage, "cost", `root/quotas/${pathName}/${methodName}/${metricName}/${i}/cost/overage/cost`);
                                }
                            }
                            logger.validationWarning(`-- END ${i}`);
                        }
                        logger.validationWarning(`-- END ${metricName}`);
                    }
                    logger.validationWarning(`-- END ${methodName}`);
                }
                logger.validationWarning(`-- END ${pathName}`);
            }
        }
    }
    if (checkProperty(pricing, "rates", "root/rates")) {
        // [pathName: string]: Path
        logger.validationWarning(`-- HAS ${Object.keys(pricing.rates).length} RATE PATHS`);
        for (let [pathName, path] of Object.entries(pricing.rates)) {
            logger.validationWarning(`-- BEGIN ${pathName}`);
            // [methodName: string]: Operation
            logger.validationWarning(`-- HAS ${Object.keys(pricing.rates[pathName]).length} RATE METHODS`);
            for (let [methodName, method] of Object.entries(pricing.rates[pathName])) {
                logger.validationWarning(`-- BEGIN ${methodName}`);
                // [metricName: string]: Limit[]
                logger.validationWarning(`-- HAS ${Object.keys(pricing.rates[pathName][methodName]).length} RATE METRICS`);
                for (let [metricName, limits] of Object.entries(pricing.rates[pathName][methodName])) {
                    logger.validationWarning(`-- BEGIN ${metricName}`);
                    // [metricName: string]: Limit[]
                    logger.validationWarning(`-- HAS ${pricing.rates[pathName][methodName][metricName].length} RATE LIMITS`);
                    for (let i in pricing.rates[pathName][methodName][metricName]) {
                        logger.validationWarning(`-- BEGIN ${i}`);
                        // max: number | "unlimited"
                        // period?: Period
                        // scope?: string
                        // cost?: number | Cost
                        checkProperty(pricing.rates[pathName][methodName][metricName][i], "max", `root/rates/${pathName}/${methodName}/${metricName}/${i}/max`);
                        if (checkProperty(pricing.rates[pathName][methodName][metricName][i], "period", `root/rates/${pathName}/${methodName}/${metricName}/${i}/period`)) {
                            // amount: number
                            // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                            checkProperty(pricing.rates[pathName][methodName][metricName][i].period, "amount", `root/rates/${pathName}/${methodName}/${metricName}/${i}/period/amount`);
                            checkProperty(pricing.rates[pathName][methodName][metricName][i].period, "unit", `root/rates/${pathName}/${methodName}/${metricName}/${i}/period/unit`);
                        }
                        checkProperty(pricing.rates[pathName][methodName][metricName][i], "scope", `root/rates/${pathName}/${methodName}/${metricName}/${i}/scope`);
                        if (checkProperty(pricing.rates[pathName][methodName][metricName][i], "cost", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost`)) {
                            // operation ?: OperationCost
                            // overage?: OverageCost
                            logger.validationWarning(`-- HAS ${pricing.rates[pathName][methodName][metricName][i].cost} COST`);
                            if (checkProperty(pricing.rates[pathName][methodName][metricName][i].cost, "operation", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost/operation`)) {
                                // volume: number
                                // cost: number
                                checkProperty(pricing.rates[pathName][methodName][metricName][i].cost.operation, "volume", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost/operation/volume`);
                                checkProperty(pricing.rates[pathName][methodName][metricName][i].cost.operation, "cost", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost/operation/cost`);
                            }
                            if (checkProperty(pricing.rates[pathName][methodName][metricName][i].cost, "overage", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost/overage`)) {
                                // excess: number
                                // cost: number
                                checkProperty(pricing.rates[pathName][methodName][metricName][i].cost.overage, "excess", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost/overage/excess`);
                                checkProperty(pricing.rates[pathName][methodName][metricName][i].cost.overage, "cost", `root/rates/${pathName}/${methodName}/${metricName}/${i}/cost/overage/cost`);
                            }
                        }
                        logger.validationWarning(`-- END ${i}`);
                    }
                    logger.validationWarning(`-- END ${metricName}`);
                }
                logger.validationWarning(`-- END ${methodName}`);
            }
            logger.validationWarning(`-- END ${pathName}`);
        }
    }
    if (checkProperty(pricing, "guarantees", "root/guarantees")) {
        // [pathName: string]: Guarantee
        logger.validationWarning(`-- HAS ${Object.keys(pricing.guarantees).length} GUARANTEES`);
        for (let [guaranteeName, guarantee] of Object.entries(pricing.guarantees)) {
            // [methodName: string]: GuaranteeObjective[]
            logger.validationWarning(`-- BEGIN ${guaranteeName}`);
            for (let i in pricing.guarantees[guaranteeName]) {
                // objective: string
                // period ?: Period
                // window ?: "dynamic" | "static"
                // scope ?: string
                logger.validationWarning(`-- BEGIN ${i}`);
                checkProperty(pricing.guarantees[guaranteeName], "objective", `root/guarantees/${guaranteeName}/${i}/objective`);
                if (checkProperty(pricing.guarantees[guaranteeName], "period", `root/guarantees/${guaranteeName}/${i}/period`)) {
                    // amount: number
                    // unit: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
                    checkProperty(pricing.guarantees[guaranteeName].period, "amount", `root/guarantees/${guaranteeName}/${i}/period/amount`);
                    checkProperty(pricing.guarantees[guaranteeName].period, "unit", `root/guarantees/${guaranteeName}/${i}/period/unit`);
                }
                checkProperty(pricing.guarantees[guaranteeName], "window", `root/guarantees/${guaranteeName}/${i}/window`);
                checkProperty(pricing.guarantees[guaranteeName], "scope", `root/guarantees/${guaranteeName}/${i}/scope`);
                logger.validationWarning(`-- END ${i}`);
            }
            logger.validationWarning(`-- END ${guaranteeName}`);
        }
    }
    if (checkProperty(pricing, "configuration", "root/configuration")) {
        // [name: string]: string
        logger.validationWarning(`-- HAS ${Object.keys(pricing.configuration).length} CONFIGURATIONS`);
    }
    checkProperty(pricing, "availability", "root/availability");
    
    logger.validationWarning("-- END VERBOSE LIST OF PROPERTIES --");
}

function checkProperty(obj, prop, name) {
    name = name ?? prop;
    obj.hasOwnProperty(prop) ? logger.validationWarning(`HAS '${name}'`) : logger.validationWarning(`NO '${name}'`);
    return obj.hasOwnProperty(prop);
}

module.exports = {
    listProperties: list_properties,
};