const mockData = require("./mock/data.json");

module.exports = {  
    publicPath: './',
    devServer: {
      port: 8080,
      before(app) {
        app.get("/api/index", (req, res) => {
          res.json(mockData);
        });
      }
    }
};