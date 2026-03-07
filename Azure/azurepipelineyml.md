# Azure DevOps Pipeline – Playwright Test Execution

This Azure DevOps pipeline YAML defines a job that:

1. Installs Node.js dependencies
2. Runs Playwright tests
3. Publishes the Playwright report as a pipeline artifact

---

# 1. Job Definition

```yaml
jobs:
  - job: Build
```

- Defines a **job named `Build`**.
- A job runs on an **Azure DevOps agent (virtual machine)**.
- Steps inside the job run **sequentially**.

---

# 2. Step 1 – Install Dependencies

```yaml
- task: PowerShell@2
  enabled: true
  displayName: "Install dependencies"
```

This step uses the **PowerShell task (version 2)**.

### Purpose
Install Node.js project dependencies before running tests.

### Inputs

```yaml
inputs:
  targetType: 'inline'
  script: 'npm ci'
  workingDirectory: tests/
```

| Field | Description |
|-----|-----|
| targetType | Script written directly in YAML |
| script | Runs `npm ci` |
| workingDirectory | Executes inside the `tests/` folder |

### Why `npm ci`?

`npm ci` is recommended for CI pipelines because:

- Installs **exact versions** from `package-lock.json`
- **Faster** than `npm install`
- Ensures **clean and consistent builds**

---

# 3. Step 2 – Run Playwright Tests

```yaml
- task: AzureCLI@2
  displayName: Run Playwright Test
```

This step runs a script using the **Azure CLI task**.

It allows the pipeline to authenticate with Azure using a **Service Connection**.

---

## Environment Variables

```yaml
env:
  PLAYWRIGHT_SERVICE_URL: $(PLAYWRIGHT_SERVICE_URL)
  PLAYWRIGHT_SERVICE_RUN_ID: $(Build.DefinitionName) - $(Build.BuildNumber) - $(System.JobAttempt)
```

These variables are passed to the Playwright execution.

### PLAYWRIGHT_SERVICE_URL
Stored as a **pipeline variable**.

Example:

```
https://playwright.service.azure.com
```

---

### PLAYWRIGHT_SERVICE_RUN_ID

Creates a **unique test run identifier**.

Example:

```
MyPipeline - 20260306.2 - 1
```

It is built from:

| Variable | Meaning |
|---|---|
| Build.DefinitionName | Pipeline name |
| Build.BuildNumber | Build number |
| System.JobAttempt | Retry attempt count |

This helps track runs in Playwright reporting systems.

---

## Azure CLI Task Inputs

```yaml
inputs:
  azureSubscription: 'rahulshettyacademy'
```

Uses an **Azure DevOps Service Connection** named:

```
rahulshettyacademy
```

This connection allows the pipeline to authenticate with Azure.

---

### Script Type

```yaml
scriptType: 'pscore'
```

Runs the script using **PowerShell Core**.

---

### Script Location

```yaml
scriptLocation: 'inlineScript'
```

Script is written directly inside the YAML file.

---

### Script Executed

```yaml
inlineScript: |
  npx playwright test --config=playwright.service.config.js --workers=20
```

Runs Playwright tests.

| Option | Description |
|---|---|
| npx playwright test | Executes Playwright test runner |
| --config | Uses custom Playwright configuration |
| --workers=20 | Runs tests in parallel using 20 workers |

Parallel workers help **speed up test execution**.

---

### Service Principal Access

```yaml
addSpnToEnvironment: true
```

Adds Azure **Service Principal credentials** as environment variables.

This allows scripts to authenticate with Azure services if required.

---

# 4. Step 3 – Publish Playwright Report

```yaml
- task: PublishPipelineArtifact@1
  displayName: Upload Playwright report
```

Uploads the generated Playwright test report as a **pipeline artifact**.

---

## Inputs

```yaml
inputs:
  targetPath: tests/playwright-report/
```

Location where Playwright generates the HTML report.

Example:

```
tests/playwright-report/index.html
```

---

```yaml
artifact: 'Playwright tests'
```

Name of the artifact shown in the pipeline UI.

Example:

```
Artifacts
 └ Playwright tests
```

---

```yaml
publishLocation: 'pipeline'
```

Stores the artifact inside **Azure DevOps pipeline storage**.

---

# Pipeline Execution Flow

```
Start Pipeline
      │
      ▼
Install Dependencies
(npm ci)
      │
      ▼
Run Playwright Tests
(20 parallel workers)
      │
      ▼
Generate Playwright HTML Report
      │
      ▼
Upload Report as Pipeline Artifact
```

---

# Benefits of This Pipeline

- Automated Playwright testing
- Faster execution with parallel workers
- Secure Azure authentication
- Test reporting through pipeline artifacts
- Easy CI/CD integration

---

# Example Pipeline Output

```
Build Job
 ├ Install dependencies
 ├ Run Playwright Test
 └ Upload Playwright report
```

Artifacts:

```
Playwright tests
 └ playwright-report
      └ index.html
```

The report can be downloaded and viewed in a browser.

---

# Summary

This pipeline performs three main tasks:

1. Installs dependencies using `npm ci`
2. Runs Playwright tests with parallel workers
3. Uploads the Playwright HTML report as a pipeline artifact

This setup enables **automated UI testing within Azure DevOps CI/CD pipelines**.