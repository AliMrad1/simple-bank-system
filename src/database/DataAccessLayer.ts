import * as sql from "mssql";
import * as msnodesqlv8 from 'mssql/msnodesqlv8';
import { BankRepository } from "../entities/BankRepository";
import { Account } from "../entities/Account";

const CONN_STR='Server=127.0.0.1,1433;Database=BANK;User Id=sa;Password=123456@@;Encrypt=false'

export class DataAccessLayer implements BankRepository {
    
    connection: sql.ConnectionPool = new sql.ConnectionPool(CONN_STR, (err) => {
        if (err) {
            return err;
        }
    });

    private async connectToDatabase() {
       
        await this.connection.connect().then(() => { 
            console.log("connecting...")
        });
    }

    private closeConnectionToDatabase(){
        this.connection.close().then(() => {
            console.log("close connection...")
        });
    }

    async GET_TRANSFERS_TO_OWNER_ACCOUNT(id: string) {
        const _GET_QUERY = `EXEC [dbo].[GET_FROM_TO_AMOUT_TRANSFER_OWNER] ${id};`
        try {
            await this.connectToDatabase()
            const result = await this.connection.query(_GET_QUERY).then()         
            return result.recordset;      
        } catch (err) {
            console.log(err);
        }
        finally{   
            this.closeConnectionToDatabase()
        }
    }

    async GET_TRANSFERS_FROM_OTHER_ACCOUNTS(id: string) {
        const _GET_QUERY = `EXEC [dbo].[GET_TO_FROM_AMOUT_TRANSFER_OWNER] ${id};`
        try {
            await this.connectToDatabase()
            const result = await this.connection.query(_GET_QUERY).then();        
            return result.recordset;      
        } catch (err) {
            console.log(err);
        }
        finally{   
            this.closeConnectionToDatabase();
        }
    }
    
    async getSingleACCOUNTFromDB(id: string) {
        const _GET_QUERY = `EXEC [DBO].[GET_ACCOUNT_BY_ID] ${id};`
        try {
            await this.connectToDatabase();
            const result = await this.connection.query(_GET_QUERY).then();
            return result.recordset;
        } catch (err) {
            console.log(err);
        }
        finally{   
             this.closeConnectionToDatabase();
        }
    }
    
    async ADDACCOUNT(account: Account)  {    
        const _INSERT_QUERY = `INSERT INTO [TBL_ACCOUNTS] ([OWNER], [BALANCE],[CURRENCY]) 
                VALUES ('${account.OWNER}', ${account.BALANCE}, '${account.CURRENCY}');
        `;
        try {
            await this.connectToDatabase()
            const result = await this.connection.query(_INSERT_QUERY).then(() =>{
                console.log("add account successfully!!!");
            });   
            console.log("ACCOUNT ADDED SEUCCESSFULLY");
                       
        } catch (err) {
            console.log(err);
        }
        finally{
            this.closeConnectionToDatabase();
        }
    }
    
    async UpdateACCOUNTtoDB (account:Account) {    
        const _UPDATE_QUERY = `UPDATE [TBL_ACCOUNTS] 
                                SET   [OWNER] = '${account.OWNER}',                                  
                                WHERE  [ID] = ${account._id}`;
        try {
            await this.connectToDatabase()
            const result = await this.connection.query(_UPDATE_QUERY).then();                   
        } catch (err) {
            console.log(err);
        }
        finally{   
            this.closeConnectionToDatabase();
        }
    }
    
    async DE_ACTIVATE_ACCOUNTFromDB(id: string):Promise<string> {    
        const _DISABLE_QUERY = `EXEC DBO.DI_ACTIVATED_ACC ${id}`;
        try {
            await this.connectToDatabase()
            const result = await this.connection.query(_DISABLE_QUERY).then();
            return `the account + ${id} + has been disactivated`                  
        } catch (err) {
            return err;
        }
        finally{   
            this.closeConnectionToDatabase();
        }
    }
    
    async ACTIVATE_ACCOUNTFromDB(id: string):Promise<string> {    
        const _DISABLE_QUERY = `EXEC DBO.ACTIVATE_ACC ${id}`;
        try {
            await this.connectToDatabase()
            const result = await this.connection.query(_DISABLE_QUERY).then();
            return `the account + ${id} + has been activated`                  
        } catch (err) {
            console.log(err);
        }
        finally{   
            this.closeConnectionToDatabase();
        }
    }
    
    async GET_ENTRIES_FOR_EACH_OWNER(id: string) {
        const GET_ENTRIES_QUERY = `EXEC [DBO].[GET_AMOUNT_OWNER] ${id};`;
    
        try {
            await this.connectToDatabase();
            const result = await this.connection.query(GET_ENTRIES_QUERY);
            return result.recordset;
        } catch (error) {
            console.log(error);
        }
        finally{
            this.closeConnectionToDatabase();
        }
    }
    
    async TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS (amount:number,amountConverted:number, from_id:number, to_id:number )  {
        const TRANSFER_MONEY = `EXEC [DBO].[TRANSFER_FOM_ACCOUNT1_TO_ACCOUNT2]
                                    ${from_id},
                                    ${to_id},
                                    ${amountConverted},
                                    ${amount}
                                    ;
                                `
        try {
            await this.connectToDatabase();
            const result = await this.connection.query(TRANSFER_MONEY);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
        finally{
            this.closeConnectionToDatabase();
        }
    }
}