import { Account } from "./entities/Account";

class ConvertCurrency{

    convert(amount: number,account1:Account, account2:Account):number {
        //check
        if(this.check(account1, account2)){
            return amount;
        }

        let converted_amount = this.currencyConv(account1.CURRENCY, account2.CURRENCY, amount);
        return converted_amount;
    }


    private check(account1:Account, account2:Account):boolean{

        if(account1.CURRENCY == account2.CURRENCY){
            return true;
        }

        return false;
    } 

    private currencyConv(currencyFrom: string ,currencyTo: string , amount:number): number{

        let amountConverted = 0;
        let currentLiraRate = 60000;
        let temp;
 
        switch(true){

            case currencyFrom=="DOLLAR" && currencyTo=="EURO":
                amountConverted = amount*0.923662;              
                break;
            case currencyFrom == "EURO" && currencyTo== "DOLLAR":
                amountConverted = amount/0.923662;
                break;
            case currencyFrom == "LBP" && currencyTo=="DOLLAR":
                amountConverted = amount/currentLiraRate;
                break;
            case currencyFrom == "DOLLAR" && currencyTo=="LBP":
                amountConverted = amount*currentLiraRate;
                break;

            case currencyFrom=="LBP" && currencyTo=="EURO":
                temp = amount/currentLiraRate;
                amountConverted = temp*0.923662;              
                break;
            case currencyFrom == "EURO" && currencyTo== "LBP":
                temp = amount/0.923662;
                amountConverted = temp*currentLiraRate; 
                break;
        }

        return amountConverted;
    }

}

export default ConvertCurrency;