# Limit Schema

```txt
SLA4OAI#/definitions/Limit
```

The allowed limits of the request.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## Limit Type

`object` ([Limit](sla4oai-definitions-limit.md))

# Limit Properties

| Property          | Type          | Required | Nullable       | Defined by                                                                                                         |
| :---------------- | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------- |
| [cost](#cost)     | Merged        | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-cost.md "SLA4OAI#/definitions/Limit/properties/cost")     |
| [max](#max)       | `number`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-max.md "SLA4OAI#/definitions/Limit/properties/max")       |
| [period](#period) | Not specified | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-period.md "SLA4OAI#/definitions/Limit/properties/period") |
| [scope](#scope)   | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-scope.md "SLA4OAI#/definitions/Limit/properties/scope")   |

## cost

Cost associated to this plan. Defaults to 0 if unspecified.


`cost`

-   is optional
-   Type: merged type ([cost](sla4oai-definitions-limit-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-cost.md "SLA4OAI#/definitions/Limit/properties/cost")

### cost Type

merged type ([cost](sla4oai-definitions-limit-properties-cost.md))

any of

-   [SLA4OAI schema](sla4oai-definitions-limit-properties-cost-anyof-0.md "check type definition")
-   [Untitled number in SLA4OAI](sla4oai-definitions-limit-properties-cost-anyof-1.md "check type definition")

### cost Examples

```json
"0"
```

```json
"9.99"
```

## max

Max value that can be accepted.


`max`

-   is required
-   Type: `number` ([max](sla4oai-definitions-limit-properties-max.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-max.md "SLA4OAI#/definitions/Limit/properties/max")

### max Type

`number` ([max](sla4oai-definitions-limit-properties-max.md))

### max Constraints

**minimum**: the value of this number must greater than or equal to: `0`

### max Examples

```json
"0"
```

```json
"5000"
```

## period

The period of the limit.


`period`

-   is required
-   Type: unknown ([period](sla4oai-definitions-limit-properties-period.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-period.md "SLA4OAI#/definitions/Limit/properties/period")

### period Type

unknown ([period](sla4oai-definitions-limit-properties-period.md))

## scope

The scope of who request the service.


`scope`

-   is optional
-   Type: `string` ([scope](sla4oai-definitions-limit-properties-scope.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-scope.md "SLA4OAI#/definitions/Limit/properties/scope")

### scope Type

`string` ([scope](sla4oai-definitions-limit-properties-scope.md))

### scope Examples

```json
"account"
```

```json
"tenant"
```
