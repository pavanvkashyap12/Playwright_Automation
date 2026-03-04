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