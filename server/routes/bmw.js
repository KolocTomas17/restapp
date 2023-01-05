const express = require("express");
const router = express.Router();
const bmwController = require("../controllers/bmw");

router.get("/", bmwController.getBmws);
router.get("/:id", bmwController.getBmw);
router.post("/", bmwController.postBmw);
router.put("/:id", bmwController.putBmw);
router.patch("/:id", bmwController.patchBmw);
router.delete("/:id", bmwController.deleteBmw);

module.exports = router;