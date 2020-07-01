# max Schema

```txt
SLA4OAI#/definitions/Limit/properties/max
```

Max value that can be accepted.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## max Type

merged type ([max](sla4oai-definitions-limit-properties-max.md))

any of

-   [SLA4OAI string in SLA4OAI](sla4oai-definitions-limit-properties-max-anyof-0.md "check type definition")
-   [SLA4OAI number in SLA4OAI](sla4oai-definitions-limit-properties-max-anyof-1.md "check type definition")

## max Constraints

**minimum**: the value of this number must greater than or equal to: `0`

## max Examples

```json
"0"
```

```json
"5000"
```

```json
"unlimited"
```
