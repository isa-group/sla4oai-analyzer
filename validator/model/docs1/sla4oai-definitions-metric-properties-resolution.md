# resolution Schema

```txt
SLA4OAI#/definitions/Metric/properties/resolution
```

Determine when this metric will be resolved. If value is check the metric will be sent before the calculation of SLA state, else if value is consumption the metric will be sent after consumption.


| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## resolution Type

`string` ([resolution](sla4oai-definitions-metric-properties-resolution.md))

## resolution Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"check"`       |             |
| `"consumption"` |             |
