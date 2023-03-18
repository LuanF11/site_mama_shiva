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
  }
};

module.exports = indexController;