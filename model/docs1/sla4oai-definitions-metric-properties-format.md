# format Schema

```txt
SLA4OAI#/definitions/Metric/properties/format
```

The extending format for the previously mentioned type. See Data Type Formats for further details.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## format Type

`string` ([format](sla4oai-definitions-metric-properties-format.md))

## format Constraints

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

## format Examples

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
