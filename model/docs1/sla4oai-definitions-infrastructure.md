# Infrastructure Schema

```txt
SLA4OAI#/definitions/Infrastructure
```

Provides information about tooling used for SLA storage, calculation, governance, etc.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Infrastructure Type

`object` ([Infrastructure](sla4oai-definitions-infrastructure.md))

# Infrastructure Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                   |
| :------------------------ | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| [monitor](#monitor)       | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-monitor.md "SLA4OAI#/definitions/Infrastructure/properties/monitor")       |
| [supervisor](#supervisor) | `string` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-supervisor.md "SLA4OAI#/definitions/Infrastructure/properties/supervisor") |
| Additional Properties     | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-infrastructure-additionalproperties.md "SLA4OAI#/definitions/Infrastructure/additionalProperties")   |

## monitor

Location of the SLA Metrics endpoint accordingly to the Basic SLA Management Service spec.


`monitor`

-   is required
-   Type: `string` ([monitor](sla4oai-definitions-infrastructure-properties-monitor.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-monitor.md "SLA4OAI#/definitions/Infrastructure/properties/monitor")

### monitor Type

`string` ([monitor](sla4oai-definitions-infrastructure-properties-monitor.md))

### monitor Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

### monitor Examples

```json
"https://monitor.sla4oai.governify.io/v1/"
```

## supervisor

Location of the SLA Check service accordingly to the Basic SLA Management Service spec.


`supervisor`

-   is required
-   Type: `string` ([supervisor](sla4oai-definitions-infrastructure-properties-supervisor.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-infrastructure-properties-supervisor.md "SLA4OAI#/definitions/Infrastructure/properties/supervisor")

### supervisor Type

`string` ([supervisor](sla4oai-definitions-infrastructure-properties-supervisor.md))

### supervisor Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

### supervisor Examples

```json
"https://supervisor.sla4oai.governify.io/v2/"
```

## Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-infrastructure-additionalproperties.md "SLA4OAI#/definitions/Infrastructure/additionalProperties")

### additionalProperties Type

`string`
