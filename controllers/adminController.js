const Category = require("../models/Category");

module.exports = {
  view_dashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard");
  },
  view_category: async (req, res) => {
    const category = await Category.find();
    // console.log(category);
    res.render("admin/category/view_category", { category });
  },
  addCategory: async (req, res) => {
    const { categoryName } = req.body;
    await Category.create({ name: categoryName }, (err, data) => {
      if (err) return err;
      res.redirect("/admin/category");
    });
  },
  editCategory: async (req, res) => {
    const { id, categoryName } = req.body;
    const category = await Category.findOne({ _id: id });
    category.name = categoryName;
    await category.save((err, data) => {
      if (err) return err;
      res.redirect("/admin/category");
    });
  },
  deleteCategory: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    await category.remove((err, data) => {
      if (err) return err;
      res.redirect("/admin/category");
    });
  },
  view_bank: (req, res) => {
    res.render("admin/bank/view_bank");
  },
  view_item: (req, res) => {
    res.render("admin/item/view_item");
  },
  view_booking: (req, res) => {
    res.render("admin/booking/view_booking");
  },
};
