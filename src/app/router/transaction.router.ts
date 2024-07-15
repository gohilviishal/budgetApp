import { TransactionController } from "app/controllers/transaction.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();

const transactionRouter = new TransactionController();

router.use(verifyToken);
router.get("/categories", transactionRouter.getTransactionsCategoriesVise);
router.get("/", transactionRouter.getAllTransaction);
router.get("/:id", transactionRouter.getSingleTransaction);
router.post("/", transactionRouter.createTransaction);
router.put("/:id", transactionRouter.updateTransaction);
router.delete("/:id", transactionRouter.deleteTransaction);

export default router;
