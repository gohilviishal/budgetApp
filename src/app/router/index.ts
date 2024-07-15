import { Router } from "express";
import categories from "./categories.router";
import auth from "./auth.router";
import payment from "./payment.router";
import budget from "./budget.router";
import tag from "./tag.router";
import transaction from "./transaction.router";
import country from "./country.router";

const route = Router();

route.use("/categories", categories);
route.use("/payments", payment);
route.use("/auth", auth);
route.use("/budgets", budget);
route.use("/tags", tag);
route.use("/transactions", transaction);
route.use("/country",country)

export default route;
