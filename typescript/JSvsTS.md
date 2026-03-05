# JavaScript vs TypeScript

## Key Points
- TypeScript is a superset of JavaScript, so all valid.JavaScript code is also a valid TypeScript Code.So if we name existing file as spec.ts it will become typescript
- TypeScript = JS + Additional features
- TypeScript = JS -> will run code but compalins type is not there,while complining it will give warning but still converts to TS
- TypeScript we cannot run directly, convert TS to JS and then run on node
- demo.js -> node demo.js
- demo.ts -> node demo.ts will not work
- demo.ts -> tsc demo.ts(typescript compiler) it compiles and generates equivalent js file -> demo.js
- Playwright internally converts ts to js 
- TypeScript's syntax extensions primarly focus on adding type annotations and other feautres that enhance code quality,readibility and maintainability 
- install typescript ```npm install typescript --save-dev``` or ```npm install typescript --include=dev```

## Key Differenes 
- Static Typing : TypeScript checks type during development,catching errors before you run your code. JS is dynamically typed,meaning type errors only surface at runtime.
- Strong Typing : TypeScript enforces strict tules about how you use types,preventing you from accidentally mixing incompatible types ie. reassinging ex: let message = "Hello", message=2. JS in more lenient.
- Type Definition : TS allows you to define complex types(interfaces,objects,etc) for better code organization and understanding.
- Tooling : TS has excellent editor support (autocompletion,type hints,error highlighting) that significantly improves the development experience compared to plain JavaScript.

```
In TypeScript, data types define the kind of value a variable can store. They help catch errors during development and provide better IntelliSense and code safety.

Below are the main TypeScript data types with examples.

1️⃣ Primitive Data Types

1. string
Used for text values.
let username: string = "Rahul";
let city: string = "Bangalore";

2. number
Used for numeric values (integers, decimals).
let age: number = 25;
let price: number = 99.99;

3. boolean
Used for true / false values.
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;

4. null
Represents an intentional empty value.
let data: null = null;

5. undefined
Variable declared but not assigned a value.
let value: undefined = undefined;


2️⃣ Special Types

6. any
Allows any type (not recommended because it removes type safety).
let data: any = "Hello";
data = 100;
data = true;

7. unknown
Safer version of any.
let value: unknown = "Hello";
if(typeof value === "string"){
    console.log(value.toUpperCase());
}

8. void
Used when a function does not return anything.
function logMessage(): void {
    console.log("Hello");
}

9. never
Used when a function never returns.
Example: function always throws error.
function throwError(): never {
    throw new Error("Something went wrong");
}

3️⃣ Array Type
Stores multiple values of the same type.

let numbers: number[] = [1,2,3,4];
let names: string[] = ["Rahul","John","Mike"];

Alternative syntax:
let numbers: Array<number> = [1,2,3];

4️⃣ Tuple
Fixed-length array with different types.
let user: [string, number];
user = ["Rahul", 25];
Example:
let login: [string, boolean] = ["admin", true];

5️⃣ Object Type
Used to define structured data.
let user: {name: string, age: number} = {
    name: "Rahul",
    age: 25
};

6️⃣ Enum
Used for named constants.
enum Status {
    Pending,
    Approved,
    Rejected
}
let orderStatus: Status = Status.Approved;

7️⃣ Union Type
Allows multiple possible types.
let id: string | number;
id = 100;
id = "ABC123";

8️⃣ Literal Types
Allows specific values only.
let direction: "left" | "right";
direction = "left";

9️⃣ Type Alias
Create a custom reusable type.
type User = {
    name: string;
    age: number;
};
let user1: User = {
    name: "Rahul",
    age: 25
};

🔟 Interface
Used to define object structure.
interface User {
    name: string;
    age: number;
}

let user: User = {
    name: "Rahul",
    age: 30
};
🚀 Example (Real Automation Example)

Common in **Playwright + TypeScript frameworks:

type OrderResponse = {
    token: string;
    orderId: string;
};

let response: OrderResponse = {
    token: "",
    orderId: ""
};


📊 Quick Summary
Type	Example
string	"Hello"
number	100
boolean	true
array	number[]
tuple	[string, number]
object	{name:string}
enum	Status.Pending
union	string | number
any	any value
void	function returns nothing
```

