// @TJS-format date-time
// @TJS-format uri
// @TJS-minimum 5

/**
 * SLA4OAI
 * @id SLA4OAI
 */
class SLA4OAI {
    /**
     * Holds the main information of the SLA context.
     */
    context: Context

    /**
     * Provides information about tooling used for SLA storage, calculation, governance, etc.
     */
    infrastructure: Infrastructure

    /**
     * Global pricing data.
     */
    pricing?: Pricing

    /**
     * A list of metrics to use in the context of the SLA.
     */
    metrics: Metrics

    /**
     * A set of plans to define different service levels per plan.
     */
    plans?: Plans

    /**
     * Global quotas, these are the default quotas, but they could be overridden by each plan later.
     */
    quotas?: Quotas

    /**
     * Global rates, these are the default rates, but they could be overridden by each plan later.
     */
    rates?: Rates

    /**
     * Global guarantees, these are the default guarantees, but they could be overridden by each plan later.
     */
    guarantees?: Guarantees

    /**
     * Define the default configurations, later each plan can be override it.
     */
    configuration?: Configuration

    /**
     * Define the default availability, later each plan can be override it.
     */
    availability?: string

    constructor(options = {}) {
        Object.assign(this, options);
    }
}


class Context {

    /**
     * The identification of the SLA context.
     * @TJS-examples ["PetPlans"]
     */
    id: string

    /**
     * Indicates the version of the SLA format.
     * @pattern (?:^\d.\d.\d$)|^(?:^\d.\d$)
     * @default "1.0"
     * @TJS-examples ["1.0", "1.0.0"]
     */
    sla: string

    /**
     * Indicates a URI (absolute or relative) describing the API, described in the OpenAPI format, to be instrumented.
     * @TJS-format uri
     * @TJS-examples ["https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.yaml"]
     */
    api: string

    /**
     * The type of SLA based on the Lifecycle of Agreement (plans or instance).
     * @TJS-examples ["plans", "instance"]
     */
    type: "plans" | "instance"

    /**
    * Provider information: data about the owner/host of the API. This field is required in case of the context type is instance.
    * @TJS-examples ["MyProvider"]
    */
    provider?: string

    /**
     * Consumer information, data about the entity that consumes the service. This field is required in case of the context type is instance.
     * @TJS-examples ["MyConsumer"]
     */
    consumer?: string

    /**
     * Availability of the service expressed via time slots. This field is required in case of the context type is instance.
     */
    validity?: Validity
}

class Infrastructure {

    /**
     * Location of the SLA Check service accordingly to the Basic SLA Management Service spec.
     * @TJS-format uri
     * @TJS-examples ["https://supervisor.sla4oai.governify.io/v2/"]
     */
    supervisor: string

    /**
     * Location of the SLA Metrics endpoint accordingly to the Basic SLA Management Service spec.
     * @TJS-format uri
     * @TJS-examples ["https://monitor.sla4oai.governify.io/v1/"]
     */
    monitor: string
    /**
     * Optional endpoints of SLA governance infrastructure.
     * @TJS-format uri
     */
    [x: string]: string
}

class Pricing {
    /**
     * Cost associated with this service. Defaults to 0 if unspecified.
     * @default 0
     * @TJS-examples ["0","9.99"]
     */
    cost?: number

    /**
     * Currency used to express the cost. Supported currency values are expressed in ISO 4217 format. Samples: USD, EUR, or BTC for US dollar, euro, or bitcoin, respectively. Defaults to USD if unspecified.
     * @pattern ^ADF|ADP|AED|AFA|AFN|ALL|AMD|ANG|AOA|AOK|AON|AOR|ARA|ARL|ARP|ARS|ATS|AUD|AWG|AZM|AZN|BAD|BAM|BBD|BDT|BEF|BGL|BGN|BHD|BIF|BMD|BND|BOB|BOP|BOV|BRB|BRC|BRE|BRL|BRN|BRR|BSD|BTN|BWP|BYB|BYN|BYR|BZD|CAD|CDF|CHE|CHF|CHW|CLE|CLF|CLP|CNY|COP|COU|CRC|CSD|CSK|CUC|CUP|CVE|CYP|CZK|DDM|DEM|DJF|DKK|DOP|DZD|ECS|ECV|EEK|EGP|ERN|ESA|ESB|ESP|ETB|EUR|FIM|FJD|FKP|FRF|GBP|GEL|GHC|GHS|GIP|GMD|GNE|GNF|GQE|GRD|GTQ|GWP|HKD|HNL|HRD|HRK|HTG|HUF|IDR|IEP|ILP|ILR|ILS|INR|IQD|IRR|ISJ|ISK|ITL|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LBP|LKR|LRD|LSL|LTL|LUF|LVL|LYD|MAD|MAF|MCF|MDL|MGA|MGF|MKD|MKN|MLV|MMK|MNT|MOP|MRO|MTL|MUR|MVQ|MVR|MWK|MXN|MXP|MXV|MYR|MZM|MZN|NAD|NGN|NIO|NLG|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PTE|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SIT|SKK|SLL|SML|SOS|SRD|SSP|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UZS|VAL|VEF|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XBT|XCD|XDR|XFU|XOK|XPD|XPF|XPT|XSU|XTS|XUA|YER|ZAR|ZMW|ZWL$
     * @default "USD"
     * @TJS-examples ["EUR", "USD"]
     */
    currency?: string

