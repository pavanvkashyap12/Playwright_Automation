const ExcelJS = require('exceljs');
const { write } = require('node:fs');

async function writeExcel(filePath, searchText,change, replacetext,sheet) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet(sheet)
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column + change.columnchange);
    cell.value = replacetext;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 }
    worksheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber} = ${JSON.stringify(row.values)}`);
        row.eachCell((cell, colNumber) => {
            console.log(`Cell ${colNumber} = ${cell.value} `)
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(`Found ${searchText} at Row ${rowNumber} and Column ${colNumber}`);
            }
        })
    })
    return output;
}

//writeExcel("C:\\Playwright_Automation\\testdata\\testdata.xlsx","iPhone", "Apple","Sheet1");
// update mango price to 350
// here another argument is added that is an object, {rowchange:0,columnchange:2} because we need to change price column which is 3 column
writeExcel("C:\\Playwright_Automation\\testdata\\testdata.xlsx","Mango", {rowchange:0,columnchange:2},350,"Sheet1");