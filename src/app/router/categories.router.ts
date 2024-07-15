import { CategoriesController } from "app/controllers/categories.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();

const categoriesRouter = new CategoriesController();

router.use(verifyToken);
router.get("/", categoriesRouter.getAllCategory);
router.get("/:id", categoriesRouter.getSingleCategory);
router.post("/", categoriesRouter.createCategory);
router.put("/:id", categoriesRouter.updateCategory);
router.delete("/:id", categoriesRouter.deleteCategory);

export default router;
