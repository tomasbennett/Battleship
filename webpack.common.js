const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { default: test } = require("node:test");
const { type } = require("os");


const config = {
    entry: "./src/index.js"

    ,output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true,
        assetModuleFilename: "./Media/Videos/[name][hash][ext]"
    }

    ,module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'Media/images/[name][hash][ext]'
                }
            },
            {
                test: /\.(mp4|webm)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'Media/videos/[name][hash][ext]'
                }
            },
            {
                test: /\.(ttf|otf)$/i,
                type: "asset/resource",
                exclude: /^node_modules$/,
                generator: {
                    filename: "fonts/[name][hash].[ext]"
                }
            },
            {
                test: /\.tsx?$/i,
                use: {
                    loader: "ts-loader",
                    options: {
                        onlyCompileBundledFiles: true
                    }
                }
            }
            ,{
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
            ,{
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: "source",
                                attribute: "src",
                                type: "src"
                            },
                            {
                                tag: "link",
                                attribute: "href",
                                type: "src"
                            },
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src"
                            }
                        ]
                    }
                }
            }
        ]
    }

    ,resolve: {
        extensions: [".js", ".css", ".json", ".jsx", ".wasm", ".ts"]
    }

    ,plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: "./src/Pages/HTML/index.html"
        })
    ]

};

module.exports = config;