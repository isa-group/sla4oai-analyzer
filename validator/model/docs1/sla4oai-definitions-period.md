# Period Schema

```txt
SLA4OAI#/definitions/Period
```

The period of the limit.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## Period Type

`object` ([Period](sla4oai-definitions-period.md))

# Period Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                           |
| :---------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------- |
| [amount](#amount) | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-period-properties-amount.md "SLA4OAI#/definitions/Period/properties/amount") |
| [unit](#unit)     | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-period-properties-unit.md "SLA4OAI#/definitions/Period/properties/unit")     |

## amount

Max value that can be accepted.


`amount`

-   is required
-   Type: `number` ([amount](sla4oai-definitions-period-properties-amount.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-period-properties-amount.md "SLA4OAI#/definitions/Period/properties/amount")

### amount Type

`number` ([amount](sla4oai-definitions-period-properties-amount.md))

### amount Constraints

**minimum**: the value of this number must greater than or equal to: `1`

### amount Examples

```json
"1"
```

```json
"30"
```

## unit

Max value that can be accepted.


`unit`

-   is required
-   Type: `string` ([unit](sla4oai-definitions-period-properties-unit.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-period-properties-unit.md "SLA4OAI#/definitions/Period/properties/unit")

### unit Type

`string` ([unit](sla4oai-definitions-period-properties-unit.md))

### unit Constraints

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

### unit Examples

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
