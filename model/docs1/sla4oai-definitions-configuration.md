# Configuration Schema

```txt
SLA4OAI#/definitions/Configuration
```

Define the default configurations, later each plan can be override it.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                    |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Configuration Type

`object` ([Configuration](sla4oai-definitions-configuration.md))

# Configuration Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                               |
| :-------------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-configuration-additionalproperties.md "SLA4OAI#/definitions/Configuration/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-configuration-additionalproperties.md "SLA4OAI#/definitions/Configuration/additionalProperties")

### additionalProperties Type

`string`
