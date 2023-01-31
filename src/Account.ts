export interface Account {
    OWNER: string;
    BALANCE: number;
    CURRENCY: "dollar" | "euro" | "LBP";
    CREATED_AT: string;
    ACTIVATED: boolean;
    _id?: BigInteger;
 }