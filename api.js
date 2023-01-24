const express = require('express')
const bodyParser = require('body-parser')

const { GET_TRANSFERS_TO_OWNER_ACCOUNT, 
    getSingleACCOUNTFromDB,
     ADDACCOUNT, 
     UpdateACCOUNTtoDB, 
     RemoveACCOUNTFromDB,
      GET_ENTRIES_FOR_EACH_OWNER, 
      TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS,
      GET_TRANSFERS_FROM_OTHER_ACCOUNTS,
      ACTIVATE_ACCOUNTFromDB,
      DE_ACTIVATE_ACCOUNTFromDB} = require('./Functions')

const app = express()
app.use(bodyParser.json())

const _PORT = 3000

// EndPoint to Get Person
app.get('/transfer/debit/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await GET_TRANSFERS_TO_OWNER_ACCOUNT(account_id);         
    res.send(data);
})

app.get('/transfer/creditBy/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await GET_TRANSFERS_FROM_OTHER_ACCOUNTS(account_id);         
    res.send(data);
})

// EndPoint to Get Person
app.get('/ACCOUNT/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await getSingleACCOUNTFromDB(account_id);         
    res.send(data)
})

// EndPoint to Add  Person
app.post('/ACCOUNT', async function (req, res) {
    var data = await ADDACCOUNT(req.body)          
    res.send(data)
})

// EndPoint to Update  Person
app.put('/ACCOUNT', async function (req, res) {
    console.log(req.body)
    var data = await UpdateACCOUNTtoDB(req.body)          
    res.send(data)
})


app.get('/entries/:id', async function (req, res) {
    var account_id = req.params['id'];
    var data = await GET_ENTRIES_FOR_EACH_OWNER(account_id);
    res.send(data);
})

app.post('/transfer', async function(req,res) {
    const transfer_data = req.body;
    const res_back = await TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS(transfer_data);
    res.send(res_back);
})

app.get('/activate/:id', async function(req, res) {
    var account_id = req.params['id'];
    var data = await ACTIVATE_ACCOUNTFromDB(account_id);
    res.send(data);
});

app.get('/deactivate/:id', async function(req, res) {
    var account_id = req.params['id'];
    var data = await DE_ACTIVATE_ACCOUNTFromDB(account_id);
    res.send(data);
});

app.listen(_PORT)