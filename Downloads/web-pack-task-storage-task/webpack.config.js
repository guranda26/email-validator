const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      main: "./main.js",
      // style: "./styles/style.css",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "eslint-loader",
        },
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
          { from: "src", to: "" }, // Copy src contents to dist
          { from: "styles/style.css", to: "styles" }, // Copy style.css to dist/styles
          { from: "assets/images", to: "assets/images" }, // Copy logo images to dist/assets/images
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
