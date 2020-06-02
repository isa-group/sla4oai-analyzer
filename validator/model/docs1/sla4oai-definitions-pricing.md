# Pricing Schema

```txt
SLA4OAI#/definitions/Pricing
```

Global pricing data.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                       |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | -------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [SLA4OAI.schema.json\*](../../../out/SLA4OAI.schema.json "open original schema") |

## Pricing Type

`object` ([Pricing](sla4oai-definitions-pricing.md))

# Pricing Properties

| Property              | Type          | Required | Nullable       | Defined by                                                                                                                 |
| :-------------------- | ------------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------- |
| [billing](#billing)   | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-billing.md "SLA4OAI#/definitions/Pricing/properties/billing")   |
| [cost](#cost)         | Merged        | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-cost.md "SLA4OAI#/definitions/Pricing/properties/cost")         |
| [currency](#currency) | `string`      | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-currency.md "SLA4OAI#/definitions/Pricing/properties/currency") |
| [period](#period)     | Not specified | Optional | cannot be null | [SLA4OAI schema](sla4oai-definitions-pricing-properties-period.md "SLA4OAI#/definitions/Pricing/properties/period")     |

## billing

Period used for billing. Supported values are: - onepay Unique payment before start using the service. - daily Billing at end of the day. - weekly Billing at end of the week. - monthly Billing at end of the month. - quarterly Billing at end of the quarter. - yearly Billing at end of the year. Default to monthly if unspecified.


`billing`

-   is optional
-   Type: `string` ([billing](sla4oai-definitions-pricing-properties-billing.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-billing.md "SLA4OAI#/definitions/Pricing/properties/billing")

### billing Type

`string` ([billing](sla4oai-definitions-pricing-properties-billing.md))

### billing Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | ----------- |
| `"daily"`     |             |
| `"monthly"`   |             |
| `"onepay"`    |             |
| `"quarterly"` |             |
| `"weekly"`    |             |
| `"yearly"`    |             |

### billing Default Value

The default value is:

```json
"monthly"
```

### billing Examples

```json
"onepay"
```

```json
"daily"
```

```json
"weekly"
```

```json
"monthly"
```

```json
"quarterly"
```

```json
"yearly"
```

## cost

Cost associated with this service. Defaults to 0 if unspecified.


`cost`

-   is optional
-   Type: merged type ([cost](sla4oai-definitions-pricing-properties-cost.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-cost.md "SLA4OAI#/definitions/Pricing/properties/cost")

### cost Type

merged type ([cost](sla4oai-definitions-pricing-properties-cost.md))

any of

-   [SLA4OAI schema](sla4oai-definitions-pricing-properties-cost-anyof-0.md "check type definition")
-   [Untitled number in SLA4OAI](sla4oai-definitions-pricing-properties-cost-anyof-1.md "check type definition")

### cost Examples

```json
"0"
```

```json
"9.99"
```

## currency

Currency used to express the cost. Supported currency values are expressed in ISO 4217 format. Samples: USD, EUR, or BTC for US dollar, euro, or bitcoin, respectively. Defaults to USD if unspecified.


`currency`

-   is optional
-   Type: `string` ([currency](sla4oai-definitions-pricing-properties-currency.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-currency.md "SLA4OAI#/definitions/Pricing/properties/currency")

### currency Type

`string` ([currency](sla4oai-definitions-pricing-properties-currency.md))

### currency Constraints

**pattern**: the string must match the following regular expression: 

```regexp
^ADF|ADP|AED|AFA|AFN|ALL|AMD|ANG|AOA|AOK|AON|AOR|ARA|ARL|ARP|ARS|ATS|AUD|AWG|AZM|AZN|BAD|BAM|BBD|BDT|BEF|BGL|BGN|BHD|BIF|BMD|BND|BOB|BOP|BOV|BRB|BRC|BRE|BRL|BRN|BRR|BSD|BTN|BWP|BYB|BYN|BYR|BZD|CAD|CDF|CHE|CHF|CHW|CLE|CLF|CLP|CNY|COP|COU|CRC|CSD|CSK|CUC|CUP|CVE|CYP|CZK|DDM|DEM|DJF|DKK|DOP|DZD|ECS|ECV|EEK|EGP|ERN|ESA|ESB|ESP|ETB|EUR|FIM|FJD|FKP|FRF|GBP|GEL|GHC|GHS|GIP|GMD|GNE|GNF|GQE|GRD|GTQ|GWP|HKD|HNL|HRD|HRK|HTG|HUF|IDR|IEP|ILP|ILR|ILS|INR|IQD|IRR|ISJ|ISK|ITL|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LBP|LKR|LRD|LSL|LTL|LUF|LVL|LYD|MAD|MAF|MCF|MDL|MGA|MGF|MKD|MKN|MLV|MMK|MNT|MOP|MRO|MTL|MUR|MVQ|MVR|MWK|MXN|MXP|MXV|MYR|MZM|MZN|NAD|NGN|NIO|NLG|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PTE|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SIT|SKK|SLL|SML|SOS|SRD|SSP|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UZS|VAL|VEF|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XBT|XCD|XDR|XFU|XOK|XPD|XPF|XPT|XSU|XTS|XUA|YER|ZAR|ZMW|ZWL$
```

[try pattern](https://regexr.com/?expression=%5EADF%7CADP%7CAED%7CAFA%7CAFN%7CALL%7CAMD%7CANG%7CAOA%7CAOK%7CAON%7CAOR%7CARA%7CARL%7CARP%7CARS%7CATS%7CAUD%7CAWG%7CAZM%7CAZN%7CBAD%7CBAM%7CBBD%7CBDT%7CBEF%7CBGL%7CBGN%7CBHD%7CBIF%7CBMD%7CBND%7CBOB%7CBOP%7CBOV%7CBRB%7CBRC%7CBRE%7CBRL%7CBRN%7CBRR%7CBSD%7CBTN%7CBWP%7CBYB%7CBYN%7CBYR%7CBZD%7CCAD%7CCDF%7CCHE%7CCHF%7CCHW%7CCLE%7CCLF%7CCLP%7CCNY%7CCOP%7CCOU%7CCRC%7CCSD%7CCSK%7CCUC%7CCUP%7CCVE%7CCYP%7CCZK%7CDDM%7CDEM%7CDJF%7CDKK%7CDOP%7CDZD%7CECS%7CECV%7CEEK%7CEGP%7CERN%7CESA%7CESB%7CESP%7CETB%7CEUR%7CFIM%7CFJD%7CFKP%7CFRF%7CGBP%7CGEL%7CGHC%7CGHS%7CGIP%7CGMD%7CGNE%7CGNF%7CGQE%7CGRD%7CGTQ%7CGWP%7CHKD%7CHNL%7CHRD%7CHRK%7CHTG%7CHUF%7CIDR%7CIEP%7CILP%7CILR%7CILS%7CINR%7CIQD%7CIRR%7CISJ%7CISK%7CITL%7CJMD%7CJOD%7CJPY%7CKES%7CKGS%7CKHR%7CKMF%7CKPW%7CKRW%7CKWD%7CKYD%7CKZT%7CLAK%7CLBP%7CLKR%7CLBP%7CLKR%7CLRD%7CLSL%7CLTL%7CLUF%7CLVL%7CLYD%7CMAD%7CMAF%7CMCF%7CMDL%7CMGA%7CMGF%7CMKD%7CMKN%7CMLV%7CMMK%7CMNT%7CMOP%7CMRO%7CMTL%7CMUR%7CMVQ%7CMVR%7CMWK%7CMXN%7CMXP%7CMXV%7CMYR%7CMZM%7CMZN%7CNAD%7CNGN%7CNIO%7CNLG%7CNOK%7CNPR%7CNZD%7COMR%7CPAB%7CPEN%7CPGK%7CPHP%7CPKR%7CPLN%7CPTE%7CPYG%7CQAR%7CRON%7CRSD%7CRUB%7CRWF%7CSAR%7CSBD%7CSCR%7CSDG%7CSEK%7CSGD%7CSHP%7CSIT%7CSKK%7CSLL%7CSML%7CSOS%7CSRD%7CSSP%7CSTD%7CSVC%7CSYP%7CSZL%7CTHB%7CTJS%7CTMT%7CTND%7CTOP%7CTRY%7CTTD%7CTWD%7CTZS%7CUAH%7CUGX%7CUSD%7CUSN%7CUYI%7CUYU%7CUZS%7CVAL%7CVEF%7CVND%7CVUV%7CWST%7CXAF%7CXAG%7CXAU%7CXBA%7CXBB%7CXBC%7CXBD%7CXBT%7CXCD%7CXDR%7CXFU%7CXOK%7CXPD%7CXPF%7CXPT%7CXSU%7CXTS%7CXUA%7CYER%7CZAR%7CZMW%7CZWL%24 "try regular expression with regexr.com")

### currency Default Value

The default value is:

```json
"USD"
```

### currency Examples

```json
"EUR"
```

```json
"USD"
```

## period

The period of the limit


`period`

-   is optional
-   Type: unknown ([period](sla4oai-definitions-pricing-properties-period.md))
-   cannot be null
-   defined in: [SLA4OAI schema](sla4oai-definitions-pricing-properties-period.md "SLA4OAI#/definitions/Pricing/properties/period")

### period Type

unknown ([period](sla4oai-definitions-pricing-properties-period.md))
