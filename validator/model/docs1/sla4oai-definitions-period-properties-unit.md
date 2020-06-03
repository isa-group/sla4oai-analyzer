# unit Schema

```txt
SLA4OAI#/definitions/Period/properties/unit
```

Max value that can be accepted.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## unit Type

`string` ([unit](sla4oai-definitions-period-properties-unit.md))

## unit Constraints

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

## unit Examples

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
