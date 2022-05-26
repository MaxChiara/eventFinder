const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = "development";
if (process.env.NODE_ENV === "production") { mode = "production" }

module.exports = {
    mode: mode,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true
    },
    devtool: "source-map"
}