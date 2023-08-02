const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
<<<<<<< HEAD
=======
const HtmlWebpackPlugin = require("html-webpack-plugin");
>>>>>>> 1c839a8 (changes)

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      main: "./src/main.js",
<<<<<<< HEAD
      style: "./styles/style.css",
=======
      // style: "./styles/style.css",
>>>>>>> 1c839a8 (changes)
    },
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
      static: path.join(__dirname, "dist"),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src", to: "" },
          { from: "styles/style.css", to: "styles" },
          { from: "assets/images", to: "assets/images" },
        ],
      }),
      new HtmlWebpackPlugin({
        // template: "./src/index.html",
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
