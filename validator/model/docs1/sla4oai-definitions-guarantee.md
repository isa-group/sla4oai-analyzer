# Guarantee Schema

```txt
SLA4OAI#/definitions/Guarantee
```

Describes a guarantee level supported by the plan.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Guarantee Type

`object` ([Guarantee](sla4oai-definitions-guarantee.md))

# Guarantee Properties

| Property              | Type    | Required | Nullable       | Defined by                                                                                                                       |
| :-------------------- | ------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `array` | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guarantee-additionalproperties.md "SLA4OAI#/definitions/Guarantee/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: unknown\[]
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guarantee-additionalproperties.md "SLA4OAI#/definitions/Guarantee/additionalProperties")

### additionalProperties Type

unknown\[]
