# OverageCost Schema

```txt
SLA4OAI#/definitions/OverageCost
```

The overage cost


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## OverageCost Type

`object` ([OverageCost](sla4oai-definitions-overagecost.md))

# OverageCost Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                     |
| :---------------- | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| [cost](#cost)     | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-overagecost-properties-cost.md "SLA4OAI#/definitions/OverageCost/properties/cost")     |
| [excess](#excess) | `number` | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-overagecost-properties-excess.md "SLA4OAI#/definitions/OverageCost/properties/excess") |

## cost

Cost to be billed as overage. For example, once hitted the quota value, each pack of 1000 requests will be billed at $1.50


`cost`

-   is required
-   Type: `number` ([cost](sla4oai-definitions-overagecost-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-overagecost-properties-cost.md "SLA4OAI#/definitions/OverageCost/properties/cost")

### cost Type

`number` ([cost](sla4oai-definitions-overagecost-properties-cost.md))

### cost Examples

```json
"1.50"
```

## excess

Excess of operations subject to be billed as overage. For example, once hitted the quota value, each pack of 1000 requests will be billed at $1.5


`excess`

-   is required
-   Type: `number` ([excess](sla4oai-definitions-overagecost-properties-excess.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-overagecost-properties-excess.md "SLA4OAI#/definitions/OverageCost/properties/excess")

### excess Type

`number` ([excess](sla4oai-definitions-overagecost-properties-excess.md))

### excess Examples

```json
"1000"
```