```
If you are using Playwright with TypeScript, there are some very commonly used data types in real automation frameworks. These appear frequently in interviews and production test frameworks.

Below are the 10 most used TypeScript types in automation testing.

1️⃣ string

Most commonly used type in automation.

Used for:

URLs

usernames

passwords

order IDs

selectors

let username: string = "testuser@gmail.com";
let orderId: string = "ORD12345";

Example in Playwright:

await page.fill("#username", username);

2️⃣ number

Used for:

timeouts

indexes

counts

let timeout: number = 5000;
let productIndex: number = 2;

Example:

await page.waitForTimeout(timeout);

3️⃣ boolean

Used for conditions in tests.

let isLoggedIn: boolean = true;

Example:

if(isLoggedIn){
   console.log("User logged in successfully");
}

4️⃣ Array

Very common in UI automation.

Example: list of products

let products: string[] = ["iphone", "samsung", "nokia"];

Playwright example:

const titles: string[] = await page.locator(".card-body b").allTextContents();

5️⃣ object

Used for payloads and test data.

Example API payload:

let loginPayload: {userEmail:string, userPassword:string} = {
    userEmail: "test@gmail.com",
    userPassword: "Password123"
};

Used heavily in API testing.

6️⃣ type

Used to create reusable types.

Example:

type OrderResponse = {
    token: string
    orderId: string
}

Usage:

let response: OrderResponse;

Very common in API frameworks.

7️⃣ interface

Used to define object structures.

Example:

interface User {
   username: string
   password: string
}

Usage:

let user: User = {
   username: "admin",
   password: "admin123"
}

8️⃣ Promise

Most important type in async automation.

Since Playwright functions are async, they return promises.

Example:

async function getToken(): Promise<string> {
   return "token123";
}

Another example:

async createOrder(): Promise<OrderResponse>

9️⃣ any

Allows any type (not recommended).

let data: any;

Example:

let jsonResponse: any = await response.json();

Better approach:

let jsonResponse: OrderResponse

🔟 void

Used when a function returns nothing.

function logMessage(): void {
   console.log("Test started");
}
🚀 Real Playwright Framework Example

This is a real automation pattern.

type APIResponse = {
   token: string
   orderId: string
}

async createOrder(orderPayload: string): Promise<APIResponse> {

   let response: APIResponse = {
      token: "",
      orderId: ""
   };

   response.token = await this.getToken();

   return response;
}
📊 Most Important Types (Automation)
Rank	Type	Usage
⭐1	string	test data
⭐2	Promise	async functions
⭐3	Array	UI elements list
⭐4	object	payloads
⭐5	interface	framework models
⭐6	type	API responses
⭐7	boolean	validations
⭐8	number	timeouts
⭐9	any	JSON responses
⭐10	void	utility functions

✅ Interview tip:

If someone asks "Why TypeScript for Playwright?"

Answer:

TypeScript provides type safety, IntelliSense, better refactoring, and compile-time error detection, which makes large automation frameworks more maintainable.
```

```
Here are **15 common interview questions on TypeScript specifically for automation engineers using Playwright or other test frameworks. These are frequently asked in SDET / QA Automation interviews.

1️⃣ What is TypeScript?

Answer:

TypeScript is a superset of JavaScript that adds:

Static typing

Interfaces

Classes

Compile-time error checking

TypeScript code compiles into JavaScript.

Example:

let username: string = "Rahul";

2️⃣ Difference between JavaScript and TypeScript
JavaScript	TypeScript
Dynamically typed	Statically typed
Errors at runtime	Errors at compile time
No interfaces	Supports interfaces
Hard to maintain large apps	Better for large frameworks

3️⃣ What are TypeScript Data Types?

Common types:

string

number

boolean

array

tuple

enum

any

unknown

void

never

Example:

let age: number = 25;
let name: string = "Rahul";

4️⃣ What is any type?

any disables type checking.

let data: any = "Hello";
data = 10;
data = true;

⚠️ Not recommended because it removes type safety.

5️⃣ What is unknown type?

Safer alternative to any.

let value: unknown = "Hello";

if(typeof value === "string"){
   console.log(value.toUpperCase());
}

6️⃣ What is a Tuple?

Tuple is an array with fixed types and order.

let user: [string, number];

user = ["Rahul", 25];

7️⃣ What is an Interface?

Defines structure of an object.

interface User {
   username: string
   password: string
}

let login: User = {
   username: "admin",
   password: "admin123"
};

Used a lot in automation frameworks.

8️⃣ Difference between type and interface
type	interface
Can define primitives, unions	Mainly for objects
Cannot be merged	Supports declaration merging
More flexible	Used for object models

Example:

type Order = {
   id: string
   amount: number
}

9️⃣ What is a Union Type?

Allows multiple types.

let id: string | number;

id = 100;
id = "ORD123";

🔟 What is a Promise?

Used for asynchronous operations.

Example in Playwright:

async function getToken(): Promise<string> {
   return "token123";
}

1️⃣1️⃣ What is void?

Used when a function returns nothing.

function logTestStart(): void {
   console.log("Test Started");
}

1️⃣2️⃣ What is never?

Represents functions that never return.

function throwError(): never {
   throw new Error("Error occurred");
}

1️⃣3️⃣ What are Generics?

Generics allow reusable components.

Example:

function getData<T>(value: T): T {
   return value;
}

getData<string>("Hello");
getData<number>(100);

1️⃣4️⃣ Why use TypeScript in Playwright?

Benefits:

IntelliSense

Type safety

Early error detection

Easier framework maintenance

Better refactoring

Example:

async createOrder(orderPayload: string): Promise<OrderResponse>

1️⃣5️⃣ What is Type Assertion?

Tells TypeScript to treat a variable as a specific type.

let data: any = "Hello";

let length: number = (data as string).length;
🚀 Bonus Interview Question (Very Common)

Q: Why is TypeScript preferred for automation frameworks?

Answer:

TypeScript improves code maintainability, readability, and error detection, which is important for large automation frameworks built using tools like Playwright.

⭐ Pro Tip for Interviews

Most interviewers for automation roles focus on:

interface

type

Promise

async/await

Array

Union types

If you master these 6 concepts, you're already ahead of 80% of automation candidates.
```

