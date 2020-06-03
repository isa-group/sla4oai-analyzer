# Validity Schema

```txt
SLA4OAI#/definitions/Validity
```

Availability of the service


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Validity Type

`object` ([Validity](sla4oai-definitions-validity.md))

# Validity Properties

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                               |
| :-------------------------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| [effectiveDate](#effectiveDate)   | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-validity-properties-effectivedate.md "SLA4OAI#/definitions/Validity/properties/effectiveDate")   |
| [expirationDate](#expirationDate) | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-validity-properties-expirationdate.md "SLA4OAI#/definitions/Validity/properties/expirationDate") |

## effectiveDate

The starting date of the SLA agreement using the ISO 8601 time intervals format.


`effectiveDate`

-   is required
-   Type: `string` ([effectiveDate](sla4oai-definitions-validity-properties-effectivedate.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-validity-properties-effectivedate.md "SLA4OAI#/definitions/Validity/properties/effectiveDate")

### effectiveDate Type

`string` ([effectiveDate](sla4oai-definitions-validity-properties-effectivedate.md))

### effectiveDate Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### effectiveDate Examples

```json
"2009-10-09T21:30:00.00Z"
```

## expirationDate

The expiration date of the SLA agreement using the ISO 8601 time intervals format.


`expirationDate`

-   is optional
-   Type: `string` ([expirationDate](sla4oai-definitions-validity-properties-expirationdate.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-validity-properties-expirationdate.md "SLA4OAI#/definitions/Validity/properties/expirationDate")

### expirationDate Type

`string` ([expirationDate](sla4oai-definitions-validity-properties-expirationdate.md))

### expirationDate Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

### expirationDate Examples

```json
"2015-11-15T23:30:00.00Z"
```
