# monitor Schema

```txt
SLA4OAI#/definitions/Infrastructure/properties/monitor
```

Location of the SLA Metrics endpoint accordingly to the Basic SLA Management Service spec.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## monitor Type

`string` ([monitor](sla4oai-definitions-infrastructure-properties-monitor.md))

## monitor Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

## monitor Examples

```json
"https://monitor.sla4oai.governify.io/v1/"
```
