const {test,expect} = require('@playwright/test');
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

test('Uplod download test',async ({page})=>{
    const textSearch = 'Mango';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    // we need to wait for the file to download because if we try to upload before downloading it will give error

    //await page.getByRole('button', { name: 'Download' }).click();
    // await page.waitForTimeout(5000);

    // or wait for download event to complete

    // const [download] = await Promise.all([
    //     page.waitForEvent('download'),
    //     page.getByRole('button', { name: 'Download' }).click()
    // ]);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;

    writeExcel('C:\\Users\\Lenovo\\Downloads\\download.xlsx', 'Mango', {rowchange:0,columnchange:2}, 350, 'Sheet1');
    //await page.locator('#fileinput').click();
    // now we get a upload window which is outside browser
    // So playwright has given a method to handle this upload window which is setInputFiles
    // setInputFiles will work only when input tag type is file
    await page.locator('#fileinput').setInputFiles('C:\\Users\\Lenovo\\Downloads\\download.xlsx');
    const textLocator = page.getByText(textSearch)
    const rowLocator = page.getByRole('row').filter({has:textLocator})
    await expect(rowLocator.locator('#cell-4-undefined')).toContainText('350');
})