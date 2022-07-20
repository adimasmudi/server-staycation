const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Item = require("../models/Item");
const Image = require("../models/Image");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  view_dashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard", {
      title: "Staycation | Dashboard",
    });
  },
  view_category: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      // console.log(category);
      res.render("admin/category/view_category", {
        category,
        alert,
        title: "Staycation | Category",
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },
  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await Category.create({ name: categoryName }, (err, data) => {
        req.flash("alertMessage", "category added successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admin/category");
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  editCategory: async (req, res) => {
    try {
      const { id, categoryName } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = categoryName;
      await category.save((err, data) => {
        req.flash("alertMessage", "category Update successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admin/category");
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      await category.remove((err, data) => {
        req.flash("alertMessage", "category delete successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admin/category");
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  view_bank: async (req, res) => {
    try {
      const bank = await Bank.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/bank/view_bank", {
        title: "Staycation | Bank",
        bank,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  addBank: async (req, res) => {
    try {
      const { bankName, nomorRekening, Name } = req.body;
      await Bank.create(
        {
          nameBank: bankName,
          nomorRekening,
          name: Name,
          imageUrl: `images/${req.file.filename}`,
        },
        (err, data) => {
          req.flash("alertMessage", "bank added successfully");
          req.flash("alertStatus", "success");
          res.redirect("/admin/bank");
        }
      );
      console.log(req.file);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  editBank: async (req, res) => {
    try {
      const { id, bankName, nomorRekening, Name } = req.body;
      const bank = await Bank.findOne({ _id: id });
      if (req.file === undefined) {
        bank.name = Name;
        bank.nameBank = bankName;
        bank.nomorRekening = nomorRekening;
        await bank.save();
        req.flash("alertMessage", "bank updated successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.name = Name;
        bank.nameBank = bankName;
        bank.nomorRekening = nomorRekening;
        bank.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        req.flash("alertMessage", "bank updated successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      bank.remove();
      req.flash("alertMessage", "bank deleted successfully");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  view_item: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/item/view_item", {
        title: "Staycation | Item",
        category,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  addItem: async (req, res) => {
    try {
      const { categoryId, title, price, city, description } = req.body;

      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId });
        const newItem = {
          categoryId: category.id,
          title,
          price,
          city,
          description,
        };

        const item = await Item.create(newItem);
        category.ItemId.push({ _id: item._id });
        await category.save();

        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          item.imageId.push({ _id: imageSave._id });
          await item.save();
        }
        req.flash("alertMessage", "item added successfully");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  view_booking: (req, res) => {
    res.render("admin/booking/view_booking", {
      title: "Staycation | Booking",
    });
  },
};
