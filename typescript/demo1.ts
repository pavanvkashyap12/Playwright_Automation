import { expect, type Locator, type Page } from '@playwright/test';

let message1: string = "Hello"
//let message1 ="Hello" //-> this is till valid but gives compilation error
// message1 = 2 // gives error Type 'number' is not assignable to type 'string'.ts(2322)
message1 = "bye" // no error
console.log(message1)

let age: number = 20;
age = 25
// age = "point" // error
console.log(age)

let isActive: boolean = true
console.log(isActive)

let numbers: number[] = [1, 2, 3]
// numbers = ['a',"ddfd"] // error Type 'string' is not assignable to type 'number'.ts(2322)
console.log(numbers)

let names: string[] = ['a', 'b', 'c']
//names = [1,2,2] Type 'number' is not assignable to type 'string'.ts(2322)
console.log(names)

let data: any = "this could be anything like JS"
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
function add(a: number, b: number): number {
    return a + b;
}

add(3, 4)
//add(3,"4") error in TS but not in JS

// OBJECTS

let user: { name: string, age: number } = { name: "BOB", age: 24 }
// let user: {name:string,age:number} = {name:"BOB",age:"24"} //error in TS not in JS bcoz age is string
// user.location = "Hyderabad" we can dynamically add this in JS
// but in TS we cannot as intial contract is  {name:string,age:number}
// but if you do npx tsc demo1.ts it will still convert it to js file and we can execute it but during compile it will give warning

let user1: { name: string, age: number, location: string } = { name: "BOB", age: 24, location: "Delhi" }
user1.location = "Hyderabad"


// import type Page and Locator form @playwigth/test 
class CartPage {

    page: Page;
    cartProducts : Locator
    producstText : Locator
    cart : Locator
    orders : Locator
    checkoutbtn : Locator
    // Here only this that are inside the constructor are declared
    // Things outside the constructor like productName and page parameter of constructor declare it there only

    constructor(page : any) { // we dont know waht is page so give it any
        this.page = page;
        this.cartProducts = page.locator('div li').first();
        this.producstText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator('button[routerlink*="myorders"]');

        this.checkoutbtn = page.locator('text=Checkout');
    }

    getProductLocator(productName : string) {
        return this.page.locator(`h3:has-text('${productName}')`);
    }

    async checkout() {
        await this.checkoutbtn.click();
    }

    async verifyProductIsDisplayed(productName : string) {
        await this.cartProducts.waitFor() // wait for the cart products to be visible before verifying the product is displayed in the cart
        await this.getProductLocator(productName).waitFor()
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }
}
module.exports = { CartPage }