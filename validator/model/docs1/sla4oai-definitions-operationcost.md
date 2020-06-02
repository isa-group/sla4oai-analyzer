# OperationCost Schema

```txt
SLA4OAI#/definitions/OperationCost
```

The operation cost


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## OperationCost Type

`object` ([OperationCost](sla4oai-definitions-operationcost.md))

# OperationCost Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                         |
| :---------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [cost](#cost)     | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-operationcost-properties-cost.md "SLA4OAI#/definitions/OperationCost/properties/cost")     |
| [volume](#volume) | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-operationcost-properties-volume.md "SLA4OAI#/definitions/OperationCost/properties/volume") |

## cost

Cost associated to each volume of operations. For example, each pack of 100 requests will be billed at $0.50


`cost`

-   is required
-   Type: `number` ([cost](sla4oai-definitions-operationcost-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-operationcost-properties-cost.md "SLA4OAI#/definitions/OperationCost/properties/cost")

### cost Type

`number` ([cost](sla4oai-definitions-operationcost-properties-cost.md))

### cost Examples

```json
"0.50"
```

## volume

Volume of operations to bill. For example, each pack of 100 requests will be billed at $0.50


`volume`

-   is required
-   Type: `number` ([volume](sla4oai-definitions-operationcost-properties-volume.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-operationcost-properties-volume.md "SLA4OAI#/definitions/OperationCost/properties/volume")

### volume Type

`number` ([volume](sla4oai-definitions-operationcost-properties-volume.md))

### volume Examples

```json
"100"
```
