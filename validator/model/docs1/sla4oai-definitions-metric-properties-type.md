# type Schema

```txt
SLA4OAI#/definitions/Metric/properties/type
```

This is the metric type accordingly to the OAI spec format column.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## type Type

`string` ([type](sla4oai-definitions-metric-properties-type.md))

## type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | ----------- |
| `"boolean"` |             |
| `"integer"` |             |
| `"number"`  |             |
| `"string"`  |             |

## type Examples

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
