const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload, uploadMultiple } = require("../middlewares/multer");

router.get("/dashboard", adminController.view_dashboard);
// category
router.get("/category", adminController.view_category);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

// bank
router.get("/bank", adminController.view_bank);
router.post("/bank", upload, adminController.addBank);
router.put("/bank", upload, adminController.editBank);
router.delete("/bank/:id", upload, adminController.deleteBank);

// item
router.get("/item", adminController.view_item);
router.post("/item", uploadMultiple, adminController.addItem);

// booking
router.get("/booking", adminController.view_booking);

module.exports = router;
