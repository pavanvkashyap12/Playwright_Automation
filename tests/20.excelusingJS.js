// To read,manipulate and write excel file using javascript we need node module exceljs
// https://www.npmjs.com/package/exceljs
// put it in package.json and run npm install to install the module
// "exceljs": "^4.3.0"
// or you can run npm install exceljs to install the module and it will automatically add it to package.json
// or npm i exceljs --save-dev to install it as a dev dependency
// Now in node modules we can see exceljs module is installed and we can use it in our tests
// just doing npm i exceljs will install the latest version of exceljs module and it will automatically add it to package.json file as a dependency.
// as new dependency
//   "dependencies": {
//     "exceljs": "^4.4.0"
//   }
// if you want this in dev dependencies then you can run npm i exceljs --save-dev and it will add it to dev dependencies
//  "devDependencies": {
//     "@playwright/test": "^1.57.0",
//     "@types/node": "^25.0.3",
//     "exceljs": "^4.4.0"
//   }

// Now import the exceljs module in your test file and use it to read, manipulate and write excel files
// const ExcelJS = require('exceljs'); // commonjs module system
// import ExcelJS from 'exceljs'; // es module system
// Read,manipulate and write spread sheet data and styles to XLSX and JSON

const ExcelJS = require('exceljs');

// create a new workbook
const workbook = new ExcelJS.Workbook();
// read an existing workbook from a file
// we know that the readFile method of workbook is asynchronous and it returns a promise that resolves to the workbook object after reading the file, so we can use async/await to wait for the promise to resolve before proceeding with the rest of the code
// we can also use then() method to handle the promise returned by readFile method, but using async/await is more cleaner and easier to read
// we can also use try/catch block to handle any errors that may occur while reading the file
workbook.xlsx.readFile("C:\\Playwright_Automation\\testdata\\testdata.xlsx").then(() => {
    // add a new worksheet to the workbook
    //  workbook.addWorksheet('Sheet1');

    // get the first worksheet in the workbook
    const worksheet = workbook.getWorksheet('Sheet1');
    // Print all the values in the first worksheet
    // eachRow is a method of worksheet that takes a callback function as an argument and it will be called for each row in the worksheet
    // eachRow Iterate over all rows that have values in a worksheet
    worksheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`);
        // in row all the values are stored in an array and the first element of the array is always null because exceljs uses 1-based indexing for rows and columns
        // rowNumber holds the current row number and row.values holds the values of the current row in an array
        // get each cell value in the current row and print it
        // eachCell is a method of row that takes a callback function as an argument and it will be called for each cell in the row
        // eachCell Iterate over all cells that have values in a row
        row.eachCell((cell, colNumber) => { // cell is the current cell and colNumber is the current column number
            console.log(`Cell ${colNumber} = ${cell.value}`);
            // in cell value is stored in cell.value and colNumber holds the current column number

        });
    });

});

// OR you can use await workbook.xlsx.readFile('testdata.xlsx')
// but when you use await you need to wrap the code in an async function and call that function to execute the code
// async function readExcelFile() {
//     await workbook.xlsx.readFile('testdata.xlsx');
//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {
//         console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`);
//         row.eachCell((cell, colNumber) => {
//             console.log(`Cell ${colNumber} = ${cell.value}`);
//         });
//     });
// }
// readExcelFile();
// in terminal you can run node 20.excelusingJS.spec.js to execute the code and see the output in the terminal