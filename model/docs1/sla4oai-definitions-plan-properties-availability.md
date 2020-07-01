# availability Schema

```txt
SLA4OAI#/definitions/Plan/properties/availability
```

Availability of the service for this plan expressed via time slots using the ISO 8601 time intervals format.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## availability Type

`string` ([availability](sla4oai-definitions-plan-properties-availability.md))

## availability Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## availability Examples

```json
"2009-10-09T21:30:00.00Z"
```
