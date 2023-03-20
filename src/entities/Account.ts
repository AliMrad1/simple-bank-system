export interface Account {
    OWNER: string;
    BALANCE: number;
    CURRENCY: "DOLLAR" | "EURO" | "LBP";
    CREATED_AT: string;
    ACTIVATED: boolean;
    _id?: BigInteger;
 }