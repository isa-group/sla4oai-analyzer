# Cost Schema

```txt
SLA4OAI#/definitions/Cost
```

Cost associated to this plan.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## Cost Type

`object` ([Cost](sla4oai-definitions-cost.md))

# Cost Properties

| Property                  | Type          | Required | Nullable       | Defined by                                                                                                               |
| :------------------------ | ------------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------- |
| [calculated](#calculated) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-cost-properties-calculated.md "SLA4OAI#/definitions/Cost/properties/calculated") |
| [operation](#operation)   | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-cost-properties-operation.md "SLA4OAI#/definitions/Cost/properties/operation")   |
| [overage](#overage)       | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-cost-properties-overage.md "SLA4OAI#/definitions/Cost/properties/overage")       |

## calculated

Calculated cost


`calculated`

-   is optional
-   Type: `string` ([calculated](sla4oai-definitions-cost-properties-calculated.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-cost-properties-calculated.md "SLA4OAI#/definitions/Cost/properties/calculated")

### calculated Type

`string` ([calculated](sla4oai-definitions-cost-properties-calculated.md))

## operation

The operation cost


`operation`

-   is optional
-   Type: unknown ([operation](sla4oai-definitions-cost-properties-operation.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-cost-properties-operation.md "SLA4OAI#/definitions/Cost/properties/operation")

### operation Type

unknown ([operation](sla4oai-definitions-cost-properties-operation.md))

## overage

The overage cost


`overage`

-   is optional
-   Type: unknown ([overage](sla4oai-definitions-cost-properties-overage.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-cost-properties-overage.md "SLA4OAI#/definitions/Cost/properties/overage")

### overage Type

unknown ([overage](sla4oai-definitions-cost-properties-overage.md))
