const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.view_dashboard);
router.get("/category", adminController.view_category);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);
router.get("/bank", adminController.view_bank);
router.get("/item", adminController.view_item);
router.get("/booking", adminController.view_booking);

module.exports = router;
