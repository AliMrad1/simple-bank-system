const sql = require('mssql')
const _CONN_STR = 'Server=192.168.0.107,1433;Database=BANK;User Id=sa;Password=123456@@;Encrypt=false'


const GET_TRANSFERS_TO_OWNER_ACCOUNT = async (id) => {
    transfers = [];
    const _GET_QUERY = `EXEC [dbo].[GET_FROM_TO_AMOUT_TRANSFER_OWNER] ${id};`
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_GET_QUERY)         
        return result.recordset;      
    } catch (err) {
        console.log(err);
    }
    finally{   
        sql.close();
    }
}

const GET_TRANSFERS_FROM_OTHER_ACCOUNTS = async (id) => {
    transfers = [];
    const _GET_QUERY = `EXEC [dbo].[GET_TO_FROM_AMOUT_TRANSFER_OWNER] ${id};`
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_GET_QUERY)         
        return result.recordset;      
    } catch (err) {
        console.log(err);
    }
    finally{   
        sql.close();
    }
}

const getSingleACCOUNTFromDB = async (ID) => {
    _Persons = [];
    const _GET_QUERY = `SELECT *
                        FROM
                        [TBL_ACCOUNTS]
                        WHERE [ID] = ${ID};`
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_GET_QUERY)            
        return result.recordset;      
    } catch (err) {
        console.log(err);
    }
    finally{   
        sql.close();
    }
}

const ADDACCOUNT = async (ACCOUNT) => {    
    const _INSERT_QUERY = `INSERT INTO [TBL_ACCOUNTS] ([OWNER], [BALANCE],[CURRENCY]) 
            VALUES ('${ACCOUNT.OWNER}', ${ACCOUNT.BALANCE}, '${ACCOUNT.CURRENCY}');
    `;
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_INSERT_QUERY);   
        console.log("ACCOUNT ADDED SEUCCESSFULLY");
                   
    } catch (err) {
        console.log(err);
    }
    finally{
        sql.close();
    }
}

const UpdateACCOUNTtoDB = async (ACCOUNT) => {    
    const _UPDATE_QUERY = `UPDATE [TBL_ACCOUNTS] 
                            SET   [OWNER] = '${ACCOUNT.OWNER}',                                  
                            WHERE  [ID] = ${ACCOUNT.ID}`;
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_UPDATE_QUERY);                   
    } catch (err) {
        console.log(err);
    }
    finally{   
        sql.close();
    }
}

const DE_ACTIVATE_ACCOUNTFromDB = async (ID) => {    
    const _DISABLE_QUERY = `EXEC DBO.DI_ACTIVATED_ACC ${ID}`;
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_DISABLE_QUERY);
        return `the account + ${ID} + has been disactivated`                  
    } catch (err) {
        console.log(err);
    }
    finally{   
        sql.close();
    }
}

const ACTIVATE_ACCOUNTFromDB = async (ID) => {    
    const _DISABLE_QUERY = `EXEC DBO.ACTIVATE_ACC ${ID}`;
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(_DISABLE_QUERY);
        return `the account + ${ID} + has been activated`                  
    } catch (err) {
        console.log(err);
    }
    finally{   
        sql.close();
    }
}

const GET_ENTRIES_FOR_EACH_OWNER = async(id) => {
    const GET_ENTRIES_QUERY = `EXEC [DBO].[GET_AMOUNT_OWNER] ${id};`;

    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(GET_ENTRIES_QUERY);
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
    finally{
        sql.close();
    }
}

const TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS = async(transaction_body) => {
    const TRANSFER_MONEY = `EXEC [DBO].[TRANSFER_FOM_ACCOUNT1_TO_ACCOUNT2]
                                ${transaction_body.from},
                                ${transaction_body.to},
                                ${transaction_body.amount}
                                ;
                            `
    try {
        await sql.connect(_CONN_STR)
        const result = await sql.query(TRANSFER_MONEY);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
    finally{
        sql.close();
    }
}
module.exports = {GET_TRANSFERS_TO_OWNER_ACCOUNT,
    getSingleACCOUNTFromDB,
    ADDACCOUNT,
    UpdateACCOUNTtoDB,
    ACTIVATE_ACCOUNTFromDB,
    DE_ACTIVATE_ACCOUNTFromDB,
    GET_ENTRIES_FOR_EACH_OWNER,
    TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS,
    GET_TRANSFERS_FROM_OTHER_ACCOUNTS
}