```
Here is a real-world automation framework structure used with Playwright + TypeScript. This structure is commonly used by SDET / QA Automation engineers in companies.

🏗 Playwright + TypeScript Framework Structure
playwright-framework
│
├── tests
│     ├── login.spec.ts
│     ├── order.spec.ts
│
├── pages
│     ├── LoginPage.ts
│     ├── DashboardPage.ts
│     ├── OrdersPage.ts
│
├── utils
│     ├── APIUtils.ts
│     ├── testData.ts
│
├── fixtures
│     ├── testBase.ts
│
├── config
│     ├── playwright.config.ts
│
├── package.json

This structure follows Page Object Model + reusable utilities.

1️⃣ tests Folder

Contains actual test cases.

Example:

import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {
   await page.goto("https://example.com");

   await page.fill("#userEmail", "test@gmail.com");
   await page.fill("#userPassword", "Password123");
   await page.click("#login");

   await expect(page).toHaveURL("https://example.com/dashboard");
});

2️⃣ pages Folder (Page Object Model)

Contains page classes.

Example: LoginPage.ts

import { Page } from '@playwright/test';

export class LoginPage {

   page: Page

   constructor(page: Page){
      this.page = page
   }

   async goTo(){
      await this.page.goto("https://example.com")
   }

   async login(username:string, password:string){
      await this.page.fill("#userEmail", username)
      await this.page.fill("#userPassword", password)
      await this.page.click("#login")
   }
}

Benefits:

Reusable methods

Clean test code

Easy maintenance

3️⃣ utils Folder

Contains helper classes and utilities.

Example: APIUtils.ts

export class APIUtils {

   apiContext: any
   loginPayload: string

   constructor(apiContext:any, loginPayload:string){
      this.apiContext = apiContext
      this.loginPayload = loginPayload
   }

   async getToken(){
      const response = await this.apiContext.post(
         'https://rahulshettyacademy.com/api/ecom/auth/login',
         {data:this.loginPayload}
      )

      const jsonResponse = await response.json()
      return jsonResponse.token
   }
}

Used for API + UI hybrid testing.

4️⃣ testData Folder

Stores test data separately.

Example:

export const loginData = {
   username: "test@gmail.com",
   password: "Password123"
}

Usage:

import { loginData } from '../utils/testData'

5️⃣ fixtures Folder

Used for custom test setup.

Example: testBase.ts

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{
   loginPage: LoginPage
}>({
   loginPage: async ({page}, use) => {
      await use(new LoginPage(page))
   }
})

Usage in test:

import { test } from '../fixtures/testBase'

test('Login test', async ({loginPage}) => {
   await loginPage.goTo()
})

6️⃣ config Folder

Contains Playwright configuration.

Example:

import { defineConfig } from '@playwright/test';

export default defineConfig({
   timeout: 30000,
   retries: 1,
   use: {
      headless: true
   }
});
🎯 How a Test Runs (Real Flow)

Test execution flow:

Test File
   ↓
Page Object
   ↓
Utils (API / Helpers)
   ↓
Test Data
   ↓
Playwright Execution
🚀 Example Real Test Using Everything
import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { loginData } from '../utils/testData'

test('User login test', async ({page}) => {

   const loginPage = new LoginPage(page)

   await loginPage.goTo()

   await loginPage.login(loginData.username, loginData.password)

   await expect(page).toHaveURL("https://example.com/dashboard")
})
⭐ Best Practices Used in Companies

✔ Page Object Model
✔ TypeScript typing
✔ Separate test data
✔ API utilities
✔ Fixtures
✔ Config management

🧠 Senior SDET Tip

Good automation frameworks combine:

UI testing (Playwright)

API testing

Test data management

Reusable utilities

CI/CD integration
```

