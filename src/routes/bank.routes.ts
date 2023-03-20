import * as express  from "express";
import { DataAccessLayer } from "../database/DataAccessLayer";
import { BankController } from "../controller/BankController";

export const bankRouter = express.Router();
bankRouter.use(express.json());

const db = new DataAccessLayer();
let controller:BankController = new BankController(db);

bankRouter.get('/transfer/debit/:id', controller.getTransfersToOwnerAccount);

bankRouter.get('/transfer/creditBy/:id', controller.getAllTransfersThatCreditThisAccount);

bankRouter.get('/ACCOUNT/:id', controller.getSingleAccount);

bankRouter.post('/ACCOUNT', controller.addAccount);

bankRouter.put('/ACCOUNT', controller.updateAccount)

bankRouter.get('/entries/:id', controller.getEntriesForEachAccountOwner)

bankRouter.post('/transfer', controller.transfer)

bankRouter.get('/activate/:id', controller.activateAcccount);

bankRouter.get('/deactivate/:id', controller.deactivate);
