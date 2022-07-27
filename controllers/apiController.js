module.exports = {
  landingPage: (req, res) => {
    const message = "halo dunia";
    res.status(200).json({ message: message });
  },
};
