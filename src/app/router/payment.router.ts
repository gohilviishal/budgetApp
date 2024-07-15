import { PaymentsController } from "app/controllers/payment.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();

const paymentRouter = new PaymentsController();

router.use(verifyToken);
router.get("/", paymentRouter.getAllPayment);
router.get("/:id", paymentRouter.getSinglePayment);
router.post("/", paymentRouter.createPayment);
router.put("/:id", paymentRouter.updatePayment);
router.delete("/:id", paymentRouter.deletePayment);

export default router;
