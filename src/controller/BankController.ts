import { Request, Response } from "express";
import { Account } from "../entities/Account";
import ConvertCurrency from "../../src/ConvertCurrency";
import { DataAccessLayer } from "../database/DataAccessLayer";
import { BankRepository } from "../entities/BankRepository";

var database:BankRepository = new DataAccessLayer();
var convertClass = new ConvertCurrency();

export class BankController {

   //private database:DataAccessLayer;
    private convertClass:ConvertCurrency;

    constructor(database:DataAccessLayer){
       // database = database;
       //convertClass = new ConvertCurrency();
       console.log("Constructor");
    }

    // get all transfers that make it by this account to other accounts
    public async getTransfersToOwnerAccount(req:Request , res :Response){
        var account_id:string = req.params['id'];
        var data:any = await database.GET_TRANSFERS_TO_OWNER_ACCOUNT(account_id);         
        return res.json(data)
    }

    async getSingleAccount(req:Request , res :Response){
        var account_id:string = req.params['id'];
        var data:any = await database.getSingleACCOUNTFromDB(account_id);         
        res.status(200).json(data)
    }

    // transfer from account to other account and convert currency based on other account currency
    public async transfer(req:Request , res :Response){
        const transfer_data = req.body;

        let res1 = await database.getSingleACCOUNTFromDB(transfer_data.from);
        let res2 = await database.getSingleACCOUNTFromDB(transfer_data.to);

        let account1:Account[] = res1.map((acc1:any) =>{

            return <Account>{
                OWNER : acc1.OWNER,
                BALANCE : acc1.BALANCE,
                CURRENCY : acc1.CURRENCY,
                CREATED_AT : acc1.CREATED_AT,
                ACTIVATED : acc1.ACTIVATED
            } as Account;
        })
        
        let account2:Account[] = res2.map((acc2:any) =>{

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

        res.json(res_back);
    }

    // add Account
    public async addAccount(req:Request , res :Response){
        var data = await database.ADDACCOUNT(req.body);        
        res.json(data);
    }

    public async updateAccount(req:Request , res :Response){
        var data = await database.UpdateACCOUNTtoDB(req.body)          
        res.json(data)
    }

    //get all transfers that other accounts send to account 
    public async getAllTransfersThatCreditThisAccount(req:Request , res :Response){
        var account_id = req.params['id'];
        var data = await database.GET_TRANSFERS_FROM_OTHER_ACCOUNTS(account_id);  
        res.json(data);
    }

    // get the amount Entries that the owner add to his account
    public async getEntriesForEachAccountOwner(req:Request , res :Response){
        var account_id = req.params['id'];
        var data = await database.GET_ENTRIES_FOR_EACH_OWNER(account_id);
        res.json(data);
    }

    // activate your account
    public async activateAcccount(req:Request , res :Response){
        var account_id = req.params['id'];
        var data = await database.ACTIVATE_ACCOUNTFromDB(account_id);
        res.json(data);
    }

    public async deactivate(req:Request , res :Response){
        var account_id = req.params['id'];
        var data = await database.DE_ACTIVATE_ACCOUNTFromDB(account_id);
        res.send(data);
    }
}