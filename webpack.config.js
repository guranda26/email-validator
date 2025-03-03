const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/main.js",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },

    devServer: {
      static: { directory: path.resolve(__dirname, "dist") },
      compress: true,
      port: 8080,
      hot: true,
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          // { from: "src", to: "" },
          { from: "styles/style.css", to: "styles" },
          { from: "assets/images", to: "assets/images" },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
      }),
      // ...
    ],
    optimization: {
      minimizer: isProduction
        ? [
            new TerserPlugin({
              terserOptions: {
                format: {
                  comments: false,
                },
              },
              extractComments: false,
            }),
          ]
        : [],
    },
  };
};