```
Below is a more advanced real-world automation framework architecture used in many companies with Playwright + TypeScript. It follows scalable enterprise automation design.

🏢 Enterprise Playwright Framework Structure
playwright-automation-framework
│
├── tests
│   ├── ui
│   │   ├── login.spec.ts
│   │   ├── order.spec.ts
│   │
│   ├── api
│   │   ├── createOrder.spec.ts
│   │
│   ├── e2e
│       ├── orderFlow.spec.ts
│
├── pages
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── ProductPage.ts
│   ├── OrdersPage.ts
│
├── api
│   ├── APIUtils.ts
│   ├── orderAPI.ts
│
├── fixtures
│   ├── testBase.ts
│
├── test-data
│   ├── loginData.json
│   ├── orderData.json
│
├── utils
│   ├── logger.ts
│   ├── helper.ts
│
├── constants
│   ├── urls.ts
│   ├── selectors.ts
│
├── reports
│   ├── playwright-report
│
├── config
│   ├── playwright.config.ts
│
├── .github
│   ├── workflows
│       ├── ci.yml
│
├── package.json
📊 Framework Architecture Diagram
             ┌──────────────────┐
             │    Test Files    │
             │  (UI / API / E2E)│
             └─────────┬────────┘
                       │
                       ▼
             ┌──────────────────┐
             │   Page Objects   │
             │ (UI interactions)│
             └─────────┬────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼                             ▼
 ┌───────────────┐             ┌───────────────┐
 │   API Utils   │             │   Test Data   │
 │ API calls     │             │ JSON / TS     │
 └───────────────┘             └───────────────┘
                       │
                       ▼
               ┌───────────────┐
               │   Playwright  │
               │ Test Runner   │
               └───────────────┘
                       │
                       ▼
               ┌───────────────┐
               │    Reports    │
               │ HTML / CI     │
               └───────────────┘
1️⃣ UI Tests

Location:

tests/ui

Example:

test('Login Test', async ({ page }) => {
  await page.goto("/login");
});

Focus:
✔ UI validation
✔ UI elements
✔ user workflows

2️⃣ API Tests

Location:

tests/api

Example:

test('Create Order API', async ({ request }) => {
  const response = await request.post('/create-order');
});

Focus:
✔ backend validation
✔ response codes
✔ payload testing

3️⃣ End-to-End Tests

Location:

tests/e2e

Example flow:

API create order
        ↓
UI login
        ↓
Verify order in UI

This is very common in Playwright frameworks.

4️⃣ Page Object Model

Example:

export class LoginPage {

  constructor(private page: Page) {}

  async login(email:string, password:string){
     await this.page.fill("#email", email);
     await this.page.fill("#password", password);
     await this.page.click("#login");
  }
}

Benefits:

✔ reusable
✔ maintainable
✔ readable tests

5️⃣ API Utility Layer

Example:

export class APIUtils {

   constructor(private request:any){}

   async createOrder(payload:any){
      return await this.request.post('/create-order', {data: payload});
   }
}

Purpose:

✔ reusable API calls
✔ cleaner tests

6️⃣ Test Data Management

Example JSON:

{
  "username": "test@gmail.com",
  "password": "Password123"
}

Advantages:

✔ easy updates
✔ reusable data
✔ environment flexibility

7️⃣ Fixtures

Playwright fixtures provide dependency injection.

Example:

export const test = base.extend({
  loginPage: async ({ page }, use) => {
     await use(new LoginPage(page));
  }
});

Benefits:

✔ reusable setup
✔ cleaner tests

8️⃣ CI/CD Integration

Most companies run tests using:

GitHub Actions

Jenkins

Azure DevOps

Example pipeline:

Developer Push Code
        ↓
CI Pipeline Trigger
        ↓
Install Dependencies
        ↓
Run Playwright Tests
        ↓
Generate Reports

9️⃣ Reports

Playwright automatically generates:

playwright-report/index.html

Includes:

✔ screenshots
✔ trace viewer
✔ video recordings

🔟 Best Practices Used by Senior SDETs

✔ Page Object Model
✔ API + UI hybrid tests
✔ Separate test data
✔ Reusable utilities
✔ Fixtures
✔ CI/CD integration
✔ Parallel execution

⭐ Real Company Automation Flow

Typical workflow in companies:

API create order
        ↓
Store orderId
        ↓
Login to UI
        ↓
Search orderId
        ↓
Verify order details

This reduces test execution time by ~60%.
```