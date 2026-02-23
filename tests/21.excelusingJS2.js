const ExcelJS = require('exceljs');

async function readExcelFile() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("C:\\Playwright_Automation\\testdata\\testdata.xlsx")
    const worksheet = workbook.getWorksheet('Sheet1');

    let output = {row:-1, column:-1}; // this object will hold the row and column number of the cell that contains the value 'Apple'

    worksheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`);

        row.eachCell((cell, colNumber) => {
            console.log(`Cell ${colNumber} = ${cell.value} `)
            if(cell.value === 'Apple') {
                console.log(`Found Apple at Row ${rowNumber} and Column ${colNumber}`);
                output.row = rowNumber;
                output.column = colNumber;
                // break; will work only in loops but not in forEach or eachRow or eachCell because they are not loops but they are methods that take a callback function as an argument and they will call that callback function for each row or cell in the worksheet, so we cannot use break statement to exit from the loop because there is no loop to break from, instead we can use return statement to exit from the callback function and it will stop the execution of the callback function for the current row or cell and it will move to the next row or cell in the worksheet
            }
        })
    })
    // now change apple to iphone
    // worksheet.getCell(3,2).value = 'iPhone';
    const cell = worksheet.getCell(output.row, output.column);
    cell.value = 'iPhone';
    // now save the workbook to a new file, this will crete a new file with the modified data and styles, if you want to overwrite the existing file then you can use the same file name in the writeFile method
    await workbook.xlsx.writeFile("C:\\Playwright_Automation\\testdata\\testdata_modified.xlsx");
    // or to same file to overwrite the existing file
    await workbook.xlsx.writeFile("C:\\Playwright_Automation\\testdata\\testdata.xlsx");
}

// Here read file and write is in one function only so optimized in 22.excelusingJS3.js
// rowNumber and columnNumber should be dynamic hence creates a object output = {row:-1, column:-1} and then assign the row and column number to this object when we find the value in the cell and then use this object to get the cell and change its value and then save the workbook to a new file or overwrite the existing file


readExcelFile();
