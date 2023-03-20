import { Account } from "../entities/Account";
import { BankRepository } from "../entities/BankRepository";

export class DataAccessLayerExcel implements BankRepository {




/**
 * 
 * To write in Excel using Node.js and TypeScript, you can use a library called "exceljs". Here are the steps to get started:

Install the exceljs library by running the following command in your terminal:
Copy code
npm install exceljs
Create a new TypeScript file (e.g. "writeExcel.ts") and import the required modules:
typescript
Copy code
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
Create a new workbook object and add a worksheet:
typescript
Copy code
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Sheet1');
Add some data to the worksheet:
typescript
Copy code
worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Email', key: 'email', width: 32 }
];

worksheet.addRow({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
worksheet.addRow({ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' });
Save the workbook to a file:
typescript
Copy code
workbook.xlsx.writeFile('example.xlsx')
    .then(() => {
        console.log('File saved!');
    })
    .catch((err) => {
        console.error(err);
    });
Run the TypeScript file using the following command in your terminal:
Copy code
tsc writeExcel.ts && node writeExcel.js
This will compile the TypeScript code to JavaScript and then run the resulting JavaScript file, which will create an Excel file with the specified data.
 */



    



    GET_TRANSFERS_TO_OWNER_ACCOUNT(id: string) {
        throw new Error("Method not implemented.");
    }
    GET_TRANSFERS_FROM_OTHER_ACCOUNTS(id: string) {
        throw new Error("Method not implemented.");
    }
    getSingleACCOUNTFromDB(id: string) {
        throw new Error("Method not implemented.");
    }
    ADDACCOUNT(account: Account): void {
        throw new Error("Method not implemented.");
    }
    UpdateACCOUNTtoDB(account: Account): void {
        throw new Error("Method not implemented.");
    }
    DE_ACTIVATE_ACCOUNTFromDB(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    ACTIVATE_ACCOUNTFromDB(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    GET_ENTRIES_FOR_EACH_OWNER(id: string) {
        throw new Error("Method not implemented.");
    }
    TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS(amount: number, amountConverted: number, from_id: number, to_id: number) {
        throw new Error("Method not implemented.");
    }

}