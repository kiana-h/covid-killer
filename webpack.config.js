const path = require("path");
module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};
