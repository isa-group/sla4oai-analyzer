# Context Schema

```txt
SLA4OAI#/definitions/Context
```

Holds the main information of the SLA context


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## Context Type

`object` ([Context](sla4oai-definitions-context.md))

# Context Properties

| Property              | Type          | Required | Nullable       | Defined by                                                                                                                 |
| :-------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------- |
| [api](#api)           | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-api.md "SLA4OAI#/definitions/Context/properties/api")           |
| [consumer](#consumer) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-consumer.md "SLA4OAI#/definitions/Context/properties/consumer") |
| [id](#id)             | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-id.md "SLA4OAI#/definitions/Context/properties/id")             |
| [provider](#provider) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-provider.md "SLA4OAI#/definitions/Context/properties/provider") |
| [sla](#sla)           | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-sla.md "SLA4OAI#/definitions/Context/properties/sla")           |
| [type](#type)         | `string`      | Required | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-type.md "SLA4OAI#/definitions/Context/properties/type")         |
| [validity](#validity) | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-context-properties-validity.md "SLA4OAI#/definitions/Context/properties/validity") |

## api

Indicates a URI (absolute or relative) describing the API, described in the OpenAPI format, to be instrumented.


`api`

-   is required
-   Type: `string` ([api](sla4oai-definitions-context-properties-api.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-api.md "SLA4OAI#/definitions/Context/properties/api")

### api Type

`string` ([api](sla4oai-definitions-context-properties-api.md))

### api Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

### api Examples

```json
"https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml"
```

## consumer

Consumer information, data about the entity that consumes the service. This field is required in case of the context type is instance.


`consumer`

-   is optional
-   Type: `string` ([consumer](sla4oai-definitions-context-properties-consumer.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-consumer.md "SLA4OAI#/definitions/Context/properties/consumer")

### consumer Type

`string` ([consumer](sla4oai-definitions-context-properties-consumer.md))

### consumer Examples

```json
"MyConsumer"
```

## id

The identification of the SLA context.


`id`

-   is required
-   Type: `string` ([id](sla4oai-definitions-context-properties-id.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-id.md "SLA4OAI#/definitions/Context/properties/id")

### id Type

`string` ([id](sla4oai-definitions-context-properties-id.md))

### id Examples

```json
"PetPlans"
```

## provider

Provider information: data about the owner/host of the API. This field is required in case of the context type is instance.


`provider`

-   is optional
-   Type: `string` ([provider](sla4oai-definitions-context-properties-provider.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-provider.md "SLA4OAI#/definitions/Context/properties/provider")

### provider Type

`string` ([provider](sla4oai-definitions-context-properties-provider.md))

### provider Examples

```json
"MyProvider"
```

## sla

Indicates the version of the SLA format.


`sla`

-   is required
-   Type: `string` ([sla](sla4oai-definitions-context-properties-sla.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-sla.md "SLA4OAI#/definitions/Context/properties/sla")

### sla Type

`string` ([sla](sla4oai-definitions-context-properties-sla.md))

### sla Constraints

**pattern**: the string must match the following regular expression: 

```regexp
(?:^\d.\d.\d$)|^(?:^\d.\d$)
```

[try pattern](https://regexr.com/?expression=(%3F%3A%5E%5Cd.%5Cd.%5Cd%24)%7C%5E(%3F%3A%5E%5Cd.%5Cd%24) "try regular expression with regexr.com")

### sla Default Value

The default value is:

```json
"1.0"
```

### sla Examples

```json
"1.0"
```

```json
"1.0.0"
```

## type

The type of SLA based on the Lifecycle of Agreement (plans or instance).


`type`

-   is required
-   Type: `string` ([type](sla4oai-definitions-context-properties-type.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-type.md "SLA4OAI#/definitions/Context/properties/type")

### type Type

`string` ([type](sla4oai-definitions-context-properties-type.md))

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | ----------- |
| `"instance"` |             |
| `"plans"`    |             |

### type Examples

```json
"plans"
```

```json
"instance"
```

## validity

Availability of the service expressed via time slots. This field is required in case of the context type is instance.


`validity`

-   is optional
-   Type: unknown ([validity](sla4oai-definitions-context-properties-validity.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-context-properties-validity.md "SLA4OAI#/definitions/Context/properties/validity")

### validity Type

unknown ([validity](sla4oai-definitions-context-properties-validity.md))
