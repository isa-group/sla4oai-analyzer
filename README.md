# sla4oai-analyzer

[![NPM](https://nodei.co/npm/sla4oai-analyzer.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sla4oai-analyzer/)

This module can be used to automatically validate a RESTful API pricing described with SLA4OAI. It checks for various inconsistencies according to a set of validity criteria, and outputs whether the pricing is valid or not. If it is not valid, the tool returns all detected issues.

## 1\. Install sla4oai-analyzer

```bash
npm install sla4oai-analyzer -g
```

## 2\. Use sla4oai-analyzer command

### 2.1\. Help

```bash
$ sla4oai-analyzer --help

Usage:  sla4oai-analyzer -o validity -f <SLA4OAI file in YAML or JSON>

  Options:
    -v, --version                    output the current version
    -o, --operation <operation>      allowed operations ["validity"]
    -f, --file <file>                path to the yaml/json file
    -h, --help                       display help for command
```

### 2.2 Examples

Validate an SLA4OAI file: install sla4oai-analyzer and indicate the operation (only validity is currently supported) and the path to the file.

```bash
$ sla4oai-analyzer -o validity -f petclinic-sla4oai.yaml
```

The tool will check the syntax and the validity of the file, and, if there are any issues, it will output the specific inconsistencies that were detected.