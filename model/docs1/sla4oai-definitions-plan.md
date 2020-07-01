# Plan Schema

```txt
SLA4OAI#/definitions/Plan
```

Describes a usage plan for the API with its associate costs and availability.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Plan Type

`object` ([Plan](sla4oai-definitions-plan.md))

# Plan Properties

| Property                        | Type          | Required | Nullable       | Defined by                                                                                                                     |
| :------------------------------ | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| [availability](#availability)   | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-availability.md "SLA4OAI#/definitions/Plan/properties/availability")   |
| [configuration](#configuration) | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-configuration.md "SLA4OAI#/definitions/Plan/properties/configuration") |
| [pricing](#pricing)             | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-pricing.md "SLA4OAI#/definitions/Plan/properties/pricing")             |
| [quotas](#quotas)               | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-quotas.md "SLA4OAI#/definitions/Plan/properties/quotas")               |
| [rates](#rates)                 | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-rates.md "SLA4OAI#/definitions/Plan/properties/rates")                 |

## availability

Availability of the service for this plan expressed via time slots using the ISO 8601 time intervals format.


`availability`

-   is optional
-   Type: `string` ([availability](sla4oai-definitions-plan-properties-availability.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-availability.md "SLA4OAI#/definitions/Plan/properties/availability")

### availability Type

`string` ([availability](sla4oai-definitions-plan-properties-availability.md))

### availability Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### availability Examples

```json
"2009-10-09T21:30:00.00Z"
```

## configuration

Configuration parameters for the service tailored for the plan.


`configuration`

-   is optional
-   Type: unknown ([configuration](sla4oai-definitions-plan-properties-configuration.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-configuration.md "SLA4OAI#/definitions/Plan/properties/configuration")

### configuration Type

unknown ([configuration](sla4oai-definitions-plan-properties-configuration.md))

## pricing

Specific pricing data for this plan. Overrides default pricing data defined before.


`pricing`

-   is optional
-   Type: unknown ([pricing](sla4oai-definitions-plan-properties-pricing.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-pricing.md "SLA4OAI#/definitions/Plan/properties/pricing")

### pricing Type

unknown ([pricing](sla4oai-definitions-plan-properties-pricing.md))

## quotas

Specific quotas data for this plan. Overrides default quotas data defined before.


`quotas`

-   is optional
-   Type: unknown ([quotas](sla4oai-definitions-plan-properties-quotas.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-quotas.md "SLA4OAI#/definitions/Plan/properties/quotas")

### quotas Type

unknown ([quotas](sla4oai-definitions-plan-properties-quotas.md))

## rates

Specific rates data for this plan. Overrides default rates data defined before.


`rates`

-   is optional
-   Type: unknown ([rates](sla4oai-definitions-plan-properties-rates.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-rates.md "SLA4OAI#/definitions/Plan/properties/rates")

### rates Type

unknown ([rates](sla4oai-definitions-plan-properties-rates.md))
