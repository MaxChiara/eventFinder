const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let mode = "development";
if (process.env.NODE_ENV === "production") { mode = "production" }

module.exports = {
    mode: mode,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.jsx', '...'],
    }
}