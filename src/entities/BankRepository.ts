import { Account } from "./Account";

export interface BankRepository {

    GET_TRANSFERS_TO_OWNER_ACCOUNT(id: string):any;

    GET_TRANSFERS_FROM_OTHER_ACCOUNTS(id: string):any;

    getSingleACCOUNTFromDB(id: string):any;

    ADDACCOUNT(account: Account):void;

    UpdateACCOUNTtoDB(account:Account):void;

    DE_ACTIVATE_ACCOUNTFromDB(id: string):Promise<string>;

    ACTIVATE_ACCOUNTFromDB(id: string):Promise<string>;

    GET_ENTRIES_FOR_EACH_OWNER(id: string):any;

    TRANSFER_MONEY_BETWEEN_TWO_ACCOUNTS (amount:number,amountConverted:number, from_id:number, to_id:number ):any;

}