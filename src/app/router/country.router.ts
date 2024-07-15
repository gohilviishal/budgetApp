import { CountryController } from "app/controllers/country.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();

const countryController = new CountryController();

router.use(verifyToken);
router.get("/", countryController.getAllCountry);

export default router;
