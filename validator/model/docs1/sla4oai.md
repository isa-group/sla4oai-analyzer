# SLA4OAI object in SLA4OAI Schema

```txt
SLA4OAI
```

SLA4OAI root schema


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                     |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------ |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json](../../../out/SLA4OAI.schema.json "open original schema") |

## SLA4OAI object in SLA4OAI Type

`object` ([Details](sla4oai.md))

# SLA4OAI object in SLA4OAI Definitions

## Definitions group Configuration

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Configuration"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                               |
| :-------------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-configuration-additionalproperties.md "SLA4OAI#/definitions/Configuration/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-configuration-additionalproperties.md "SLA4OAI#/definitions/Configuration/additionalProperties")

#### additionalProperties Type

`string`

## Definitions group Context

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Context"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                                 |
| :-------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------- |
| [api](#api)           | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-api.md "SLA4OAI#/definitions/Context/properties/api")           |
| [consumer](#consumer) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-consumer.md "SLA4OAI#/definitions/Context/properties/consumer") |
| [id](#id)             | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-id.md "SLA4OAI#/definitions/Context/properties/id")             |
| [provider](#provider) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-provider.md "SLA4OAI#/definitions/Context/properties/provider") |
| [sla](#sla)           | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-sla.md "SLA4OAI#/definitions/Context/properties/sla")           |
| [type](#type)         | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-type.md "SLA4OAI#/definitions/Context/properties/type")         |
| [validity](#validity) | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-validity.md "SLA4OAI#/definitions/Context/properties/validity") |

### api

Indicates a URI (absolute or relative) describing the API, described in the OpenAPI format, to be instrumented.


`api`

-   is required
-   Type: `string` ([api](sla4oai-definitions-context-properties-api.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-api.md "SLA4OAI#/definitions/Context/properties/api")

#### api Type

`string` ([api](sla4oai-definitions-context-properties-api.md))

#### api Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

#### api Examples

```json
"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml"
```

### consumer

Consumer information, data about the entity that consumes the service. This field is required in case of the context type is instance.


`consumer`

-   is optional
-   Type: `string` ([consumer](sla4oai-definitions-context-properties-consumer.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-consumer.md "SLA4OAI#/definitions/Context/properties/consumer")

#### consumer Type

`string` ([consumer](sla4oai-definitions-context-properties-consumer.md))

#### consumer Examples

```json
"MyConsumer"
```

### id

The identification of the SLA context.


`id`

-   is required
-   Type: `string` ([id](sla4oai-definitions-context-properties-id.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-id.md "SLA4OAI#/definitions/Context/properties/id")

#### id Type

`string` ([id](sla4oai-definitions-context-properties-id.md))

#### id Examples

```json
"PetPlans"
```

### provider

Provider information: data about the owner/host of the API. This field is required in case of the context type is instance.


`provider`

-   is optional
-   Type: `string` ([provider](sla4oai-definitions-context-properties-provider.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-provider.md "SLA4OAI#/definitions/Context/properties/provider")

#### provider Type

`string` ([provider](sla4oai-definitions-context-properties-provider.md))

#### provider Examples

```json
"MyProvider"
```

### sla

Indicates the version of the SLA format.


`sla`

-   is required
-   Type: `string` ([sla](sla4oai-definitions-context-properties-sla.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-sla.md "SLA4OAI#/definitions/Context/properties/sla")

#### sla Type

`string` ([sla](sla4oai-definitions-context-properties-sla.md))

#### sla Constraints

**pattern**: the string must match the following regular expression: 

```regexp
(?:^\d.\d.\d$)|^(?:^\d.\d$)
```

[try pattern](https://regexr.com/?expression=(%3F%3A%5E%5Cd.%5Cd.%5Cd%24)%7C%5E(%3F%3A%5E%5Cd.%5Cd%24) "try regular expression with regexr.com")

#### sla Default Value

The default value is:

```json
"1.0"
```

#### sla Examples

```json
"1.0"
```

```json
"1.0.0"
```

### type

The type of SLA based on the Lifecycle of Agreement (plans or instance).


`type`

-   is required
-   Type: `string` ([type](sla4oai-definitions-context-properties-type.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-type.md "SLA4OAI#/definitions/Context/properties/type")

#### type Type

`string` ([type](sla4oai-definitions-context-properties-type.md))

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | ----------- |
| `"instance"` |             |
| `"plans"`    |             |

#### type Examples

```json
"plans"
```

```json
"instance"
```

### validity

Availability of the service expressed via time slots. This field is required in case of the context type is instance.


`validity`

-   is optional
-   Type: unknown ([validity](sla4oai-definitions-context-properties-validity.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-validity.md "SLA4OAI#/definitions/Context/properties/validity")

#### validity Type

unknown ([validity](sla4oai-definitions-context-properties-validity.md))

## Definitions group Cost

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Cost"}
```

| Property                  | Type          | Required | Nullable       | Defined by                                                                                                               |
| :------------------------ | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------- |
| [calculated](#calculated) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-cost-properties-calculated.md "SLA4OAI#/definitions/Cost/properties/calculated") |
| [operation](#operation)   | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-cost-properties-operation.md "SLA4OAI#/definitions/Cost/properties/operation")   |
| [overage](#overage)       | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-cost-properties-overage.md "SLA4OAI#/definitions/Cost/properties/overage")       |

### calculated

Calculated cost


`calculated`

-   is optional
-   Type: `string` ([calculated](sla4oai-definitions-cost-properties-calculated.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-cost-properties-calculated.md "SLA4OAI#/definitions/Cost/properties/calculated")

#### calculated Type

`string` ([calculated](sla4oai-definitions-cost-properties-calculated.md))

### operation

The operation cost


`operation`

-   is optional
-   Type: unknown ([operation](sla4oai-definitions-cost-properties-operation.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-cost-properties-operation.md "SLA4OAI#/definitions/Cost/properties/operation")

#### operation Type

unknown ([operation](sla4oai-definitions-cost-properties-operation.md))

### overage

The overage cost


`overage`

-   is optional
-   Type: unknown ([overage](sla4oai-definitions-cost-properties-overage.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-cost-properties-overage.md "SLA4OAI#/definitions/Cost/properties/overage")

#### overage Type

unknown ([overage](sla4oai-definitions-cost-properties-overage.md))

## Definitions group Guarantee

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Guarantee"}
```

| Property              | Type    | Required | Nullable       | Defined by                                                                                                                       |
| :-------------------- | ------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `array` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guarantee-additionalproperties.md "SLA4OAI#/definitions/Guarantee/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown\[]
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guarantee-additionalproperties.md "SLA4OAI#/definitions/Guarantee/additionalProperties")

#### additionalProperties Type

unknown\[]

## Definitions group GuaranteeObjective

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/GuaranteeObjective"}
```

| Property                | Type          | Required | Nullable       | Defined by                                                                                                                                         |
| :---------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| [objective](#objective) | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-objective.md "SLA4OAI#/definitions/GuaranteeObjective/properties/objective") |
| [period](#period)       | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-period.md "SLA4OAI#/definitions/GuaranteeObjective/properties/period")       |
| [scope](#scope)         | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-scope.md "SLA4OAI#/definitions/GuaranteeObjective/properties/scope")         |
| [window](#window)       | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-window.md "SLA4OAI#/definitions/GuaranteeObjective/properties/window")       |

### objective

The objective of the guarantee. Supported expression syntax has a single form: Property + Operator + Value
// _ @pattern \\w+\\s_((!=)?|(&lt;=)?|(>=)?|(==)?|(&lt;)?|(>)?)?\\s\*\\d+


`objective`

-   is required
-   Type: `string` ([objective](sla4oai-definitions-guaranteeobjective-properties-objective.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-objective.md "SLA4OAI#/definitions/GuaranteeObjective/properties/objective")

#### objective Type

`string` ([objective](sla4oai-definitions-guaranteeobjective-properties-objective.md))

#### objective Examples

```json
"avgResponseTimeMs <= 250"
```

### period

The period of the objective


`period`

-   is optional
-   Type: unknown ([period](sla4oai-definitions-guaranteeobjective-properties-period.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-period.md "SLA4OAI#/definitions/GuaranteeObjective/properties/period")

#### period Type

unknown ([period](sla4oai-definitions-guaranteeobjective-properties-period.md))

### scope

The scope of who request the service.


`scope`

-   is optional
-   Type: `string` ([scope](sla4oai-definitions-guaranteeobjective-properties-scope.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-scope.md "SLA4OAI#/definitions/GuaranteeObjective/properties/scope")

#### scope Type

`string` ([scope](sla4oai-definitions-guaranteeobjective-properties-scope.md))

#### scope Examples

```json
"account"
```

```json
"tenant"
```

### window

The state of the Objective (dynamic or static)


`window`

-   is optional
-   Type: `string` ([window](sla4oai-definitions-guaranteeobjective-properties-window.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-window.md "SLA4OAI#/definitions/GuaranteeObjective/properties/window")

#### window Type

`string` ([window](sla4oai-definitions-guaranteeobjective-properties-window.md))

#### window Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | ----------- |
| `"dynamic"` |             |
| `"static"`  |             |

#### window Examples

```json
"dynamic "
```

```json
"static"
```

## Definitions group Guarantees

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Guarantees"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                                         |
| :-------------------- | ------------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guarantees-additionalproperties.md "SLA4OAI#/definitions/Guarantees/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guarantees-additionalproperties.md "SLA4OAI#/definitions/Guarantees/additionalProperties")

#### additionalProperties Type

unknown

## Definitions group Infrastructure

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Infrastructure"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                   |
| :------------------------ | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| [monitor](#monitor)       | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-monitor.md "SLA4OAI#/definitions/Infrastructure/properties/monitor")       |
| [supervisor](#supervisor) | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-supervisor.md "SLA4OAI#/definitions/Infrastructure/properties/supervisor") |
| Additional Properties     | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-infrastructure-additionalproperties.md "SLA4OAI#/definitions/Infrastructure/additionalProperties")   |

### monitor

Location of the SLA Metrics endpoint accordingly to the Basic SLA Management Service spec.


`monitor`

-   is required
-   Type: `string` ([monitor](sla4oai-definitions-infrastructure-properties-monitor.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-monitor.md "SLA4OAI#/definitions/Infrastructure/properties/monitor")

#### monitor Type

`string` ([monitor](sla4oai-definitions-infrastructure-properties-monitor.md))

#### monitor Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

#### monitor Examples

```json
"https://monitor.sla4oai.governify.io/v1/"
```

### supervisor

Location of the SLA Check service accordingly to the Basic SLA Management Service spec.


`supervisor`

-   is required
-   Type: `string` ([supervisor](sla4oai-definitions-infrastructure-properties-supervisor.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-supervisor.md "SLA4OAI#/definitions/Infrastructure/properties/supervisor")

#### supervisor Type

`string` ([supervisor](sla4oai-definitions-infrastructure-properties-supervisor.md))

#### supervisor Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

#### supervisor Examples

```json
"https://supervisor.sla4oai.governify.io/v2/"
```

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-infrastructure-additionalproperties.md "SLA4OAI#/definitions/Infrastructure/additionalProperties")

#### additionalProperties Type

`string`

## Definitions group Limit

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Limit"}
```

| Property          | Type          | Required | Nullable       | Defined by                                                                                                         |
| :---------------- | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------- |
| [cost](#cost)     | Merged        | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-cost.md "SLA4OAI#/definitions/Limit/properties/cost")     |
| [max](#max)       | `number`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-max.md "SLA4OAI#/definitions/Limit/properties/max")       |
| [period](#period) | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-period.md "SLA4OAI#/definitions/Limit/properties/period") |
| [scope](#scope)   | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-limit-properties-scope.md "SLA4OAI#/definitions/Limit/properties/scope")   |

### cost

Cost associated to this plan. Defaults to 0 if unspecified.


`cost`

-   is optional
-   Type: merged type ([cost](sla4oai-definitions-limit-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-cost.md "SLA4OAI#/definitions/Limit/properties/cost")

#### cost Type

merged type ([cost](sla4oai-definitions-limit-properties-cost.md))

any of

-   [SLA4OAI schema](sla4oai-definitions-limit-properties-cost-anyof-0.md "check type definition")
-   [SLA4OAI number in SLA4OAI](sla4oai-definitions-limit-properties-cost-anyof-1.md "check type definition")

#### cost Examples

```json
"0"
```

```json
"9.99"
```

### max

Max value that can be accepted.


`max`

-   is required
-   Type: `number` ([max](sla4oai-definitions-limit-properties-max.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-max.md "SLA4OAI#/definitions/Limit/properties/max")

#### max Type

`number` ([max](sla4oai-definitions-limit-properties-max.md))

#### max Constraints

**minimum**: the value of this number must greater than or equal to: `0`

#### max Examples

```json
"0"
```

```json
"5000"
```

### period

The period of the limit.


`period`

-   is optional
-   Type: unknown ([period](sla4oai-definitions-limit-properties-period.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-period.md "SLA4OAI#/definitions/Limit/properties/period")

#### period Type

unknown ([period](sla4oai-definitions-limit-properties-period.md))

### scope

The scope of who request the service.


`scope`

-   is optional
-   Type: `string` ([scope](sla4oai-definitions-limit-properties-scope.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-limit-properties-scope.md "SLA4OAI#/definitions/Limit/properties/scope")

#### scope Type

`string` ([scope](sla4oai-definitions-limit-properties-scope.md))

#### scope Examples

```json
"account"
```

```json
"tenant"
```

## Definitions group Metric

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Metric"}
```

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                           |
| :-------------------------------- | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| [description](#description)       | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-description.md "SLA4OAI#/definitions/Metric/properties/description")       |
| [format](#format)                 | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-format.md "SLA4OAI#/definitions/Metric/properties/format")                 |
| [relatedMetrics](#relatedMetrics) | `array`  | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-relatedmetrics.md "SLA4OAI#/definitions/Metric/properties/relatedMetrics") |
| [resolution](#resolution)         | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-resolution.md "SLA4OAI#/definitions/Metric/properties/resolution")         |
| [type](#type)                     | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-type.md "SLA4OAI#/definitions/Metric/properties/type")                     |
| [unit](#unit)                     | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-unit.md "SLA4OAI#/definitions/Metric/properties/unit")                     |

### description

A brief description of the metric.


`description`

-   is optional
-   Type: `string` ([description](sla4oai-definitions-metric-properties-description.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-description.md "SLA4OAI#/definitions/Metric/properties/description")

#### description Type

`string` ([description](sla4oai-definitions-metric-properties-description.md))

#### description Examples

```json
"Number of requests"
```

### format

The extending format for the previously mentioned type. See Data Type Formats for further details.


`format`

-   is optional
-   Type: `string` ([format](sla4oai-definitions-metric-properties-format.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-format.md "SLA4OAI#/definitions/Metric/properties/format")

#### format Type

`string` ([format](sla4oai-definitions-metric-properties-format.md))

#### format Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | ----------- |
| `"binary"`    |             |
| `"byte"`      |             |
| `"date"`      |             |
| `"date-time"` |             |
| `"double"`    |             |
| `"float"`     |             |
| `"int32"`     |             |
| `"int64"`     |             |
| `"string"`    |             |

#### format Examples

```json
"int32"
```

```json
"int64"
```

```json
"float"
```

```json
"double"
```

```json
"string"
```

```json
"byte"
```

```json
"binary"
```

```json
"date"
```

```json
"date-time"
```

### relatedMetrics

Related metrics


`relatedMetrics`

-   is optional
-   Type: unknown\[]
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-relatedmetrics.md "SLA4OAI#/definitions/Metric/properties/relatedMetrics")

#### relatedMetrics Type

unknown\[]

### resolution

Determine when this metric will be resolved. If value is check the metric will be sent before the calculation of SLA state, else if value is consumption the metric will be sent after consumption.


`resolution`

-   is optional
-   Type: `string` ([resolution](sla4oai-definitions-metric-properties-resolution.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-resolution.md "SLA4OAI#/definitions/Metric/properties/resolution")

#### resolution Type

`string` ([resolution](sla4oai-definitions-metric-properties-resolution.md))

#### resolution Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"check"`       |             |
| `"consumption"` |             |

### type

This is the metric type accordingly to the OAI spec format column.


`type`

-   is optional
-   Type: `string` ([type](sla4oai-definitions-metric-properties-type.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-type.md "SLA4OAI#/definitions/Metric/properties/type")

#### type Type

`string` ([type](sla4oai-definitions-metric-properties-type.md))

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | ----------- |
| `"boolean"` |             |
| `"integer"` |             |
| `"number"`  |             |
| `"string"`  |             |

#### type Examples

```json
"integer"
```

```json
"number"
```

```json
"string"
```

```json
"boolean"
```

### unit

The unit of the metric.


`unit`

-   is optional
-   Type: `string` ([unit](sla4oai-definitions-metric-properties-unit.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-unit.md "SLA4OAI#/definitions/Metric/properties/unit")

#### unit Type

`string` ([unit](sla4oai-definitions-metric-properties-unit.md))

#### unit Examples

```json
"MB/s"
```

```json
"GB"
```

## Definitions group Metrics

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Metrics"}
```

| Property              | Type   | Required | Nullable       | Defined by                                                                                                                   |
| :-------------------- | ------ | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Merged | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metrics-additionalproperties.md "SLA4OAI#/definitions/Metrics/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: merged type ([Details](sla4oai-definitions-metrics-additionalproperties.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metrics-additionalproperties.md "SLA4OAI#/definitions/Metrics/additionalProperties")

#### additionalProperties Type

merged type ([Details](sla4oai-definitions-metrics-additionalproperties.md))

any of

-   [SLA4OAI schema](sla4oai-definitions-metrics-additionalproperties-anyof-0.md "check type definition")
-   [SLA4OAI string in SLA4OAI](sla4oai-definitions-metrics-additionalproperties-anyof-1.md "check type definition")

## Definitions group Operation

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Operation"}
```

| Property              | Type    | Required | Nullable       | Defined by                                                                                                                       |
| :-------------------- | ------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `array` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-operation-additionalproperties.md "SLA4OAI#/definitions/Operation/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown\[]
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-operation-additionalproperties.md "SLA4OAI#/definitions/Operation/additionalProperties")

#### additionalProperties Type

unknown\[]

## Definitions group OperationCost

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/OperationCost"}
```

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                         |
| :---------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [cost](#cost)     | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-operationcost-properties-cost.md "SLA4OAI#/definitions/OperationCost/properties/cost")     |
| [volume](#volume) | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-operationcost-properties-volume.md "SLA4OAI#/definitions/OperationCost/properties/volume") |

### cost

Cost associated to each volume of operations. For example, each pack of 100 requests will be billed at $0.50


`cost`

-   is required
-   Type: `number` ([cost](sla4oai-definitions-operationcost-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-operationcost-properties-cost.md "SLA4OAI#/definitions/OperationCost/properties/cost")

#### cost Type

`number` ([cost](sla4oai-definitions-operationcost-properties-cost.md))

#### cost Examples

```json
"0.50"
```

### volume

Volume of operations to bill. For example, each pack of 100 requests will be billed at $0.50


`volume`

-   is required
-   Type: `number` ([volume](sla4oai-definitions-operationcost-properties-volume.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-operationcost-properties-volume.md "SLA4OAI#/definitions/OperationCost/properties/volume")

#### volume Type

`number` ([volume](sla4oai-definitions-operationcost-properties-volume.md))

#### volume Examples

```json
"100"
```

## Definitions group OverageCost

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/OverageCost"}
```

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                     |
| :---------------- | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| [cost](#cost)     | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-overagecost-properties-cost.md "SLA4OAI#/definitions/OverageCost/properties/cost")     |
| [excess](#excess) | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-overagecost-properties-excess.md "SLA4OAI#/definitions/OverageCost/properties/excess") |

### cost

Cost to be billed as overage. For example, once hitted the quota value, each pack of 1000 requests will be billed at $1.50


`cost`

-   is required
-   Type: `number` ([cost](sla4oai-definitions-overagecost-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-overagecost-properties-cost.md "SLA4OAI#/definitions/OverageCost/properties/cost")

#### cost Type

`number` ([cost](sla4oai-definitions-overagecost-properties-cost.md))

#### cost Examples

```json
"1.50"
```

### excess

Excess of operations subject to be billed as overage. For example, once hitted the quota value, each pack of 1000 requests will be billed at $1.5


`excess`

-   is required
-   Type: `number` ([excess](sla4oai-definitions-overagecost-properties-excess.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-overagecost-properties-excess.md "SLA4OAI#/definitions/OverageCost/properties/excess")

#### excess Type

`number` ([excess](sla4oai-definitions-overagecost-properties-excess.md))

#### excess Examples

```json
"1000"
```

## Definitions group Path

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Path"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                             |
| :-------------------- | ------------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-path-additionalproperties.md "SLA4OAI#/definitions/Path/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-path-additionalproperties.md "SLA4OAI#/definitions/Path/additionalProperties")

#### additionalProperties Type

unknown

## Definitions group Period

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Period"}
```

| Property          | Type     | Required | Nullable       | Defined by                                                                                                           |
| :---------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------- |
| [amount](#amount) | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-period-properties-amount.md "SLA4OAI#/definitions/Period/properties/amount") |
| [unit](#unit)     | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-period-properties-unit.md "SLA4OAI#/definitions/Period/properties/unit")     |

### amount

Max value that can be accepted.


`amount`

-   is required
-   Type: `number` ([amount](sla4oai-definitions-period-properties-amount.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-period-properties-amount.md "SLA4OAI#/definitions/Period/properties/amount")

#### amount Type

`number` ([amount](sla4oai-definitions-period-properties-amount.md))

#### amount Constraints

**minimum**: the value of this number must greater than or equal to: `1`

#### amount Examples

```json
"1"
```

```json
"30"
```

### unit

Max value that can be accepted.


`unit`

-   is required
-   Type: `string` ([unit](sla4oai-definitions-period-properties-unit.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-period-properties-unit.md "SLA4OAI#/definitions/Period/properties/unit")

#### unit Type

`string` ([unit](sla4oai-definitions-period-properties-unit.md))

#### unit Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"century"`     |             |
| `"day"`         |             |
| `"decade"`      |             |
| `"forever"`     |             |
| `"hour"`        |             |
| `"millisecond"` |             |
| `"minute"`      |             |
| `"month"`       |             |
| `"second"`      |             |
| `"week"`        |             |
| `"year"`        |             |

**minimum**: the value of this number must greater than or equal to: `0`

#### unit Examples

```json
"millisecond"
```

```json
"second"
```

```json
"minute"
```

```json
"hour"
```

```json
"day"
```

```json
"week"
```

```json
"month"
```

```json
"year"
```

```json
"decade"
```

```json
"century"
```

```json
"forever"
```

## Definitions group Plan

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Plan"}
```

| Property                        | Type          | Required | Nullable       | Defined by                                                                                                                     |
| :------------------------------ | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| [availability](#availability)   | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-availability.md "SLA4OAI#/definitions/Plan/properties/availability")   |
| [configuration](#configuration) | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-configuration.md "SLA4OAI#/definitions/Plan/properties/configuration") |
| [guarantees](#guarantees)       | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-guarantees.md "SLA4OAI#/definitions/Plan/properties/guarantees")       |
| [pricing](#pricing)             | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-pricing.md "SLA4OAI#/definitions/Plan/properties/pricing")             |
| [quotas](#quotas)               | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-quotas.md "SLA4OAI#/definitions/Plan/properties/quotas")               |
| [rates](#rates)                 | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plan-properties-rates.md "SLA4OAI#/definitions/Plan/properties/rates")                 |

### availability

Availability of the service for this plan expressed via time slots using the ISO 8601 time intervals format.


`availability`

-   is optional
-   Type: `string` ([availability](sla4oai-definitions-plan-properties-availability.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-availability.md "SLA4OAI#/definitions/Plan/properties/availability")

#### availability Type

`string` ([availability](sla4oai-definitions-plan-properties-availability.md))

#### availability Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

#### availability Examples

```json
"2009-10-09T21:30:00.00Z"
```

### configuration

Configuration parameters for the service tailored for the plan.


`configuration`

-   is optional
-   Type: unknown ([configuration](sla4oai-definitions-plan-properties-configuration.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-configuration.md "SLA4OAI#/definitions/Plan/properties/configuration")

#### configuration Type

unknown ([configuration](sla4oai-definitions-plan-properties-configuration.md))

### guarantees

Specific guarantees data for this plan. Overrides default guarantees data defined before.


`guarantees`

-   is optional
-   Type: unknown ([guarantees](sla4oai-definitions-plan-properties-guarantees.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-guarantees.md "SLA4OAI#/definitions/Plan/properties/guarantees")

#### guarantees Type

unknown ([guarantees](sla4oai-definitions-plan-properties-guarantees.md))

### pricing

Specific pricing data for this plan. Overrides default pricing data defined before.


`pricing`

-   is optional
-   Type: unknown ([pricing](sla4oai-definitions-plan-properties-pricing.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-pricing.md "SLA4OAI#/definitions/Plan/properties/pricing")

#### pricing Type

unknown ([pricing](sla4oai-definitions-plan-properties-pricing.md))

### quotas

Specific quotas data for this plan. Overrides default quotas data defined before.


`quotas`

-   is optional
-   Type: unknown ([quotas](sla4oai-definitions-plan-properties-quotas.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-quotas.md "SLA4OAI#/definitions/Plan/properties/quotas")

#### quotas Type

unknown ([quotas](sla4oai-definitions-plan-properties-quotas.md))

### rates

Specific rates data for this plan. Overrides default rates data defined before.


`rates`

-   is optional
-   Type: unknown ([rates](sla4oai-definitions-plan-properties-rates.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plan-properties-rates.md "SLA4OAI#/definitions/Plan/properties/rates")

#### rates Type

unknown ([rates](sla4oai-definitions-plan-properties-rates.md))

## Definitions group Plans

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Plans"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                               |
| :-------------------- | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-plans-additionalproperties.md "SLA4OAI#/definitions/Plans/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-plans-additionalproperties.md "SLA4OAI#/definitions/Plans/additionalProperties")

#### additionalProperties Type

unknown

## Definitions group Pricing

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Pricing"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                                 |
| :-------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------- |
| [billing](#billing)   | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-billing.md "SLA4OAI#/definitions/Pricing/properties/billing")   |
| [cost](#cost)         | Merged        | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-cost.md "SLA4OAI#/definitions/Pricing/properties/cost")         |
| [currency](#currency) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-currency.md "SLA4OAI#/definitions/Pricing/properties/currency") |
| [period](#period)     | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-period.md "SLA4OAI#/definitions/Pricing/properties/period")     |

### billing

Period used for billing. Supported values are: - onepay Unique payment before start using the service. - daily Billing at end of the day. - weekly Billing at end of the week. - monthly Billing at end of the month. - quarterly Billing at end of the quarter. - yearly Billing at end of the year. Default to monthly if unspecified.


`billing`

-   is optional
-   Type: `string` ([billing](sla4oai-definitions-pricing-properties-billing.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-billing.md "SLA4OAI#/definitions/Pricing/properties/billing")

#### billing Type

`string` ([billing](sla4oai-definitions-pricing-properties-billing.md))

#### billing Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | ----------- |
| `"daily"`     |             |
| `"monthly"`   |             |
| `"onepay"`    |             |
| `"quarterly"` |             |
| `"weekly"`    |             |
| `"yearly"`    |             |

#### billing Default Value

The default value is:

```json
"monthly"
```

#### billing Examples

```json
"onepay"
```

```json
"daily"
```

```json
"weekly"
```

```json
"monthly"
```

```json
"quarterly"
```

```json
"yearly"
```

### cost

Cost associated with this service. Defaults to 0 if unspecified.


`cost`

-   is optional
-   Type: merged type ([cost](sla4oai-definitions-pricing-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-cost.md "SLA4OAI#/definitions/Pricing/properties/cost")

#### cost Type

merged type ([cost](sla4oai-definitions-pricing-properties-cost.md))

any of

-   [SLA4OAI schema](sla4oai-definitions-pricing-properties-cost-anyof-0.md "check type definition")
-   [SLA4OAI number in SLA4OAI](sla4oai-definitions-pricing-properties-cost-anyof-1.md "check type definition")

#### cost Examples

```json
"0"
```

```json
"9.99"
```

### currency

Currency used to express the cost. Supported currency values are expressed in ISO 4217 format. Samples: USD, EUR, or BTC for US dollar, euro, or bitcoin, respectively. Defaults to USD if unspecified.


`currency`

-   is optional
-   Type: `string` ([currency](sla4oai-definitions-pricing-properties-currency.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-currency.md "SLA4OAI#/definitions/Pricing/properties/currency")

#### currency Type

`string` ([currency](sla4oai-definitions-pricing-properties-currency.md))

#### currency Constraints

**pattern**: the string must match the following regular expression: 

```regexp
^ADF|ADP|AED|AFA|AFN|ALL|AMD|ANG|AOA|AOK|AON|AOR|ARA|ARL|ARP|ARS|ATS|AUD|AWG|AZM|AZN|BAD|BAM|BBD|BDT|BEF|BGL|BGN|BHD|BIF|BMD|BND|BOB|BOP|BOV|BRB|BRC|BRE|BRL|BRN|BRR|BSD|BTN|BWP|BYB|BYN|BYR|BZD|CAD|CDF|CHE|CHF|CHW|CLE|CLF|CLP|CNY|COP|COU|CRC|CSD|CSK|CUC|CUP|CVE|CYP|CZK|DDM|DEM|DJF|DKK|DOP|DZD|ECS|ECV|EEK|EGP|ERN|ESA|ESB|ESP|ETB|EUR|FIM|FJD|FKP|FRF|GBP|GEL|GHC|GHS|GIP|GMD|GNE|GNF|GQE|GRD|GTQ|GWP|HKD|HNL|HRD|HRK|HTG|HUF|IDR|IEP|ILP|ILR|ILS|INR|IQD|IRR|ISJ|ISK|ITL|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LBP|LKR|LRD|LSL|LTL|LUF|LVL|LYD|MAD|MAF|MCF|MDL|MGA|MGF|MKD|MKN|MLV|MMK|MNT|MOP|MRO|MTL|MUR|MVQ|MVR|MWK|MXN|MXP|MXV|MYR|MZM|MZN|NAD|NGN|NIO|NLG|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PTE|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SIT|SKK|SLL|SML|SOS|SRD|SSP|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UZS|VAL|VEF|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XBT|XCD|XDR|XFU|XOK|XPD|XPF|XPT|XSU|XTS|XUA|YER|ZAR|ZMW|ZWL$
```

[try pattern](https://regexr.com/?expression=%5EADF%7CADP%7CAED%7CAFA%7CAFN%7CALL%7CAMD%7CANG%7CAOA%7CAOK%7CAON%7CAOR%7CARA%7CARL%7CARP%7CARS%7CATS%7CAUD%7CAWG%7CAZM%7CAZN%7CBAD%7CBAM%7CBBD%7CBDT%7CBEF%7CBGL%7CBGN%7CBHD%7CBIF%7CBMD%7CBND%7CBOB%7CBOP%7CBOV%7CBRB%7CBRC%7CBRE%7CBRL%7CBRN%7CBRR%7CBSD%7CBTN%7CBWP%7CBYB%7CBYN%7CBYR%7CBZD%7CCAD%7CCDF%7CCHE%7CCHF%7CCHW%7CCLE%7CCLF%7CCLP%7CCNY%7CCOP%7CCOU%7CCRC%7CCSD%7CCSK%7CCUC%7CCUP%7CCVE%7CCYP%7CCZK%7CDDM%7CDEM%7CDJF%7CDKK%7CDOP%7CDZD%7CECS%7CECV%7CEEK%7CEGP%7CERN%7CESA%7CESB%7CESP%7CETB%7CEUR%7CFIM%7CFJD%7CFKP%7CFRF%7CGBP%7CGEL%7CGHC%7CGHS%7CGIP%7CGMD%7CGNE%7CGNF%7CGQE%7CGRD%7CGTQ%7CGWP%7CHKD%7CHNL%7CHRD%7CHRK%7CHTG%7CHUF%7CIDR%7CIEP%7CILP%7CILR%7CILS%7CINR%7CIQD%7CIRR%7CISJ%7CISK%7CITL%7CJMD%7CJOD%7CJPY%7CKES%7CKGS%7CKHR%7CKMF%7CKPW%7CKRW%7CKWD%7CKYD%7CKZT%7CLAK%7CLBP%7CLKR%7CLBP%7CLKR%7CLRD%7CLSL%7CLTL%7CLUF%7CLVL%7CLYD%7CMAD%7CMAF%7CMCF%7CMDL%7CMGA%7CMGF%7CMKD%7CMKN%7CMLV%7CMMK%7CMNT%7CMOP%7CMRO%7CMTL%7CMUR%7CMVQ%7CMVR%7CMWK%7CMXN%7CMXP%7CMXV%7CMYR%7CMZM%7CMZN%7CNAD%7CNGN%7CNIO%7CNLG%7CNOK%7CNPR%7CNZD%7COMR%7CPAB%7CPEN%7CPGK%7CPHP%7CPKR%7CPLN%7CPTE%7CPYG%7CQAR%7CRON%7CRSD%7CRUB%7CRWF%7CSAR%7CSBD%7CSCR%7CSDG%7CSEK%7CSGD%7CSHP%7CSIT%7CSKK%7CSLL%7CSML%7CSOS%7CSRD%7CSSP%7CSTD%7CSVC%7CSYP%7CSZL%7CTHB%7CTJS%7CTMT%7CTND%7CTOP%7CTRY%7CTTD%7CTWD%7CTZS%7CUAH%7CUGX%7CUSD%7CUSN%7CUYI%7CUYU%7CUZS%7CVAL%7CVEF%7CVND%7CVUV%7CWST%7CXAF%7CXAG%7CXAU%7CXBA%7CXBB%7CXBC%7CXBD%7CXBT%7CXCD%7CXDR%7CXFU%7CXOK%7CXPD%7CXPF%7CXPT%7CXSU%7CXTS%7CXUA%7CYER%7CZAR%7CZMW%7CZWL%24 "try regular expression with regexr.com")

#### currency Default Value

The default value is:

```json
"USD"
```

#### currency Examples

```json
"EUR"
```

```json
"USD"
```

### period

The period of the limit


`period`

-   is optional
-   Type: unknown ([period](sla4oai-definitions-pricing-properties-period.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-period.md "SLA4OAI#/definitions/Pricing/properties/period")

#### period Type

unknown ([period](sla4oai-definitions-pricing-properties-period.md))

## Definitions group Quotas

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Quotas"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                                 |
| :-------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-quotas-additionalproperties.md "SLA4OAI#/definitions/Quotas/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-quotas-additionalproperties.md "SLA4OAI#/definitions/Quotas/additionalProperties")

#### additionalProperties Type

unknown

## Definitions group Rates

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Rates"}
```

| Property              | Type          | Required | Nullable       | Defined by                                                                                                               |
| :-------------------- | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-rates-additionalproperties.md "SLA4OAI#/definitions/Rates/additionalProperties") |

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-rates-additionalproperties.md "SLA4OAI#/definitions/Rates/additionalProperties")

#### additionalProperties Type

unknown

## Definitions group Validity

Reference this group by using

```json
{"$ref":"SLA4OAI#/definitions/Validity"}
```

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                               |
| :-------------------------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| [effectiveDate](#effectiveDate)   | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-validity-properties-effectivedate.md "SLA4OAI#/definitions/Validity/properties/effectiveDate")   |
| [expirationDate](#expirationDate) | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-validity-properties-expirationdate.md "SLA4OAI#/definitions/Validity/properties/expirationDate") |

### effectiveDate

The starting date of the SLA agreement using the ISO 8601 time intervals format.


`effectiveDate`

-   is required
-   Type: `string` ([effectiveDate](sla4oai-definitions-validity-properties-effectivedate.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-validity-properties-effectivedate.md "SLA4OAI#/definitions/Validity/properties/effectiveDate")

#### effectiveDate Type

`string` ([effectiveDate](sla4oai-definitions-validity-properties-effectivedate.md))

#### effectiveDate Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

#### effectiveDate Examples

```json
"2009-10-09T21:30:00.00Z"
```

### expirationDate

The expiration date of the SLA agreement using the ISO 8601 time intervals format.


`expirationDate`

-   is optional
-   Type: `string` ([expirationDate](sla4oai-definitions-validity-properties-expirationdate.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-validity-properties-expirationdate.md "SLA4OAI#/definitions/Validity/properties/expirationDate")

#### expirationDate Type

`string` ([expirationDate](sla4oai-definitions-validity-properties-expirationdate.md))

#### expirationDate Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

#### expirationDate Examples

```json
"2015-11-15T23:30:00.00Z"
```

# SLA4OAI Properties

| Property                          | Type          | Required | Nullable       | Defined by                                                                                     |
| :-------------------------------- | ------------- | -------- | -------------- | :--------------------------------------------------------------------------------------------- |
| [availability](#availability)     | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-availability.md "SLA4OAI#/properties/availability")     |
| [configuration](#configuration)   | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-configuration.md "SLA4OAI#/properties/configuration")   |
| [context](#context)               | Not specified | Required | cannot be null | [SLA4OAI schema](sla4oai-properties-context.md "SLA4OAI#/properties/context")               |
| [guarantees](#guarantees)         | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-guarantees.md "SLA4OAI#/properties/guarantees")         |
| [infrastructure](#infrastructure) | Not specified | Required | cannot be null | [SLA4OAI schema](sla4oai-properties-infrastructure.md "SLA4OAI#/properties/infrastructure") |
| [metrics](#metrics)               | Not specified | Required | cannot be null | [SLA4OAI schema](sla4oai-properties-metrics.md "SLA4OAI#/properties/metrics")               |
| [plans](#plans)                   | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-plans.md "SLA4OAI#/properties/plans")                   |
| [pricing](#pricing)               | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-pricing.md "SLA4OAI#/properties/pricing")               |
| [quotas](#quotas)                 | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-quotas.md "SLA4OAI#/properties/quotas")                 |
| [rates](#rates)                   | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-properties-rates.md "SLA4OAI#/properties/rates")                   |

## availability

Define the default availability, later each plan can be override it, via time slots using the ISO 8601 time intervals format.


`availability`

-   is optional
-   Type: `string` ([availability](sla4oai-properties-availability.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-availability.md "SLA4OAI#/properties/availability")

### availability Type

`string` ([availability](sla4oai-properties-availability.md))

### availability Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### availability Examples

```json
"2009-10-09T21:30:00.00Z"
```

## configuration

Define the default configurations, later each plan can be override it.


`configuration`

-   is optional
-   Type: unknown ([configuration](sla4oai-properties-configuration.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-configuration.md "SLA4OAI#/properties/configuration")

### configuration Type

unknown ([configuration](sla4oai-properties-configuration.md))

## context

Holds the main information of the SLA context.


`context`

-   is required
-   Type: unknown ([context](sla4oai-properties-context.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-context.md "SLA4OAI#/properties/context")

### context Type

unknown ([context](sla4oai-properties-context.md))

## guarantees

Global guarantees, these are the default guarantees, but they could be overridden by each plan later.


`guarantees`

-   is optional
-   Type: unknown ([guarantees](sla4oai-properties-guarantees.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-guarantees.md "SLA4OAI#/properties/guarantees")

### guarantees Type

unknown ([guarantees](sla4oai-properties-guarantees.md))

## infrastructure

Provides information about tooling used for SLA storage, calculation, governance, etc.


`infrastructure`

-   is required
-   Type: unknown ([infrastructure](sla4oai-properties-infrastructure.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-infrastructure.md "SLA4OAI#/properties/infrastructure")

### infrastructure Type

unknown ([infrastructure](sla4oai-properties-infrastructure.md))

## metrics

A list of metrics to use in the context of the SLA.


`metrics`

-   is required
-   Type: unknown ([metrics](sla4oai-properties-metrics.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-metrics.md "SLA4OAI#/properties/metrics")

### metrics Type

unknown ([metrics](sla4oai-properties-metrics.md))

## plans

A set of plans to define different service levels per plan.


`plans`

-   is optional
-   Type: unknown ([plans](sla4oai-properties-plans.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-plans.md "SLA4OAI#/properties/plans")

### plans Type

unknown ([plans](sla4oai-properties-plans.md))

## pricing

Global pricing data.


`pricing`

-   is optional
-   Type: unknown ([pricing](sla4oai-properties-pricing.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-pricing.md "SLA4OAI#/properties/pricing")

### pricing Type

unknown ([pricing](sla4oai-properties-pricing.md))

## quotas

Global quotas, these are the default quotas, but they could be overridden by each plan later.


`quotas`

-   is optional
-   Type: unknown ([quotas](sla4oai-properties-quotas.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-quotas.md "SLA4OAI#/properties/quotas")

### quotas Type

unknown ([quotas](sla4oai-properties-quotas.md))

## rates

Global rates, these are the default rates, but they could be overridden by each plan later.


`rates`

-   is optional
-   Type: unknown ([rates](sla4oai-properties-rates.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-properties-rates.md "SLA4OAI#/properties/rates")

### rates Type

unknown ([rates](sla4oai-properties-rates.md))
