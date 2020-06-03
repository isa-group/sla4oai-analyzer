# README

## Top-level Schemas

-   [SLA4OAI object in SLA4OAI](./sla4oai.md "SLA4OAI root schema") – `-`

## Other Schemas

### Objects

-   [Configuration](./sla4oai-definitions-configuration.md "Define the default configurations, later each plan can be override it") – `SLA4OAI#/definitions/Configuration`
-   [Context](./sla4oai-definitions-context.md "Holds the main information of the SLA context") – `SLA4OAI#/definitions/Context`
-   [Cost](./sla4oai-definitions-cost.md "Cost associated to this plan") – `SLA4OAI#/definitions/Cost`
-   [Guarantee](./sla4oai-definitions-guarantee.md "Describes a guarantee level supported by the plan") – `SLA4OAI#/definitions/Guarantee`
-   [GuaranteeObjective](./sla4oai-definitions-guaranteeobjective.md "An object describes the guarantee level") – `SLA4OAI#/definitions/GuaranteeObjective`
-   [Guarantees](./sla4oai-definitions-guarantees.md "Global guarantees, these are the default guarantees, but they could be overridden by each plan later") – `SLA4OAI#/definitions/Guarantees`
-   [Infrastructure](./sla4oai-definitions-infrastructure.md "Provides information about tooling used for SLA storage, calculation, governance, etc") – `SLA4OAI#/definitions/Infrastructure`
-   [Limit](./sla4oai-definitions-limit.md "The allowed limits of the request") – `SLA4OAI#/definitions/Limit`
-   [Metric](./sla4oai-definitions-metric.md "Definitions of metrics with name, types and descriptions") – `SLA4OAI#/definitions/Metric`
-   [Metrics](./sla4oai-definitions-metrics.md "A list of metrics to use in the context of the SLA") – `SLA4OAI#/definitions/Metrics`
-   [Operation](./sla4oai-definitions-operation.md "The operations attached to this path") – `SLA4OAI#/definitions/Operation`
-   [OperationCost](./sla4oai-definitions-operationcost.md "The operation cost") – `SLA4OAI#/definitions/OperationCost`
-   [OverageCost](./sla4oai-definitions-overagecost.md "The overage cost") – `SLA4OAI#/definitions/OverageCost`
-   [Path](./sla4oai-definitions-path.md "Describes the API endpoint path quota or rate configurations") – `SLA4OAI#/definitions/Path`
-   [Period](./sla4oai-definitions-period.md "The period of the limit") – `SLA4OAI#/definitions/Period`
-   [Plan](./sla4oai-definitions-plan.md "Describes a usage plan for the API with its associate costs, availability and guarantees") – `SLA4OAI#/definitions/Plan`
-   [Plans](./sla4oai-definitions-plans.md "A set of plans to define different service levels per plan") – `SLA4OAI#/definitions/Plans`
-   [Pricing](./sla4oai-definitions-pricing.md "Global pricing data") – `SLA4OAI#/definitions/Pricing`
-   [Quotas](./sla4oai-definitions-quotas.md "Global quotas, these are the default quotas, but they could be overridden by each plan later") – `SLA4OAI#/definitions/Quotas`
-   [Rates](./sla4oai-definitions-rates.md "Global rates, these are the default rates, but they could be overridden by each plan later") – `SLA4OAI#/definitions/Rates`
-   [Validity](./sla4oai-definitions-validity.md "Availability of the service") – `SLA4OAI#/definitions/Validity`

### Arrays

-   [Guarantee array in Guarantee](./sla4oai-definitions-guarantee-additionalproperties.md) – `SLA4OAI#/definitions/Guarantee/additionalProperties`
-   [Operation array in Operation](./sla4oai-definitions-operation-additionalproperties.md) – `SLA4OAI#/definitions/Operation/additionalProperties`
-   [relatedMetrics array in Metric](./sla4oai-definitions-metric-properties-relatedmetrics.md "Related metrics") – `SLA4OAI#/definitions/Metric/properties/relatedMetrics`

## Version Note

The schemas linked above follow the JSON Schema Spec version: `http://json-schema.org/draft-07/schema#`
