# Metric Schema

```txt
SLA4OAI#/definitions/Metric
```

Definitions of metrics with name, types and descriptions


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Metric Type

`object` ([Metric](sla4oai-definitions-metric.md))

# Metric Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                           |
| :-------------------------------- | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| [description](#description)       | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-description.md "SLA4OAI#/definitions/Metric/properties/description")       |
| [format](#format)                 | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-format.md "SLA4OAI#/definitions/Metric/properties/format")                 |
| [relatedMetrics](#relatedMetrics) | `array`  | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-relatedmetrics.md "SLA4OAI#/definitions/Metric/properties/relatedMetrics") |
| [resolution](#resolution)         | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-resolution.md "SLA4OAI#/definitions/Metric/properties/resolution")         |
| [type](#type)                     | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-type.md "SLA4OAI#/definitions/Metric/properties/type")                     |
| [unit](#unit)                     | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metric-properties-unit.md "SLA4OAI#/definitions/Metric/properties/unit")                     |

## description

A brief description of the metric.


`description`

-   is optional
-   Type: `string` ([description](sla4oai-definitions-metric-properties-description.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-description.md "SLA4OAI#/definitions/Metric/properties/description")

### description Type

`string` ([description](sla4oai-definitions-metric-properties-description.md))

### description Examples

```json
"Number of requests"
```

## format

The extending format for the previously mentioned type. See Data Type Formats for further details.


`format`

-   is optional
-   Type: `string` ([format](sla4oai-definitions-metric-properties-format.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-format.md "SLA4OAI#/definitions/Metric/properties/format")

### format Type

`string` ([format](sla4oai-definitions-metric-properties-format.md))

### format Constraints

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

### format Examples

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

## relatedMetrics

Related metrics


`relatedMetrics`

-   is optional
-   Type: unknown\[]
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-relatedmetrics.md "SLA4OAI#/definitions/Metric/properties/relatedMetrics")

### relatedMetrics Type

unknown\[]

## resolution

Determine when this metric will be resolved. If value is check the metric will be sent before the calculation of SLA state, else if value is consumption the metric will be sent after consumption.


`resolution`

-   is optional
-   Type: `string` ([resolution](sla4oai-definitions-metric-properties-resolution.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-resolution.md "SLA4OAI#/definitions/Metric/properties/resolution")

### resolution Type

`string` ([resolution](sla4oai-definitions-metric-properties-resolution.md))

### resolution Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"check"`       |             |
| `"consumption"` |             |

## type

This is the metric type accordingly to the OAI spec format column.


`type`

-   is optional
-   Type: `string` ([type](sla4oai-definitions-metric-properties-type.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-type.md "SLA4OAI#/definitions/Metric/properties/type")

### type Type

`string` ([type](sla4oai-definitions-metric-properties-type.md))

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | ----------- |
| `"boolean"` |             |
| `"integer"` |             |
| `"number"`  |             |
| `"string"`  |             |

### type Examples

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

## unit

The unit of the metric.


`unit`

-   is optional
-   Type: `string` ([unit](sla4oai-definitions-metric-properties-unit.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metric-properties-unit.md "SLA4OAI#/definitions/Metric/properties/unit")

### unit Type

`string` ([unit](sla4oai-definitions-metric-properties-unit.md))

### unit Examples

```json
"MB/s"
```

```json
"GB"
```
