let message1 : string = "Hello"
//let message1 ="Hello" //-> this is till valid but gives compilation error
// message1 = 2 // gives error Type 'number' is not assignable to type 'string'.ts(2322)
message1 = "bye" // no error
console.log(message1)

let age : number = 20;
age = 25
// age = "point" // error
console.log(age)

let isActive : boolean = true
console.log(isActive)

let numbers : number[] = [1,2,3]
// numbers = ['a',"ddfd"] // error Type 'string' is not assignable to type 'number'.ts(2322)
console.log(numbers)

let names : string[] = ['a','b','c']
//names = [1,2,2] Type 'number' is not assignable to type 'string'.ts(2322)
console.log(names)

let data : any = "this could be anything like JS"
console.log(data)
data = 42 // no error for any
console.log(data)

// Now too run this demo.ts
// node demo.ts will not work because node cannot work on typeScript and Runtime env for TS
// so do npx tsc demo1.ts
// it creates a js file with same name demo1.js
// do node demo1.js

// Functions

// function add(a,b){ // Error Parameter 'a' implicitly has an 'any' type.ts(7006), Parameter 'b' implicitly has an 'any' type.ts(7006)
//     return a+b;
// } JS Function

// TS Function
function add (a:number,b:number): number {
    return a+b;
}

add(3,4)
//add(3,"4") error in TS but not in JS

// OBJECTS

let user: {name:string,age:number} = {name:"BOB",age:24}
// let user: {name:string,age:number} = {name:"BOB",age:"24"} //error in TS not in JS bcoz age is string
// user.location = "Hyderabad" we can dynamically add this in JS
// but in TS we cannot as intial contract is  {name:string,age:number}
 
