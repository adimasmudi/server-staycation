module.exports = {
  view_dashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard");
  },
  view_category: (req, res) => {
    res.render("admin/category/view_category");
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
