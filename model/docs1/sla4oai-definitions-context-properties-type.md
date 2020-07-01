# type Schema

```txt
SLA4OAI#/definitions/Context/properties/type
```

The type of SLA based on the Lifecycle of Agreement (plans or instance).


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## type Type

`string` ([type](sla4oai-definitions-context-properties-type.md))

## type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | ----------- |
| `"instance"` |             |
| `"plans"`    |             |

## type Examples

```json
"plans"
```

```json
"instance"
```