    /**
     * Period used for billing. Supported values are: - onepay Unique payment before start using the service. - daily Billing at end of the day. - weekly Billing at end of the week. - monthly Billing at end of the month. - quarterly Billing at end of the quarter. - yearly Billing at end of the year. Default to monthly if unspecified.
     * @default monthly
     * @TJS-examples ["onepay","daily","weekly","monthly","quarterly","yearly"]
     */
    billing?: "onepay" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
}

class Metrics {

    /**
     * Definitions of metrics with name, types and descriptions or Reference to pre-existing metrics in external file.
     * @TJS-examples ["$ref": "./metrics.yml#request"]
     */
    [metricName: string]: Metric | string
}

class Plans {

    /**
    * Describes a usage plan for the API with its associate costs, availability and guarantees.
    */
    [planName: string]: Plan
}


class Quotas {

    /**
    * Describes the API endpoint path quota configurations.
    */
    [pathName: string]: Path
}

class Rates {

    /**
    * Describes the API endpoint path rate configurations.
    */
    [pathName: string]: Path
}

class Guarantees {

    /**
    * Describes a guarantee level supported by the plan.
    */
    [pathName: string]: Guarantee
}

class Configuration {

    /**
    * Configurations description.
    * @TJS-examples ['"xmlFormat": true']
    */
    [name: string]: string
}

class Validity {
    /**
     * The starting date of the SLA agreement using the ISO 8601 time intervals format.
     * @TJS-format date-time
     * @TJS-examples ["2009-10-09T21:30:00.00Z"]
     */
    effectiveDate: string

    /**
     * The expiration date of the SLA agreement using the ISO 8601 time intervals format.
     * @TJS-format date-time
     * @TJS-examples ["2015-11-15T23:30:00.00Z"]
     */
    expirationDate?: string
}

class Path {

    /**
    * The operations attached to this path.
    */
    [methodName: string]: Operation
}

class Guarantee {

    /**
    * An object describes the guarantee level.
    */
    [methodName: string]: GuaranteeObjective[]
}

class Metric {

    /**
    * This is the metric type accordingly to the OAI spec format column.
    * @TJS-examples ["integer", "number", "string", "boolean"]
    */
    type?: "integer" | "number" | "string" | "boolean"

    /**
    * The extending format for the previously mentioned type. See Data Type Formats for further details.
    * @TJS-examples ["int32", "int64", "float", "double", "string", "byte", "binary", "date", "date-time"]
    */
    format?: "int32" | "int64" | "float" | "double" | "string" | "byte" | "binary" | "date" | "date-time"

    /**
    * A brief description of the metric.
    * @TJS-examples ["Number of requests"]
    */
    description?: string

    /**
    * The unit of the metric.
    * @TJS-examples ["MB/s", "GB"]
    */
    unit?: string

    /**
    * Determine when this metric will be resolved. If value is check the metric will be sent before the calculation of SLA state, else if value is consumption the metric will be sent after consumption.
    */
    resolution?: "check" | "consumption"
}

class Plan {

    /**
    * Configuration parameters for the service tailored for the plan.
    */
    configuration?: Configuration

    /**
    * Availability of the service for this plan expressed via time slots using the ISO 8601 time intervals format.
    * @TJS-format date-time
    * @TJS-examples ["2009-10-09T21:30:00.00Z"]

    */
    availability?: string

    /**
    * Specific pricing data for this plan. Overrides default pricing data defined before.
    */
    pricing?: Pricing

    /**
    * Specific quotas data for this plan. Overrides default quotas data defined before.
    */
    quotas?: Quotas

    /**
    * Specific rates data for this plan. Overrides default rates data defined before.
    */
    rates?: Rates

    /**
    * Specific guarantees data for this plan. Overrides default guarantees data defined before.
    */
    guarantees?: Guarantees
}

class Operation {
    /**
    * The allowed limits of the request.
    */
    [metricName: string]: Limit[]
}

class GuaranteeObjective {
    /**
    * The objective of the guarantee. Supported expression syntax has a single form: Property + Operator + Value
    // * @pattern \w+\s*((!=)?|(<=)?|(>=)?|(==)?|(<)?|(>)?)?\s*\d+
    * @TJS-examples ["avgResponseTimeMs <= 250"]
    */
    objective: string

    /**
    * The period of the objective (secondly, minutely, hourly, daily, monthly or yearly).
    * @TJS-examples ["secondly","minutely", "hourly", "daily", "monthly", "yearly"]
    */
    // period?: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
    period?: "secondly" | "minutely" | "hourly" | "daily" | "monthly" | "yearly"

    /**
    * The state of the Objective (dynamic or static)
    * @TJS-examples ["dynamic ","static"]
    */
    window?: "dynamic" | "static"

    /**
    * The scope of who request the service.
    * @TJS-examples ["account", "tenant"]
    */
    scope?: string
}

class Limit {

    /**
    * Max value that can be accepted.
    * @minimum 0
    * @TJS-examples ["0","5000"]
    */
    max: number

    /**
    * The period of the objective (secondly, minutely, hourly, daily, monthly or yearly).
    * @TJS-examples ["secondly","minutely", "hourly", "daily", "monthly", "yearly"]
    */
    // period?: "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year" | "decade" | "century" | "forever"
    period?: "secondly" | "minutely" | "hourly" | "daily" | "monthly" | "yearly"

    /**
    * The scope of who request the service.
    * @TJS-examples ["account", "tenant"]
    */
    scope?: string
}


