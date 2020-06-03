# Metrics Schema

```txt
SLA4OAI#/definitions/Metrics
```

A list of metrics to use in the context of the SLA.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Metrics Type

`object` ([Metrics](sla4oai-definitions-metrics.md))

# Metrics Properties

| Property              | Type   | Required | Nullable       | Defined by                                                                                                                   |
| :-------------------- | ------ | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | Merged | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-metrics-additionalproperties.md "SLA4OAI#/definitions/Metrics/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: merged type ([Details](sla4oai-definitions-metrics-additionalproperties.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-metrics-additionalproperties.md "SLA4OAI#/definitions/Metrics/additionalProperties")

### additionalProperties Type

merged type ([Details](sla4oai-definitions-metrics-additionalproperties.md))

any of

-   [SLA4OAI schema](sla4oai-definitions-metrics-additionalproperties-anyof-0.md "check type definition")
-   [SLA4OAI string in SLA4OAI](sla4oai-definitions-metrics-additionalproperties-anyof-1.md "check type definition")
