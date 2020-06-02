# effectiveDate Schema

```txt
SLA4OAI#/definitions/Validity/properties/effectiveDate
```

The starting date of the SLA agreement using the ISO 8601 time intervals format.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## effectiveDate Type

`string` ([effectiveDate](sla4oai-definitions-validity-properties-effectivedate.md))

## effectiveDate Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## effectiveDate Examples

```json
"2009-10-09T21:30:00.00Z"
```
