import { BudgetController } from "app/controllers/budget.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();

const budgetRouter = new BudgetController();

router.use(verifyToken);
router.get("/", budgetRouter.getAllBudget);
router.get("/:id", budgetRouter.getSingleBudget);
router.post("/", budgetRouter.createBudget);
router.put("/:id", budgetRouter.updateBudget);
router.delete("/:id", budgetRouter.deleteBudget);

export default router;
