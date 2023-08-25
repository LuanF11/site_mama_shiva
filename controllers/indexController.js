const indexController = {

  // Renderiza a página principal
  index(req, res) {
    res.render('index', {
      cssList: [
        "css/reset.css",
        "css/fonts.css",
        "css/utils.css",
        "css/indexCss.css",
      ]
    });
  },

  login(req, res) {
    res.render('login', {
      cssList: [
        "css/reset.css",
        "css/fonts.css",
        "css/utils.css",
        "css/loginCss.css",
      ]
    });
  }
};

module.exports = indexController;