# expirationDate Schema

```txt
SLA4OAI#/definitions/Validity/properties/expirationDate
```

The expiration date of the SLA agreement using the ISO 8601 time intervals format.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## expirationDate Type

`string` ([expirationDate](sla4oai-definitions-validity-properties-expirationdate.md))

## expirationDate Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## expirationDate Examples

```json
"2015-11-15T23:30:00.00Z"
```
