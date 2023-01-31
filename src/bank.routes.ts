import * as express from "express";
import { Database } from "./database";

export const bankRouter = express.Router();
bankRouter.use(express.json());

let database = new Database();

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
    const res_back = await database.TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS(transfer_data);
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
