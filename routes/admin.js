const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload, uploadMultiple } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.get("/logout", auth, adminController.actionLogout);
router.get("/dashboard", auth, adminController.view_dashboard);
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
router.get("/item/show-image/:id", adminController.showImageItem);
router.get("/item/:id", adminController.showEditItem);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.delete("/item/:id/delete", adminController.deleteItem);

// endpoint detailitem
router.get("/item/show-detail-item/:itemId", adminController.viewDetailItem);
router.post("/item/add/feature", upload, adminController.addFeature);
router.put("/item/update/feature", upload, adminController.editFeature);
router.delete(
  "/item/:itemId/feature/:id",
  upload,
  adminController.deleteFeature
);

router.post("/item/add/activity", upload, adminController.addActivity);
router.put("/item/update/activity", upload, adminController.editActivity);
router.delete(
  "/item/:itemId/activity/:id",
  upload,
  adminController.deleteActivity
);

// booking
router.get("/booking", adminController.view_booking);

module.exports = router;
