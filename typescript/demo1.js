var message1 = "Hello";
//let message1 ="Hello" //-> this is till valid but gives compilation error
// message1 = 2 // gives error Type 'number' is not assignable to type 'string'.ts(2322)
message1 = "bye"; // no error
console.log(message1);
var age = 20;
age = 25;
// age = "point" // error
console.log(age);
var isActive = true;
console.log(isActive);
var numbers = [1, 2, 3];
// numbers = ['a',"ddfd"] // error Type 'string' is not assignable to type 'number'.ts(2322)
console.log(numbers);
var names = ['a', 'b', 'c'];
//names = [1,2,2] Type 'number' is not assignable to type 'string'.ts(2322)
console.log(names);
var data = "this could be anything like JS";
console.log(data);
data = 42; // no error for any
console.log(data);
// Now too run this demo.ts
// node demo.ts will not work because node cannot work on typeScript and Runtime env for TS
// so do npx tsc demo.ts
// it creates a js file with same name
