import * as express from "express";
import { Account } from "./Account";
import { ConvertCurrency } from "./ConvertCurrency";
import { Database } from "./database";

export const bankRouter = express.Router();
bankRouter.use(express.json());

let database = new Database();
let convertClass = new ConvertCurrency();

bankRouter.get('/transfer/debit/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await database.GET_TRANSFERS_TO_OWNER_ACCOUNT(account_id);         
    res.send(data);
})

bankRouter.get('/transfer/creditBy/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await database.GET_TRANSFERS_FROM_OTHER_ACCOUNTS(account_id);         
    res.send(data);
})

bankRouter.get('/ACCOUNT/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await database.getSingleACCOUNTFromDB(account_id);         
    res.send(data)
})

bankRouter.post('/ACCOUNT', async function (req, res) {
    var data = await database.ADDACCOUNT(req.body)          
    res.send(data)
})

bankRouter.put('/ACCOUNT', async function (req, res) {
    console.log(req.body)
    var data = await database.UpdateACCOUNTtoDB(req.body)          
    res.send(data)
})


bankRouter.get('/entries/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await database.GET_ENTRIES_FOR_EACH_OWNER(account_id);
    res.send(data);
})

bankRouter.post('/transfer', async function(req,res) {
    const transfer_data = req.body;

    let res1 = await database.getSingleACCOUNTFromDB(transfer_data.from);
    let res2 = await database.getSingleACCOUNTFromDB(transfer_data.to);

    let account1:Account[] = res1.map((acc1) =>{

        return <Account>{
            OWNER : acc1.OWNER,
            BALANCE : acc1.BALANCE,
            CURRENCY : acc1.CURRENCY,
            CREATED_AT : acc1.CREATED_AT,
            ACTIVATED : acc1.ACTIVATED
        } as Account;
    })
    
    let account2:Account[] = res2.map((acc2) =>{

        return <Account>{
            OWNER : acc2.OWNER,
            BALANCE : acc2.BALANCE,
            CURRENCY : acc2.CURRENCY,
            CREATED_AT : acc2.CREATED_AT,
            ACTIVATED : acc2.ACTIVATED
        } as Account;
    })

    let converted_amount = convertClass.convert(transfer_data.amount, account1[0] , account2[0]);
    console.log(converted_amount);
    const res_back = await database.TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS(transfer_data.amount,
        converted_amount,
        transfer_data.from, 
        transfer_data.to);

    res.send(res_back);
})

bankRouter.get('/activate/:id', async function(req, res) {
    var account_id = req.params['id'];
    var data = await database.ACTIVATE_ACCOUNTFromDB(account_id);
    res.send(data);
});

bankRouter.get('/deactivate/:id', async function(req, res) {
    var account_id = req.params['id'];
    var data = await database.DE_ACTIVATE_ACCOUNTFromDB(account_id);
    res.send(data);
});
