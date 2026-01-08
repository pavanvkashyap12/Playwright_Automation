# Playwright Automation Testing From Scratch With FrameWork

### Playwright is a powerful end-to-end testing framework that enables relaiable automation for modern web applications.

This course will take you on a comprehensive journey, teaching you how to leverage Playwright's capabilities using ***JavaScript/TypeScript*** to build robust and efficient automation tests from scratch, using a well-structured framework
___

# Why Playwright ?

### 1. Reliable End-to-End Testing
Playwright's auto wait capability ensures reliable and stable end-to-end testing for modern web applications, even in the face of dynamic and complex user interactions.

### 2. Cross Browser Compatibility
Plawright supports all major browsers, including Chromium-based(Chrome and Edge),Firefox,Safari(Webkit) and Opera, allowing you to test your web applications across a wide range of browsers and platforms.

### 3. Multiplatform Support
Playwright works seamlessly on Windows,macOS,Linux and also supports native mobile emulation for Google Chrome on Android and Safari on iOS, enabling comprehensive testing across different devices and operating systems.

### 4. Multilingual Flexibility
Playwright provides language bindings for JavaScript,TypeScript,Java,Python and C#(.NET) allowing you to choose the programming language that best fits your teams preferences and expertise.
This is not available in Cypress which is competitor
___

# Playwright's Advanced Features

### 1. Tracing and Debugging
Leverage Playwright's built in tracing and debugging capabilities,including automatic screensots, test video recording and comprehensive logging to simply the process of identifing and esolving issues in your test suite.

Note: Same as Cypress it has testrunner and e can see action before after. Locator,source,call,error,console,logs,network,attachments,network tabs are also available to check.

### 2. Network Interception
Utilize Playwright's API testing libraries to intercept and validate network call within your webb application,enabling you to test edge case scenarios and ensure the resilience of your applications interactions.

### 3. Browser Context Management
Explore Playwright's browser contxet feature which allows you to save and transfer browser state across your test suite  improving test efficiency and reducing the overhead of setting up the same browser state for each test case.
Ex: We ave loggedIn in one browser and Cookies are stored. Now open incognito browser and incognito browser will be fresh. But playwight can take cookies,storage information on your locked browser and copy them into incognito bowser so that it automatically logins there as well ie directly login to dashboard without login.

### 4. Codegen Tool
Discover Playwright's codegen tool wich can generate test case by recording your actions saving you time and effort in creating initial test cases and providing a starting point for further cutomization.
___

# Installation
### What is node.js?
Node.js is a open-source,cross platform,backend Javascript runtime environment that runs on V8 engine and executes Javascript code outside of the browser.

playwright : https://playwright.dev/

Installation 
- create a folder PLAYWRIGTAUTOMATION
- terminal 
```bash
npm init playwright
```
- meaning we are creating new node project(npm init) but here playwright project. All project structure will be downloaded.

- Now it will ask JS/TS ? ```JS```, ultimately TS also compiles to JS. JS is 98% TS
- where to put your end-to-end tests ? ```tests``` folder is the default folder
- Add aGitHub Actions Workflow ? ```Y or true```
-  Install Playwright browsers ```(can be done manually via 'npx playwright install')```? (Y/n) ‣ ```true```
- Install Playwright operating system dependencies ```(requires sudo / root - can be done manually via 'sudo npx playwright install-deps')```? (y/N) · ```false```
- After all these playwright is installed with following folders 
    - .github/workflows -> playwright.yml
    - node_modules -> all playwright related jars i.e eecutable files
    - tests -> example.spec.js
    - .gitignore
    - package-lock.json
    - package.json -> it is created by default for an node project. This where we have info about dependencies of our project
    - playwright.config.js -> it is like a testrunner for entire project
    - tests and playwright.config.js are the two major files required to develop entire end to end framework ie UI,API,mock responses. To run tests we need this file. This is like configuration file to run tests

# NPM ERROR FOR WINDOWS USER
```bash
npm Error in PowerShell (for Windows Users)
Fixing the "running scripts is disabled on this system" npm Error in PowerShell

If you encountered a the below error that stops your commands from running. It often looks something like this:

This error isn't an issue with npm or Node.js itself.

It's a security feature of Windows PowerShell called the Execution Policy. By default, PowerShell is configured to prevent the execution of scripts to protect you from potentially malicious code. Since the npm command on Windows can be a PowerShell script (npm.ps1), the default policy blocks it.

The Solution: Changing the PowerShell Execution Policy

Follow these steps to safely allow scripts to run for your user account, which will resolve the npm error.

    1. Open PowerShell as an Administrator
    You need administrative privileges to change execution policies.            
        - Press the Windows key, then type "PowerShell".

        - Right-click on "Windows PowerShell" in the search results.

        - Select "Run as Administrator" from the context menu.

        - Click "Yes" on the User Account Control (UAC) prompt.

    2. Check Your Current Execution Policy

    Before making changes, it's good to see how your system is currently configured. Run the following command in the administrative PowerShell window:

        Get-ExecutionPolicy -List

    This command will display the execution policies set for all scopes (like LocalMachine, CurrentUser, etc.). You'll likely see that one or more scopes are set to Restricted or AllSigned.
    Set a New Execution Policy for Your User

    The safest way to fix this issue is to change the policy only for your user account, leaving the system-wide policy intact. The Bypass policy allows any script to run without warnings or prompts.

    3. Run this command to set the policy for the current user:

        Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass

        -Scope CurrentUser: This ensures the change only applies to your user account and doesn't require administrator rights for future PowerShell sessions.

        -ExecutionPolicy Bypass: This allows all scripts to run.

    PowerShell may ask for confirmation. Type Y and press Enter to confirm the change.
    Verify and Rerun Your Command

    You can now close the administrator PowerShell window and open a regular one (like the one in your code editor). Try running your command again:

        npm init playwright@latest

    The error should now be gone, and your command should execute as expected!

Important Considerations

    Security First: The Bypass policy removes a layer of security. Only run scripts from sources you trust. For most development work, this risk is minimal, but it's important to be aware of it.

    Alternative Scopes: While CurrentUser is recommended, you could apply this to the whole machine with Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy Bypass. This is generally not necessary and less secure.

```