import { TagController } from "app/controllers/tag.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();
const tagRouter = new TagController();

router.use(verifyToken);
router.get("/", tagRouter.getAllTag);
router.get("/:id", tagRouter.getTag);
router.post("/", tagRouter.createTag);
router.put("/:id", tagRouter.updateTag);
router.delete("/:id", tagRouter.deleteTag);

export default router;
