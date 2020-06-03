# sla Schema

```txt
SLA4OAI#/definitions/Context/properties/sla
```

Indicates the version of the SLA format.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../SLA4OAI.schema.json "open original schema") |

## sla Type

`string` ([sla](sla4oai-definitions-context-properties-sla.md))

## sla Constraints

**pattern**: the string must match the following regular expression: 

```regexp
(?:^\d.\d.\d$)|^(?:^\d.\d$)
```

[try pattern](https://regexr.com/?expression=(%3F%3A%5E%5Cd.%5Cd.%5Cd%24)%7C%5E(%3F%3A%5E%5Cd.%5Cd%24) "try regular expression with regexr.com")

## sla Default Value

The default value is:

```json
"1.0"
```

## sla Examples

```json
"1.0"
```

```json
"1.0.0"
```
