# objective Schema

```txt
SLA4OAI#/definitions/GuaranteeObjective/properties/objective
```

The objective of the guarantee. Supported expression syntax has a single form: Property + Operator + Value
// _ @pattern \\w+\\s_((!=)?|(&lt;=)?|(>=)?|(==)?|(&lt;)?|(>)?)?\\s\*\\d+


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## objective Type

`string` ([objective](sla4oai-definitions-guaranteeobjective-properties-objective.md))

## objective Examples

```json
"avgResponseTimeMs <= 250"
```
