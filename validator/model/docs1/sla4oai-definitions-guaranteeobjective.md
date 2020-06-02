# GuaranteeObjective Schema

```txt
SLA4OAI#/definitions/GuaranteeObjective
```

An object describes the guarantee level.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## GuaranteeObjective Type

`object` ([GuaranteeObjective](sla4oai-definitions-guaranteeobjective.md))

# GuaranteeObjective Properties

| Property                | Type          | Required | Nullable       | Defined by                                                                                                                                         |
| :---------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| [objective](#objective) | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-objective.md "SLA4OAI#/definitions/GuaranteeObjective/properties/objective") |
| [period](#period)       | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-period.md "SLA4OAI#/definitions/GuaranteeObjective/properties/period")       |
| [scope](#scope)         | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-scope.md "SLA4OAI#/definitions/GuaranteeObjective/properties/scope")         |
| [window](#window)       | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-window.md "SLA4OAI#/definitions/GuaranteeObjective/properties/window")       |

## objective

The objective of the guarantee. Supported expression syntax has a single form: Property + Operator + Value
// _ @pattern \\w+\\s_((!=)?|(&lt;=)?|(>=)?|(==)?|(&lt;)?|(>)?)?\\s\*\\d+


`objective`

-   is required
-   Type: `string` ([objective](sla4oai-definitions-guaranteeobjective-properties-objective.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-objective.md "SLA4OAI#/definitions/GuaranteeObjective/properties/objective")

### objective Type

`string` ([objective](sla4oai-definitions-guaranteeobjective-properties-objective.md))

### objective Examples

```json
"avgResponseTimeMs <= 250"
```

## period

The period of the objective


`period`

-   is optional
-   Type: unknown ([period](sla4oai-definitions-guaranteeobjective-properties-period.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-period.md "SLA4OAI#/definitions/GuaranteeObjective/properties/period")

### period Type

unknown ([period](sla4oai-definitions-guaranteeobjective-properties-period.md))

## scope

The scope of who request the service.


`scope`

-   is optional
-   Type: `string` ([scope](sla4oai-definitions-guaranteeobjective-properties-scope.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-scope.md "SLA4OAI#/definitions/GuaranteeObjective/properties/scope")

### scope Type

`string` ([scope](sla4oai-definitions-guaranteeobjective-properties-scope.md))

### scope Examples

```json
"account"
```

```json
"tenant"
```

## window

The state of the Objective (dynamic or static)


`window`

-   is optional
-   Type: `string` ([window](sla4oai-definitions-guaranteeobjective-properties-window.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-guaranteeobjective-properties-window.md "SLA4OAI#/definitions/GuaranteeObjective/properties/window")

### window Type

`string` ([window](sla4oai-definitions-guaranteeobjective-properties-window.md))

### window Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value       | Explanation |
| :---------- | ----------- |
| `"dynamic"` |             |
| `"static"`  |             |

### window Examples

```json
"dynamic "
```

```json
"static"
```
