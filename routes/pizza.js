const express = require("express");
const router = express.Router();

const pizzaRoute = require("../module/pizza");

router.post("/create",pizzaRoute.createPizza);
router.get("/get",pizzaRoute.getPizza);

module.exports = router;