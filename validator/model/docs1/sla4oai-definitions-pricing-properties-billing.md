# billing Schema

```txt
SLA4OAI#/definitions/Pricing/properties/billing
```

(DEPRECATED) Period used for billing. Supported values are: - onepay Unique payment before start using the service. - daily Billing at end of the day. - weekly Billing at end of the week. - monthly Billing at end of the month. - quarterly Billing at end of the quarter. - yearly Billing at end of the year. Default to monthly if unspecified.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## billing Type

`string` ([billing](sla4oai-definitions-pricing-properties-billing.md))

## billing Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | ----------- |
| `"daily"`     |             |
| `"monthly"`   |             |
| `"onepay"`    |             |
| `"quarterly"` |             |
| `"weekly"`    |             |
| `"yearly"`    |             |

## billing Default Value

The default value is:

```json
"monthly"
```

## billing Examples

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
